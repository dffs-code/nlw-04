import request from 'supertest';
import { app } from '../app';

import createConnection from '../database';

describe("Surveys", () =>{
  beforeAll(async ()=>{
    const connection = await createConnection();
    await connection.runMigrations(); 
  });

  it("deve ser capaz de criar uma nova pesquisa", async () =>{
    const response = await request(app).post("/surveys").send({
      title: "título exemplo aí",
      description: "exemplo aí"
    });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id")
  });
});