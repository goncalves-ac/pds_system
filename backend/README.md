# Back-end do projeto Clinica Social

## **Setup**
Na pasta backend, rode o comando:
  - npm install

### **Como iniciar o servidor**
Na pasta backend, rode o comando:
  - npm run dev
  - O servidor será inicializado no seguinte endereço:
    - http://localhost:8082

### **Como realizar requests via rotas**
No seu browser ou postman, realize requests acessando as rotas delimitadas pelo sistema. Por exemplo:
  - Adiciona determinado tipo de objeto à database (entidade usuário ou objeto de valor). Requer que os novos dados sejam repassados no body do request.
    - http://localhost:8082/api/add/:tipo_de_objeto
  - Retorna todos as objetos representados em determinada coleção de documentos do BD:
    - http://localhost:8082/api/get-all/:tipo_de_objeto
  - Retorna um objeto do tipo entidade usuário baseado em seu cpf:
    - http://localhost:8082/api/get-user/:tipo_de_entidade/:cpf
  - Atualiza dados de determinado objeto identificado pelo seu ID na base de dados. Os novos dados devem ser repassados no body do request.
    - http://localhost:8082/api/update/:tipo_de_objeto/:id_documento
  - Deleta determinado objeto identificado pelo seu ID na base de dados.
    - http://localhost:8082/api/delete/:tipo_de_objeto/:id_documento

### **Sugestão**
Utilizar o software Postman para facilitar o manejamento de requests. Basta fazer o download da aplicação em https://www.postman.com/downloads/ e importar a coleção disponível no diretório ./postman:
- https://github.com/goncalves-ac/pds_system/blob/back-end-dev/backend/postman/PDS.postman_collection.json


## **Arquitetura**

<p align="center" width="100%">
  <img src="../public/Arquitetura Hexagonal com aspectos DDD.jpg">
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
  <img src="../public/Diagramas de Sequência.jpg">
</p>
