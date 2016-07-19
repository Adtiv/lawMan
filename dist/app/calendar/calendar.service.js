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
var CalendarService = (function () {
    function CalendarService(af) {
        this.af = af;
    }
    CalendarService.prototype.getEvents = function () {
        this.events = this.af.database.list('calendarEvents/');
        console.log(this.events);
        return this.events;
    };
    CalendarService.prototype.addEvent = function (title, startDate, endDate) {
        startDate = this.parseDateISO(startDate);
        endDate = this.parseDateISO(endDate);
        console.log(startDate + "   " + endDate);
        this.events.push({ "title": title, "start": startDate, "end": endDate });
    };
    CalendarService.prototype.parseDateISO = function (date) {
        var parsedDate = "";
        parsedDate = date.substring(6, 10) + "-" + date.substring(0, 2) + "-" + date.substring(3, 5);
        return parsedDate;
    };
    CalendarService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [angularfire2_1.AngularFire])
    ], CalendarService);
    return CalendarService;
}());
exports.CalendarService = CalendarService;
//# sourceMappingURL=calendar.service.js.map