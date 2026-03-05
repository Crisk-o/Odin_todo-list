import { toDoItem, project } from "./tasks.js";
import avatar from "./resources/avatar.svg"

const userAvatar = document.getElementById('avatar');
userAvatar.src = avatar;
const contentDiv = document.getElementById('content');

const dialog = document.createElement('dialog');
const form = document.createElement('form');
form.method = "dialog"; form.id = "taskForm";
const formDiv = document.createElement('div');
const taskNameLabel = document.createElement('label');
taskNameLabel.for = "taskName"; taskNameLabel.textContent = "Task Name: ";
const taskNameInput = document.createElement('input');
taskNameInput.id = "taskName"; taskNameInput.name = "taskName"; taskNameInput.type = "text";
const taskDescrLabel = document.createElement('label');
taskDescrLabel.for = "taskDescr"; taskDescrLabel.textContent = "Description: ";
const taskDescrInput = document.createElement('input');
taskDescrInput.name = "taskDescr"; taskDescrInput.id = "taskDescr";  taskDescrInput.type = "text";
const taskDdLabel = document.createElement('label');
taskDdLabel.for = "taskDdInput"; taskDdLabel.textContent = "Due Date: ";
const taskDdInput = document.createElement('input');
taskDdInput.name = "taskDdInput"; taskDdInput.id = "taskDdInput"; taskDdInput.type = "date";
const taskPriorityLabel = document.createElement('label');
taskPriorityLabel.for = "taskPInput"; taskPriorityLabel.textContent = "Priority Level (1-5): ";
const taskPInput = document.createElement("input");
taskPInput.name = "taskPInput"; taskPInput.id = "taskPInput"; taskPInput.type = "number"; taskPInput.min = "1"; taskPInput.max = "5";
const taskNotesLabel = document.createElement('label');
taskNotesLabel.for = "taskNotesInput"; taskNotesLabel.textContent = "Notes: ";
const taskNotesInput = document.createElement("input");
taskNotesInput.name = "taskNotesInput"; taskNotesInput.id = "taskNotesInput"; taskNotesInput.type = "text";
const submitForm = document.createElement("button");
submitForm.name = "submitForm"; submitForm.id = "submitForm"; submitForm.type = "submit"; submitForm.textContent = "Create Task";
form.append(taskNameLabel, taskNameInput, taskDescrLabel, taskDescrInput, taskDdLabel, taskDdInput, taskPriorityLabel, taskPInput, submitForm);
formDiv.append(form);
dialog.append(formDiv);
document.body.append(dialog);

export function createTask(){
    
    // const taskName = document.getElementById('taskName');
    // const taskDescr = document.getElementById('taskDescr');
    // const taskDate = document.getElementById('dueDate');
    // const taskPriority = document.getElementById('taskPriority');
    // const taskNotes = document.getElementById('taskNotes');
    
    // const newTask = new toDoItem(taskName.value, taskDescr.value, taskDate.value, taskPriority.value, taskNotes.value);
    const newTask = new toDoItem(taskNameInput.value, taskDescrInput.value, taskDdInput.value, taskPInput.value, taskNotesInput.value,);
    const taskCard = createTaskCard(newTask);
    return taskCard;
    // return [newTask, taskCard];
}
//helper function for creating task. returns task container to be appended to project
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
    // NEEDS TO UPDATE THE ARRAY IN PROJECT TO PROPERLY REMOVE.
    // CURRENTLY NOT WORKING RIGHT.
    deleteTaskBtn.addEventListener('click', () => {
        taskContainer.remove();
    });
   
    taskContainer.append(cardTitle, cardDescr, cardDate, cardPriority, cardNotes, cardStatus, statusChangeBtn, deleteTaskBtn);
    return taskContainer;
}

// this is just for me to create a def project w/ cards
function createDefaultProject(projectName, projectDescr){
    const newDefaultProject = new project(projectName, projectDescr);
    const [newProjectCard, newProjectSideCard] = createProjectCard(newDefaultProject);
    newProjectCard.classList.add("projectCardDetailed");
    newProjectSideCard.classList.add("projectCard");
    console.log(newDefaultProject.projectName);

    return [newProjectCard, newProjectSideCard];
}

