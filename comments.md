## Diário de Desenvolvimento 
### Configuração do Backend - 10/02/2025
Hoje finalizei a estruturação do backend do projeto, desde a arquitetura até a implementação dos primeiros endpoints e testes unitários. O objetivo principal foi garantir uma base sólida, organizada e modular para facilitar futuras evoluções.

Definição da Arquitetura e Stack
Decidi seguir a Clean Architecture para separar as responsabilidades do código e manter uma estrutura mais organizada. Isso facilita a manutenção e os testes. Apesar de adicionar um pouco mais de complexidade inicial, a organização e escalabilidade do projeto compensam.

#### A stack escolhida para o backend inclui:

- Node.js + TypeScript;
- Express.js;
- Sequelize;
- PostgreSQL;
- Jest;

#### Modelagem e Configuração do Banco de Dados

O banco de dados foi modelado com a tabela principal:

**Students**: Guarda os dados dos alunos.

![Modelagem do Banco de Dados](mockups/img_1.png)

Usei o Sequelize como ORM para mapear a tabela e gerenciar as operações no banco.

#### Estrutura do Backend

A aplicação foi organizada seguindo os princípios da Clean Architecture:

![Arquitetura do Fluxo](mockups/img.png)

**API**: Camada de comunicação com o cliente, contendo os controladores e os endpoints.

**Use Cases**: Contêm as regras de negócio da aplicação, como criação, listagem, atualização e remoção de alunos.

**Infrastructure**: Camada de infraestrutura, responsável por lidar com detalhes técnicos, como o banco de dados.

Criei os endpoints básicos para gerenciar alunos:

1. POST /students → Criação de um novo aluno.
2. GET /students → Listagem de alunos.
3. PUT /students/:id → Atualização dos dados de um aluno.
4. DELETE /students/:id → Remoção de um aluno.

#### Middlewares e Tratamento de Erros
Implementei um middleware de erro para capturar exceções e retornar mensagens padronizadas. 
Além disso, configurei um middleware para lidar com funções assíncronas de forma centralizada, evitando a necessidade de try/catch repetidos nos controladores.

#### Testes Unitários

Para garantir a qualidade do código, escrevi testes unitários cobrindo os casos de uso do sistema:

**CreateStudent:** Testa a criação de um aluno, validando regras como e-mail e RA únicos.

**ListStudents:** Garante que todos os alunos sejam retornados corretamente.

**UpdateStudent:** Verifica a atualização dos dados do aluno, garantindo que informações imutáveis não sejam alteradas.

**DeleteStudent:** Testa a exclusão de um aluno e os erros caso ele não exista.

_Os testes foram feitos com Jest e mocks do repositório para evitar dependência direta do banco._
