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
        currentProject.printToDoArray();
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
    cardTitle.style.fontSize = "24px";

    const cardDescr = document.createElement('p');
    cardDescr.textContent = toDoItem.descr;

    const expandTaskBtn = document.createElement('button');
    expandTaskBtn.textContent = "Expand Task"
    expandTaskBtn.addEventListener('click', () => {
        taskContainer.classList.toggle("expandTaskCard");
    });

    const cardDate = document.createElement('p');
    if(toDoItem.dueDate == ""){
        let today = new Date();
        toDoItem.dueDate = today.toLocaleString();
    }
    cardDate.textContent = "Due: " + toDoItem.dueDate;

    const cardPriority = document.createElement('p');
    if(toDoItem.priority == 2){
        taskContainer.classList.add("priorityTwo");
    }
    else if(toDoItem.priority == 3){
        taskContainer.classList.add("priorityThree");
    }
    else if(toDoItem.priority == 4){
        taskContainer.classList.add("priorityFour");
    }
    else if(toDoItem.priority == 5){
        taskContainer.classList.add("priorityFive");
    }
    cardPriority.textContent = "Priority Level: " + toDoItem.priority;

    const cardNotes = document.createElement('p');
    cardNotes.textContent = "Notes: " + toDoItem.notes;
    const cardStatus = document.createElement('p');
    cardStatus.textContent = "Status: " + toDoItem.status;

    const statusChangeBtn = document.createElement('input');
    statusChangeBtn.id = "statusChangeBtn";
    statusChangeBtn.name = "statusChangeBtn";
    statusChangeBtn.type = "checkbox";
    statusChangeBtn.addEventListener('change', () => {
        if(statusChangeBtn.checked){
            toDoItem.status = "complete";
            cardStatus.textContent = "Status: " + toDoItem.status;
        }
        else if(statusChangeBtn.checked == false){
            toDoItem.status = "incomplete";
            cardStatus.textContent = "Status: " + toDoItem.status;
        }
    });

    const markCompleteContainer = document.createElement('div');
    markCompleteContainer.append(statusChangeBtn);

    const quickViewContainer = document.createElement('div');
    quickViewContainer.classList.add("interiorContainer");

    const quickViewTextContainer = document.createElement('div');    
    quickViewTextContainer.classList.add("interiorContainerText");
    quickViewTextContainer.append(cardTitle, cardDescr);

    quickViewContainer.append(markCompleteContainer, quickViewTextContainer, expandTaskBtn);

    const taskExpandedDetails = document.createElement('div');
    taskExpandedDetails.id = "taskExpandedDetails";
    taskExpandedDetails.append(cardDate, cardPriority, cardNotes, cardStatus);

    taskContainer.append(quickViewContainer, taskExpandedDetails);
    return taskContainer;
}

// this is just for me to create a def project w/ cards
function createDefaultProject(){
    const newDefaultProject = new project("My Default Project", "Tasks outside of other areas can be added here");
    const taskArrayContainer = document.createElement('div');
    taskArrayContainer.id = "projectArrayContainer";

    function printToDoArray(){
        taskArrayContainer.innerHTML = "";
        for(let i=0; i < newDefaultProject.taskArray.length; i++)
            taskArrayContainer.append(newDefaultProject.taskArray[i]);
    };
    newDefaultProject.printToDoArray = printToDoArray;

    const projectContainer = document.createElement('div');

    // getting project name and descr to display. 
    const projectCardName = document.createElement('p'); projectCardName.style.fontWeight = "bold";
    projectCardName.textContent = newDefaultProject.projectName;
    const projectCardDescr = document.createElement('p');
    projectCardDescr.textContent = "Descr: " + newDefaultProject.descr;


    /* this is for the sidebar only */
    const projectSidebarContainer = document.createElement('div')
    const projectSidebarName = document.createElement('p');
    projectSidebarName.textContent = newDefaultProject.projectName;
    const projectSidebarDescr = document.createElement('p');
    projectSidebarDescr.textContent = "Descr: " + newDefaultProject.descr;

    
    // ADD TASK BTN
    const addDefaultTaskBtn = document.createElement('button');
    addDefaultTaskBtn.textContent = "Add Task to Project";
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
    
    projectSidebarContainer.append(projectSidebarName, projectSidebarDescr, openProjectView);
    projectContainer.append(projectCardName, projectCardDescr, userBtnsContainer, taskArrayContainer);
    projectSidebarContainer.classList.add('projectCard'); projectContainer.classList.add("projectCardDetailed");

    return [projectContainer, projectSidebarContainer];
}

export function createProject() {
    const projectTitle = document.getElementById('projectName');
    const projectDescr = document.getElementById('projectDescr');

    let newProject = new project(projectTitle.value, projectDescr.value);

    const projectContainer = document.createElement('div');
    // creating taskContainer for displaying all tasks
    const taskArrayContainer = document.createElement('div');
    taskArrayContainer.id = "projectArrayContainer";
    // for content card.
    const projectCardName = document.createElement('p');
    projectCardName.textContent = newProject.projectName;
    const projectCardDescr = document.createElement('p');
    projectCardDescr.textContent = "Description: " + newProject.descr;


    /* this is for the sidebar card only */
    const projectSidebarContainer = document.createElement('div')
    const projectSidebarName = document.createElement('p');
    projectSidebarName.textContent = "Project: " + newProject.projectName;
    const projectSidebarDescr = document.createElement('p');
    projectSidebarDescr.textContent = "Description: " + newProject.descr;

    function printToDoArray(){
        taskArrayContainer.innerHTML = "";
        for(let i=0; i < newProject.taskArray.length; i++)
            taskArrayContainer.append(newProject.taskArray[i]);
    };
    newProject.printToDoArray = printToDoArray; // for global use --- this creates project property and assigns it to the printArray funct.
    // ADD TASK BTN
    const addTaskBtn = document.createElement('button');
    addTaskBtn.textContent = "Add Task to Project";
    addTaskBtn.addEventListener('click', () => {
        currentProject = newProject;
 
        printToDoArray();
        dialog.showModal();

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
    
    projectSidebarContainer.append(projectSidebarName, projectSidebarDescr, openProjectView);
    projectContainer.append(projectCardName, projectCardDescr, userBtnsContainer, taskArrayContainer);
    projectSidebarContainer.classList.add('projectCard'); projectContainer.classList.add("projectCardDetailed");

    return [projectContainer, projectSidebarContainer];
}

// creating and exporting a default project to be appended to content div and sidebar div.
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

function allProjectView(){
    const allProjectsContainer = document.createElement('div');
    
}


