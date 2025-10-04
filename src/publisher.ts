import amqp from "amqplib";
import { env } from "@/env.ts";

const QUEUE_NAME = "all_queue";

const sendMsg = async () => {
	const connection = await amqp.connect(env.RABBITMQ_URL);
	const channel = await connection.createChannel();

	const msg = { id: Date.now(), texto: "Hello world" };

	await channel.assertQueue(QUEUE_NAME, { durable: true });
	channel.sendToQueue(QUEUE_NAME, Buffer.from(JSON.stringify(msg)));

	console.log("Mensagem enviada:", msg);

	setTimeout(() => {
		connection.close();
		process.exit(0);
	}, 500);
};

sendMsg();
