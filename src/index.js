import "./styles.css";
import { toDoItem, project } from "./tasks.js";
import { defaultProjectCard, defaultProjectSideCard} from "./domhandler.js";

const contentDiv = document.getElementById('content');
// testing a def project here
const defaultProjectDiv = document.getElementById('defProjContainer');
contentDiv.append(defaultProjectCard);
defaultProjectDiv.append(defaultProjectSideCard);





