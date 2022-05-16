const mongoose = require("mongoose");

const LineSchema = new mongoose.Schema(
  {
    idNit: { type: Number, required: true },
    idService: {type: String },
    prefix: {type: String},
    place:[{
        placeNo: Number,
        name: String,
        timeTookPlace: String,
        timeAttendPlace: Date,
        timeDelay: Number, // in minutes
        attendedBy: String,
        score: Number,
        state: Number,
    }],
  },
  {
    timestamps: true,
    versionKey: false,
  } 
);

const Service = mongoose.model("Lines", LineSchema);

async function getLine(id, idNit, prefix){
    try {
        const dt = await Service.find({idService:id, idNit, prefix})
        return(dt);

    } catch (error) {
         console.log("Error en getLine: ", error);       
        return (null);
    }
}

async function getPlaceOnLine(id){
    try {
        const dt = await Service.findById(id)
        return(dt);
    } catch (error) {
         console.log("Error en getPlaceOnLine: ", error);       
        return (null);
    }
}

async function createPlace(doc){
   
    try {
        const nt = await doc.save();
        if (nt){

            return({status:201, message:"Turno asignado exitósamente!!!", data:nt});
        }else{
            return({status:400, message:"Error al asignar turno en el sistema"});
        }

    } catch (error) {
        return({status:400, message:error});
    }
}

async function updatePlace(turno, usr){
   
    try {
        const id = turno._id;
        const nt = await Service.updateOne({_id: id}, {$push : {place: usr} });// inserta un objeto en un campo array del documento
        if (nt){
            // una vez asignado el turno, se debe actualizar el placeNo con el incide del array
            const fila = await getPlaceOnLine(id);
            if (fila){
                const match = (element) => element.name === usr.name;
                const index = fila.place.findIndex(match);
                console.log("Nombre : ", usr.name, "\nindice : ",index);
                // actualiza un placeNo del objeto de la fila según el indice de su array dado por index
                const nt = await Service.findByIdAndUpdate({_id: id}).then(doc=>{
                    console.log("doc: ", doc);
                    const place = doc.place[index];
                    place.placeNo = index + 1;
                    doc.save();
                });
                return({status:201, message:"Turno asignado exitósamente!!!", data:nt});
            }else{
                // nada por ahora....
            }
        }else{
            return({status:400, message:"Error al asignar turno en el sistema"});
        }

    } catch (error) {
        console.log(error);
        return({status:400, message:error});
    }
}

async function updateAssignAssistantUser({idService, idNit, prefix, placeNo, attendedBy}){
   
    try {
        // Una vez un attender tome el turno, le asigan su nombre
        const nt = await getLine(idService, idNit, prefix);
        await Service.findOneAndUpdate({idService, idNit, prefix}).then(doc=>{
            const place = doc.place[placeNo - 1];
            place.attendedBy = attendedBy;
            place.state = 1;
            doc.save();
        });
        console.log("Actuaizado turno con attendedBy: ", nt);
    } catch (error) {
        console.log(error);
        return({status:400, message:error});
    }
}

async function getLinePlace(servicio){
    
    try {
        const time = new  Date().toLocaleTimeString();
        //Obtiene la fila del servicio de turno solicitado
        const line = await getLine(servicio.idService, servicio.idNit, servicio.prefix);
        console.log("Fila: ", line);
        const user = {
            placeNo:0,
            name: servicio.name,
            timeTookPlace: time,
            timeAttendPlace: null,
            timeDelay: 0,
            attendedBy: "", 
            score: 0,
            state: 0
        };
        if (line.length > 0){
            // se configura el turno con los datos del usuario
            const tn = await updatePlace(line[0], user);
            return({status: 201, message:"Actualización exitosa!!!...", data:tn});
        }else{
            // Es el primer turno
            const doc = new Service();
            doc.idNit = servicio.idNit;
            doc.idService = servicio.idService;
            doc.prefix = servicio.prefix;
            user.placeNo = 1;
            doc.place.push(user);
            const turno = await createPlace(doc);
            return (turno);
        }
    } catch (error) {
        console.log("Error getting line place: ", error);   
        return (null);
    }
}

module.exports = { getLinePlace, getLine, updateAssignAssistantUser };
