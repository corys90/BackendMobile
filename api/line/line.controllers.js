
const modelo = require("../line/line.model");

async function controllerGetLineState(req, res, next){    
    // verificar que cumpla con los datos mínimos

    if ((req.params.id === undefined) || (req.query.idNit === undefined) || (req.query.prefix === undefined)  || (req.query.place === undefined)){
        res.status(400).send({message:"Faltan datos importantes para solicitar información a la fila."});
    }else{
        const ent = await modelo.getLine(req.params.id, req.query.idNit, req.query.prefix);
        if (ent.length > 0){
            //Haga aquí el análisis y cálculo
            const place = ent[0].place;
            let sum = 0;
            let nAtt = 0;
            let est = -1;
            const nplace = req.query.place - 1;
            place.forEach((element, idx) => {
                if (element.state === 1){
                    sum += element.timeDelay;
                    nAtt++;
                }
                // estado para seber si está siendo atendido
                if ((element.state === 4) || (element.state === 1)){
                    est = idx    
                }
            });
            const nt = {
                averageDelay: Math.round(sum/(nAtt ? nAtt : 1)),
                inAttention: (est + 1),
                state: place[nplace].state 
            };
            res.status(200).send({status: 200, message:"Ok", data:nt});
        }else{
            res.status(400).send({message:"Error al solicitar información de la fila."});
        }
    }
}

async function controllerPostGetLinePlace(req, res, next){    
    // verificar que cumpla con los datos mínimos
    if (req.body === {}){
        res.status(400).send({message:"Faltan datos importantes para pedir un turno al servicio."});
    }else{
        const ent = await modelo.getLinePlace(req.body);
        if (ent.status === 201){
            res.status(201).send({message:ent.message, turno:ent.data});
        }else{
            res.status(400).send({message:"Error al pedir turno en la fila al servicio."});
        }
    }
}

async function controllerPatchCallLinePlace(req, res, next){
     // verificar que cumpla con los datos mínimos
     if (req.body === {}){
        res.status(400).send({message:"Falta dato del cajero  que realiza llamado al usuario en turno esperando el servicio."});
    }else{
        const assistant = req.body;
        const ent = await modelo.getLine(assistant.idService, assistant.idNit, assistant.prefix);// Lo devuelve en array
        if (ent){
            console.log("obtiene de getLine: ", ent);
            const usr = ent[0].place.find(user => user.state === 0);
            const nmAssistant = {    
                idNit: assistant.idNit,
                idService: assistant.idService,
                prefix: assistant.prefix,
                placeNo: usr.placeNo,
                attendedBy: assistant.attendedBy
            };
            const asignacion = await modelo.updateAssignAssistantUser(nmAssistant);
            if (asignacion.status === 200){
                res.status(200).send({status:200, message: asignacion.message, respuesta:asignacion.data});
            }else{
                res.status(400).send({status:400,message:"Error al llamar turno en la fila al servicio."});
            }
        }else{
            res.status(400).send({status:400, message:"Error al llamar turno en la fila al servicio."});
        }
    }
}

async function controllerPutUpdateState(req, res, next){   

    // verificar que cumpla con los datos mínimos
    if (!req.body.idService || (req.body.placeNo === undefined) || (req.body.state === undefined)  || !req.body.idNit || !req.body.prefix ){
        res.status(400).send({message:"Faltan datos importantes para actualizar un turno dal servicio."});
    }else{
        const bdy = req.body;
        const ent = await modelo.UpdateStateLinePlace(bdy.idService, bdy.idNit, bdy.prefix, bdy.placeNo, bdy.state);
        if (ent.status === 200){
            res.status(200).send({status: 200, message:"Ok"});
        }else{
            res.status(400).send({status: 400, message:"Error al update turno en la fila de servicio."});
        }
    }
}

module.exports = {
    controllerGetLineState,
    controllerPostGetLinePlace,
    controllerPatchCallLinePlace,
    controllerPutUpdateState
};