import { promises as fs } from "fs";
const { readFile } = fs;

import AppError from '../errors/AppError.js';

class AverageGradeController {
  async index(request, response) {
    const { subject, type } = request.body;

    if (!type || !subject) 
      throw new AppError("Type and subject are required.");

    const data = JSON.parse(await readFile(global.fileName));

    const subjects = data.grades.filter(gd => (gd.type === type) && (gd.subject === subject));

    const gradesSum = subjects.reduce((acc, next) => acc + next.value, 0);

    const averageGrade = gradesSum / subjects.length;
    return response.json(Number(averageGrade.toFixed(2)));
  }

}

export default new AverageGradeController();