import "./styles.css";
import { toDoItem, project } from "./tasks.js";
import { createTask, createProject} from "./domhandler.js";

// testing here
const defaultProject = new project('work', 'these are the things I have to do for work today');
const newItem = new toDoItem('get money', 'b', '01/01/2019', '1', 'none');
////

const contentDiv = document.getElementById('content'); // this will display the project and it's todo items.
const projectsDiv = document.getElementById('current-projects-div');


// grab createTaskBtn and attach event listener 
const taskDialog = document.getElementById('task-dialog');
const taskForm = document.getElementById('taskForm');
const createTaskBtn = document.getElementById('create-task-btn');
createTaskBtn.addEventListener('click', () => { 
    taskDialog.showModal(); 
    taskForm.addEventListener('submit', createTask);
});




