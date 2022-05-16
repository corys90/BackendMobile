
const modelo = require("../services/services.model");

async function controllerGetService(req, res, next){
    console.log("Petición GET all service: ", req.params.idNit);
    if (req.params.idNit){
        const ent = await(modelo.getEntityService(req.params.idNit));
        console.log("Datos a entregar:", ent);        
        if (ent){
            res.status(200).send(ent);
        }else{
            res.status(400).send({message:"Error al obtener la información del servicio de la entidad."});
        }
    }else{
        res.status(400).send({message:"Error : se requiere una identificación."});
    }
}

async function controllerCreateService(req, res, next){ 
    console.log("Petición POST con body: ", req.body);

    // verificar que cumpla con los datos mínimos
    if (req.body === {}){
        res.status(400).send({message:"Faltan datos importantes para configurar un servicio."});
    }else{
        const ent = await modelo.createService(req.body);
        if (ent){
            console.log("Datos guardados: ", ent);
            res.status(201).send({message:"Datos guardados con éxito"});
        }else{
            res.status(400).send({message:"Error al guaradar la información del servicio."});
        }
    }
}

module.exports = {
    controllerGetService,
    controllerCreateService,
};