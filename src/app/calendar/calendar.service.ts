import {Injectable,OnInit} from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import {AngularFire, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2';
import kurve = require('kurvejs');

@Injectable()
export class CalendarService {
    msEvents:kurve.EventDataModel[];
    events:FirebaseListObservable<any[]>;
    af: AngularFire;
    constructor(af: AngularFire) {this.af=af;this.msEvents=null;}

    getEvents() {
        this.events = this.af.database.list('calendarEvents/');
        console.log(this.events);
        return this.msEvents;
    }
    setMSevents(events){
        this.msEvents=events;
        console.log(this.msEvents);
    }
    addEvent(title,startDate,endDate){
    	startDate = this.parseDateISO(startDate);
    	endDate = this.parseDateISO(endDate);
    	console.log(startDate + "   "+endDate);
    	this.events.push({"title":title,"start":startDate,"end":endDate});
    }
    parseDateISO(date){
      var parsedDate="";
      parsedDate=date.substring(6,10)+"-"+date.substring(0,2)+"-"+date.substring(3,5);
      return parsedDate;
    }
}
