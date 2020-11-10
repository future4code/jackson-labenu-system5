import { connection } from "../index"

export default async function updateStudent(
   studentId: string,
   missionId: string
): Promise<void> {
   try {
      const result = await connection.raw(`
         SELECT * FROM labenu_system_STUDENTS
         WHERE id = "${studentId}";
      `)

      if(!result[0][0]) throw new Error("Estudante não encontrado")

      await connection.raw(`
         UPDATE labenu_system_STUDENTS
         SET mission_id = "${missionId}"
         WHERE id = "${studentId}";
      `)

   } catch (error) {
      throw new Error(error.sqlMessage || error.message)
   }
}