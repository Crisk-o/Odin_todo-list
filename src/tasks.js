/* This file has code for classes of todoItem and project */

import "./styles.css";

// have user fill in a form to get values to create toDoItem
export class toDoItem {
    constructor(title, descr, dueDate, priority, notes) {
        const id = crypto.randomUUID();
        this.title = title;
        this.descr = descr;
        this.dueDate = dueDate;
        this.priority = priority;
        this.notes = notes;
        this.status = "incomplete";
    }
};
export class project {
    constructor(projectName, descr){
        const id = crypto.randomUUID();
        this.taskArray = [];
        this.projectName = projectName;
        this.descr = descr;
    }
    // DO NOT NEED 'function' keyword. It is implied that this is a method since it is in a class.
    addTask(task){
        this.taskArray.push(task);
    };

    removeTask(toDoItem){ // send COMPLETED tasks to an archive and send tasks made in error to garbage.
        if(this.taskArray.includes(toDoItem.name)){
            const index = this.taskArray.indexOf(toDoItem);
            this.taskArray.splice(index, 1); // will remove item at the found index.
        }
        else{
            alert("Task not found");
        }
    };
};