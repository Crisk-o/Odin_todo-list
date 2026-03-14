import { toDoItem, project } from "./tasks.js";
import { allProjectsArray, allTasksArray } from "./domhandler.js";

export function loadLocalStorage(){
    const storedProjectList = localStorage.getItem('allProjects');
    return storedProjectList ? JSON.parse(storedList) : []; // returns an empty array if object is not found. Prevents errors.
    
}
export function saveLocalStorage(prjctArr){
    prjctArr = allProjectsArray;
    let data = JSON.stringify(prjctArr);
    localStorage.setItem("allProjects", data);
}