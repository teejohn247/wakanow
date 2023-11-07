import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavigationEnd,Router } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'scheduler';
  isShow=false;
  menuStat: boolean = false;
  showHeader: boolean = true;

  constructor(private router: Router) {
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        if (val.url == '/register' || val.url == '/login') {
          this.showHeader = false;
        } else {
          this.showHeader = true;
        }
      }
    });
  }


  public getStatus(menuStatus: any) {
    this.menuStat = menuStatus;
  }
}
