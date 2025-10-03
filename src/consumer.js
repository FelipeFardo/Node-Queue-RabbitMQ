import amqp from 'amqplib';

const consumeMsg = async () => {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();
  
  const queue = 'fila_teste';

  await channel.assertQueue(queue, { durable: true });

  console.log("Esperando mensagens da fila:", queue);

  channel.consume(queue, (msg) => {
    if (msg !== null) {
      console.log("Mensagem recebida:", JSON.parse(msg.content.toString()));
      channel.ack(msg); // Confirma que processou
    }
  });
};

consumeMsg();
