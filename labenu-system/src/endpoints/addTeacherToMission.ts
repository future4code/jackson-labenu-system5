import { Request, Response } from "express"
import updateTeacher from "../data/updateTeacher"

export default async function addTeacherToMission(
   req: Request,
   res: Response
): Promise<void> {
   try {
      const { teacherId, missionId } = req.params

      await updateTeacher(teacherId, missionId)

      res.status(200).send("Docente adicionado!")
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