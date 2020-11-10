import { Request, Response } from "express"
import insertTeacher from "../data/insertTeacher"
import convertFormat from "../services/convertFormat"
import generateId from "../services/generateId"
import { Teacher } from "../types/Teacher"

export default async function createTeacher(
   req: Request,
   res: Response
): Promise<void> {
   try {
      const { name, email, birthDate, specialties } = req.body

      if (!name || !email || !birthDate) {
         res.statusCode = 406
         throw new Error("'name', 'email' e 'birthDate' são obrigatórios")
      }

      if (!email.includes("@")) {
         res.statusCode = 406
         throw new Error("Formato de email inválido")
      }

      const newTeacher: Teacher = {
         id: generateId(),
         name,
         birthDate: convertFormat(birthDate),
         email,
         specialties: specialties || []
      }

      await insertTeacher(newTeacher)

      res.status(200).send("Professor cadastrado com sucesso!")
   } catch (error) {
    
      let { message } = error

      if (message.includes("for key 'email'")) {
         res.statusCode = 409
         message = "email já cadastrado"
      }

      if (message.includes("Incorrect date value")) {
         res.statusCode = 406
         message = "Insira uma data de nascimento válida no formato 'dd/mm/aaaa'"
      }

      if (message.includes("Data truncated for column 'specialty'")) {
         res.statusCode = 201
         message = "Professor cadastrado (AVISO: uma ou mais especialidades inválidas)"
      }

      res.send(message)

   }
}