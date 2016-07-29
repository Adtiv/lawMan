import { Component, OnInit, ChangeDetectorRef} from '@angular/core';
import {Schedule,Dialog,InputText,ToggleButton,Button} from 'primeng/primeng';
import {Calendar} from 'primeng/primeng';
import {CollapseDirective} from 'ng2-bootstrap/ng2-bootstrap';
import {CalendarService} from './calendar.service'

@Component({
  moduleId: module.id,
  selector: 'app-calendar',
  templateUrl: 'calendar.component.html',
  styleUrls: ['calendar.component.css'],
  directives: [Schedule,Dialog,InputText,Calendar,ToggleButton,Button,CollapseDirective],
})
export class CalendarComponent implements OnInit {
    title;
    startDate:string;
    endDate:string;
    events;
    header: any;
    event: MyEvent;
    dialogVisible: boolean = false;
    idGen: number = 100;
    public isCollapsed:boolean;
    calendarService: CalendarService;
    constructor(calendarService: CalendarService, private cd: ChangeDetectorRef) { 
        this.calendarService=calendarService;
    }
    ngOnInit() {
        //this.eventService.getEvents().then(events => {this.events = events;});
        this.events=this.calendarService.getEvents();
        //this.events=this.calendarService.msEvents;
        this.header = {
			left: 'prev,next today',
			center: 'title',
			right: 'month,agendaWeek,agendaDay'
		};
        this.isCollapsed=true;
    }
    openEvents(){
        this.isCollapsed=!this.isCollapsed;
    }   
    handleDayClick(event) {
        this.event = new MyEvent();
        this.event.start = event.date.format();
        this.dialogVisible = true;
        
        //trigger detection manually as somehow only moving the mouse quickly after click triggers the automatic detection
        this.cd.detectChanges();
    }
    
    handleEventClick(e) {
        this.event = new MyEvent();
        this.event.title = e.calEvent.title;
        
        let start = e.calEvent.start;
        let end = e.calEvent.end;
        if(e.view.name === 'month') {
            start.stripTime();
        }
        
        if(end) {
            end.stripTime();
            this.event.end = end.format();
        }

        this.event.id = e.calEvent.id;
        this.event.start = start.format();
        this.event.allDay = e.calEvent.allDay;
        this.dialogVisible = true;
    }
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
    addEvent(){
        console.log(this.title+this.startDate+this.endDate);
        this.calendarService.addEvent(this.title,this.startDate,this.endDate);
    }
    deleteEvent() {
        let index: number = this.findEventIndexById(this.event.id);
        if(index >= 0) {
            this.events.splice(index, 1);
        }
        this.dialogVisible = false;
    }
    
    findEventIndexById(id: number) {
        let index = -1;
        for(let i = 0; i < this.events.length; i++) {
            if(id == this.events[i].id) {
                index = i;
                break;
            }
        }
        
        return index;
    }
    
}

export class MyEvent {
    id: number;
    title: string;
    start: string;
    end: string;
    allDay: boolean = true;
}
