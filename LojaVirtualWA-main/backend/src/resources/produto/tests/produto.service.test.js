import request from 'supertest';
import { server } from '../../../index';
import connection from '../../../db/config';

describe('Produto Service', () => {
  beforeAll(async () => {
    await server.bootstrap();
  });
  afterAll(async () => {
    
    await connection.close();
  });

  it('should show all products', async () => {
    const res = await request(server.server).get('/v1/produto');

    console.log(res.status);
    console.log(res.body);

    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body) || typeof res.body === 'object').toBeTruthy();

    if (Array.isArray(res.body)) {
      expect(res.body.length).toBeGreaterThan(0);
      const firstProduct = res.body[0];
      expect(firstProduct).toHaveProperty('id');
      expect(firstProduct).toHaveProperty('nome');
      expect(firstProduct).toHaveProperty('preco');
      expect(firstProduct).toHaveProperty('estoque');
    } else {
      expect(res.body).toHaveProperty('id');
      expect(res.body).toHaveProperty('nome');
      expect(res.body).toHaveProperty('preco');
      expect(res.body).toHaveProperty('estoque');
    }
    
  });

  it('should get specific product', async () => {
    const produtoCriado = await request(server.server)
      .post('/v1/produto')
      .send({
        nome: 'teste',
        preco: 123,
        estoque: 2,
      });
    const produtoId = produtoCriado.body.id;
    const res = await request(server.server).get(`/v1/produto/${produtoId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id', produtoId);
    expect(res.body).toHaveProperty('nome', 'teste');
    expect(res.body).toHaveProperty('preco', 123);
    expect(res.body).toHaveProperty('estoque', 2);
  });


});
