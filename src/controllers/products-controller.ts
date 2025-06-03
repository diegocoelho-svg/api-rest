import { Request, Response } from "express";
import { AppError } from "../utils/app-error";

class ProductsController {
  /**
   * index - GET para listar vários registros.
   * show - GET para exibir um registro específico.
   * create - POST para criar um registro.
   * update - PUT para atualizar um registro.
   * remove - DELETE para deletar um registro.
   */
  index(request: Request, response: Response) {
    const { page, limit } = request.query

    response.send(`Pagina ${page} de ${limit}`)
  }

  create(request: Request, response: Response) {
    const { name, price } = request.body

    if(!name) {
      throw new AppError("Nome do produto é obrigatório!")
    }

    if(name.trim().length < 6) {
      throw new AppError("Nome do produto precisa conter ao menos 6 caracteres")
    }

    if(!price) {
      throw new AppError("Preço do produto é obrigatório!")
    }

    if(price < 0) {
      throw new AppError("Preço do produto não pode ser menor do que 0!")
    }

    response.status(201).json({ name, price, user_id: request.user_id })
  }
}


export { ProductsController }