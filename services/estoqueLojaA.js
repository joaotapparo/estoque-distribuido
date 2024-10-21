const amqp = require("amqplib"); // importando a biblioteca amqlib para usar o rabbitmq com javascript

async function connect() {  // função assíncrona connect por usar o await, que serve para operações que podem levar tempo, no caso conectar com o rabbitmq
  try {
    const connection = await amqp.connect("amqp://localhost");  // conecta ao server rabbitmq localmente
    const channel = await connection.createChannel();  // cria um canal para as operações de fila e troca de mensagens
    const queue = "estoque";  // declaração de fila chamada estoque

    await channel.assertQueue(queue, {
      durable: false,  // a fila foi declarada como false para que ela não persista após reinicialização, já que é feito somente o envio
    });

    //enviando atualização de estoque
    const mensagem = {
      loja: "Loja A",
      produtoId: "123",
      quantidade: 10,
      timestamp: Date.now(),
    };
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(mensagem))); // converte em buffer 
    console.log("[Loja A] Atualização de estoque enviada:", mensagem);

    // ele envia uma mensagem para a fila estoque com as informaçõe acima, mas antes de enviar ele converte em um buffer (estrutura binária)

    //recebendo atualizações de outras lojas
    channel.consume(queue, (msg) => {  // começa a consumir as mensagens da fila
      if (msg !== null) {    // se as mensagens não forem nulas
        const estoqueAtualizado = JSON.parse(msg.content.toString());  // converte para Json
        console.log(
          "[Loja A] Recebeu atualização de estoque:",  // exibe o conteúdo no console
          estoqueAtualizado
        );
        channel.ack(msg);  // envia uma confirmação para o rabbitmq após processar a mensagem
      }
    });
  } catch (error) {
    console.error("Erro ao conectar ao RabbitMQ", error);  // se der algum erro, o catch vai avisar
  }
}

connect();
