import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { TasksAssignmentService } from 'src/app/services/tasks-assignment.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  pageTitle: string = 'Dashboard';
  private titleSub: Subscription;

  constructor(private taskService: TasksAssignmentService) {
    this.titleSub = taskService.getTitle().subscribe((value) => {
      this.pageTitle = value;
    })
  }

  ngOnInit(): void {
  }

}
