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



  /**
   * pré requisito para esse teste:
   *
   * cadastrar manualmente um produto no banco de dados via interface MySQL
   * ou via API, mas lembrar de alterar o banco de dados para apontar para bd de teste
   * */
  it('should show all products', async () => {
    const res = await request(server.server).get('/v1/produto');

    console.log(res.status);
    console.log(res.body);

    expect(res.statusCode).toEqual(200);

    // Espera que o corpo da resposta seja um array ou um objeto
    // Isso se deve ao fato de que o endpoint pode retornar um único produto ou uma lista de produtos
    expect(Array.isArray(res.body) || typeof res.body === 'object').toBeTruthy();

    if (Array.isArray(res.body)) {
       // Espera que o array tenha pelo menos um elemento (isto é, pelo menos um produto)
      expect(res.body.length).toBeGreaterThan(0);
  
      // Se houver mais de um produto, faz alguns testes com o primeiro produto do array
      const firstProduct = res.body[0];
      expect(firstProduct).toHaveProperty('id');
      expect(firstProduct).toHaveProperty('nome');
      expect(firstProduct).toHaveProperty('preco');
      expect(firstProduct).toHaveProperty('estoque');
    } else {
      // Se o corpo da resposta for um único objeto (produto), faz alguns testes com esse produto
      // Espera que o produto tenha uma propriedade 'id'
      expect(res.body).toHaveProperty('id');
      expect(res.body).toHaveProperty('nome');
      expect(res.body).toHaveProperty('preco');
      expect(res.body).toHaveProperty('estoque');
    }
    /** 
    no caso do meu teste e banco de dados local,
    o produto cadastrado possui essas caracteristicas abaixo:

    {
      id: 'd4b51e26-26a0-11ee-8899-0242ac120004',
      nome: 'teste',
      preco: 123,
      estoque: 2,
      createdAt: '2023-07-20T01:57:22.000Z',
      updatedAt: '2023-07-20T01:57:22.000Z'
    }

    por isso o teste ficaria assim:
    
    expect(res.body.nome).toEqual("Teste");
    expect(res.body.preco).toEqual(123);
    expect(res.body.estoque).toEqual(2);

    contudo, caso voce possua mais de um produto cadastrado para teste,
    o endpoint irá retornar um array. Nesse caso, talvez seja mais interessante
    verificar se o tamanho do array retornado está de acordo com a quantidade
    de produtos existentes, por exemplo.
    **/
  });

  /**  implementar - 2,5
   * 
   * pré requisito para esse teste:
   * 
   * cadastrar manualmente um produto no banco de dados via interface MySQL
   * ou via API, mas lembrar de alterar o banco de dados para apontar para bd de teste
  it('should get specific product', async () => {
   
  });
  */

  /*INSERT INTO `Produtos`(`id`, `nome`, `preco`, `estoque`, `createdAt`, `updatedAt`) VALUES (
  '20230720015722',
  'teste',
  123,
  2,
  '2023-07-20 01:57:22',
  '2023-07-20 01:57:22'
);*/

  it('should get specific product', async () => {
    /*
      Cadastrar manualmente um produto no banco de dados de teste aqui
      Certifique-se de obter o ID do produto cadastrado
    */
    const produtoCriado = await request(server.server)
      .post('/v1/produto')
      .send({
        nome: 'teste',
        preco: 123,
        estoque: 2,
      });

    const produtoId = produtoCriado.body.id;

    // Fazer a requisição para buscar o produto específico pelo ID
    const res = await request(server.server).get(`/v1/produto/${produtoId}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id', produtoId);
    expect(res.body).toHaveProperty('nome', 'teste');
    expect(res.body).toHaveProperty('preco', 123);
    expect(res.body).toHaveProperty('estoque', 2);
  });


});
