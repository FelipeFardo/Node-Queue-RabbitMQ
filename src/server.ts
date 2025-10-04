import fastifyCors from "@fastify/cors";
import fastify from "fastify";
import { env } from "@/env.ts";
import rabbitPlugin from "./rabbit-plugin.ts";

const app = fastify();

app.register(fastifyCors, {
	origin: true,
	credentials: true,
});

app.register(rabbitPlugin);

app.listen({ port: env.PORT, host: "0.0.0.0" }).then(() => {
	console.log("🚀 Server running on port", env.PORT);
});
