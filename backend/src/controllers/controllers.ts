import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import firebaseConfig from '../db/firebaseConfig';

firebase.initializeApp(firebaseConfig);

interface Tasks {
  id: string;
  todo: string;
}

const db = firebase.firestore();

async function getTasks(req: Request, res: Response) {
  try {
    const querySnapshot = await db.collection('tasks').get();
    const tasks: Tasks[] = [];

    querySnapshot.forEach((doc) => {
      const task = doc.data() as Tasks;
      tasks.push(task);
    });

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve tasks from Firebase.' });
  }
}

async function createTodo(req: Request, res: Response) {
  const { todo } = req.body;

  try {
    const taskId = uuidv4();
    const newItem: Tasks = {
      id: taskId,
      todo: todo,
    };

    await db.collection('tasks').doc(taskId).set(newItem);
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create a new todo in Firebase.' });
  }
}

async function updateTasks(req: Request, res: Response) {
  const { id } = req.params;
  const { todo } = req.body;

  try {
    const updateData: Partial<Tasks> = {
      todo: todo,
    };

    await db.collection('tasks').doc(id).update(updateData);
    res.status(200).json({ id, todo });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update the task in Firebase.' });
  }
}

async function deleteTodo(req: Request, res: Response) {
  const { id } = req.params;

  try {
    await db.collection('tasks').doc(id).delete();
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete the task from Firebase.' });
  }
}

export { getTasks, createTodo, updateTasks, deleteTodo };
