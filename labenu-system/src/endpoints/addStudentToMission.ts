import { Request, Response } from "express"
import updateStudent from "../data/updateStudent"

export default async function addStudentToMission(
   req: Request,
   res: Response
): Promise<void> {
   try {
      const { studentId, missionId } = req.params

      await updateStudent(studentId, missionId)

      res.status(200).send("Estudante adicionado!")
   } catch (error) {
      res.statusCode = 400

      let { message } = error
      
      if (message.includes("não encontrado")) res.statusCode = 404

      if (message.includes("mission_id")) {
         res.statusCode = 404
         message = "Turma não encontrada"
      }

      res.send(message)

   }
}