# Back-end do projeto Clinica Social

## Setup
Na pasta backend, rode o comando:
  - npm install

## Como iniciar o servidor
Na pasta backend, rode o comando:
  - npm run dev
  - O servidor será inicializado no seguinte endereço:
    - http://localhost:8080

## Como realizar requests via rotas
No seu browser ou postman, realize requests acessando as rotas delimitadas pelo sistema. Por exemplo:
  - Adiciona cliente à database:
    - http://localhost:8080/api/add-cliente
  - Retorna todos os clientes presentes na database:
    - http://localhost:8080/api/get-all-clientes
  - Retorna um cliente baseado em seu id:
    - http://localhost:8080/api/get-cliente/id_do_cliente

## Sugestão
Utilizar o software Postman para facilitar o manejamento de requests. Basta fazer o download da aplicação em https://www.postman.com/downloads/ e importar a coleção disponível no diretório ./postman:
- https://github.com/goncalves-ac/pds_system/blob/back-end-dev/backend/postman/PDS.postman_collection.json

## Principal serviço entregue pelo Back-end:
Assegurar que os requests de adição e update de entidades segue os padrões estipulados pela definição das classes de domínio.

- Entidades usuário da mesma coleção devem necessariamente ter CPF's distintos. O mesmo CPF pode, no entanto, ser cadastrado em diferentes coleções para entidades usuário pois nada impede que um psicologo seja paciente ou até mesmo secretária, e assim pr diante.
- Já que o CPF é tão importante, talvez faça sentido ter um validador de CPF's. Mas isso seria entrega para um momento posterior, pois dificulta interação com a DB.
