import { toDoItem, project } from "./tasks.js";
import avatar from "./resources/avatar.svg"

const userAvatar = document.getElementById('avatar');
userAvatar.src = avatar;
const contentDiv = document.getElementById('content');

export function createTask(){
    // RETURNS ARRAY W/ A NEW TO-DO ITEM OBJECT AND A TASKCARD FOR IT
    const taskName = document.getElementById('taskName');
    const taskDescr = document.getElementById('taskDescr');
    const taskDate = document.getElementById('dueDate');
    const taskPriority = document.getElementById('taskPriority');
    const taskNotes = document.getElementById('taskNotes');
    
    const newTask = new toDoItem(taskName.value, taskDescr.value, taskDate.value, taskPriority.value, taskNotes.value);
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


export function createProject() {
    const projectTitle = document.getElementById('projectName');
    const projectDescr = document.getElementById('projectDescr');

    const newProject = new project(projectTitle.value, projectDescr.value);
    const [newProjectCard, newProjectSideCard]= createProjectCard(newProject);
    newProjectCard.classList.add("projectCardDetailed");
    newProjectSideCard.classList.add("projectCard");

    return [newProjectCard, newProjectSideCard];
}
// this is just for me to create a def project w/ cards
function createDefaultProject(projectName, projectDescr){
    const newProject = new project(projectName, projectDescr);
    const [newProjectCard, newProjectSideCard] = createProjectCard(newProject);
    newProjectCard.classList.add("projectCardDetailed");
    newProjectSideCard.classList.add("projectCard");

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
    
    //creating taskContainer for displaying all tasks
    const taskArrayContainer = document.createElement('div');
    taskArrayContainer.id = "projectArrayContainer";

    function printToDoArray(){
        taskArrayContainer.innerHTML = "";
        for(let i=0; i < project.taskArray.length; i++)
            taskArrayContainer.append(project.taskArray[i]);
    };
    // ADD TASK BTN
    const taskDialog = document.getElementById('task-dialog');
    const taskForm = document.getElementById('taskForm');
    const addTaskBtn = document.createElement('button');
    
    addTaskBtn.textContent = "Add Task to Project";
    addTaskBtn.addEventListener('click', () => {
        taskDialog.showModal(); 
    });
    taskForm.addEventListener('submit', () => {
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
    });

    // OPEN PROJECT BTN -- for use in sidebar card
    const openProjectView = document.createElement('button');
    openProjectView.textContent = "Open Project";
    openProjectView.addEventListener('click', () => {
        // need to append to content div but also need to keep project container in sidebar
        // need to show/create a new project display. Must display all task cards
        contentDiv.innerHTML = "";      
        projectContainer.append(taskArrayContainer);
        contentDiv.append(projectContainer);
    });
    
    // PRINT TASKS BTN
    const printArrayBtn = document.createElement('button');
    printArrayBtn.textContent = "Print Tasks";
    printArrayBtn.addEventListener('click', printToDoArray);
    
    // CLOSE PROJECT BTN
    const closeProjectBtn = document.createElement('button');
    closeProjectBtn.textContent = "Close Project";
    closeProjectBtn.addEventListener('click', () =>{
        contentDiv.innerHTML = "";
    })

    const userBtnsContainer = document.createElement('div');
    userBtnsContainer.append(addTaskBtn, closeProjectBtn, printArrayBtn,  deleteProjectBtn);
    
    projectSidebarContainer.append(projectSidebarName, projectSidebarDescr, projectSidebarTaskNum, openProjectView);
    projectContainer.append(projectName, projectDescr, projectTaskNumber, userBtnsContainer);
    return [projectContainer, projectSidebarContainer];
}
// creating and exporting a default project to be appended to content div and sidebar div.
export const [defaultProjectCard, defaultProjectSideCard] = createDefaultProject("default", "descr");

