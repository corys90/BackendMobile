
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
            const asignacion = modelo.updateAssignAssistantUser(nmAssistant);
            res.status(200).send(nmAssistant);// devuelve el usuario de la fila que tenga state = 0 en espera.
        }else{
            res.status(400).send({message:"Error al llamar turno en la fila al servicio."});
        }
    }
}

module.exports = {
    controllerPostGetLinePlace,
    controllerPatchCallLinePlace
};