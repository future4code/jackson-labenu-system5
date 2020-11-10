import { connection } from "../index"
import { Teacher } from "../types/Teacher";

export default async function insertTeacher(
   newTeacher: Teacher
): Promise<void> {
   try {
      await connection.raw(`
         INSERT INTO labenu_system_TEACHERS 
            (id, name, email, birth_date)
         VALUES(
            "${newTeacher.id}",
            "${newTeacher.name}",
            "${newTeacher.email}",
            "${newTeacher.birthDate}"
         );
      `)

      if (newTeacher.specialties.length) {

         for (const specialty of newTeacher.specialties) {
            await connection.raw(`
               INSERT INTO labenu_system_TEACHER_SPECIALTIES VALUES(
                  "${newTeacher.id}",
                  "${specialty}"
               );
            `)
         }
      }
   } catch (error) {
      throw new Error(error.sqlMessage || error.message)
   }
}