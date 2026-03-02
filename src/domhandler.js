import { toDoItem, project } from "./tasks.js";
import avatar from "./resources/avatar.svg"

const userAvatar = document.getElementById('avatar');
userAvatar.src = avatar;
const contentDiv = document.getElementById('content');
// used for creating to-do items. Gets values from form and creates a 'task card'
export function createTask(){
    const taskName = document.getElementById('taskName');
    const taskDescr = document.getElementById('taskDescr');
    const taskDate = document.getElementById('dueDate');
    const taskPriority = document.getElementById('taskPriority');
    const taskNotes = document.getElementById('taskNotes');
    
    const newTask = new toDoItem(taskName.value, taskDescr.value, taskDate.value, taskPriority.value, taskNotes.value);
    //creating the 'card'. appending done in createTaskCard function
    createTaskCard(newTask);
}
//helper funtion for createTask
function createTaskCard(toDoItem){
    const taskContainer = document.createElement('div');
    taskContainer.classList.add('taskCard');
    const cardTitle = document.createElement('p');
    cardTitle.textContent = "Title: " + toDoItem.title;


    const cardDescr = document.createElement('p');
    cardDescr.textContent = "Description: " + toDoItem.descr;

    const cardDate = document.createElement('p');
    cardDate.textContent = "Due By: " + toDoItem.dueDate;

    const cardPriority = document.createElement('p');
    cardPriority.textContent = "Priority: " + toDoItem.priority;

    const cardNotes = document.createElement('p');
    cardNotes.textContent = "Notes: " + toDoItem.notes;

    const cardStatus = document.createElement('p');
    cardStatus.textContent = "Status: " + toDoItem.status;
    
    const statusChangeBtn = document.createElement('button');
    statusChangeBtn.textContent = "Mark as complete";
    statusChangeBtn.addEventListener('click', () => {
        if(toDoItem.status === "incomplete")
                toDoItem.status = "complete";         
    })

    const deleteTaskBtn = document.createElement('button');
    deleteTaskBtn.textContent = "Delete Task";
    deleteTaskBtn.addEventListener('click', () => {
        taskContainer.remove();
    });
   
    taskContainer.append(cardTitle, cardDescr, cardDate, cardPriority, cardNotes, cardStatus, statusChangeBtn, deleteTaskBtn);
    contentDiv.append(taskContainer);
}

export function createProject() {
    // creates project dialog/form/container
    const projectTitle = document.getElementById('projectName');
    const projectDescr = document.getElementById('projectDescr');

    const newProject = new project(projectTitle.value, projectDescr.value);

    createProjectCard(newProject);
}
function createProjectCard(project){
    // for appending at end
    const projectsSidebarDiv = document.getElementById('projects-sidebar-div');
    const projectContainer = document.createElement('div');
    projectContainer.classList.add("projectCard")
    const projectName = document.createElement('p');
    projectName.textContent = "Project Title: " + project.projectName;
    const projectDescr = document.createElement('p');
    projectDescr.textContent = "Description: " + project.descr;

    const addTaskBtn = document.createElement('button');
    addTaskBtn.textContent = "Add Task to Project";
    addTaskBtn.addEventListener('click', () => {
        project.addTask(newTask);
    })
    const deleteProjectBtn = document.createElement('button');
    deleteProjectBtn.textContent = "Delete Project";
    deleteProjectBtn.addEventListener('click', () => {
        projectContainer.remove();
    })
    projectContainer.append(projectName, projectDescr, addTaskBtn, deleteProjectBtn);
    projectsSidebarDiv.append(projectContainer);
}