import "./styles.css";
import { toDoItem, project } from "./tasks.js";


console.log("IS THIS WORKING??");
const newProject = new project('work', 'these are the things I have to do for work today');
const newItem = new toDoItem('get money', 'b', '01/01/2019', '1', 'none');
console.log(newItem);

const contentDiv = document.getElementById('content'); // this will display the project and it's todo items.
const projectsDiv = document.getElementById('projects-view');
const projectContainer = document.createElement('div');

// creating dialog and form for making tasks.
const formDialog = document.createElement('dialog');
const taskDiv = document.createElement('div');
taskDiv.id = "taskDiv";

const taskForm = document.createElement('form');
// title, descr, dueDate, priority, notes
const titleLabel = document.createElement('label');
titleLabel.textContent = "Task title: ";
titleLabel.for = "taskTitle";
const titleInput = document.createElement('input');
titleInput.id = "taskTitle";
titleInput.name = "taskTitle";
titleInput.type = "text";
const descrLabel = document.createElement('label');
descrLabel.textContent = "Task Description: ";
descrLabel.for = "taskDescr";
const descrInput = document.createElement('input');
descrInput.id = "taskDescr";
descrInput.name = "taskDescr";
descrInput.type = "text";
const dueDateLabel = document.createElement('label');
dueDateLabel.textContent = "Due Date: ";
dueDateLabel.for = "taskDueDate";
const dueDateInput = document.createElement('input');
dueDateInput.id = "taskDueDate";
dueDateInput.name = "taskDueDate";
dueDateInput.type = "date";
const priorityLabel = document.createElement('label');
priorityLabel.textContent = "Priority Level (1-5): ";
priorityLabel.for = "priorityLevel";
const priorityInput = document.createElement('input');
priorityInput.id = "priorityLevel";
priorityInput.name = "priorityLevel";
priorityInput.text = "number"
priorityInput.min = 1;
priorityInput.max = 5;
const formSubmitLabel = document.createElement('btn');
formSubmitLabel.textContent = "Submit Form";
formSubmitLabel.for = "submitForm";
const formSubmitBtn = document.createElement('input');
formSubmitBtn.id = "submitForm";
formSubmitBtn.name = "submitForm";
formSubmitBtn.type = "submit";

//making dialog + form connections
taskForm.append(titleLabel, titleInput, descrLabel, descrInput, dueDateLabel, dueDateInput, priorityLabel, priorityInput, formSubmitLabel, formSubmitBtn);
formDialog.append(taskForm);
taskDiv.append(formDialog);

// grab createTaskBtn and attach event listener 
const createTaskBtn = document.getElementById('create-task-btn');
createTaskBtn.addEventListener('click', () => {

});






