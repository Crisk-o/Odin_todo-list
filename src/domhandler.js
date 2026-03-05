import { toDoItem, project } from "./tasks.js";
import avatar from "./resources/avatar.svg"

const userAvatar = document.getElementById('avatar');
userAvatar.src = avatar;
const contentDiv = document.getElementById('content');


// FORM FOR ADDING TASKS
let currentProject = null; // must track current project so that tasks added only to correct array.
const dialog = document.getElementById('task-dialog');
const form = document.getElementById('taskForm');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!currentProject) return;
    const newTaskCard = createTask();
    currentProject.addTask(newTaskCard);
    currentProject.printToDoArray();
    form.reset();
    dialog.close();
});

export function createTask(){
    const taskName = document.getElementById('taskName');
    const taskDescr = document.getElementById('taskDescr');
    const taskDate = document.getElementById('dueDate');
    const taskPriority = document.getElementById('taskPriority');
    const taskNotes = document.getElementById('taskNotes');
    
    const newTask = new toDoItem(taskName.value, taskDescr.value, taskDate.value, taskPriority.value, taskNotes.value);
    const taskCard = createTaskCard(newTask);
    
    const deleteTaskBtn = document.createElement('button');
    deleteTaskBtn.textContent = "Delete Task";
    deleteTaskBtn.addEventListener('click', () => {
        currentProject.removeTask(taskCard);
    });
    taskCard.append(deleteTaskBtn);
   
    return taskCard;
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
        if(toDoItem.status === "incomplete"){
            toDoItem.status = "complete";
            cardStatus.textContent = toDoItem.status;
        }
    })

    taskContainer.append(cardTitle, cardDescr, cardDate, cardPriority, cardNotes, cardStatus, statusChangeBtn);
    return taskContainer;
}

// this is just for me to create a def project w/ cards
function createDefaultProject(){
    const newDefaultProject = new project("default", "descr");
    const taskArrayContainer = document.createElement('div');
    taskArrayContainer.id = "projectArrayContainer";

    function printToDoArray(){
        taskArrayContainer.innerHTML = "";
        for(let i=0; i < newDefaultProject.taskArray.length; i++)
            taskArrayContainer.append(newDefaultProject.taskArray[i]);
    };
    newDefaultProject.printToDoArray = printToDoArray; // for global use?
    const projectContainer = document.createElement('div');

    // getting project name and descr to display. 
    const projectCardName = document.createElement('p');
    projectCardName.textContent = "Project Title: " + newDefaultProject.projectName;
    const projectCardDescr = document.createElement('p');
    projectCardDescr.textContent = "Description: " + newDefaultProject.descr;
 

    /* this is for the sidebar only */
    const projectSidebarContainer = document.createElement('div')
    const projectSidebarName = document.createElement('p');
    projectSidebarName.textContent = "Project Title: " + newDefaultProject.projectName;
    const projectSidebarDescr = document.createElement('p');
    projectSidebarDescr.textContent = "Description: " + newDefaultProject.descr;
    const projectSidebarTaskNum = document.createElement('p');
    projectSidebarTaskNum.textContent = newDefaultProject.taskArray.length;
    
    // ADD TASK BTN
    const addDefaultTaskBtn = document.createElement('button');
    addDefaultTaskBtn.textContent = "Add (def) Task to Project";
    addDefaultTaskBtn.addEventListener('click', () => {
        currentProject = newDefaultProject;
        printToDoArray();
        dialog.showModal();
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
    closeProjectBtn.addEventListener('click', () =>{ contentDiv.innerHTML = ""; });

    const userBtnsContainer = document.createElement('div');
    userBtnsContainer.append(addDefaultTaskBtn, closeProjectBtn);
    
    projectSidebarContainer.append(projectSidebarName, projectSidebarDescr, projectSidebarTaskNum, openProjectView);
    projectContainer.append(projectCardName, projectCardDescr, userBtnsContainer, taskArrayContainer);
    projectSidebarContainer.classList.add('projectCard'); projectContainer.classList.add("projectCardDetailed");

    return [projectContainer, projectSidebarContainer];
}

export function createProject() {
    const projectTitle = document.getElementById('projectName');
    const projectDescr = document.getElementById('projectDescr');
    const projectTaskNumber = document.createElement('p');

    let newProject = new project(projectTitle.value, projectDescr.value);
    projectTaskNumber.textContent = newProject.taskArray.length; 
    // creating taskContainer for displaying all tasks
    const taskArrayContainer = document.createElement('div');
    taskArrayContainer.id = "projectArrayContainer";
    const projectContainer = document.createElement('div');

    // getting project name and descr to display. 
    const projectCardName = document.createElement('p');
    projectCardName.textContent = "Project Title: " + newProject.projectName;
    const projectCardDescr = document.createElement('p');
    projectCardDescr.textContent = "Description: " + newProject.descr;
 

    /* this is for the sidebar card only */
    const projectSidebarContainer = document.createElement('div')
    const projectSidebarName = document.createElement('p');
    projectSidebarName.textContent = "Project Title: " + newProject.projectName;
    const projectSidebarDescr = document.createElement('p');
    projectSidebarDescr.textContent = "Description: " + newProject.descr;
    const projectSidebarTaskNum = document.createElement('p');
    projectSidebarTaskNum.textContent = newProject.taskArray.length;


    function printToDoArray(){
        taskArrayContainer.innerHTML = "";
        for(let i=0; i < newProject.taskArray.length; i++)
            taskArrayContainer.append(newProject.taskArray[i]);
    };
    newProject.printToDoArray = printToDoArray; // for global use?
    // ADD TASK BTN
    const addTaskBtn = document.createElement('button');
    addTaskBtn.textContent = "Add Task to Project";
    addTaskBtn.addEventListener('click', () => {
        currentProject = newProject;
        printToDoArray();
        dialog.showModal();
        projectTaskNumber.textContent = currentProject.taskArray.length;
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
    projectContainer.append(projectCardName, projectCardDescr, projectTaskNumber, userBtnsContainer, taskArrayContainer);
    projectSidebarContainer.classList.add('projectCard'); projectContainer.classList.add("projectCardDetailed");

    return [projectContainer, projectSidebarContainer];
}

// // creating and exporting a default project to be appended to content div and sidebar div.
export const [defaultProjectCard, defaultProjectSideCard] = createDefaultProject();

const projectsSidebarDiv = document.getElementById('projects-sidebar-div');
// CREATING PROJECTS
const projectDialog = document.getElementById('project-dialog');
const projectForm = document.getElementById('projectForm');
const createProjectBtn = document.getElementById('create-project-btn');
createProjectBtn.addEventListener('click', () =>{
    projectDialog.showModal();
});
 projectForm.addEventListener('submit', (e) => {
        e.preventDefault(); 
        const [newProjectCard, newProjectSidebarCard] = createProject();
        projectsSidebarDiv.append(newProjectSidebarCard);
        projectForm.reset();
        projectDialog.close();
});


