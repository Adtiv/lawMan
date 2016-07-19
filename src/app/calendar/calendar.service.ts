import {Injectable,OnInit} from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import {AngularFire, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2';

@Injectable()
export class CalendarService {
    events:FirebaseListObservable<any[]>;
    af: AngularFire;
    constructor(af: AngularFire) {this.af=af;}

    getEvents() {
        this.events = this.af.database.list('calendarEvents/');
        console.log(this.events);
        return this.events;
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
