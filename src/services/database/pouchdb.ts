// import PouchDB from 'pouchdb';

// const db = new PouchDB('my-pomodoro-db');
// const db = '';

// export default db;


import Dexie, { Table } from 'dexie';

// const db = new Dexie('myDatabase');

export interface ITask {
  id?: number;
  title: string;
  description: string;
  estimatedPomodoros: number;
  donePomodoros: number;
  inProgress: boolean;
  created_at: Date;
  updated_at: Date | null;
}

// db.version(1).stores({
//   tasks: '++id, title, description, estimatedPomodoros, donePomodoros, inProgress, created_at, updated_at', // Primary key and indexed props
// });

export class MySubClassedDexie extends Dexie {
  // 'friends' is added by dexie when declaring the stores()
  // We just tell the typing system this is the case
  tasks!: Table<ITask>; 

  constructor() {
    super('myPomodoroDB');
    this.version(1).stores({
      tasks: '++id, title, description, estimatedPomodoros, donePomodoros, inProgress, created_at, updated_at' // Primary key and indexed props
    });
  }
}

const db = new MySubClassedDexie();
export default db;