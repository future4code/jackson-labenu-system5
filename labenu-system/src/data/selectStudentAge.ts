import { connection } from "../index"

export default async function selectStudentAge(
   id: string
): Promise<number> {
   try {
      const result = await connection.raw(`
         SELECT DATEDIFF(CURRENT_DATE, birth_date)/ 365 AS "age" 
         FROM labenu_system_STUDENTS
         WHERE id = "${id}";
      `)

      if(!result[0][0]) throw new Error("Estudante não encontrado")

      return result[0][0].age

   } catch (error) {
      throw new Error(error.sqlMessage || error.message)
   }
}