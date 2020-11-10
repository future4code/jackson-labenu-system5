import { Request, Response } from "express"
import selectStudentAge from "../data/selectStudentAge"

export default async function getStudentAgeById(
   req: Request,
   res: Response
): Promise<void> {
   try {
      const { id } = req.params

      const age = Math.floor(await selectStudentAge(id))

      res.status(200).send({id, age})

   } catch (error) {
      res.statusCode = 400

      let { message } = error
      
      if (message.includes("não encontrado")) res.statusCode = 404

      res.send(message)

   }
}