import lodash from 'lodash';
import { JSONFile, Low } from 'lowdb';
import { resolve } from 'node:path';

interface User {
  id: string;
  email: string;
  password: string;
}

interface Comment {
  id: number;
  user: string;
  content: string;
}

interface Blog {
  id: string;
  title: string;
  content: string;
  isPublished: boolean;
  comments?: Comment[];
  author: string;
}

interface Data {
  users: User[];
  blogs: Blog[];
}

// Use JSON file for storage
const file = resolve('..', 'database', 'db.json');
const adapter = new JSONFile<Data>(file);
const db = new Low<Data>(adapter);

// Chain data to add lodash custom methods

export const dbData = async () => {
  await db.read();
  return lodash.chain(db.data);
};

export default db;
