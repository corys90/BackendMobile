const mongoose = require("mongoose");

const ServiceSchema = new mongoose.Schema(
  {
    idNit: {
      type: Number,
      required: true,
    },
    dateService: {
      type: String,
    },
    lines:[{}],
    state: {
      type: Number
    },
  }
);

const Service = mongoose.model("Services", ServiceSchema);

async function createService(servicio){
    
    try {
        const doc = new Service();
        doc.idNit = servicio.idNit;
        doc.dateService = servicio.dateService;
        doc.lines = servicio.lines;
        doc.state = servicio.state;
        return(await doc.save());
    } catch (error) {
        console.log("Error en createService: ", error);   
        return (null);
    }
}

// Devuelve solo el servicio activo de la entidad
async function getEntityService(idNit){
    
    try {
        
        return(await Service.find({idNit, state:0}));

    } catch (error) {
         console.log("Error en getEntityService: ", error);       
        return (null);
    }

}

module.exports = {createService, getEntityService};
