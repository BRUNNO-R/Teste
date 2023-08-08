import request from 'supertest';
import { server } from '../../../index';


describe('Serviço de Produto', () => {
  beforeAll(async () => {
    // Inicializa o servidor.
    await server.bootstrap();
  });
  afterAll(async()=>{
    await server.close();
  });

  it('deve retornar 403 proibido se o usuario tentar adicionar produto sem ser autenticado', async () => {
    // Faz uma solicitação POST à rota /v1/produto/ sem estar autenticado.
    const res = await request(server.server).post('/v1/produto/').send ({
      nome: 'Notebook',
      preco: 4999,
      estoque: 11,
    });

    // Verifica se o status code da resposta é `403`.
    expect(res.statusCode).toEqual(403);

    // Verifica se o corpo da resposta é um objeto com a mensagem `Não autorizado`.
    expect(res.body).toEqual({
      msg: 'Não autorizado',
    });
  });
});
