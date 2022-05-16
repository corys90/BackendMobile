const mongoose = require("mongoose");

const EntitieSchema = new mongoose.Schema(
  {
    idNit: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
    },
    description: {
        type: String,
    },
    address: {
      type: String,
    },
    lonx: {
        type: Number,
      },
    laty: {
      type: Number,
    },
    state: {
      type: Number,
      required: true,
    },
  }
);

const Entity = mongoose.model("Entitie", EntitieSchema);

async function createEntity(entidad){
    
    try {
        const doc = new Entity();
        doc.idNit = entidad.idNit;
        doc.name = entidad.name;
        doc.address = entidad.address;
        doc.lonx = entidad.lonx;
        doc.laty = entidad.laty;
        doc.description = entidad.description;
        doc.state = entidad.state;

        return(await doc.save(entidad));

    } catch (error) {
        console.log("Error en createEntity: ", error);   
        return (null);
    }
}

async function getAllEntity(){
    
    try {
        
        return(await Entity.find());

    } catch (error) {
         console.log("Error en getAllEntity: ", error);       
        return (null);
    }

}

module.exports = {createEntity, getAllEntity};
