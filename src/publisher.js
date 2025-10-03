import amqp from 'amqplib';

const sendMsg = async () => {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();
  
  const queue = 'fila_teste';
  const msg = { id: Date.now(), texto: 'Olá RabbitMQ!' };

  await channel.assertQueue(queue, { durable: true });
  channel.sendToQueue(queue, Buffer.from(JSON.stringify(msg)));

  console.log("Mensagem enviada:", msg);

  setTimeout(() => {
    connection.close();
    process.exit(0);
  }, 500);
};

sendMsg();
