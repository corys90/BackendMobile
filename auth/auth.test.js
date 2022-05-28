require("dotenv").config();
const mongoose = require('mongoose');
const supertest = require("supertest");
const {app} = require("../app");

const request = supertest(app);

const URI = process.env.MONGO_DB_URI;

describe("Test endpoints Login  ", ()=>{

    // connet DB
  beforeAll(async () =>{
    await mongoose.connect(URI);
  })

  // Disconnet DB
  afterAll(async () =>{
    await mongoose.disconnect();
  }) 

   describe("Request POST to authorize a new user", ()=>{ 
        it("Should return a status code 201 and token when user get into the app", async()=>{
          const respuesta = await request.post('/login')
          .set('Content-Type', 'application/json')
          .send({"userEmail":"cristian@controllerGetSingleList.com", "userName":"Cristian"});
          expect(respuesta.statusCode).toEqual(201);
        })
    });  
});