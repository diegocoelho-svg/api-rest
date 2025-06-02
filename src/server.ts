import express from "express"
import { myMiddleware } from "./middlewares/my-middleware"

const PORT = 3333

const app = express()
app.use(express.json())

// Middleware global (Aplica para todas as rotas abaixo)
// app.use(myMiddleware)

app.get('/products', (request, response) => {
  const { page, limit } = request.query
  response.send(`Pagina ${page} de ${limit}`)
})

// Middleware local em uma rota específica.
app.post('/products', myMiddleware, (request, response) => {
  const { name, price } = request.body

  // response.send(`Produto ${name} custa $ ${price}`)
  response.status(201).json({ name, price, user_id: request.user_id })
})

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))