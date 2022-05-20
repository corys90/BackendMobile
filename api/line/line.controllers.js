
const modelo = require("../line/line.model");

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

module.exports = {
    controllerPostGetLinePlace,
    controllerPatchCallLinePlace
};