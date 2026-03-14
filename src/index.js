import "./styles.css";
import { toDoItem, project } from "./tasks.js";
import { defaultProjectCard, defaultProjectSideCard} from "./domhandler.js";
import "./storage.js";

const contentDiv = document.getElementById('content');
const defaultProjectDiv = document.getElementById('defProjContainer');

contentDiv.append(defaultProjectCard);
defaultProjectDiv.append(defaultProjectSideCard);





