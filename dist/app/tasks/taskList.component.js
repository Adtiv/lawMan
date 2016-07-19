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
var common_1 = require('@angular/common');
var addTask_component_1 = require('./addTask.component');
var tasks_service_1 = require('./tasks.service');
var user_service_1 = require('../user/user.service');
var ng2_bootstrap_1 = require('ng2-bootstrap/ng2-bootstrap');
var primeng_1 = require('primeng/primeng');
var moment = require('moment');
var now = moment().format('LLLL');
var TaskListComponent = (function () {
    function TaskListComponent(auth, af, taskService, userService) {
        this.auth = auth;
        this.status = { isopen: false };
        this.types = ['Motion Response', 'Mediation Statement',
            'Discovery Response', 'Pleading Response', 'Other'];
        this.taskService = taskService;
        this.af = af;
        this.userService = userService;
    }
    TaskListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.isCollapsed = true;
        this.client = "";
        this.edit = true;
        this.filterButtonText = "All Tasks";
        this.auth.subscribe(function (data) {
            if (data) {
                _this.tasks = _this.taskService.getTasks('none');
                _this.clients = _this.taskService.clients;
            }
        });
        console.log(this.tasks);
    };
    TaskListComponent.prototype.toggled = function (open) {
        console.log('Dropdown is now: ', open);
    };
    TaskListComponent.prototype.filterTasks = function (filter) {
        if (filter == "none") {
            this.filterButtonText = "All Tasks";
        }
        else if (filter == "motion") {
            this.filterButtonText = "Motion Responses";
        }
        if (filter == "pleading") {
            this.filterButtonText = "Pleading Responses";
        }
        if (filter == "mediation") {
            this.filterButtonText = "Mediation Statements";
        }
        if (filter == "discovery") {
            this.filterButtonText = "Discovery Responses";
        }
        if (filter == "other") {
            this.filterButtonText = "Other";
        }
        this.tasks = this.taskService.getTasks(filter);
        return false;
    };
    TaskListComponent.prototype.filterByColor = function (filterColor) {
        this.taskService.filterByColor(filterColor);
        this.tasks = this.taskService.getTasks(this.taskService.taskFilter);
    };
    TaskListComponent.prototype.activeTask = function (task) {
        if (this.taskKey == task.$key) {
            this.taskKey = "";
            this.taskClients = null;
        }
        else {
            this.taskKey = task.$key;
            this.taskClients = this.af.database.list('taskClients/' + this.taskKey);
        }
        return false;
    };
    TaskListComponent.prototype.updateTask = function () {
        var curr = new Date();
        var due = this.taskService.parseDateISO(this.date);
        var currentDate = moment(curr).startOf('day');
        var futureDate = moment(due).startOf('day');
        var differenceInDays = futureDate.diff(currentDate, 'days');
        this.taskService.updateTask(this.updatedTaskKey, this.title, this.description, this.date, this.taskType, differenceInDays, this.oldType);
        this.edit = !this.edit;
    };
    TaskListComponent.prototype.taskDetail = function (task) {
        if (task.$key == this.taskKey) {
            return false;
        }
        else {
            //this.isCollapsed=!this.isCollapsed;
            return true;
        }
        //this.isCollapsed=!this.isCollapsed;
    };
    TaskListComponent.prototype.getDate = function () {
        //this.dueDate=this.date.toDateString();
        return this.date && this.date.getTime() || new Date().getTime();
    };
    TaskListComponent.prototype.deleteTask = function (task) {
        console.log(task);
        this.taskService.deleteTask(task.$key, task.taskType);
        return false;
    };
    TaskListComponent.prototype.editToggle = function (task) {
        var _this = this;
        this.edit = !this.edit;
        this.updatedTaskKey = task.$key;
        this.title = task.title;
        this.description = task.description;
        this.af.database.list('taskClients/' + this.updatedTaskKey).subscribe(function (snapshots) {
            snapshots.forEach(function (snapshot) {
                _this.client = _this.af.database.object('clients/' + _this.userService.uid + '/' + snapshot.$key);
                console.log(_this.client.name);
            });
        });
        console.log(this.client.name);
        this.date = new Date(task.dueDate);
        this.taskType = task.taskType;
        this.oldType = task.taskType;
        document.body.scrollTop = document.documentElement.scrollTop = 0;
    };
    TaskListComponent.prototype.closeEdit = function () {
        this.edit = !this.edit;
    };
    TaskListComponent.prototype.getStyle = function (task) {
        if (task.daysTillDue <= 2) {
            return "rgba(255,0,0,.8)";
        }
        else if (task.daysTillDue <= 5) {
            return "rgba(255,255,0,.8)";
        }
        else {
            return "rgba(0,255,0,.8)";
        }
    };
    TaskListComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'Task-List',
            templateUrl: 'taskList.component.html',
            styleUrls: ['tasks.component.css'],
            viewProviders: [ng2_bootstrap_1.BS_VIEW_PROVIDERS],
            directives: [primeng_1.Calendar, addTask_component_1.AddTaskComponent, ng2_bootstrap_1.CollapseDirective, ng2_bootstrap_1.DROPDOWN_DIRECTIVES, ng2_bootstrap_1.BUTTON_DIRECTIVES, ng2_bootstrap_1.MODAL_DIRECTVES, common_1.CORE_DIRECTIVES, ng2_bootstrap_1.DATEPICKER_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [angularfire2_1.FirebaseAuth, angularfire2_1.AngularFire, tasks_service_1.TasksService, user_service_1.UserService])
    ], TaskListComponent);
    return TaskListComponent;
}());
exports.TaskListComponent = TaskListComponent;
//# sourceMappingURL=taskList.component.js.map