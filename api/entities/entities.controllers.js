
const modelo = require("./entities.model");

async function controllerGetAllEntities(req, res, next){

    const ent = await(modelo.getAllEntity());
    if (ent){
        res.status(200).set('Content-Type', 'application/json; charset=utf-8').send(ent);
    }else{
        res.status(400).send({message:"Error al obtener la información de la entidad de la BD."});
    }
}

async function controllerCreateEntities(req, res, next){
    // verificar que cumpla con losdats minimos
    if (req.body === {}){
        res.status(400).send({message:"Faltan datos importantes para crear un entidad."});
    }else{
        const ent = await modelo.createEntity(req.body);
        if (ent){

            res.status(201).send({message:"Datos guardados con éxito"});
        }else{
            res.status(400).send({message:"Error al guaradar la información de la entidad."});
        }
    }
}

module.exports = {
    controllerGetAllEntities,
    controllerCreateEntities,
    //controllerUpdateEntities
};