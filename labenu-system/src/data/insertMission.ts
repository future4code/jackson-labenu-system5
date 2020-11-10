import { connection } from "../index"
import { Mission } from "../types/Mission"

export default async function insertMission(
   newMission: Mission
): Promise<void> {
   try {
      await connection.raw(`
         INSERT INTO labenu_system_MISSIONS 
            (id, name, start_date, end_date, module, shift)
         VALUES(
            "${newMission.id}",
            "${newMission.name}",
            "${newMission.startDate}",
            "${newMission.endDate}",
            ${newMission.module || null},
            "${newMission.shift}"
         );
      `)

   } catch (error) {
      throw new Error(error.sqlMessage || error.message)
   }
}