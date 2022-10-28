## **Membros e papéis**:

- Abner Davi Bicalho de Lima - desenvolvedor full-stack;
- Ana Carolina Gonçalves - desenvolvedora front-end;
- Cybele F Cançado - desenvolvedora full-stack;
- Leandro Marques Venceslau de Souza - desenvolvedor back-end;
- Leonardo Almeida Brito - desenvolvedor front-end;

## **Funcional (objetivo do sistema, principais features, etc)**:

**Contexto:**
Todas as informações disponível da Clínica Social estão armazenadas em fichas e cadernos de anotações, ou seja, todo o processo é manual e redundante. A Clínica Social não tem recursos financeiro para investir na informatização do sistema.

**Objetivo:**
Nosso objetivo é criar um sistema que vai auxiliar no cadastro de pacientes e de profissionais de uma clínica social de psicologia, bem como fazer o controle da agenda de atendimentos e prontuário dos pacientes.

**Principais features:**
O sistema proposto visa agilizar e organizar o cadastro, acesso e atualização das informações de pacientes, de profissionais e da agenda da clínica.
No cadastro dos profissionais envolvidos no trabalho - psicólogos e secretárias - temos parâmetros específicos para cada um deles, pois as secretárias são as responsáveis pela marcação de consultas, atualização de cadastros dos pacientes etc. Somente os psicólogos podem ter acesso às informações clinicas.

**Usuários do sistema e respectivas funções/permissões:**
- Administrador :
	- Tem acesso a todo o sistema.
	- Realiza o cadastro de novos usuários do sistema (pessoas psicólogas ou secretárias).

- Psicólogo :
	- Visualiza a agenda.
	- Visualiza o prontuário de pacientes.
	- Só pode visualizar o prontuário de pacientes sobre seus cuidados.

- Secretária :
	- Cadastro de pacientes.
	- Administrar consultas.
	- Faz gestão dos dados cadastrais de clientes.

## **Backlog do Produto**:

*Administrador:*
- Como administrador, eu quero ter acesso para cadastrar novos funcionários (psicólogos e secretárias)


*Psicologo:*
- Como psicólogo, eu quero verificar a agenda de forma a poder melhor programar minhas atividades.
- Como psicólogo, eu quero registrar no prontuário do sistema as informações do tratamento, tendo assim um histórico a ser consultado.


*Secretária:*
- Como secretária, eu quero cadastrar clientes de forma rápida, sem a necessidade de escrever à mão e arquivar cadastros.
- Como secretária, eu quero ter controle da agenda de atendimentos - marcar e desmarcar consultas.
- Como secretária, eu quero registrar e ter o controle dos pagamentos efetuados pelos clientes, assim como uma lista dos inadimplentes.
- Como secretária, eu quero ter o controle do fluxo de caixa, ou seja, das despesas do mês, dos valores recebidos em determinada data, além do saldo em caixa.


*Psicólogo/Secretária:*
- Como usuário, gostaria de ter acesso a um local do sistema que exponha informações atualizadas sobre acontecimentos relevantes à clínica.

## **Backlog da Próxima Sprint (2):**

1. **Tarefas Técnicas:**
	- Preparar ambiente [ Leandro ]
	- Preparar ambiente de desenvolvimento  [ Todos do time ]
	- Discutir e criar esquema do banco de dados  [ Cybelle ]
	- Discutir o backlog e tecnologias [ Todos do time ]

2. **História (A): Como administrador eu gostaria de ter acesso à um formulário de cadastro:**
	- Projetar e testar a interface (Login e formulário)  [ Ana ]
	- Implementar interface  (Login e formulário) [ Ana ]
	- Criar e testar rota para ter acesso à lista/tabela com os requisitantes [ Leandro ]

2. **História (B): Como empregado, gostaria de ter acesso a um local do sistema que exponha informações atualizadas sobre acontecimentos relevantes à clínica:**
	- Projetar e testar a interface (Home/Hub De notícias)  [ Leonardo ]
	- Implementar interface  (Home/Hub De notícias) [ Leonardo ]
	- Criar e testar rota para ter acesso à lista/tabela com os requisitantes [ Abner ]


3. **História (C): Como psicólogo, eu quero verificar a agenda:**
	- Projetar a interface  [ Leonardo ]
	- Implementar interface  [ Leonardo ]
	- Testar a interface  [ Cybelle ]
	- Criar e testar rota da agenda [ Abner ]

4. **História (D): Como psicólogo, eu quero registrar no prontuário as informações do tratamento:**
	- Projetar a interface  [ Ana ]
	- Implementar interface  [ Ana ]
	- Testar a interface  [ Cybelle ]
	- Criar e testar rota do prontuário [ Leandro ]

5. **História (E): Como secretária, eu quero cadastrar  novos clientes:**
	- Projetar a interface  [ Leonardo ]
	- Implementar interface  [ Leonardo ]
	- Testar a interface  [ Cybelle ]
	- Criar e testar rota de cadastro [ Abner ]

6. **História (F): Como secretária, eu quero ter controle da agenda e agendamentos:**
	- Projetar a interface  [ Abner ]
	- Implementar interface  [ Abner ]
	- Testar a interface  [ Cybelle ]
	- Criar e testar rota administrar consultas [ Leandro ]
		- Criar e testar rota para fazer a marcação de atendimento associando a data, o profissional e o cliente [ Leandro ]
		- Criar e testar rota para editar a marcação de atendimento [ Leandro ]
		- Criar e testar rota remover uma marcação de atendimento [ Leandro ]

## **Tecnologias:**
- Front-end
    - HTML
	- CSS
	- Javascript
    - React
	- ...
- Back-end + Banco de Dados
	- Firebase?
	- ...
- Ferramenta de Integração Contínua
    - Github Actions

================================================================

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
# **PDS - Prática e Desenvolvimento de Software**

<p align="center" width="100%">
    <img width="29%" src="./src/img/logo.png">
</p>
