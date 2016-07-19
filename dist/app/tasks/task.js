"use strict";
var Task = (function () {
    function Task(id, title, description, dueDate, taskType, daysTillDue, complete) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.taskType = taskType;
        this.daysTillDue = daysTillDue;
        this.complete = complete;
    }
    return Task;
}());
exports.Task = Task;
//# sourceMappingURL=task.js.map