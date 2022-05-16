
const modelo = require("./entities.model");

async function controllerGetAllEntities(req, res, next){
    console.log("Petición GET all entities");
    const ent = await(modelo.getAllEntity());
    console.log("Datos a entregar:", ent);
    if (ent){
        res.status(200).send(ent);
    }else{
        res.status(400).send({message:"Error al obtener la información de la entidad de la BD."});
    }
}

async function controllerCreateEntities(req, res, next){
    console.log("Petición POST con body: ", req.body);

    // verificar que cumpla con losdats minimos
    if (req.body === {}){
        res.status(400).send({message:"Faltan datos importantes para crear un entidad."});
    }else{
        const ent = await modelo.createEntity(req.body);
        if (ent){
            console.log("Datos guardados: ", ent);
            res.status(201).send({message:"Datos guardados con éxito"});
        }else{
            res.status(400).send({message:"Error al guaradar la información de la entidad."});
        }
    }
}

/* pendiente a futuro por implementar
async function controllerUpdateEntities(req, res, next){
    console.log("Petición PUT con body: ", req.body);
    res.send(req.body);
} */

module.exports = {
    controllerGetAllEntities,
    controllerCreateEntities,
    //controllerUpdateEntities
};