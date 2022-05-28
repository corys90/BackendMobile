require("dotenv").config();
const mongoose = require('mongoose');
const supertest = require("supertest");
const {app} = require("../../app");

const request = supertest(app);

const URI = process.env.MONGO_DB_URI;

describe("Test endpoints entities  ", ()=>{

    // connet DB
  beforeAll(async () =>{
    await mongoose.connect(URI);
  })

  // Disconnet DB
  afterAll(async () =>{
    await mongoose.disconnect();
  }) 

   describe("Request GET recovery list of entities", ()=>{ 
        it("Should return a status code 201 and entitie's list", async()=>{
          const respuesta = await request.get('/api/entities')
          .set('Content-Type', 'application/json')
          .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRW1haWwiOiJjcmlzdGlhbkBjb250cm9sbGVyR2V0U2luZ2xlTGlzdC5jb20iLCJ1c2VyTmFtZSI6IkNyaXN0aWFuIiwiaWF0IjoxNjUzNjk4MzQ1LCJleHAiOjE2NTM3MjcxNDV9.RYIL061l-HMpYHdVzoQAM9etOOkZ2IBo9lNUfNKDDkw')
          expect(respuesta.statusCode).toEqual(200);
        })
    });  

    describe("Request GET recovery list of entities", ()=>{ 
        it("Should return a status code 401 for not send a token", async()=>{
          const respuesta = await request.get('/api/entities')
          .set('Content-Type', 'application/json')
          expect(respuesta.statusCode).toEqual(401);
        })
    });   

    describe("Request POST to create entities", ()=>{ 
        it("Should return a status code 401 for no send a token", async()=>{
          const respuesta = await request.post('/api/entities')
          .set('Content-Type', 'application/json')
          expect(respuesta.statusCode).toEqual(401);
        })
    });  

     describe("Request POST to create entities", ()=>{ 
        it("Should return a status code 400 for incomplete datas", async()=>{
          const respuesta = await request.post('/api/entities')
          .set('Content-Type', 'application/json')
          .set({'idNit': 73160918})
          .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRW1haWwiOiJjcmlzdGlhbkBjb250cm9sbGVyR2V0U2luZ2xlTGlzdC5jb20iLCJ1c2VyTmFtZSI6IkNyaXN0aWFuIiwiaWF0IjoxNjUzNjk4MzQ1LCJleHAiOjE2NTM3MjcxNDV9.RYIL061l-HMpYHdVzoQAM9etOOkZ2IBo9lNUfNKDDkw')
          expect(respuesta.statusCode).toEqual(400);
        })
    }); 
});