<h1 align="center">
     <a href="https://mydindin.netlify.app/" alt="site do ecoleta"> Dindin App </a>
</h1>

<h3 align="center">
    Uma ferramenta de gerenciamento de gastos
</h3>
</br>

<p align="center">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/fiusks/dindinV2?color=%2304D361">

  <img alt="Repository size" src="https://img.shields.io/github/repo-size/fiusks/dindinV2">

  <a href="https://www.twitter.com/tgmarinho/">
    <img alt="LinkedIn" src="https://img.shields.io/twitter/url?url=https%3A%2F%2Fgithub.com%2Ftgmarinho%2FREADME-ecoleta">
  </a>
  
  <a href="https://github.com/fiusks/dindinV2/commits/master">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/fiusks/dindinV2">
  </a>
    
   <img alt="License" src="https://img.shields.io/badge/license-MIT-brightgreen">
   <a href="https://github.com/fiusks/dindinV2/stargazers">
    <img alt="Stargazers" src="https://img.shields.io/github/stars/fiusks/dindinV2?style=social">
  </a>  
 
</p>

# Tabela de conteúdos

<!--ts-->

- [Sobre o projeto](#-sobre-o-projeto)
- [Funcionalidades](#-funcionalidades)
- [Layout](#-layout)
  - [Mobile](#mobile)
  - [Web](#web)
- [Como executar o projeto](#-como-executar-o-projeto)
  - [Pré-requisitos](#pré-requisitos)
  - [Rodando o Backend (servidor)](#user-content--rodando-o-backend-servidor)
  - [Rodando a aplicação web (Frontend)](#user-content--rodando-a-aplicação-web-frontend)
- [Tecnologias](#-tecnologias)
  - [Frontend](#user-content-website--react----typescript)
  - [Backend](#user-content-server--nodejs----typescript)
  - [Mobile](#user-content-mobile--react-native----typescript)
- [Autor](#-autor)
- [Licença](#user-content--licença)
<!--te-->

## 💻 Sobre o projeto

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
- [x]

---

### Mobile

<p align="center">
  <img alt="NextLevelWeek" title="#NextLevelWeek" src="./assets/home-mobile.png" width="200px">

  <img alt="NextLevelWeek" title="#NextLevelWeek" src="./assets/detalhes-mobile.svg" width="200px">
</p>

### Web

<p align="center" style="display: flex; align-items: flex-start; justify-content: center;">
  <img alt="NextLevelWeek" title="#NextLevelWeek" src="./assets/web.svg" width="400px">

  <img alt="NextLevelWeek" title="#NextLevelWeek" src="./assets/sucesso-web.svg" width="400px">
</p>

---

## Como executar o projeto

Este projeto é divido em duas partes:

1. Backend
2. Frontend

💡Para o Frontend funcionar corretamente, é necessário que servido já esteja rodando

### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/).
Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/)

#### Rodando o Backend (servidor)

```bash

# Clone este repositório
$ git clone git@github.com:fiusks/dindinV2.git

# Vá para a pasta server
$ cd backend

# Instale as dependências
$ npm install

# Criar o arquivo .env e preencher os dados para acessar o banco de dados
$ touch .env

# Execute a aplicação em modo de desenvolvimento
$ npm run dev

# Antes de executar a aplicação, deve
# O servidor inciará na porta:3001 - acesse http://localhost:3001

```

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

## 📝 Licença

Este projeto esta sobe a licença [MIT](./LICENSE).

---

## Versões do README

[🇧🇷](./README.md) | [🇺🇸](./README-en.md)
