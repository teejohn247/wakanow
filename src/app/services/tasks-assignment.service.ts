import { Injectable } from '@angular/core';
import { observable, Observable, of, Subject } from 'rxjs';
//import { CalendarOptions } from '@fullcalendar/angular';

@Injectable({
  providedIn: 'root'
})
export class TasksAssignmentService {

  eventDetails: any[] = [];
  private title = new Subject<any>();
  private status = new Subject<any>();
  events$: any;

  constructor() { }

  sendStatus(num: number) {
    this.status.next(num);
  }

  getStatus() {
    return this.status.asObservable();
  }

  sendTitle(name: string) {
    this.title.next(name);
  }

  getTitle() {
    return this.title.asObservable();
  }

  getTasks(): Observable<any> {
    //this.events = this.updateTasks();
    //return Observable.of(value);
    return this.events$ = of(this.updateTasks());
  }

  taskTitles: string[] = [
    "File Transfer",
    "Machine Automation",
    "Office Review",
    "Development Setup",
    "Research Analysis",
    "Team Augmentation",
    "Onboarding Procedures",
    "Personnel Guidance",
    "Automation Arrangement",
    "Final Reporting"
  ];

  colorOptions: string[] = [
    "rgba(245,115,13, 0.2)",
    "rgba(36,163,178, 0.2)",
    "rgba(209,36,111, 0.2)",
    "rgba(209,103,178, 0.2)",
    "rgba(134,166,181, 0.2)"
  ]

  progress: string[] = [
    "p10", "p15", "p20", "p25", "p30", "p35", "p40", "p45", "p50", "p55", "p60", "p65", "p70", "p75", "p80", "p85", "p90", "p95", "p100"
  ]

  //GET RANDOM INTEGER WITHIN A RANGE
  getRandom(min: number, max: number) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  //GET DAY "LIMIT" DAYS AGO
  getPreviousDate(limit: number) {
    let date = new Date();
    date.setDate(date.getDate() - limit);
    let finalDate = date.getFullYear() + '-' + ('0' + (date.getMonth()+1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
    return finalDate;
  }

  //GET DAYS "LIMIT" DAYS IN FRONT
  getNextDateLimit(limit:number) {
    let date = new Date();
    //date.setDate(date.getDate() - this.getRandom(1, 9));
    date.setDate(date.getDate() + limit);
    let finalDate = date.getFullYear() + '-' + ('0' + (date.getMonth()+1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
    //return new Date(date.setDate(date.getDate() + 7));
    return finalDate;
  }

  //GET TODAY'S DATE
  todaysDate() {
    let date = new Date();
    let dateFormat = date.getFullYear() + '-' + ('0' + (date.getMonth()+1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
    console.log(dateFormat);
    return dateFormat;
  }


  //GENERATE A RANDOM TASK ON THE CALENDAR
  generateSingleTask() {
    let temporal = this.getRandom(0, 7);
    let classTemp = this.getRandom(0, 4);
    this.initialProgress.push(classTemp*5+10);
    //let startDate = this.getPreviousDate(temporal);
    let endLimit = this.getRandom(6, 15-temporal);
    //let endDate = this.getNextDateLimit(endLimit);

    let eventData: any = {
      title: this.taskTitles[this.getRandom(0, 10)],
      start: this.getPreviousDate(temporal),
      end: this.getNextDateLimit(endLimit),
      borderColor: 'transparent',
      backgroundColor: this.colorOptions[classTemp],
      className: this.progress[classTemp],
    }

    console.log(eventData);
    return eventData;
  }

  //GENERATE THE INITIAL VIEW OF THE CALENDAR
  generateInitialTasks() {
    let eventData: any[] = [];
    for (let i=0; i<10; i++) {
      eventData.push(this.generateSingleTask());
    }

    //console.log(this.initialProgress);
    //console.log(eventData);
    return eventData;
  }


  //setTimeout(() => {
      //this.updateTasks();
      //this.getEvents();
    //}, 1000);



  updateTasks() {
    if (this.eventDetails.length === 0) {
      this.eventDetails = this.generateInitialTasks();
    }
    else {
      console.log(this.initialProgress);
      let progressInc = this.initialProgress.map(item => {
        if(item === 100) {
          item = (this.getRandom(0, 4))*5+10;
          console.log(item)
          return item
        }
        else if((item + (this.getRandom(0, 4))*5+10) > 100) {
          item = 100;
          console.log(item)
          return item
        }
        else {
          item += (this.getRandom(0, 4))*5+10;
          console.log(item)
          return item
        }
      });

      this.initialProgress = progressInc;

      let percentProgress = progressInc.map(item => {
        //item.toString()
        //`"p"${item}.to`
        return "p"+String(item);
      })

      console.log(percentProgress);

      let tempHld = [];

      for (let i=0; i<this.eventDetails.length; i++) {
        let reqIndex = (this.initialProgress.indexOf(this.initialProgress[i]))%5;
        let color = this.colorOptions[reqIndex];
        console.log(color);
        let newData: any = {
          title: this.eventDetails[i].title,
          start: this.eventDetails[i].start,
          end: this.eventDetails[i].end,
          borderColor: 'transparent',
          backgroundColor: color,
          className: percentProgress[i],
        }
        tempHld.push(newData);
      }

      this.eventDetails = tempHld;

    }

    console.log(this.eventDetails);

    //this.eventDetails = tempHld;

    return this.eventDetails;

    //this.eventDetails =
  }



  initialProgress: number[] = [];
}
