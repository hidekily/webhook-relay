import Fastify from 'fastify'
import cors from '@fastify/cors'
import {auth} from "shared/auth"

const app = Fastify({ logger: true })

// 1. Registra o CORS para permitir requisições do frontend
app.register(cors, {
  origin: 'http://localhost:3000', 
  credentials: true,                 // Permite enviar cookies
})

// 2. Rota que captura TODAS as requisições de autenticação
app.all('/api/auth/*', async (request, reply) => {
  // Converte a requisição Fastify para Web Request
  const url = new URL(request.url, `http://${request.headers.host}`)
  
  const webRequest = new Request(url.toString(), {
    method: request.method,
    headers: Object.fromEntries(
        Object.entries(request.headers).filter(([_, v]) => v !== undefined)
    ) as Record<string, string>,
    body: request.method !== 'GET' && request.method !== 'HEAD' 
      ? JSON.stringify(request.body) 
      : undefined,
  })

  // Passa para o better-auth processar
  const response = await auth.handler(webRequest)

  // Converte a Web Response de volta para Fastify
  reply.status(response.status)
  
  response.headers.forEach((value, key) => {
    reply.header(key, value)
  })

  const body = await response.text()
  return reply.send(body)
})

// 3. Inicia o servidor
app.listen({ port: 3001 }, (err, address) => {
  if (err) {
    app.log.error(err)
    process.exit(1)
  }
  console.log(`🚀 Backend rodando em: ${address}`)
})