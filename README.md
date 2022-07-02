<h1 align="center">
     <a href="https://mydindin.netlify.app/" alt="site do ecoleta"> Dindin App </a>
</h1>

<h3 align="center">
    Uma ferramenta de gerenciamento financeiro pessoal.
</h3>
<div align="center">

[![en](https://img.shields.io/badge/lang-en-red.svg)](./README-en.md) [![pt-br](https://img.shields.io/badge/lang-pt--br-green.svg)](./README.md)

</div>
</br>
<a href='https://mydindin.netlify.app/'>
<img alt='dindin app main page' src="./assets/main.png">
</a>

<p align="center">
  <img alt="typescript logo" src="https://img.shields.io/badge/-TypeScript-grey?style=flat-square&logo=typescript">
  <img alt="react logo" src="https://img.shields.io/badge/-React-grey?style=flat-square&logo=react">
  <img alt="node logo" src="https://img.shields.io/badge/-Nodejs-grey?style=flat-square&logo=Node.js">
  <img alt="redux logo" src="https://img.shields.io/badge/-Redux-grey?style=flat-square&logo=Redux">
  <img alt="postgresql logo" src="https://img.shields.io/badge/-PostgreSQL-grey?style=flat-square&logo=postgresql">
  <img alt="bootstrap logo" src="https://img.shields.io/badge/-Bootstrap-grey?style=flat-square&logo=bootstrap">

  <a href="https://github.com/fiusks/dindinV2/commits/master">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/fiusks/dindinV2">
  </a>
    
   <img alt="License" src="https://img.shields.io/badge/license-MIT-brightgreen"> 
 
</p>

# Tabela de conteúdos

<!--ts-->

- [Sobre o projeto](#sobre-o-projeto)
- [Funcionalidades](#funcionalidades)
- [Layout](#layout)
  - [Mobile](#mobile)
  - [Web](#web)
- [Como executar o projeto](#como-executar-o-projeto)
  - [Pré-requisitos](#pré-requisitos)
  - [Rodando o Backend (servidor)](#rodando-o-backend-servidor)
  - [Rodando a aplicação web (Frontend)](<#Rodando-a-aplicação-web-(Frontend)>)
- [Tecnologias](#tecnologias)
  - [Frontend](#frontend-react--typescript)
  - [Backend](#backend-nodejs--typescript)
- [Autor](#autor)
- [Licença](#licença)
<!--te-->

## Sobre o projeto

**Dindin** - é um gerenciador de gastos que permite o registro de transações financeiras de forma que os usuários possam acompanhar seu saldo e filtrar transações.

O projeto original foi desenvolvido durante o 4º módulo do curso de Desenvolvimento de Software oferecido pela [Cubos Academy](https://cubos.academy/), tendo como objetivo praticar React utilizando **Javascript** e **React Context**.

Após a conclusão do curso, resolvi refatorar o código utilizando **Typescript** e **Redux**, além de implementar responsividade utilizando o princípio mobile first.

---

## Funcionalidades

- [x] Usuários podem se cadastrar na plataforma enviando:

  - Nome
  - Sobrenome
  - E-mail
  - Senha

- [x] Usuários cadastrados podem adicionar, deletar e editar transações com as seguintes informações:
  - Tipo: "Débito ou Crédito"
  - Valor
  - Categoria
  - Data
  - Descrição
- [x] Usuários cadastrados podem filtrar transações de acordo com o seguintes critérios:
  - Dia da semana
  - Categoria
  - Valor máximo
  - Valor mínimo

---

## Layout

A aplicação original do desafio possuia layout apenas para a web, mas ao final da refatoração, tornei o app responsivo para ser funcional em dispositivos mobile.

### Mobile

<p align="center">
  <p align="center">
  <img alt="NextLevelWeek" title="#NextLevelWeek" src="./assets/mobile-app.jpg" width="200px">
</p>

### Web

<p align="center" style="display: flex; align-items: flex-start; justify-content: center;">
  <img alt="NextLevelWeek" title="#NextLevelWeek" src="./assets/main.png">

</p>

---

## Como executar o projeto

Este projeto é divido em duas partes:

1. Backend
2. Frontend

💡Para o Frontend funcionar corretamente, é necessário que o servidor já esteja rodando.

### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/).

Além disso, será necessario criar o banco de dados de acordo com o [schema](./backend/schema.sql) na pasta do backend.

Para o projeto, foi utilizado o PostgreSQL juntamente com o Knex.

> Ver documentação [Knex](http://knexjs.org/guide/#configuration-options)

Após criar o do banco de dados, atentar para a criação do arquivo **.env** e o seu preenchimento de acordo com o arquivo [.env.example](./backend/.env.example)

#### Rodando o Backend (servidor)

```bash

# Clone este repositório
$ git clone git@github.com:fiusks/dindinV2.git

# Vá para a pasta server
$ cd backend

# Instale as dependências
$ npm install

# Execute a aplicação em modo de desenvolvimento
$ npm run dev

# O servidor inciará na porta:3001 - acesse http://localhost:3001

```

> **Para mais informações, acessar a documentação específica do [backend](./backend/README.md)**

#### Rodando o Frontend (cliente)

```bash

# Clone este repositório
$ git clone git@github.com:fiusks/dindinV2.git

# Vá para a pasta da aplicação Front End
$ cd frontend

# Instale as dependências
$ npm install

# Execute a aplicação em modo de desenvolvimento
$ npm run start

# A aplicação será aberta na porta:3000 - acesse http://localhost:3000

```

> **Para mais informações, acessar a documentação específica do [frontend](./frontend/README.md)**

---

## Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:

#### **Frontend** ([React](https://reactjs.org/) + [TypeScript](https://www.typescriptlang.org/))

- **[Day.js](https://github.com/axios/axios)**
- **[React Bootstrap](https://react-icons.github.io/react-icons/)**
- **[React Hook Form](https://react-hook-form.com/)**
- **[React Router Dom](https://github.com/ReactTraining/react-router/tree/master/packages/react-router-dom)**
- **[React Toastfiy](https://github.com/fkhadra/react-toastify)**
- **[Redux Toolkit](https://github.com/axios/axios)**
- **[Saas](https://sass-lang.com/)**
- **[Yup](https://github.com/jquense/yup)**

> Veja o arquivo [package.json](https://github.com/fiusks/dindinV2/blob/main/frontend/package.json)

#### [](https://github.com/tgmarinho/Ecoleta#server-nodejs--typescript)**Backend** ([NodeJS](https://nodejs.org/en/) + [TypeScript](https://www.typescriptlang.org/))

- **[Express](https://expressjs.com/)**
- **[Bycrypt](https://github.com/kelektiv/node.bcrypt.js#readme)**
- **[CORS](https://expressjs.com/en/resources/middleware/cors.html)**
- **[jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)**
- **[Day.js](https://day.js.org/)**
- **[KnexJS](http://knexjs.org/)**
- **[PostgreSQL](https://www.postgresql.org/)**
- **[ts-node](https://github.com/TypeStrong/ts-node)**
- **[dotENV](https://github.com/motdotla/dotenv)**
- **[pg](https://github.com/brianc/node-postgres)**
- **[Yup](https://github.com/jquense/yup)**

> Veja o arquivo [package.json](https://github.com/fiusks/dindinV2/blob/main/backend/package.json)

---

## Autor

<a href="https://blog.rocketseat.com.br/author/thiago/">
 <img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/68557347?v=4" width="100px;" alt=""/>
 <br />
 <sub><b>Rafael Barros</b></sub></a>

[![Linkedin Badge](https://img.shields.io/badge/-Rafael-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/tgmarinho/)](https://www.linkedin.com/in/rafabarros1/)
[![Gmail Badge](https://img.shields.io/badge/-rafabarros.com@gmail.com-c14438?style=flat-square&logo=Gmail&logoColor=white&link=mailto:tgmarinho@gmail.com)](mailto:rafabarros.com@gmail.com)

---

## Licença

Este projeto está sobe a licença [MIT](./LICENSE).

---

## Versões do README

[🇧🇷](./README.md) | [🇺🇸](./README-en.md)
