<p align="center">
   <img src="https://raw.githubusercontent.com/tavareshenrique/nlw-copa/8ba02fc914bba835e2e8c90358957a0e01a47480/assets/logo.svg" alt="NLW Copa" width="180"/>
</p>

<p align="center">
   <a href="https://www.linkedin.com/in/tavareshenrique/">
      <img alt="Henrique Tavares" src="https://img.shields.io/badge/-Henrique Tavares-f7dd43?style=flat&logo=Linkedin&logoColor=white" />
   </a>
 <img alt="Repository size" src="https://img.shields.io/github/repo-size/tavareshenrique/nlw-copa?color=f7dd43">

  <a aria-label="Last Commit" href="https://github.com/tavareshenrique/nlw-copa/commits/master">
    <img alt="Last commit on GitHub" src="https://img.shields.io/github/last-commit/tavareshenrique/nlw-copa?color=f7dd43">
  </a>
  <a href="https://github.com/tavareshenrique/nlw-copa/commits/master">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/tavareshenrique/nlw-copa?color=f7dd43">
  </a>
  <img alt="License" src="https://img.shields.io/badge/license-MIT-f7dd43">
</p>

> NLW Copa **Server** é um projeto da Rocketseat onde construimos uma aplicação de um Bolão para a Copa do Mundo de 2022. Essa aplicação é responsável por registrar os jogos, os bolões e por cadastrar o usuário utilizando oAuth do Google. Utilizando tecnologias como: Fastify, Prisma, Zod e TypeScript. 🚀 💜

# :pushpin: Conteúdo

* [Diagrama](#memo-diagrama)
* [Tecnologias](#computer-tecnologias)
* [Como Executar](#construction_worker-como-executar)
* [Autor](#computer-autor)
* [Licença](#closed_book-licença)


# :memo:	 Diagrama

<p align="center">
    <img alt="ERD" src="https://raw.githubusercontent.com/tavareshenrique/nlw-copa/8ba02fc914bba835e2e8c90358957a0e01a47480/server/prisma/ERD.svg" width="200px" />
</p>


# :computer: Tecnologias

Este projeto foi feito utilizando as seguintes tecnologias:

* [React](https://reactjs.org/)
* [Typescript](https://www.typescriptlang.org/)
* [Axios](https://github.com/axios/axios)
* [Vite](https://github.com/twbs/bootstrap)
* [clsx](https://github.com/lukeed/clsx)
* [phosphor-react](https://github.com/phosphor-icons/phosphor-react)
* [storybook](https://storybook.js.org/)
* [msw](https://mswjs.io/)
* [tailwindcss](https://tailwindcss.com/)

# :construction_worker: Como Executar

```bash
# Clone o Repositório
https://github.com/tavareshenrique/nlw-copa.git
```

```bash
# Certifique que você esteja na última versão 18 do NodeJS (18.12.0)
# Caso utilize nvm, basta executar o comando abaixo para utilizar a versão 18.12.0 do NodeJS.
nvm use
```

```bash
# Instale as Dependências
npm install
```

```bash
# Crie as variaveis de ambiente, copiando o arquivo .env.example e renomeando para .env

# Certifique de adicionar valor para as variaveis de ambiente
cp .env.example .env
```

```bash
# Execute as Migrations do Prisma
npm run prisma:migrate
```

```bash
# Execute o Projeto.
nom run dev
```


# :computer: Autor

<table>
  <tr>
    <td align="center">
      <a href="http://github.com/tavareshenrique/">
        <img src="https://avatars1.githubusercontent.com/u/27022914?v=4" width="100px;" alt="Henrique Tavares"/>
        <br />
        <sub>
          <b>Henrique Tavares</b>
        </sub>
       </a>
       <br />
       <a href="https://www.linkedin.com/in/tavareshenrique/" title="Linkedin">@tavareshenrique</a>
       <br />
       <a href="https://github.com/tavareshenrique/go-barber-web-ts/commits?author=tavareshenrique" title="Code">💻</a>
    </td>
    <td align="center">
      <a href="http://github.com/rocketseat/">
        <img src="https://avatars.githubusercontent.com/u/28929274?s=200&v=4" width="100px;" alt="Logo da Rocketseat"/>
        <br />
        <sub>
          <b>Rocketseat</b>
        </sub>
       </a>
       <br />
       <a href="http://github.com/rocketseat/" title="Linkedin">@rocketseat</a>
       <br />
       <a href="https://github.com/tavareshenrique/go-barber-web-ts/commits?author=tavareshenrique" title="Education Platform">🚀</a>
    </td>
  </tr>
</table>

# :closed_book: Licença

Esse projeto é possui [MIT license](./LICENSE).