export function createProject() {
    const projectTitle = document.getElementById('projectName');
    const projectDescr = document.getElementById('projectDescr');

    let newProject = new project(projectTitle.value, projectDescr.value);
    const [newProjectCard, newProjectSideCard] = createProjectCard(newProject);
    newProjectCard.classList.add("projectCardDetailed");
    newProjectSideCard.classList.add("projectCard");
    // //creating taskContainer for displaying all tasks
    const taskArrayContainer = document.createElement('div');
    taskArrayContainer.id = "projectArrayContainer";

    function printToDoArray(){
        taskArrayContainer.innerHTML = "";
        for(let i=0; i < newProject.taskArray.length; i++)
            taskArrayContainer.append(newProject.taskArray[i]);
    };

    form.addEventListener('submit', () => {
        const newTaskCard = createTask();
        newProject.addTask(newTaskCard);
        printToDoArray();
        projectTaskNumber.textContent = newProject.taskArray.length;
        projectSidebarTaskNum.textContent = newProject.taskArray.length;
    });

    

    return [newProjectCard, newProjectSideCard];
}

// returns a project card for the sidebar AND main content div and is passed to createProject() function!
function createProjectCard(project){
    //container for main content card
    const projectContainer = document.createElement('div');

    // getting project name and descr to display. 
    const projectName = document.createElement('p');
    projectName.textContent = "Project Title: " + project.projectName;
    const projectDescr = document.createElement('p');
    projectDescr.textContent = "Description: " + project.descr;
    const projectTaskNumber = document.createElement('p');
    projectTaskNumber.textContent = project.taskArray.length; 

    /* this is for the sidebar only */
    const projectSidebarContainer = document.createElement('div')
    const projectSidebarName = document.createElement('p');
    projectSidebarName.textContent = "Project Title: " + project.projectName;
    const projectSidebarDescr = document.createElement('p');
    projectSidebarDescr.textContent = "Description: " + project.descr;
    const projectSidebarTaskNum = document.createElement('p');
    projectSidebarTaskNum.textContent = project.taskArray.length;
    
    // //creating taskContainer for displaying all tasks
    const taskArrayContainer = document.createElement('div');
    taskArrayContainer.id = "projectArrayContainer";

    function printToDoArray(){
        taskArrayContainer.innerHTML = "";
        for(let i=0; i < project.taskArray.length; i++)
            taskArrayContainer.append(project.taskArray[i]);
    };
    // ADD TASK BTN
    const addTaskBtn = document.createElement('button');
    addTaskBtn.textContent = "Add Task to Project";
    addTaskBtn.addEventListener('click', () => { dialog.showModal(); });

    form.addEventListener('submit', () => {
        const newTaskCard = createTask();
        project.addTask(newTaskCard);
        printToDoArray();
        projectTaskNumber.textContent = project.taskArray.length;
        projectSidebarTaskNum.textContent = project.taskArray.length;
    });

    // DELETE PROJECT BTN
    const deleteProjectBtn = document.createElement('button');
    deleteProjectBtn.textContent = "Delete Project";
    deleteProjectBtn.addEventListener('click', () => {
        projectContainer.remove();
        projectSidebarContainer.remove();
    });

    // OPEN PROJECT BTN -- for use in sidebar card
    const openProjectView = document.createElement('button');
    openProjectView.textContent = "Open Project";
    openProjectView.addEventListener('click', () => {
        contentDiv.innerHTML = "";      
        contentDiv.append(projectContainer);
    });
    
    // CLOSE PROJECT BTN 
    const closeProjectBtn = document.createElement('button');
    closeProjectBtn.textContent = "Close Project";
    closeProjectBtn.addEventListener('click', () =>{
        contentDiv.innerHTML = "";
    })

    const userBtnsContainer = document.createElement('div');
    userBtnsContainer.append(addTaskBtn, closeProjectBtn, deleteProjectBtn);
    
    projectSidebarContainer.append(projectSidebarName, projectSidebarDescr, projectSidebarTaskNum, openProjectView);
    projectContainer.append(projectName, projectDescr, projectTaskNumber, userBtnsContainer, taskArrayContainer);
    return [projectContainer, projectSidebarContainer];
}
// creating and exporting a default project to be appended to content div and sidebar div.
export const [defaultProjectCard, defaultProjectSideCard] = createDefaultProject("default", "descr");
const projectsSidebarDiv = document.getElementById('projects-sidebar-div');
const projectDialog = document.getElementById('project-dialog');
const projectForm = document.getElementById('projectForm');
const createProjectBtn = document.getElementById('create-project-btn');
createProjectBtn.addEventListener('click', () =>{
    projectDialog.showModal();
});
 projectForm.addEventListener('submit', () => { 
        const [newProjectCard, newProjectSidebarCard] = createProject();
        projectsSidebarDiv.append(newProjectSidebarCard);
        
});