import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-progress',
  templateUrl: './event-progress.page.html',
  styleUrls: ['./event-progress.page.scss'],
})
export class EventProgressPage implements OnInit {
  hiddenDivs = [false, true, true, true, true];
  eventId = '';
  eventPwd = '';

  constructor(private router: Router) { }

  ngOnInit() {
  }

  mainpage() {
    this.router.navigateByUrl('/home');
  }

  nextForm() {
    for (let i = 0; i < this.hiddenDivs.length - 1; i++) {
      if (this.hiddenDivs[i] == false) {
        this.hiddenDivs[i] = true
        this.hiddenDivs[i+1] = false
        break
      }
    }
  }

}
