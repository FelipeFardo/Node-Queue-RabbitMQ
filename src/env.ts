import z from "zod";

const envSchema = z.object({
	RABBITMQ_URL: z.url().startsWith("amqp://"),
	PORT: z.coerce.number().default(3333),
});

console.log(process.env.RABBITMQ_URL);
export const env = envSchema.parse(process.env);
