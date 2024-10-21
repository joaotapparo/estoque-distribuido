## O que é essa aplicação?
Essa aplicação consiste em uma implementação simples do protocolo RabbitMQ para o envio de mensagens entre os estoques de duas lojas utilizando o conceito de filas.

## Requisitos para rodar a aplicação
- Javascript   
- Node.js
- RabbitMQ
- Biblioteca amqplib para fazer o uso do protocolo RabbitMQ com Javascript

## Como utilizar a aplicação
Ao realizar o clone deste repositório, abra dois terminais com o local onde o repositório foi clonado. Depois, execute o comando `node .\services\estoqueLojaA.js` e você verá uma mensagem sendo enviada para outro terminal. Você pode executar o comando `node .\services\estoqueLojaB.js` para enviar uma mensagem para o terminal oposto.
## Vídeo demonstrativo
Segue um link com um vídeo demonstrativo da aplicação funcionando: https://www.youtube.com/watch?v=v03dPUgpb8M
