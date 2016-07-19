"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var angularfire2_1 = require('angularfire2');
var user_service_1 = require('../user/user.service');
var clients_service_1 = require('../clients/clients.service');
var moment = require('moment');
var now = moment().format('LLLL');
var TasksService = (function () {
    function TasksService(af, userService, clientService) {
        var _this = this;
        this.af = af;
        this.userService = userService;
        this.clientService = clientService;
        this.userService.af.auth.subscribe(function (auth) {
            if (auth != null) {
                _this.userId = _this.userService.uid;
                _this.setTasks();
                _this.setClients();
            }
            else {
                _this.tasks = null;
                _this.clients = null;
            }
        });
        setInterval(function () { _this.taskDateCountdown(); }, 60000 * 1);
    }
    TasksService.prototype.ngOnInit = function () {
        this.startAtVal = 0;
        this.endAtVal = 1000;
        this.taskFilter = "none";
    };
    TasksService.prototype.setClients = function () {
        this.clients = this.clientService.getClients();
    };
    TasksService.prototype.setTasks = function () {
        var _this = this;
        this.tasks = this.af.database.list('tasks/' + this.userId, { preserveSnapshot: true });
        this.af.database.list('tasks/' + this.userId).subscribe(function (snapshots) {
            snapshots.forEach(function (snapshot) {
                _this.calculateNewDaysTillDue(snapshot);
            });
        });
    };
    TasksService.prototype.taskDateCountdown = function () {
        var _this = this;
        this.af.database.list('tasks/' + this.userId).subscribe(function (snapshots) {
            snapshots.forEach(function (snapshot) {
                _this.calculateNewDaysTillDue(snapshot);
            });
        });
    };
    TasksService.prototype.calculateNewDaysTillDue = function (task) {
        var curr = new Date();
        var currentDate = moment(curr).startOf('day');
        var due = this.parseDateISO(task.dueDate);
        var futureDate = moment(due).startOf('day');
        var differenceInDays = futureDate.diff(currentDate, 'days');
        this.task = this.af.database.object('tasks/' + this.userId + '/' + task.$key);
        this.task.update({ daysTillDue: differenceInDays });
        this.filteredTask = this.af.database.object('tasks/' + task.taskType + '/' + this.userId + '/' + task.$key);
        this.filteredTask.update({ daysTillDue: differenceInDays });
    };
    TasksService.prototype.parseDateISO = function (date) {
        var parsedDate = "";
        parsedDate = date.substring(6, 10) + "-" + date.substring(0, 2) + "-" + date.substring(3, 5);
        return parsedDate;
    };
    TasksService.prototype.getTasks = function (filter) {
        console.log(this.userId);
        this.startAtVal;
        this.endAtVal;
        this.taskFilter = filter;
        if (this.userId != null) {
            if (this.taskFilter == 'none') {
                this.tasks = this.af.database.list('tasks/' + this.userId, {
                    query: {
                        orderByChild: 'daysTillDue',
                        startAt: this.startAtVal,
                        endAt: this.endAtVal
                    }
                });
                return this.tasks;
            }
            else if (this.taskFilter == 'discovery') {
                this.filteredTasks = this.af.database.list('tasks/Discovery Response/' + this.userId, {
                    query: {
                        orderByChild: 'daysTillDue',
                        startAt: this.startAtVal,
                        endAt: this.endAtVal
                    }
                });
                return this.filteredTasks;
            }
            else if (this.taskFilter == 'motion') {
                this.filteredTasks = this.af.database.list('tasks/Motion Response/' + this.userId, {
                    query: {
                        orderByChild: 'daysTillDue',
                        startAt: this.startAtVal,
                        endAt: this.endAtVal
                    }
                });
                return this.filteredTasks;
            }
            else if (this.taskFilter == 'mediation') {
                this.filteredTasks = this.af.database.list('tasks/Mediation Statement/' + this.userId, {
                    query: {
                        orderByChild: 'daysTillDue',
                        startAt: this.startAtVal,
                        endAt: this.endAtVal
                    }
                });
                return this.filteredTasks;
            }
            else if (this.taskFilter == 'pleading') {
                this.filteredTasks = this.af.database.list('tasks/Pleading Response/' + this.userId, {
                    query: {
                        orderByChild: 'daysTillDue',
                        startAt: this.startAtVal,
                        endAt: this.endAtVal
                    }
                });
                return this.filteredTasks;
            }
            else if (this.taskFilter == 'other') {
                this.filteredTasks = this.af.database.list('tasks/Other/' + this.userId, {
                    query: {
                        orderByChild: 'daysTillDue',
                        startAt: this.startAtVal,
                        endAt: this.endAtVal
                    }
                });
                return this.filteredTasks;
            }
        }
    };
    TasksService.prototype.filterByColor = function (color) {
        console.log(color);
        if (color == "none") {
            this.startAtVal = 0;
            this.endAtVal = 1000;
        }
        else if (color == "green") {
            this.startAtVal = 6;
            this.endAtVal = 1000;
        }
        else if (color == "yellow") {
            this.startAtVal = 3;
            this.endAtVal = 5;
        }
        else {
            this.startAtVal = 0;
            this.endAtVal = 2;
        }
    };
    TasksService.prototype.addTask = function (title, description, dueDate, taskType, daysTillDue, client) {
        console.log(title + "   " + description + " " + dueDate + " " + taskType);
        this.tasks = this.af.database.list('tasks/' + this.userService.uid);
        this.taskKey = this.tasks.push({ uid: this.userService.uid, title: title, description: description, dueDate: dueDate, taskType: taskType, daysTillDue: daysTillDue }).key;
        this.filteredTask = this.af.database.object('tasks/' + taskType + '/' + this.userService.uid + '/' + this.taskKey);
        this.filteredTask.set({ uid: this.userService.uid, title: title, description: description, dueDate: dueDate, taskType: taskType, daysTillDue: daysTillDue });
        this.parseClient(client);
        this.addClientTask(this.clientKey, this.clientName, this.taskKey, title, daysTillDue);
        //this.userService.addUserTask(this.taskKey);
    };
    TasksService.prototype.parseClient = function (client) {
        for (var i = 0; i < client.length; i++) {
            if (client.charAt(i) == '/' && client.charAt(i + 1) == '/') {
                this.clientName = client.substring(0, i);
                this.clientKey = client.substring(i + 2, client.length);
            }
        }
    };
    TasksService.prototype.addClientTask = function (clientKey, clientName, taskKey, title, daysTillDue) {
        this.af.database.object('clientTasks/' + clientKey + '/' + taskKey).set({ task: title, days: daysTillDue });
        this.af.database.object('taskClients/' + taskKey + '/' + clientKey).set({ client: clientName });
    };
    TasksService.prototype.updateTask = function (taskKey, title, description, dueDate, taskType, daysTillDue, oldType) {
        this.task = this.af.database.object('tasks/' + this.userService.uid + '/' + taskKey);
        this.task.update({ uid: this.userService.uid, title: title, description: description, dueDate: dueDate, taskType: taskType, daysTillDue: daysTillDue });
        if (oldType != taskType) {
            this.filteredTask = this.af.database.object('tasks/' + oldType + '/' + this.userService.uid + '/' + taskKey);
            this.filteredTask.remove();
        }
        this.filteredTask = this.af.database.object('tasks/' + taskType + '/' + this.userService.uid + '/' + taskKey);
        this.filteredTask.update({ uid: this.userService.uid, title: title, description: description, dueDate: dueDate, taskType: taskType, daysTillDue: daysTillDue });
        //console.log(taskKey + title + description + dueDate + taskType + daysTillDue);
    };
    TasksService.prototype.deleteTask = function (taskKey, taskType) {
        var _this = this;
        this.tasks = this.af.database.list('tasks/' + this.userService.uid);
        this.filteredTasks = this.af.database.list('tasks/' + taskType + '/' + this.userService.uid);
        this.filteredTasks.remove(taskKey);
        this.tasks.remove(taskKey);
        this.af.database.list('taskClients/' + taskKey).subscribe(function (snapshots) {
            snapshots.forEach(function (snapshot) {
                _this.af.database.object('clientTasks/' + snapshot.$key + '/' + taskKey).remove();
            });
        });
        this.af.database.list('taskClients/' + taskKey).remove();
    };
    TasksService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [angularfire2_1.AngularFire, user_service_1.UserService, clients_service_1.ClientService])
    ], TasksService);
    return TasksService;
}());
exports.TasksService = TasksService;
//# sourceMappingURL=tasks.service.js.map