import amqp from "amqplib";
import { env } from "@/env.ts";

const EXCHANGE_NAME = "exchange";

const sendMsg = async () => {
	const connection = await amqp.connect(env.RABBITMQ_URL);
  const channel = await connection.createConfirmChannel();

	const msg = { id: Date.now(), texto: "Hello world" };

	channel.publish(EXCHANGE_NAME, "route", Buffer.from(JSON.stringify(msg)),{ persistent: true });

	console.log("Mensagem enviada:", msg);

	await channel.waitForConfirms();
	
  connection.close();
  process.exit(0);
};

sendMsg();
