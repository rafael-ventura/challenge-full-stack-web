# A+ Educação Challenge

## Decisão de Arquitetura Utilizada

### Backend:

A arquitetura segue os princípios da **Clean Architecture**, separando responsabilidades e garantindo modularidade.

- **API (Controllers)**: Define os endpoints e delega a lógica para os casos de uso.
- **Use Cases**: Contêm as regras de negócio, garantindo que o fluxo da aplicação esteja bem definido.
- **Infrastructure**: Implementação dos repositórios para o banco de dados **PostgreSQL**, utilizando **Sequelize**.
- **Domain**: Modelos das entidades que representam os conceitos centrais do negócio.
- **Middlewares**:
  - **Autenticação**: Implementação de autenticação com **JWT**.
  - **Tratamento de erros**: Middleware global para padronizar as mensagens de erro e evitar try/catch desnecessários.
  - **Async Handler**: Reduz boilerplate para chamadas assíncronas.

#### Testes Unitários:

- O backend foi desenvolvido com testes unitários para garantir a confiabilidade da lógica de negócios.
  Todos os casos de uso foram validados.
- Os testes foram escritos utilizando Jest, e cada caso de uso foi testado isoladamente, garantindo que a lógica
  principal do sistema esteja validada antes da integração com outras camadas.
- Tambem usei mocks para simular o comportamento do banco de dados e garantir que os testes sejam independentes.

#### Postman

- Criei a coleção com todos os endpoints
  utilizados: [https://www.postman.com/warped-eclipase-340486/a-educacao/overview](https://www.postman.com/warped-eclipase-340486/a-educacao/overview)

#### Banco de Dados

![img.png](mockups/img.png)

- Modelagem contendo:
  - `users`: Gerencia usuários administrativos do sistema, com campos `created_at` e `updated_at` para auditoria.
  - `students`: Gerencia os alunos cadastrados, com campos `created_at` e `updated_at` para auditoria.

### Frontend:

O projeto foi desenvolvido com **Nuxt 3 + TypeScript + Vuetify**.

- **Componentização**:
  - Tentei isolar cada componente para ser responsável por uma única funcionalidade.
- **Composables**:
  - Utilizei composables para centralizar a lógica de comunicação com a API.
- **SCSS**:
  - Definições globais no `app.scss`, garantindo um uso de cores e estilos consistentes.
- **Validação**:
  - Tentei centralizar a lógica de validação de formulários em um único arquivo.

---

## Bibliotecas Utilizadas

### Backend:

- `express` (API)
- `sequelize` + `pg` (ORM e banco de dados PostgreSQL)
- `jest` (testes unitários)
- `jsonwebtoken` (autenticação JWT)
- `bcryptjs` (hash de senhas)
- `dotenv` (variáveis de ambiente)

### Frontend:

- `nuxt` (framework Vue.js)
- `vuetify` (UI)
- `sass` (estilização)
- `vue-router` (navegação)
- `axios` (requisições HTTP)

---

## Melhorias Futuras

Se houvesse mais tempo, as seguintes melhorias seriam implementadas:

1. **Aprimoramento do Frontend**:

* Criaria componentes reutilizáveis para botões e inputs, evitando repetição de código e tornando a manutenção mais
  fácil.
* Melhoraria a organização das regras de validação, tornando o código mais centralizado e intuitivo.
* Implementaria feedbacks mais interativos para o usuário, como loaders e mensagens de erro mais detalhadas.

2. **Segurança e Autorização**:

* Atualmente, a autenticação está implementada, mas a autorização (controle de permissões) ainda não foi aplicada no
  backend.
* Hoje, o frontend bloqueia algumas ações para usuários não autenticados, mas a API ainda não faz essa verificação, o
  que precisaria ser garantido também no back.

3. **Melhoria na Persistência de Dados**:

* Criaria interfaces para os repositórios, facilitando a troca do banco de dados ou mudanças na infraestrutura no
  futuro.
* Implementaria uma classe base para interações no banco, reduzindo a duplicação de código nos repositórios.

4. **Testes**:

* Os testes unitários já cobrem toda a lógica de negócio no backend, garantindo que todas as regras de validação e
  operações principais funcionem corretamente.
* Com mais tempo, adicionaria testes de integração, validando fluxos completos entre API, banco de dados e autenticação.
* Criaria testes no frontend para garantir que os componentes principais e interações funcionem como esperado.

5. **Performance e UX**:

* Adicionaria paginação e filtros na listagem de alunos para melhorar a performance e usabilidade.
* Implementaria uma dashboard com métricas, usando os campos created_at e updated_at para gerar insights sobre os alunos
  cadastrados.
* Criar uma lógica de **"Lembrar-me"** no login para manter a sessão ativa por mais tempo, usando cookies com o nuxt.

6. **Automação e Infraestrutura**:

* Criaria um pipeline de CI/CD para automatizar testes e deploys.
* Usaria os campos de created e updated para manter uma auditoria de todas as operações realizadas no sistema.

---
