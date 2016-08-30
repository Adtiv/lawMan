import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable,FirebaseObjectObservable,FirebaseAuth } from 'angularfire2';
import { CORE_DIRECTIVES } from '@angular/common';
import {Task} from './task';
import {AddTaskComponent} from './addTask.component';
import {TasksService} from './tasks.service';
import {UserService} from '../user/user.service';
import {BS_VIEW_PROVIDERS,CollapseDirective, DROPDOWN_DIRECTIVES, BUTTON_DIRECTIVES,DATEPICKER_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';
import {Calendar} from 'primeng/primeng';
import * as moment from 'moment';
let now = moment().format('LLLL');

@Component({
  moduleId: module.id,
  selector: 'Task-List',
  templateUrl: 'taskList.component.html',
  styleUrls: ['tasks.component.css'],
  viewProviders:[BS_VIEW_PROVIDERS],
  directives: [Calendar,AddTaskComponent,CollapseDirective,DROPDOWN_DIRECTIVES,BUTTON_DIRECTIVES,CORE_DIRECTIVES,DATEPICKER_DIRECTIVES]
})
export class TaskListComponent implements OnInit {
	taskService: TasksService;
  	tasks: FirebaseListObservable<any[]>;
  	taskClients: FirebaseListObservable<any[]>;
	clients;
	client:FirebaseObjectObservable<any>;  	
	editClient:FirebaseObjectObservable<any>;
  	public isCollapsed:boolean;
  	taskKey;
  	public status:{isopen:boolean} = {isopen: false};
  	filterButtonText;
  	edit;
  	types = ['Motion Response', 'Mediation Statement',
            'Discovery Response', 'Pleading Response', 'Other']
  	title;
  	description;
  	dueDate;
  	dueTime;
  	//currentDate: Date = new Date();
  	date;
  	taskType;
  	oldType;
  	updatedTaskKey;
  	af;
  	userService:UserService
  	past:boolean;
	constructor(public auth: FirebaseAuth,af: AngularFire,taskService: TasksService, userService:UserService){
		this.taskService = taskService;
		this.af=af;
		this.userService=userService;
	}
	ngOnInit() {
		this.isCollapsed = true;
		//this.client="";
		this.edit=true;
  	    this.filterButtonText="All Tasks";
  	    this.past=false;
  	    this.auth.subscribe((data)=>{
  	    	if(data){
				this.tasks =this.taskService.getTasks('none');
				this.clients = this.taskService.clients;
  	    	}
  	    })
		console.log(this.tasks);
	}
  	toggled(open:boolean):void {
    	console.log('Dropdown is now: ', open);
  	}
	filterTasks(filter){
		this.past=false;
		if(filter=="none"){
  	      this.filterButtonText="All Tasks";
		}
		else if(filter=="motion"){
  	      this.filterButtonText="Motion Responses";
		}
		if(filter=="pleading"){
  	      this.filterButtonText="Pleading Responses";
		}
		if(filter=="mediation"){
  	      this.filterButtonText="Mediation Statements";
		}
		if(filter=="discovery"){
  	      this.filterButtonText="Discovery Responses";
		}
		if(filter=="other"){
  	      this.filterButtonText="Other";
		}
	    this.tasks = this.taskService.getTasks(filter);
		return false;
	}
	filterByColor(filterColor){
		this.taskService.filterByColor(filterColor);
		this.tasks = this.taskService.getTasks(this.taskService.taskFilter);
	}
	activeTask(task){
		if(this.taskKey==task.$key){
			this.taskKey="";
			this.taskClients=null;
		}
		else{
			this.taskKey=task.$key;
			this.taskClients=this.af.database.list('taskClients/'+this.taskKey);
		}
		return false;
	}
	pastTasks(){
		this.past=true;
		this.tasks=this.taskService.getTasks('past');
	}
	deletePastTasks(){
		this.taskService.deletePastTasks();
	}
	updateTask(){
	    var curr = new Date();
	    var due = this.taskService.parseDateISO(this.date);
	    console.log(due);
	    var currentDate=moment(curr).startOf('day');
	    var futureDate =moment(due).startOf('day');
	    var differenceInDays = futureDate.diff(currentDate, 'days');
		this.taskService.updateTask(this.updatedTaskKey,this.title,this.description,this.date,this.taskType,differenceInDays,this.dueTime,this.oldType);
		this.edit=!this.edit;
	}
	taskDetail(task){
		if(task.$key==this.taskKey){
			return false;
		}
		else{
			//this.isCollapsed=!this.isCollapsed;
			return true;
		}
	  	//this.isCollapsed=!this.isCollapsed;
	}
  	getDate():number {
  		//this.dueDate=this.date.toDateString();
    	return this.date && this.date.getTime() || new Date().getTime();
  	}
	deleteTask(task){
		console.log(task);
		this.taskService.deleteTask(task.$key, task.taskType);
		return false;
	}
	editToggle(task){
		this.edit=!this.edit;
		this.updatedTaskKey=task.$key;
		this.title=task.title;
		this.description=task.description;
		this.dueTime=task.dueTime;
		var hasClients=undefined;
		var hClients;
		this.af.database.list('taskClients/'+this.updatedTaskKey).subscribe(snap=>{
			hClients=snap;
		});
		if(hClients=""){
			console.log("true");
		}
		console.log("alskdjf"+hClients);
		if(hasClients!=undefined){
		  this.af.database.list('taskClients/'+this.updatedTaskKey).subscribe(snapshots => {
	        snapshots.forEach(snapshot => {
			  console.log(snapshot.$key);	        	
	          this.client = this.af.database.object('clients/'+this.userService.uid+'/'+snapshot.$key);
	        }); 
	      })
		  this.client.subscribe((editClient)=>{
    	  })
		}
	    //console.log(this.client)
		this.date=new Date(task.dueDate).toISOString().substring(0,10);
		this.date=this.date.substring(5,7)+'/'+this.date.substring(8,10)+'/'+this.date.substring(0,4);
		this.taskType=task.taskType;
		this.oldType=task.taskType;
		document.body.scrollTop = document.documentElement.scrollTop = 0;
	}
	closeEdit(){
		this.edit=!this.edit;
	}
	getStyle(task: Task){
		if(task.daysTillDue<=2){
			return "rgba(255,0,0,.75)";
		}
		else if(task.daysTillDue<=5){
			return "rgba(255,255,0,.8)";
		}
		else{
			return "rgba(0,255,0,.8)";
		}
	}
}
