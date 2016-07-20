import { Component, OnInit} from '@angular/core';
import { CORE_DIRECTIVES } from '@angular/common';
import {AngularFire, FirebaseListObservable,FirebaseObjectObservable} from 'angularfire2';
import {TasksService} from './tasks.service';
import {CollapseDirective} from 'ng2-bootstrap/ng2-bootstrap';
import {BS_VIEW_PROVIDERS, DATEPICKER_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';
import {Calendar} from 'primeng/primeng';
import * as moment from 'moment';
let now = moment().format('LLLL');

@Component({
  moduleId: module.id,
  selector: 'Add-Task',
  templateUrl: 'addTask.component.html',
  styleUrls: ['tasks.component.css'],
  viewProviders:[BS_VIEW_PROVIDERS],
  directives: [CollapseDirective,CORE_DIRECTIVES,DATEPICKER_DIRECTIVES,Calendar]
})
export class AddTaskComponent implements OnInit {
  taskService: TasksService;
  types = ['Motion Response', 'Mediation Statement',
            'Discovery Response', 'Pleading Response', 'Other'];
  clients;
  client;
  title;
  description;
  dueDate;
  //currentDate: Date = new Date();
  //date: Date = new Date();
  date;
  taskType;
  //date: Date = new Date();
  public isCollapsed:boolean;
  constructor(taskService: TasksService, af:AngularFire) {
  	this.taskService=taskService;
    this.client="";
    this.taskService.userService.af.auth.subscribe((auth)=>{
      if(auth!=null){
        this.clients = this.taskService.clients;
        //this.client.updateValue(this.client.type);
      }
      else{
        this.clients= null;
      }
    });
  }
  ngOnInit() {
    this.isCollapsed = true;
    //this.clients = this.taskService.clients;
  }
  /*
  getDate():number {
  	//this.dueDate=this.date.toDateString();
    return this.date && this.date.getTime() || new Date().getTime();
  }
  */
  formatDate(date){
  	var formattedDate="";
  	if(date.getMonth()<10){
  		formattedDate+="0"+(date.getMonth()+1);
  	}
  	else{
  		formattedDate+=date.getMonth()+1;
  	}
  	if(date.getDate()<10){
  		formattedDate+='/'+'0'+date.getDate();
  	}
  	else{
  		formattedDate+='/'+date.getDate();
  	}
  	formattedDate+='/'+date.getFullYear();
  	return formattedDate;
  }
  openTasks(){
  	this.isCollapsed=!this.isCollapsed;
  }
  addTask(){
    var curr = new Date();
    var due = this.taskService.parseDateISO(this.date);
    var currentDate=moment(curr).startOf('day');
    var futureDate =moment(due).startOf('day');
    var differenceInDays = futureDate.diff(currentDate, 'days');
    console.log(currentDate+"    "+futureDate+"   "+differenceInDays);
    this.taskService.addTask(this.title,this.description,this.date,this.taskType,differenceInDays,this.client);
    this.isCollapsed=!this.isCollapsed;
    this.title="";
    this.description="";
    this.date="";
    this.taskType="";
    this.client=null;
  }
  setClient(){
    //this.client=client;
    console.log(this.client);
  }
}
