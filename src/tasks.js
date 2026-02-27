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
        let status = "incomplete";
    }

};

export class project {
    constructor(projectName, descr){
        const toDoArray = [];
        this.projectName = projectName;
        this.descr = descr;
    }
    // DO NOT NEED 'function' keyword. It is implied that this is a method since it is in a class.
    addTask(toDoItem){
        toDoArray.push(toDoItem);
    };

    removeTask(toDoItem){ // send COMPLETED tasks to an archive and send tasks made in error to garbage.
        if(toDoArray.includes(toDoItem.name)){
            const index = toDoArray.indexOf(toDoItem);
            toDoArray.splice(index, 1); // will remove item at the found index.
        }
        else{
            alert("Task not found");
        }
    };
};