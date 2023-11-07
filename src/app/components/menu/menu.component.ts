import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TasksAssignmentService } from 'src/app/services/tasks-assignment.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  status: boolean = false;
  val = 'Dashboard';

  @Output() menuStatus = new EventEmitter<any>();


  collapse() {
    this.status = !this.status;
    this.menuStatus.emit(this.status);
  }

  constructor(private taskService: TasksAssignmentService) {

  }

  ngOnInit(): void {
  }

  passTitle(res: string) {
    this.taskService.sendTitle(res);
    this.val = res;
  }

  //public passVal(val: any): void {



}
