import { Request, Response } from "express"
import insertStudent from "../data/insertStudent"
import convertFormat from "../services/convertFormat"
import generateId from "../services/generateId"
import { Student } from "../types/Student"

export default async function createStudent(
   req: Request,
   res: Response
): Promise<void> {
   try {
      const { name, email, birthDate, hobbies } = req.body

      if (!name || !email || !birthDate) {
         res.statusCode = 406
         throw new Error("'name', 'email' e 'birthDate' são obrigatórios")
      }

      if (!email.includes("@")) {
         res.statusCode = 406
         throw new Error("Formato de email inválido")
      }

      const newStudent: Student = {
         id: generateId(),
         name,
         birthDate: convertFormat(birthDate),
         email,
         hobbies: hobbies || []
      }

      await insertStudent(newStudent)

      res.status(200).send("Estudante criado com sucesso!")
   } catch (error) {
      console.log(error)
      let { message } = error

      if (message.includes("for key 'email'")) {
         res.statusCode = 409
         message = "email já cadastrado"
      }

      if (message.includes("Incorrect date value")) {
         res.statusCode = 406
         message = "Insira uma data de nascimento válida no formato 'dd/mm/aaaa'"
      }

      if (message.includes("foreign key constraint fails")) {
         res.statusCode = 201
         message = "Estudante criado (AVISO: um ou mais hobbies inválidos)"
      }

      res.send(message)

   }
}