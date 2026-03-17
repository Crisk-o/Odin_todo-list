import { toDoItem, project } from "./tasks.js";
import { allProjectsArray, allTasksArray, createProjectCardWArgs, createProjectCard} from "./domhandler.js";
const contentDiv = document.getElementById('content');
const projectsSidebarDiv = document.getElementById('projects-sidebar-div');

export function onLoad(){
    const storedProjects = JSON.parse(localStorage.getItem('allProjects'));
    if (storedProjects) {
        storedProjects.forEach(projData => {
            // 1. Re-create the Class instance
            const restoredProject = new project(projData.projectName, projData.descr);
            
            // 2. Re-add the tasks
            projData.taskArray.forEach(t => {
                const restoredTask = new toDoItem(t.title, t.descr, t.dueDate, t.priority, t.notes);
                restoredProject.addTask(restoredTask);
            });
            allProjectsArray.push(restoredProject);
            // 3. Re-run your DOM creation logic
            let [newProjectCard, newProjectSideBarCard] = createProjectCard(restoredProject); 
            // contentDiv.append(newProjectCard);
            projectsSidebarDiv.append(newProjectSideBarCard);

        });
    }
}

export function saveToLocal() {
    // We only save the raw data, not the DOM elements
    localStorage.setItem('allProjects', JSON.stringify(allProjectsArray));
}
