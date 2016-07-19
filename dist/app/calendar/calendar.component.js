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
var primeng_1 = require('primeng/primeng');
var primeng_2 = require('primeng/primeng');
var ng2_bootstrap_1 = require('ng2-bootstrap/ng2-bootstrap');
var calendar_service_1 = require('./calendar.service');
var CalendarComponent = (function () {
    function CalendarComponent(calendarService, cd) {
        this.cd = cd;
        this.dialogVisible = false;
        this.idGen = 100;
        this.calendarService = calendarService;
    }
    CalendarComponent.prototype.ngOnInit = function () {
        //this.eventService.getEvents().then(events => {this.events = events;});
        this.events = this.calendarService.getEvents();
        this.header = {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
        };
        this.isCollapsed = true;
    };
    CalendarComponent.prototype.openEvents = function () {
        this.isCollapsed = !this.isCollapsed;
    };
    CalendarComponent.prototype.handleDayClick = function (event) {
        this.event = new MyEvent();
        this.event.start = event.date.format();
        this.dialogVisible = true;
        //trigger detection manually as somehow only moving the mouse quickly after click triggers the automatic detection
        this.cd.detectChanges();
    };
    CalendarComponent.prototype.handleEventClick = function (e) {
        this.event = new MyEvent();
        this.event.title = e.calEvent.title;
        var start = e.calEvent.start;
        var end = e.calEvent.end;
        if (e.view.name === 'month') {
            start.stripTime();
        }
        if (end) {
            end.stripTime();
            this.event.end = end.format();
        }
        this.event.id = e.calEvent.id;
        this.event.start = start.format();
        this.event.allDay = e.calEvent.allDay;
        this.dialogVisible = true;
    };
    /*
    saveEvent() {
        //update
        if(this.event.id) {
            let index: number = this.findEventIndexById(this.event.id);
            if(index >= 0) {
                this.events[index] = this.event;
            }
        }
        //new
        else {
            this.event.id = this.idGen;
            this.events.push(this.event);
            this.event = null;
        }
        
        this.dialogVisible = false;
    }
    */
    CalendarComponent.prototype.addEvent = function () {
        console.log(this.title + this.startDate + this.endDate);
        this.calendarService.addEvent(this.title, this.startDate, this.endDate);
    };
    CalendarComponent.prototype.deleteEvent = function () {
        var index = this.findEventIndexById(this.event.id);
        if (index >= 0) {
            this.events.splice(index, 1);
        }
        this.dialogVisible = false;
    };
    CalendarComponent.prototype.findEventIndexById = function (id) {
        var index = -1;
        for (var i = 0; i < this.events.length; i++) {
            if (id == this.events[i].id) {
                index = i;
                break;
            }
        }
        return index;
    };
    CalendarComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app-calendar',
            templateUrl: 'calendar.component.html',
            styleUrls: ['calendar.component.css'],
            directives: [primeng_1.Schedule, primeng_1.Dialog, primeng_1.InputText, primeng_2.Calendar, primeng_1.ToggleButton, primeng_1.Button, ng2_bootstrap_1.CollapseDirective],
        }), 
        __metadata('design:paramtypes', [calendar_service_1.CalendarService, core_1.ChangeDetectorRef])
    ], CalendarComponent);
    return CalendarComponent;
}());
exports.CalendarComponent = CalendarComponent;
var MyEvent = (function () {
    function MyEvent() {
        this.allDay = true;
    }
    return MyEvent;
}());
exports.MyEvent = MyEvent;
//# sourceMappingURL=calendar.component.js.map