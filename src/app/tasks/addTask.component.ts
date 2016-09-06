import { Component, OnInit} from '@angular/core';
import { CORE_DIRECTIVES } from '@angular/common';
import {FORM_DIRECTIVES} from '@angular/forms';
import {AngularFire, FirebaseListObservable,FirebaseObjectObservable} from 'angularfire2';
import {TasksService} from './tasks.service';
import {CollapseDirective} from 'ng2-bootstrap/ng2-bootstrap';
import {BS_VIEW_PROVIDERS, DATEPICKER_DIRECTIVES, TimepickerComponent} from 'ng2-bootstrap/ng2-bootstrap';
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
  directives: [CollapseDirective,CORE_DIRECTIVES,DATEPICKER_DIRECTIVES,Calendar,TimepickerComponent, FORM_DIRECTIVES]
})
export class AddTaskComponent implements OnInit {
  taskService: TasksService;
  types = ['Motion Response', 'Mediation Statement',
            'Discovery Response', 'Pleading Response', 'Other'];
  taskTypes;
  clients;
  client;
  title;
  description;
  dueDate;
  date;
  taskType;
  dueTime = '12:00:AM';
  isCollapsed:boolean;
  typeFilled:boolean;
  titleFilled:boolean;
  editTypes:boolean;
  newType:string;
  constructor(taskService: TasksService, af:AngularFire) {
  	this.taskService=taskService;
    this.client="";
    this.taskService.userService.af.auth.subscribe((auth)=>{
      if(auth!=null){
        this.clients = this.taskService.clients;
        this.taskTypes = this.taskService.customTaskTypes;
        //this.client.updateValue(this.client.type);
      }
      else{
        this.clients= null;
      }
    });
    this.titleFilled=false;
    this.typeFilled=false;
    this.date='';

  }
  ngOnInit() {
    this.isCollapsed = true;
    this.editTypes = true;
    this.newType="";
    //this.clients = this.taskService.clients;
  }
  /*
  getDate():number {
  	//this.dueDate=this.date.toDateString();
    return this.date && this.date.getTime() || new Date().getTime();
  }
  */
  keyTitle(event:any){
    if(event.target.value!=''){
      this.titleFilled=true;
    }
    else{
      this.titleFilled=false;
    }
  }
  keyType(event:any){
    //console.log(event);
    this.typeFilled=true;
  }
  openTypes(){
    this.editTypes=!this.editTypes;
  }
  keyTime(event:any){
    //console.log(event);
  }
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
    var currentHour = moment(new Date());
    var hourDue;
    //console.log(this.dueTime.substring(6,8));
    if(this.dueTime.substring(6,8)=='AM'){
      hourDue=moment(this.dueTime, 'hh:mm: A');
    }
    else{
      var time = (parseInt(this.dueTime.substring(0,2))+12).toString()+this.dueTime.substring(2,8);
      hourDue=moment(time,'hh:mm: P');
    }
    var duration = moment.duration(hourDue.diff(currentHour));
    var differenceInHours = duration.asHours().toString();
    console.log(currentDate+"    "+futureDate+"   "+differenceInDays);
    console.log(this.dueTime + "   " +differenceInHours);
    this.taskService.addTask(this.title,this.description,this.date,this.taskType,differenceInDays,this.client,this.dueTime,differenceInHours);
    this.isCollapsed=!this.isCollapsed;
    this.title="";
    this.description="";
    this.date="";
    this.taskType="";
    this.client=null;
    this.titleFilled=false;
  }
  setClient(){
    //this.client=client;
    console.log(this.client);
  }
  addTaskType(){
    if(this.newType!=""){
      this.taskService.addTaskType(this.newType);
      this.newType="";
    }
  }
  removeTaskType(type){
    this.taskService.removeTaskType(type);
  }
}
