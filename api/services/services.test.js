require("dotenv").config();
const mongoose = require('mongoose');
const supertest = require("supertest");
const {app} = require("../../app");

const request = supertest(app);

const URI = process.env.MONGO_DB_URI;

describe("Test endpoints Services  ", ()=>{

    // connet DB
  beforeAll(async () =>{
    await mongoose.connect(URI);
  })

  // Disconnet DB
  afterAll(async () =>{
    await mongoose.disconnect();
  }) 

   describe("Request GET recovery services", ()=>{ 
        it("Should return a status code 400 because data are missings in the request", async()=>{
          const respuesta = await request.get('/api/services')
          .set('Content-Type', 'application/json')
          .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRW1haWwiOiJjcmlzdGlhbkBjb250cm9sbGVyR2V0U2luZ2xlTGlzdC5jb20iLCJ1c2VyTmFtZSI6IkNyaXN0aWFuIiwiaWF0IjoxNjUzNjk4MzQ1LCJleHAiOjE2NTM3MjcxNDV9.RYIL061l-HMpYHdVzoQAM9etOOkZ2IBo9lNUfNKDDkw')
          expect(respuesta.statusCode).toEqual(404);
        })
    });  

    describe("Request POST to crate a services ", ()=>{ 
        it("Should return a status code 400 for missings datas", async()=>{
          const respuesta = await request.post('/api/services')
          .set('Content-Type', 'application/json')
          .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRW1haWwiOiJjcmlzdGlhbkBjb250cm9sbGVyR2V0U2luZ2xlTGlzdC5jb20iLCJ1c2VyTmFtZSI6IkNyaXN0aWFuIiwiaWF0IjoxNjUzNjk4MzQ1LCJleHAiOjE2NTM3MjcxNDV9.RYIL061l-HMpYHdVzoQAM9etOOkZ2IBo9lNUfNKDDkw')
          expect(respuesta.statusCode).toEqual(400);
        })
    });  
});