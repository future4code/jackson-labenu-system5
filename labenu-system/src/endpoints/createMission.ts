import { Request, Response } from "express"
import insertMission from "../data/insertMission"
import convertFormat from "../services/convertFormat"
import generateId from "../services/generateId"
import { Mission } from "../types/Mission"

export default async function createMission(
   req: Request,
   res: Response
): Promise<void> {
   try {
      const { name, startDate, endDate, module, shift } = req.body

      if (!name || !startDate || !endDate || !shift) {
         res.statusCode = 406
         throw new Error("'name', 'startDate', 'endDate' e 'shift' são obrigatórios")
      }

      const startDateTimestamp: number = new Date(convertFormat(startDate)).getTime()
      const endDateTimestamp: number = new Date(convertFormat(endDate)).getTime()

      if (startDateTimestamp >= endDateTimestamp) {
         res.statusCode = 406
         throw new Error("Data de início deve ser anterior à de término")
      }

      if(!name.includes("-na-night")){
         res.statusCode = 406
         throw new Error("Nomes das turmas noturnas devem terminar com '-na-night'")
      }

      const newMission: Mission = {
         id: generateId(),
         name,
         startDate: convertFormat(startDate),
         endDate: convertFormat(startDate),
         module,
         shift,
         teachers: [],
         students: []
      }

      await insertMission(newMission)

      res.status(200).send("Turma cadastrada com sucesso!")
   } catch (error) {

      let { message } = error
     
      if (message.includes(" for key 'name'")) {
         res.statusCode = 409
         message = "Nome já existe"
      } 
      
      if (message.includes("Incorrect date value")) {
         res.statusCode = 406
         message = "Insira datas de início e término válidas, no formato 'dd/mm/aaaa'"
      }

      if (message.includes("Data truncated for column 'shift'")) {
         res.statusCode = 406
         message = "Valores válidos para 'shift' são 'INTEGRAL' e 'NOTURNA'"
      }

      res.send(message)

   }
}