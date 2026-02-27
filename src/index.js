import "./styles.css";
import { toDoItem, project } from "./tasks.js";


console.log("IS THIS WORKING??");
const newProject = new project('work', 'these are the things I have to do for work today');
const newItem = new toDoItem('get money', 'b', '01/01/2019', '1', 'none');
console.log(newItem);


const contentDiv = document.getElementById('content'); // this will display the project and it's todo items.
const sidebar = document.createElement('div'); //sidebar that displays separate projects/task areas. Can click on one to switch to that project's view





