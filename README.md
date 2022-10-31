# Trybe Futebol Clube

Esse é um dos projetos que eu desenvolvi no módulo de Back-End da Trybe, consiste de uma API feita com Node, Express e TypeScript, com testes unitários e de integração feitos com Mocha, integrado com um banco de dados MySQL através da biblioteca Sequelize e com um FrontEnd feito em React.

> A parte Front-End to projeto foi entregue pela própria Trybe, cabendo ao estudante criar imagens Docker para ambas as partes do projeto e desenvolver e testar o Back-End.

## Rodando o código.

Clone o repositório e entre na pasta com:

```bash
$ git clone https://github.com/gralmeidan/tfc.git
$ cd tfc
```

Suba os contâineres da aplicação com:

```bash
$ npm run compose:up:dev
```

E pronto! Por padrão o Front-End é hospedado em `localhost:3000` e a API em `localhost:3001`.

As pastas `src` de ambos os projetos irão atualizar nos contâineres assim que modificadas, porém quando ocorrer alguma modificação nas raízes dos projetos é preciso subir os contâineres novamente.

## Rodando os testes.

Conecte-se ao contâiner do Back-End com:

```bash
$ docker exec -it app_backend sh
```

E rode o comando:

```bash
$ npm test
```

Para ter a porcentagem de cobertura de testes rode:

```bash
$ npm run test:coverage
```
