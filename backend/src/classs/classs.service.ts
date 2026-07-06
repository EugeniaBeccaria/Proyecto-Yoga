import { orm } from '../shared/DB/orm.js'
import { Classs } from './classs.entity.js'
import { User } from '../user/user.entity.js'
import { Room } from '../room/room.entity.js'
import { Day } from './day.entity.js'
import { Time } from './time.entity.js'

const em = orm.em.fork();

export class ClassError extends Error {
  constructor(message: string, public status?: number) {
    super(message);
    this.name = 'ClassError';
  }
}

export interface ClassInput {
  name: string;
  description: string;
  capacityLimit: number;
  day: string;
  time: string;
  room: string;
  professor: string;
}

async function findAll() {
  return await em.find(Classs, {}, { populate: ['day', 'time', 'room'] });
}

async function findAvailableClasses() {
  return await em.createQueryBuilder(Classs, 'c')
    .select('*')
    .where('c.capacity_limit > c.enrolled_count')
    .andWhere('c.deleted_at IS NULL')
    .leftJoinAndSelect('c.day', 'day')
    .leftJoinAndSelect('c.time', 'time')
    .leftJoinAndSelect('c.room', 'room')
    .leftJoinAndSelect('c.professor', 'professor')
    .getResult();
}

async function findOne(id: string) {
  return await em.findOneOrFail(Classs, { id }, { populate: ['day', 'time', 'room', 'users'] });
}

async function add(classData: ClassInput) {
  const {
    name,
    description,
    capacityLimit,
    day,
    time,
    room,
    professor
  } = classData;

  if (!name || !description || !day || !time || !room || !professor || !capacityLimit) {
    throw new ClassError('Missing required fields', 400);
  }

  const roomEntity = await em.findOne(Room, { id: room });
  const dayEntity = await em.findOne(Day, { id: day });
  const timeEntity = await em.findOne(Time, { id: time });
  const professorEntity = await em.findOne(User, { id: professor, role: 'professor' });

  if (!roomEntity || !dayEntity || !timeEntity || !professorEntity) {
    throw new ClassError('Invalid foreign key references', 404);
  }

  const existingClass = await em.findOne(Classs, { day: dayEntity, time: timeEntity, room: roomEntity });
  if (existingClass) {
    throw new ClassError('Ya existe una clase con el mismo día, hora y salón', 409);
  }

  const existingProfessorClass = await em.findOne(Classs, { day: dayEntity, time: timeEntity, professor: professorEntity });
  if (existingProfessorClass) {
    throw new ClassError('El profesor ya está asignado a otra clase en el mismo día y hora', 409);
  }

  const classs = em.create(Classs, {
    name: name,
    description: description,
    capacityLimit: capacityLimit,
    users: [],
    professor: professorEntity,
    room: roomEntity,
    day: dayEntity,
    time: timeEntity,
  });

  em.persist(classs);
  await em.flush();

  return classs;
}

async function update(id: string, input: any) {
  const classsToUpdate = await em.findOneOrFail(Classs, { id });

  const sanitizedInput: any = {};
  if (input.name !== undefined) sanitizedInput.name = input.name;
  if (input.description !== undefined) sanitizedInput.description = input.description;
  if (input.capacityLimit !== undefined) sanitizedInput.capacityLimit = input.capacityLimit;

  em.assign(classsToUpdate, sanitizedInput);
  await em.flush();
  return classsToUpdate;
}

async function remove(id: string) {
  const classToRemove = await em.findOneOrFail(Classs, { id }, { populate: ['users'] });
  const usersClass = classToRemove.users.getItems();
  if (usersClass.length > 0) {
    throw new ClassError('No se puede eliminar una clase con alumnos inscritos', 400);
  }

  classToRemove.deletedAt = new Date();
  await em.flush();
  return classToRemove;
}

async function findClassesByProfessorId(professorId: string) {
  return await em.find(Classs, { professor: professorId, deletedAt: null }, { populate: ['day', 'time', 'room', 'users'] });
}

async function findMyEnrolledClasses(userId: string) {
  const userWithClasses = await em.findOne(User, { id: userId }, {
    populate: ['classes.professor', 'classes.day', 'classes.time', 'classes.room']
  });

  if (!userWithClasses) {
    throw new ClassError('Usuario no encontrado.', 404);
  }

  const enrolledClasses = userWithClasses.classes.getItems().map(cls => ({
    id: cls.id,
    name: cls.name,
    description: cls.description,
    professorName: cls.professor?.name || '',
    room: cls.room?.name,
    dayTime: `${cls.day?.name || ''} ${cls.time?.startTime || ''}`
  }));

  return enrolledClasses;
}

export const classsService = {
  findAll,
  findAvailableClasses,
  findOne,
  add,
  update,
  remove,
  findClassesByProfessorId,
  findMyEnrolledClasses
};
