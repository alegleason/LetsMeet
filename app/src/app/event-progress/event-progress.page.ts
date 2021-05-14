import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-progress',
  templateUrl: './event-progress.page.html',
  styleUrls: ['./event-progress.page.scss'],
})
export class EventProgressPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  mainpage() {
    this.router.navigateByUrl('/home');
  }

}
