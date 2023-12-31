import request from 'supertest';
import { server } from '../../../index';
import connection from '../../../db/config';
import { TiposUsuarios } from '../../tipoUsuario/tipoUsuario.constants';

describe('Usuario Service', () => {
  beforeAll(async () => {
    await server.bootstrap();
  });

  it('deve criar um novo usuario', async () => {
    const randomEmailNumber = Math.random().toFixed(10); 

    const res = await request(server.server)
      .post('/v1/usuario')
      .send({
        nome: 'teste',
        email: `user.teste${randomEmailNumber}@gmail.com`, 
        tipoUsuarioId: '7edd25c6-c89e-4c06-ae50-c3c32d71b8ad',
        senha: '12345678',
      });

    console.log('conteudo de res.body:', res.body);

    expect(res.statusCode).toEqual(201);
    expect(res.body.nome).toEqual('teste');
    expect(res.body.email).toEqual(`user.teste${randomEmailNumber}@gmail.com`);
    expect(res.body.tipoUsuarioId).toEqual(TiposUsuarios.ADMIN);
  });

  afterAll(async () => {
    await connection.close();
  });
});
