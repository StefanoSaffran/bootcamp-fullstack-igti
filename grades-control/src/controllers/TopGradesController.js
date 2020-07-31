import { promises as fs } from "fs";
const { readFile } = fs;

import AppError from '../errors/AppError.js';

class TopGradesController {
  async index(request, response) {
    const { subject, type } = request.body;

    if (!type || !subject) 
      throw new AppError("Type and subject are required.");

    const data = JSON.parse(await readFile(global.fileName));

    const subjects = data.grades.filter(gd => (gd.type === type) && (gd.subject === subject));

    subjects.sort((a, b) => {
      return b.value - a.value;
    });

    const top3 = subjects.splice(0, 3);

    return response.json(top3);
  }

}

export default new TopGradesController();