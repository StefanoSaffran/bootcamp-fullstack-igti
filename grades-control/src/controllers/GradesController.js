import { promises as fs } from "fs";
const { readFile, writeFile } = fs;

import AppError from '../errors/AppError.js';

class GradesController {
  async create(request, response) {
    const { student, subject, type, value } = request.body;

    if (!student || !subject || !type || value === null) 
      throw new AppError("All fields are required.");

    const data = JSON.parse(await readFile(global.fileName));

    if (data.grades
      .some(grade => (grade.student === student) 
        && (grade.subject === subject) 
        && (grade.type === type))) 
      throw new AppError("Grade already exists");

    const grade = {
      id: data.nextId++,
      student,
      subject,
      type,
      value,
      timestamp: new Date()
    }

    data.grades.push(grade);

    await writeFile(global.fileName, JSON.stringify(data, null, 2));

    return response.json(grade);
  }

  async show(request, response) {
    const { id } = request.params;
    
    const data = JSON.parse(await readFile(global.fileName));

    const grade = data.grades.find(gd => gd.id === Number(id));

    if(!grade) throw new AppError("Grade not found");

    return response.json(grade);
  }

  async update(request, response) {
    const { student, subject, type, value } = request.body;
    const { id } = request.params;
    
    const data = JSON.parse(await readFile(global.fileName));

    const index = data.grades.findIndex(grade => grade.id === Number(id));

    if (index === -1) throw new AppError("Grade not found");

    if (!student || !subject || !type || value === null) 
    throw new AppError("All fields are required.");

    data.grades[index].student = student;
    data.grades[index].subject = subject;
    data.grades[index].type = type;
    data.grades[index].value = value;
    data.grades[index].timestamp = new Date();

    await writeFile(global.fileName, JSON.stringify(data, null, 2));

    return response.json({id: Number(id), student, subject, type, value });
  }

  async delete(request, response) {
    const { id } = request.params;
    
    const data = JSON.parse(await readFile(global.fileName));

    const grade = data.grades.find(gd => gd.id === Number(id));

    if(!grade) throw new AppError("Grade not found");

    data.grades = data.grades.filter(gd => gd.id !== Number(id));

    await writeFile(global.fileName, JSON.stringify(data, null, 2));

    return response.status(204).send();
  }
}

export default new GradesController();