import { promises as fs } from "fs";
const { readFile, writeFile } = fs;

import AppError from '../errors/AppError.js';

class StudentController {
  async show(request, response) {
    const { student, subject } = request.body;

    if (!student || !subject) 
      throw new AppError("Student and subject are required.");

    const data = JSON.parse(await readFile(global.fileName));

    const studentGrades = data.grades.filter(gd => (gd.student === student) && (gd.subject === subject));

    console.log(studentGrades);
    const totalGrade = studentGrades.reduce((acc, next) => acc + next.value, 0);

    return response.json(totalGrade);
  }

}

export default new StudentController();