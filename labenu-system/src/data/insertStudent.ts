import { connection } from "../index"
import { Student } from "../types/Student";

export default async function insertStudent(
   student: Student
): Promise<void> {
   try {
      await connection.raw(`
         INSERT INTO labenu_system_STUDENTS 
            (id, name, email, birth_date)
         VALUES(
            "${student.id}",
            "${student.name}",
            "${student.email}",
            "${student.birthDate}"
         );
      `)

      if (student.hobbies.length) {

         for (const hobby of student.hobbies) {

            const result = await connection
               .select("id")
               .from("labenu_system_HOBBIES")
               .where({ name: hobby })

            const hobbyId = result[0] ? result[0].id : 0

            await connection.raw(`
               INSERT INTO labenu_system_STUDENT_HOBBIES VALUES(
                  "${student.id}",
                  "${hobbyId}"
               );
            `)
         }
      }
   } catch (error) {
      throw new Error(error.sqlMessage || error.message)
   }
}