
const { controllerPostGetLinePlace } = require("../line/line.controllers");
const modelo = require("../services/services.model");

async function controllerGetService(req, res, next){
<<<<<<< HEAD
    console.log("params sin idmit: ", req.params.idNit);
    if (req.params.idNit !== undefined){
=======
    if (req.params.idNit){
>>>>>>> 25aeda6391e870d6325a769b3b7a49cadb8fc479
        const ent = await(modelo.getEntityService(req.params.idNit));
        if (ent){
            res.status(200).send(ent);
        }else{
            res.status(400).send({message:"Error  al obtener la información del servicio de la entidad."});
        }
    }else{
        res.status(400).send({message:"Error : se requiere una identificación."});
    }
}

async function controllerCreateService(req, res, next){ 

    // verificar que cumpla con los datos mínimos
    if ((req.body.idNit === undefined) || (req.body.dateService) 
    || (req.body.state === undefined) || (req.body.lines === undefined)){
        res.status(400).send({message:"Faltan datos importantes para configurar un servicio."});
    }else{
        const ent = await modelo.createService(req.body);
        if (ent){

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