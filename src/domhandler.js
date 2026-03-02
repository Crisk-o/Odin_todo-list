import { toDoItem, project } from "./tasks.js";

const contentDiv = document.getElementById('content');
const createTaskBtn = document.getElementById('create-task-btn');
const createProjectBtn = document.getElementById('create-project-btn');
const taskForm = document.getElementById('taskForm');
const formDialog = document.getElementById('task-dialog');

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
// function createTaskCard(taskName, taskDescr, taskDate, taskPriority, taskNotes){
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
        this.parentNode.remove();
    });
   
    
    taskContainer.append(cardTitle, cardDescr, cardDate, cardPriority, cardNotes, cardStatus, statusChangeBtn, deleteTaskBtn);
    contentDiv.append(taskContainer);
}

export function createProject() {
    // creates project dialog/form/container
    const projectDialog = document.createElement('dialog');
    const projectFormContainer = document.createElement('div');
    projectFormContainer.id = "project-form-container";
    const projectForm = document.createElement('form');
    projectForm.method = "dialog";
    projectForm.id = "projectForm";

    // create each input
    const projectNameLabel = document.createElement('label');
    projectNameLabel.for = "projectNameInput";
    const projectNameInput = document.createElement('input');
    projectNameInput.name = "projectNameInput";
    projectNameInput.id = "projectNameInput";
    projectNameInput.type = "text";

    const projectDescrLabel = document.createElement('label');
    projectDescrLabel.for = "projectDescrInput";
    const projectDescrInput = document.createElement('input');
    projectDescrInput.name = "projectDescrInput";
    projectDescrInput.id = "projectDescrInput";
    projectDescrInput.type = "text";

    const projectFormSubmitLabel = document.createElement('label');
    projectFormSubmitLabel.for = "submitBtn";
    const projectFormSubmitBtn = document.createElement('button');
    projectFormSubmitBtn.name = "submitBtn";
    projectFormSubmitBtn.type = "submit";


    projectForm.addEventListener('submit', (event) => {
        event.preventDefault();
        projectDialog.close();

    } )
    createProjectBtn.addEventListener('click', () => {
        projectDialog.openModal();
    })

    projectForm.append(projectNameLabel, projectNameInput, projectDescrLabel, projectDescrInput, projectFormSubmitLabel, projectFormSubmitBtn);
    projectDialog.append(projectForm);
    projectFormContainer.append(projectDialog);
    contentDiv.append(projectFormContainer)
}
