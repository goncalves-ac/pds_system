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
