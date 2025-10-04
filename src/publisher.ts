import amqp from "amqplib";
import { env } from "@/env.ts";

const EXCHANGE_NAME = "exchange";

const sendMsg = async () => {
	const connection = await amqp.connect(env.RABBITMQ_URL);
	const channel = await connection.createChannel();

	const msg = { id: Date.now(), texto: "Hello world" };

	// await channel.assertExchange(EXCHANGE_NAME, "direct", { durable: true });

	channel.publish(EXCHANGE_NAME, "123", Buffer.from(JSON.stringify(msg)));

	console.log("Mensagem enviada:", msg);

	connection.close();
	process.exit(0);
};

sendMsg();
