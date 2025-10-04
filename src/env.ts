import z from "zod";

const envSchema = z.object({
	RABBITMQ_URL: z.url().startsWith("amqp://"),
	PORT: z.coerce.number().default(3333),
});

export const env = envSchema.parse(process.env);
