import "./styles.css";
import { toDoItem, project } from "./tasks.js";
import { defaultProjectCard, defaultProjectSideCard, allProjectsArray, createProjectCardWArgs} from "./domhandler.js";
import { onLoad } from "./storage.js";

window.addEventListener('load', onLoad);
const contentDiv = document.getElementById('content');
const defaultProjectSidebarDiv = document.getElementById('defProjContainer');
contentDiv.append(defaultProjectCard);
defaultProjectSidebarDiv.append(defaultProjectSideCard);





