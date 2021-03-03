import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.page.html',
  styleUrls: ['./create-event.page.scss'],
})
export class CreateEventPage implements OnInit {
  eventName: string = ""
  eventPassword: string = ""
  cEventPassword: string = ""
  eventTimezone: string = ""
  eventStartTime: string = ""
  eventEndTime: string = ""
  eventDescription: string = ""

  constructor() { }

  ngOnInit() {
  }

  login() {
    const { eventName, eventPassword, cEventPassword, eventTimezone, eventStartTime, eventEndTime, eventDescription } = this
    console.log("name", eventName)
    console.log("pass", eventPassword)
    console.log("cpass", cEventPassword)
    console.log("timezone", eventTimezone)
    console.log("starttime", eventStartTime)
    console.log("endtime", eventEndTime)
    console.log("description", eventDescription)
  }

}
