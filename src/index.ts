/**
 * Required External Modules
 */

import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import readline from "node:readline";

dotenv.config();

/**
 * App Variables
 */

if (!process.env.PORT) {
	process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();

/**
 *  App Configuration
 */

app.use(helmet());
app.use(cors());
app.use(express.json());

/**
 * Server Activation
 */

 interface Student {
  name: string;
  grade: number;
}

app.listen(PORT, async () => {
  console.log(`Listening on port ${PORT}`);

  // CÓDIGO PARA ATENDER OS REQUERIMENTOS
  // R01, R02, R03, R04, R05

	const reader = readline.createInterface({
		input: process.stdin,
		output: process.stdout,
	});
	
	// R01
	const question = (question: string): Promise<string> => {
		return new Promise(resolve => {
		 reader.question(question, resolve);
		});
	}

	// R03
  const totalStudents = +await question("Quantos alunos? ");

  if (totalStudents <= 0) {
    return console.log("Me desculpe dave eu acredito que não posso fazer isso");
  }

  // R02
  const students: Student[] = [];

  for (let index = 0; index < totalStudents; index++) {
    const studentIndex = index + 1;
    const name = await question(`Nome do(a) aluno(a) ${studentIndex} `);
    const grade = +await question(`Nota do(a) ${name} `);

    students.push({
      name,
      grade,
    });
  }

  // R04
  const bestStudent = students.reduce<Student>(
    (currentStudent, student) => {
      if (student.grade > currentStudent.grade) {
        return student;
      }

      return currentStudent;
    },
    students[0],
  );

  console.log(
    `${bestStudent.name} tem a maior nota: ${bestStudent.grade}`,
  );
});
