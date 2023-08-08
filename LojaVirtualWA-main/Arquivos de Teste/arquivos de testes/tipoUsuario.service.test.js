// Importe o módulo 'request' da biblioteca 'supertest'
import request from 'supertest';

// Importe o objeto 'server' do arquivo 'index' localizado duas pastas acima
import { server } from '../../../index';

// Importe o módulo de conexão com o banco de dados a partir do arquivo 'config' localizado duas pastas acima
import connection from '../../../db/config';

// Conjunto de testes para o serviço de tipo de usuário (tipoUsuario Service)
describe('tipoUsuario Service', () => {

  // Antes de todos os testes, inicialize o servidor
  beforeAll(async () => {
    await server.bootstrap();
  });

  /**  
  // Caso de teste a ser implementado posteriormente - 2,5 pontos
  it('should get all user types', async () => {
    // A implementação do seu teste irá aqui
  });
  */

  // Caso de teste para obter todos os tipos de usuário
  it('should get all user types', async () => {
    // Fazer uma requisição GET para a rota /v1/tipo-usuario
    const res = await request(server.server).get('/v1/tipo-usuario');

    // Verificar se o status da resposta é 200 (OK)
    expect(res.statusCode).toEqual(200);

    // Verificar se a resposta contém dados (array com pelo menos 1 elemento)
    expect(Array.isArray(res.body)).toBeTruthy();
    expect(res.body.length).toBeGreaterThan(0);

    // Verificar se cada elemento do array contém as propriedades esperadas (id e rotulo)
    res.body.forEach((tipoUsuario) => {
      expect(tipoUsuario).toHaveProperty('id');
      expect(tipoUsuario).toHaveProperty('rotulo');
    });
  });

  // Após todos os testes, feche a conexão com o banco de dados
  afterAll(async () => {
    await connection.close();
  });
});
