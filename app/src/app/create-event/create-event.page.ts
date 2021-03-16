import { Component, OnInit } from '@angular/core';
import { EventsService } from '../services/events.service';
import { FormBuilder } from '@angular/forms';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.page.html',
  styleUrls: ['./create-event.page.scss'],
})
export class CreateEventPage implements OnInit {
  events;
  eventService: EventsService;
  isHiddenDiv1 = false;
  isHiddenDiv2 = true;

  constructor(private eventsService: EventsService, private formBuilder: FormBuilder, public toastController: ToastController){
    this.eventService = eventsService
  }

  ngOnInit() {
    this.getEvents();
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
  }

  nextForm() {
    console.log("hi");
    this.isHiddenDiv1 = true;
    this.isHiddenDiv2 = false;
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
