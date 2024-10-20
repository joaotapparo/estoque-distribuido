const amqp = require("amqplib");

async function connect() {
  try {
    const connection = await amqp.connect("amqp://localhost");
    const channel = await connection.createChannel();
    const queue = "estoque";

    await channel.assertQueue(queue, {
      durable: false,
    });

    //enviando atualização de estoque
    const mensagem = {
      loja: "Loja B",
      produtoId: "456",
      quantidade: 5,
      timestamp: Date.now(),
    };
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(mensagem)));
    console.log("[Loja B] Atualização de estoque enviada:", mensagem);

    //recebendo atualizações de outras lojas
    channel.consume(queue, (msg) => {
      if (msg !== null) {
        const estoqueAtualizado = JSON.parse(msg.content.toString());
        console.log(
          "[Loja B] Recebeu atualização de estoque:",
          estoqueAtualizado
        );
        channel.ack(msg);
      }
    });
  } catch (error) {
    console.error("Erro ao conectar ao RabbitMQ", error);
  }
}

connect();
