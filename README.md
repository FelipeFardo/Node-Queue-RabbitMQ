# Node-Fila-RabbitMQ

Projeto de exemplo para implementação de uma fila utilizando Node.js e RabbitMQ.

## Descrição
Este projeto demonstra como criar uma aplicação Node.js que utiliza o RabbitMQ para gerenciamento de filas, publicação e consumo de mensagens. Inclui uma API Fastify para interação e scripts para publicação de mensagens.

## Requisitos
- Node.js 18+
- pnpm
- Docker e Docker Compose (para subir o RabbitMQ localmente)

## Instalação

```bash
pnpm install
```

## Subindo o RabbitMQ com Docker Compose

```bash
docker-compose up -d
```

## Scripts disponíveis

- `pnpm dev`: Inicia o servidor Fastify em modo desenvolvimento (com hot reload).
- `pnpm publisher`: Executa o publisher para enviar mensagens à fila.

## Estrutura do Projeto

```
├── src/
│   ├── env.ts            # Configuração de variáveis de ambiente
│   ├── publisher.ts      # Script para publicar mensagens na fila
│   ├── rabbit-plugin.ts  # Plugin Fastify para integração com RabbitMQ
│   └── server.ts         # Servidor Fastify e consumidor da fila
├── docker-compose.yaml   # Configuração do serviço RabbitMQ
├── package.json          # Dependências e scripts
├── tsconfig.json         # Configuração do TypeScript
└── README.md             # Documentação do projeto
```

## Exemplo de Uso

1. Suba o RabbitMQ:
	```bash
	docker-compose up -d
	```
2. Inicie o servidor:
	```bash
	pnpm dev
	```
3. Em outro terminal, publique uma mensagem:
	```bash
	pnpm publisher
	```

## Variáveis de Ambiente
Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```
RABBITMQ_URL=amqp://localhost
PORT=3000
```

