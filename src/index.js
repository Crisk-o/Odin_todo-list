import "./styles.css";
import { toDoItem, project } from "./tasks.js";
import { createTask, createProject, defaultProjectCard, defaultProjectSideCard} from "./domhandler.js";

// testing a def project here
const defaultProjectDiv = document.getElementById('defProjContainer');
const projectsSidebarDiv = document.getElementById('projects-sidebar-div');
defaultProjectDiv.append(defaultProjectSideCard);


const projectDialog = document.getElementById('project-dialog');
const projectForm = document.getElementById('projectForm');
const createProjectBtn = document.getElementById('create-project-btn');
createProjectBtn.addEventListener('click', () =>{
    projectDialog.showModal();
    projectForm.addEventListener('submit', () => { 
        const [newProjectCard, newProjectSidebarCard] = createProject();
        projectsSidebarDiv.append(newProjectSidebarCard);
        
    });
});




