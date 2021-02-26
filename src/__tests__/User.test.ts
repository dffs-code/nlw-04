import request from 'supertest';
import { app } from '../app';

import createConnection from '../database';

describe("User", () =>{
  beforeAll(async ()=>{
    const connection = await createConnection();
    await connection.runMigrations(); 
  });

  it("deve ser capaz de criar um novo usuário", async () =>{
    const response = await request(app).post("/users").send({
      email: "user@exemple.com",
      name: "exemplo aí"
    });
    expect(response.status).toBe(201)
  });

  it("não pode ser capaz de criar um novo usuário com email existente", async () => {
    const response = await request(app).post("/users").send({
      email: "user@exemple.com",
      name: "exemplo aí"
    });
    expect(response.status).toBe(400)
  });

});