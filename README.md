# **PDS - Prática e Desenvolvimento de Software**

<p align="center" width="100%">
    <img width="29%" src="./src/img/logo.png">
</p>

## **Membros e papéis**:

- Abner Davi Bicalho de Lima - desenvolvedor full-stack;
- Ana Carolina Gonçalves - desenvolvedora front-end;
- Cybele F Cançado - desenvolvedora full-stack;
- Leandro Marques Venceslau de Souza - desenvolvedor back-end;
- Leonardo Almeida Brito - desenvolvedor front-end;

## **Arquitetura**

<p align="center" width="100%">
  <img src="./public/Arquitetura Hexagonal com aspectos DDD.jpg">
</p>

### **Modelo Arquitetural:**
O Back-end é estruturado dentro da lógica de uma arquitetura hexagonal que faz uso de conceitos de design de software estabelecidos pelo Domain Driven Design (DDD). Como principais motivos para adoção desse modelo estão:
- Clara distinção entre a camada própria do sistema (domínio) e tecnologias externas.
- Menor acoplamento com serviços externos ao que é definido como domínio do sistema. Isso facilita a troca de bibliotecas, frameworks, bancos de dados, etc.
- Foco no domínio: permite aos desenvolvedores se concentrarem naquilo que de fato norteia a geração de valor do sistema - seu propósito.
- Testabilidade: a tarefa de se planejar e implementar testes numa lógica de aplicação sem dependências externas é mais simples. Permite, por exemplo, a realização de testes isolados sem interferências de camadas externas ao domínio.

Dentre os conceitos definidos pelo DDD utilizamos:
- **Entidades:** Objeto com identidade única que o distingue dos demais objetos da mesma classe. Teremos a super classe User, com identificador único CPF. Essa super classe é estendida por três outros tipos de entidade usuário:
  - Clientes
  - Psicologos
  - Secretarias
- **Objetos de Valor:** Objetos sem identificador único, as quais são caracterizadas apenas pelos valores de seus atributos. Teremos a super classe UnidadeOrganizacional, a qual é estendida por duas outras classes:
  - Consultas
  - Prontuarios
- **Serviços:** Objetos focados na implementação de funcionalidades do sistema. Serviços serão singletons, ou seja, terão apenas uma única instância durante a execução do sistema. Eles serão declarados no arquivo "root" do back-end: index.ts, e serão repassados como parâmetros para a construção do adaptador Web do projeto - ClinicaSocialWeb.
- **Repositório:** Objeto que abstrai a interação com o banco de dados. Usado principalmente para recuperar outros objetos de domínio persistidos na solução de BD do sistema. Haverá apenas um repositório para todo o sistema, o qual será implementado no adaptador para Banco de Dados - class RepositorioImpl.

### **Banco de Dados:**
Firestore Cloud Service - um banco de dados de documentos totalmente gerenciado, escalável e serverless. Consideramos essa uma boa opção neste caso principalmente devido à transferência da responsabilidade operacional da empresa para a fornecedora do serviço Cloud, a qual irá manter e gerenciar a infraestrutura necessária pela contrapatrida do pagamento de taxas pelo uso de seus recursos. Como consequência temos uma redução de custos iniciais de infra-estrutura e recursos humanos, importante para um sistema de menor escopo e com recursos limitados como este.

### **Principal serviço entregue pelo Back-end:**
Como o Firestore é um banco de dados de documentos NoSQL, ela não estabelece esquemas para os dados que serão persistidos. Isso implica que documentos de uma mesma coleção (agregado de documentos) podem ter diferentes campos com diferentes tipos. No intuito de assegurar padronização dos dados sendo enviados para o banco de dados, validações são efetivadas dentro da classe de serviço CRUDImpl de forma a impedir que estruturas de dados que fogem às entidades estabelecidas no domínio sejam persistidas no banco de dados.

### **Adaptadores:**
Adaptador Web - **class ClinicaSocialWeb**. Tem como objetivos:
- Estabelecer rotas
- Extrair dados de requests
- Chamar métodos das portas de entrada
- Retornar as respostas adequadas ao Front-end.

Adaptador para o Banco de Dados - **class RepositorioImpl**. Tem como objetivos:
- Estabelecer conexão com o banco de dados
- Realizar operações de get; update; delete de objetos definidos nas classes de domínio e persistidas como documentos na Cloud Firestore.

### **Portas:**
Porta de entrada - **interface Crud**. Tem como objetivo:
- Declarar parte dos serviços disponibilizados pelo sistema.
- Ditar as possíveis interações entre o adaptador web e o domínio da aplicação.

Porta de saída - **interface Repositorio**. Tem como objetivo:
- Declarar todos os serviços requeridos pelo sistema.
- Ditar as possíveis interações entre o adaptador para o banco de dados e o domínio da aplicação.

### **Exemplo de fluxo de execução:**

<p align="center" width="100%">
  <img src="./public/Diagramas de Sequência.jpg">
</p>

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
