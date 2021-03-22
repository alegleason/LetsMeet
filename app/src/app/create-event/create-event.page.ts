import { Component, OnInit } from '@angular/core';
import { EventsService } from '../services/events.service';
import { FormBuilder } from '@angular/forms';
import { CalendarComponentOptions } from 'ion2-calendar'
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.page.html',
  styleUrls: ['./create-event.page.scss'],
})
export class CreateEventPage implements OnInit {
  events;
  type: 'string';
  dateMulti: string[];
  eventService: EventsService;
  hiddenDivs = [false, true, true, true]; // Change to  [false, true, true, true];
  personalizedHours = true;

  constructor(private eventsService: EventsService, private formBuilder: FormBuilder, public toastController: ToastController){
    this.eventService = eventsService
  }

  personalizedClick() {
    this.personalizedHours = !this.personalizedHours;
  }

  optionsMulti: CalendarComponentOptions = {
    pickMode: 'multi'
  };

  ngOnInit() {
    this.getEvents();
  }

  onChange($event) {
    console.log($event);
  }

  submit() {
    let data = this.eventsService.form.value;
    this.eventsService.createEvent(data).then(res => {
        console.log("try")
        this.presentToast("Event was created successfully", "success")
        this.eventService.form.reset()
      })
      .catch(err => {
        this.presentToast("Error when creating event", "danger")
      });
      this.presentToast("Event was created successfully", "success")
      this.eventService.form.reset()
      this.nextForm()
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

  getEvents = () =>
     this.eventsService
     .getEvents()
     .subscribe(res =>(this.events = res));

  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      animated: true,
      color: color
    });
    toast.present();
  }
}
