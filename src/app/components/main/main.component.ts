import { Component, OnInit } from '@angular/core';
// import { CalendarOptions } from '@fullcalendar/core';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { Subscription } from 'rxjs';
import { TasksAssignmentService } from 'src/app/services/tasks-assignment.service';



@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  totalAvg: number = 0;
  // calendarOptions: CalendarOptions | undefined;
  eventDetails: any[] = [];
  pageTitle: string = "Dashboard";
  private titleSub: Subscription;

  constructor(private taskService: TasksAssignmentService) {
    //setTimeout(() => {
    //this.updateTasks();
    //}, 10000);

    this.titleSub = taskService.getTitle().subscribe((value) => {
      this.pageTitle = value;
    })


    // this.calendarOptions = {
    //   headerToolbar: {
    //     left: 'title,prev,next',
    //     center: '',
    //     right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    //   },
    //   views: {
    //     dayGrid: { // name of view
    //       titleFormat: { month: 'long', year: 'numeric' },
    //       dayHeaderFormat: { weekday: 'narrow', day: 'numeric'}
    //       // other view-specific options here
    //     },
    //   },
    //   contentHeight: 480,
    //   visibleRange: function(currentDate){
    //     let startDate = new Date(currentDate.valueOf());
    //     let endDate = new Date(currentDate.valueOf());

    //     startDate.setDate(startDate.getDate()-9);
    //     endDate.setDate(endDate.getDate()+7);

    //     return {
    //       start: startDate,
    //       end: endDate
    //     };
    //   },
    //   initialView: 'dayGrid',
    //   events: [...this.eventDetails],
    //   weekends: true,
    //   editable: true,
    //   selectable: true,
    //   selectMirror: true,
    //   dayMaxEvents: true,
    // };

  }


  ngOnInit(): void {
    setInterval(() => {
      //this.updateTasks();
      this.getEvents();
      this.calculateOverallPercent();
    }, 10000);
  }

  getEvents() {
    // this.taskService.getTasks().subscribe({
      // next: (task) => {
      //   this.eventDetails = task;

      //   this.calendarOptions = {
      //     headerToolbar: {
      //       left: 'title,prev,next',
      //       center: '',
      //       right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
      //     },
      //     views: {
      //       dayGrid: { // name of view
      //         titleFormat: { month: 'long', year: 'numeric' },
      //         dayHeaderFormat: { weekday: 'narrow', day: 'numeric'}
      //         // other view-specific options here
      //       },
      //     },
      //     contentHeight: 480,
      //     visibleRange: function(currentDate){
      //       let startDate = new Date(currentDate.valueOf());
      //       let endDate = new Date(currentDate.valueOf());

      //       startDate.setDate(startDate.getDate()-9);
      //       endDate.setDate(endDate.getDate()+7);

      //       return {
      //         start: startDate,
      //         end: endDate
      //       };
      //     },
      //     initialView: 'dayGrid',
      //     events: [...this.eventDetails],
      //     weekends: true,
      //     editable: true,
      //     selectable: true,
      //     selectMirror: true,
      //     dayMaxEvents: true,
      //   };
    //   }
    // })
  }

  calculateOverallPercent() {
    let sum = 0
    for (let i=0; i<this.eventDetails.length; i++) {
      let percent = this.eventDetails[i].className;

      //console.log(percent);
      sum += Number(percent.slice(1));

      console.log(sum);

    }

    this.totalAvg = sum/10;
    console.log(this.totalAvg);
  }

  staff: any[] = [
    {
      name: "Davids Ryan",
      role: "Program Manager",
      img: "../../../assets/img/avatar1.png"
    },
    {
      name: "Joyce Reina",
      role: "Technical Director",
      img: "../../../assets/img/avatar2.png"
    },
    {
      name: "Matthew Phillips",
      role: "Financial Lead",
      img: "../../../assets/img/avatar3.png"
    },
    {
      name: "Fred Dairy",
      role: "Frontend Developer",
      img: "../../../assets/img/avatar4.png"
    },
    {
      name: "Luke Thames",
      role: "Utilities Manager",
      img: "../../../assets/img/avatar5.png"
    },
    {
      name: "Ethan Wright",
      role: "Backend Developer",
      img: "../../../assets/img/avatar6.png"
    },
    {
      name: "Mercy Frames",
      role: "HR Manager",
      img: "../../../assets/img/avatar7.png"
    },
    {
      name: "Paul Giroud",
      role: "Sales Specialist",
      img: "../../../assets/img/avatar8.png"
    },
    {
      name: "Oreo Peters",
      role: "Marketing Head",
      img: "../../../assets/img/avatar9.png"
    },
    {
      name: "Kate Moore",
      role: "Operations Manager",
      img: "../../../assets/img/avatar10.png"
    }
  ]


  /*

  updateTasks() {
    if (this.eventDetails.length == 0) {
      this.eventDetails = this.generateInitialTasks();
    }
    else {
      let progressInc = this.initialProgress.map(item => {
        if(item == 100) {
          item = (this.getRandom(0, 5))*5+10;
        }
        else if((item + (this.getRandom(0, 5))*5+10) > 100) {
          item= 100;
        }
        else {
          item += (this.getRandom(0, 5))*5+10;
        }
      });

      let percentProgress = progressInc.map(item => {
        "p"+String(item);
      })

      for (let i=0; i<this.eventDetails.length; i++) {
        this.eventDetails[i].className[0] = percentProgress[i];
      }

    }

    this.eventDetails = this.eventDetails.slice();

    return this.eventDetails;

    //this.eventDetails =
  }



  initialProgress: number[] = [];


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
    let classTemp = this.getRandom(0, 5);
    this.initialProgress.push(classTemp*5+10);
    //let startDate = this.getPreviousDate(temporal);
    let endLimit = this.getRandom(6, 15-temporal);
    //let endDate = this.getNextDateLimit(endLimit);

    let eventData: any = {
      title: this.taskTitles[this.getRandom(0, 10)],
      start: this.getPreviousDate(temporal),
      end: this.getNextDateLimit(endLimit),
      borderColor: 'transparent',
      backgroundColor: this.colorOptions[classTemp%5],
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


  eventDetails = this.generateInitialTasks();

  /*
  eventDetails = [
    { title: 'event 1', start: '2022-03-15', end: '2022-03-31', borderColor: 'transparent', backgroundColor: 'rgba(135,130,146, 0.2)', className: ['percent'] },
    { title: 'event 2', start: '2022-03-15', end: '2022-03-25', className: ['percent']},
    { title: 'event 1', start: '2022-03-15', end: '2022-03-31', color: '#f98777' },
    { title: 'event 1', start: '2022-03-15', end: '2022-03-31', color: '#f98777' },
    { title: 'event 1', start: '2022-03-15', end: '2022-03-31', color: '#f98777' },
    { title: 'event 1', start: '2022-03-15', end: '2022-03-31', color: '#f98777' },
    { title: 'event 1', start: '2022-03-15', end: '2022-03-31', color: '#f98777' },
    { title: 'event 1', start: '2022-03-15', end: '2022-03-31', color: '#f98777' },
    { title: 'event 1', start: '2022-03-15', end: '2022-03-31', color: '#f98777' },
    { title: 'event 1', start: '2022-03-16', end: '2022-03-31', color: '#f98777' },
  ];

  */





}
