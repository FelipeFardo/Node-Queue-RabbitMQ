import amqp, { type Channel, type ConsumeMessage } from "amqplib";
import type {
	FastifyInstance,
	// FastifyPluginOptions
} from "fastify";

import fastifyPlugin from "fastify-plugin";
import { env } from "@/env.ts";

const QUEUE_NAME = "all_queue";

async function getRabbitChannel(): Promise<Channel> {
	try {
		const conn = await amqp.connect(env.RABBITMQ_URL);
		return conn.createChannel();
	} catch (error: unknown) {
		if (error instanceof Error) {
			console.error(error.message);
		} else {
			console.error(error);
		}
		throw error;
	}
}

async function consumeRabbitMessage(
	msg: ConsumeMessage | null,
	fastify: FastifyInstance,
	_channel: Channel,
) {
	if (!msg) {
		return;
	}

	try {
		const data = JSON.parse(msg.content.toString());

		console.log(data);
	} catch (error) {
		fastify.log.error(error);
	}
}

async function rabbitPlugin(
	fastify: FastifyInstance,
	// opts: FastifyPluginOptions,
) {
	const channel = await getRabbitChannel();

	await channel.assertQueue(QUEUE_NAME, {}).then(() => {
		return channel.consume(QUEUE_NAME, async (msg) => {
			await consumeRabbitMessage(msg, fastify, channel);
		});
	});
}

export default fastifyPlugin(rabbitPlugin);
