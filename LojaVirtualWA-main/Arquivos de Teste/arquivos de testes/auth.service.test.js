// Importe os módulos e dependências necessárias
import request from 'supertest'; // Biblioteca para testar requisições HTTP
import { server } from '../../../index'; // Supondo que o objeto de servidor é exportado a partir do arquivo index
import connection from '../../../db/config'; // Supondo que a conexão com o banco de dados é estabelecida e exportada a partir deste arquivo

// Conjunto de testes para o serviço de autenticação (Auth Service)
describe('Serviço de Autenticação', () => {

  // Antes de todos os testes, inicialize o servidor
  beforeAll(async () => {
    await server.bootstrap();
  });

  /**  
  // Caso de teste a ser implementado posteriormente - 2,5 pontos
  it('should sign up user', async () => {
    // A implementação do seu teste irá aqui
  });
  */

  // Caso de teste para criar um novo usuário no cadastro (signup)
  it('deve criar um novo usuário ao cadastrar', async () => {
    // Dados do novo usuário a ser criado
    const newUser = {
      nome: "cliente",
      email: "cliente@gmail.com",
      senha: "12345678"
    };

    // Fazer uma requisição POST para a rota /signup com os dados do novo usuário
    const res = await request(server.server)
      .post('/v1/signup')
      .send(newUser);

    // Verificar se o status da resposta é 201 (Criado)
    expect(res.statusCode).toEqual(201);

    // Verificar se o corpo da resposta contém o novo usuário criado com as propriedades corretas
    expect(res.body).toHaveProperty('id');
    expect(res.body.nome).toEqual(newUser.nome);
    expect(res.body.email).toEqual(newUser.email);

    // Verificar se o tipoUsuarioId do novo usuário está definido como cliente
    // cliente {6a4cda94-fbb6-476b-be29-f4124cae905}
    expect(res.body.tipoUsuarioId).toEqual('6a4cda94-fbb6-476b-be29-f4124cae9058'); 8
  });

  // Após todos os testes, feche a conexão com o banco de dados
  afterAll(async () => {
    await connection.close();
  });
});
