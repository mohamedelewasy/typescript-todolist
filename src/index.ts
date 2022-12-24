import { v4 as uuidV4 } from 'uuid';

type Task = {
  readonly id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
};
const list = <HTMLUListElement>document.getElementById('list');
const form = <HTMLFormElement>document.getElementById('form');
const input = <HTMLInputElement>document.getElementById('new-task');

// @desc load tasks from local storage
const loadTasks = (): Task[] => {
  const jsonTasks = localStorage.getItem('TASKS');
  return jsonTasks ? JSON.parse(jsonTasks) : [];
};
let tasks: Task[] = loadTasks();

// @desc add a new task for list and local storage
const addNewTask = (task: Task) => {
  const listElement = <HTMLLIElement>document.createElement('li');
  const label = <HTMLLabelElement>document.createElement('label');
  const checkbox = <HTMLInputElement>document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = task.completed;
  checkbox.addEventListener('change', (e) => {
    task.completed = checkbox.checked;
    saveTasks();
  });
  label.append(checkbox, task.title);
  listElement.append(label);
  list.append(listElement);
};

// add saved tasks at local storage to list
tasks.forEach(addNewTask);

// @desc save tasks to local storage
const saveTasks = () => localStorage.setItem('TASKS', JSON.stringify(tasks));

// @desc form submit task
form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (input.value == '' || input.value == null) return;
  let task: Task = {
    id: uuidV4(),
    title: input.value,
    completed: false,
    createdAt: new Date(),
  };
  addNewTask(task);
  tasks.push(task);
  saveTasks();
  input.value = '';
});
