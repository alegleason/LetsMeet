import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-join-event',
  templateUrl: './join-event.page.html',
  styleUrls: ['./join-event.page.scss'],
})
export class JoinEventPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() { }

  mainpage() {
    this.router.navigateByUrl('/home');
  }

}
