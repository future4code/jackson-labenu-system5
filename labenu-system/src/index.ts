import express, {Express} from "express"
import knex from "knex"
import dotenv from "dotenv"
import Knex from "knex"
import cors from "cors"
import createStudent from "./endpoints/createStudent"
import createTeacher from "./endpoints/createTeacher"
import createMission from "./endpoints/createMission"
import addStudentToMission from "./endpoints/addStudentToMission"
import addTeacherToMission from "./endpoints/addTeacherToMission"
import getStudentAgeById from "./endpoints/getStudentAgeById"

dotenv.config()

export const connection: Knex = knex({
   client: "mysql",
   connection: {
      port: 3306,
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
   }
})

const app: Express = express()

app.use(express.json())
app.use(cors())

app.post("/missions", createMission)

app.post("/teachers", createTeacher)
app.patch("/teachers/:teacherId/join/:missionId", addTeacherToMission)

app.post("/students", createStudent)
app.patch("/students/:studentId/join/:missionId", addStudentToMission)
app.get("/students/:id/age", getStudentAgeById)

app.listen(3003, ()=>{
   console.log("Servidor rodando na porta 3003")
})

