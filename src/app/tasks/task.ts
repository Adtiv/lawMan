export class Task{
  id: number;
  title: string;
  description: string;
  dueDate: string;
  taskType: string;
  daysTillDue: number;
  complete: boolean;
  constructor(id: number,
              title: string,
              description: string,
              dueDate: string,
              taskType: string,
              daysTillDue: number,
              complete: boolean){
    this.id=id;
    this.title=title;
    this.description=description;
    this.dueDate=dueDate;
    this.taskType=taskType;
    this.daysTillDue=daysTillDue;
    this.complete=complete;
  }
}