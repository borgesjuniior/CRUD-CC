## 🚀 Como executar o projeto

### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Node.js], [postgresql], [Insomnia]. Além disto é bom ter um editor para trabalhar com o código como [VSCode]

### 🧭 Rodando a aplicação localmente

```bash
# Clone este repositório
$ git clone https://github.com/borgesjuniior/api-creative-code.git

# Acesse a pasta do projeto no seu terminal/cmd
$ cd api-creative-code

# Instale as dependências
$ yarn
Se estiver utilizando npm:
$ npm install

# Rode o projeto
$ yarn dev:server ou $ npm run dev:server

```
## Configurando o banco de dados
### Antes de começar afetivamente testar as rotas é necessário que as tabelas no banco de dados estejam criadas
Acesse o arquivo ormconfig.json copie e coloque suas credenciais necessárias para a conexão com o banco

````javascript
{
  "type": "postgres",
  "host": "localhost",
  "port": 5432,
  "username": "test",
  "password": "test",
  "database": "test",
  "entities": [
    "./src/models/*.ts"
  ],
  "migrations": [
    "./src/shared/database/migrations/*.ts"
  ],
  "cli": {
    "migrationsDir": "./src/shared/database/migrations"
  }
}

````

```bash
Certifique-se que a extensão para gerar o id automático está ativada no postgres
# Acesse o terminal/cmd na pasta do projeto
$ yarn typeorm migration:run


# Após a execução desse comando o ambiente já está pronto pra ser usado 🚀
# Execute a aplicação em modo de desenvolvimento (yarn dev:server)
```


## Rotas e controllers
### Cada método do controler tem uma responsabilidade

- [x] index : listar todos os registros (GET)
- [x] create : criação de um novo registro (POST)
- [x] update : atualização de um registro (PUT)
- [x] delete : deleção de um registro (DELETE)

## Utilizando o insomnia

- [x] Manage Environments - base_url : `http://localhost:3333/`
- [x] Novo new request - Index - GET : `http://localhost:3333/users`

### Criando um novo usuário

- [x] novo request `http://localhost:3333/users`
- [x] Acesse o insomnia > new request > Create > POST > Body (JSON)

````json
{
	"name": "CreativeCode",
	"email": "creativecode@gmail",
	"phone": "(98) 98436-8745",
	"weight": "73.5",
	"age": "21",
	"ethnicity": "Pardo"
}
````
#### Deve retornar
````json
[
  {
    "id": "098efc15-e0b5-4105-bbb0-5617c41f26fb",
    "name": "CreativeCode",
    "phone": "(98) 98436-8745",
    "email": "creativecode@gmail",
    "age": 21,
    "weight": 73.5,
    "ethnicity": "Pardo",
    "created_at": "2021-03-09T22:22:06.838Z",
    "updated_at": "2021-03-09T22:22:06.838Z"
  }
]

````

### De forma semelhante para atualizar ou deletar um usuário é necessário passar pelos parametros da rota o id do usuário
- [x] novo request (PUT/DELETE) `http://localhost:3333/users/098efc15-e0b5-4105-bbb0-5617c41f26fb`

## Criando um novo endereço

- [x] novo request `http://localhost:3333/address`
- [x] Acesse o insomnia > new request > Create > POST > Body (JSON)

### Ao criar o endereço deverá ser informado um id de usuário válido para que quando o usuário for deletado todos os endereços a ele vinculados sejam também deletados (CASCADE)

````json
{
	"user_id": "098efc15-e0b5-4105-bbb0-5617c41f26fb",
	"address": "Rua Coelho Neto",
	"number": "1",
	"complement": "Lado casarão",
	"cep": "65290-000",
	"city": "Carutapera",
	"estate": "MA"
}

````
#### Deve retornar
````json
{
  "user_id": "098efc15-e0b5-4105-bbb0-5617c41f26fb",
  "address": "Rua Coelho Neto",
  "number": "1",
  "complement": "Lado casarão",
  "cep": "65290-000",
  "city": "Carutapera",
  "estate": "MA",
  "id": "20d780c0-9d32-49c8-a033-35d5cd268d8a",
  "created_at": "2021-03-09T22:22:26.049Z",
  "updated_at": "2021-03-09T22:22:26.049Z"
}

````

### De mesma forma, para atualizar ou deletar um endereço é necessário passar pelos parametros da rota o id do endereço
- [x] novo request (PUT/DELETE) `http://localhost:3333/address/20d780c0-9d32-49c8-a033-35d5cd268d8a`

### Autenticando um usuário

- [x] novo request `http://localhost:3333/auth`
- [x] Acesse o insomnia > new request > Auth > POST > Body (JSON)

````json
{
	"email": "creativecode@gmail"
}

````
#### Se o email existir deve ser retornado

````json
{
  "user": {
    "id": "098efc15-e0b5-4105-bbb0-5617c41f26fb",
    "name": "CreativeCode",
    "phone": "(98) 98436-8745",
    "email": "creativecode@gmail",
    "age": 21,
    "weight": 73.5,
    "ethnicity": "Pardo",
    "created_at": "2021-03-09T22:22:06.838Z",
    "updated_at": "2021-03-09T22:22:06.838Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MTUzMTg5NzYsImV4cCI6MTYxNTQwNTM3Nn0.G1HH6Cj7yLDwi8YPJRSec_O1KvMLFL4l1sygjOFJbi4"
}

````

### Acessando rota privada para garantir que o token é válido

- [x] novo request `http://localhost:3333/login`
- [x] Acesse o insomnia > new request > Auth > POST > Auth > (Bearer Token)
- [x] Copie e cole o token gerado

#### Se tudo ocorrer como o esperado o retorno será

````json
{
  "message": "You loggedIn"
}

````
