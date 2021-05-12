import { Component, OnInit } from '@angular/core';
import { EventsService } from '../services/events.service';
import { FormBuilder } from '@angular/forms';
import { CalendarComponentOptions } from 'ion2-calendar'
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { APP_NAME } from '../../const'

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.page.html',
  styleUrls: ['./create-event.page.scss'],
})

export class CreateEventPage implements OnInit {
  events;
  type: 'string';
  dateMulti: string[];
  preselectedDates: string[];
  eventService: EventsService;
  hiddenDivs = [false, true, true, true]; // Default it to  [false, true, true, true];
  personalizedHours = true;
  btnDates = true;
  chosenDates = [];
  eventTime = '';
  timeZone: string;
  eventName = '';
  eventDescription = '';
  eventId = '';
  eventLink = '/join-event?eventId='

  constructor(private firestore: AngularFirestore, private eventsService: EventsService, private formBuilder: FormBuilder, public toastController: ToastController, private router: Router){
    this.eventService = eventsService
  }

  ngOnInit() {
    this.getEvents();
  }

  personalizedClick(e) {
    this.personalizedHours = e.currentTarget.checked;
    if (this.chosenDates.length > 0 && !e.currentTarget.checked) {
      this.btnDates = true;
    } else if (this.chosenDates.length > 0 && e.currentTarget.checked) {
      this.btnDates = false; // false == show
    }
  }

  optionsMulti: CalendarComponentOptions = {
    pickMode: 'multi'
  };

  mainpage() {
    this.router.navigateByUrl('/home');
  }

  joinEvent() {
    this.router.navigateByUrl(this.eventLink);
  }

  edit() {
    this.hiddenDivs = [false, true, true, true];
  }

  checkTimes() {
    if(!this.personalizedHours){
      if (this.timeZone && this.eventTime && this.chosenDates.length > 0) {
        this.btnDates = false;
      }
    }
  }

  onChange($event) {
    if ($event.length > 0) {
      this.btnDates = false;
    } else {
      this.btnDates = true;
    }
    this.chosenDates = $event;
    this.preselectedDates = this.chosenDates;
  }

  submit() {
    // Retrieving dates objects from calendar
    var arrayDates: Date[] = [];
    for (let i = 0; i < this.chosenDates.length; i++) {
      let year = this.chosenDates[i].format('YYYY');
      let month = this.chosenDates[i].format('MM');
      let day = this.chosenDates[i].format('DD');
      var stringDate: string;
      if(this.eventTime){
        stringDate = year + '-' + month + '-' + day + 'T' + this.eventTime;
      }else{
        stringDate = year + '-' + month + '-' + day + 'T00:00:00';
      }
      arrayDates.push(new Date(stringDate));
    }

    let data = this.eventsService.form.value;
    data['Event_Dates'] = arrayDates;

    // Create the event by calling the service and retrieving the id variable
    this.eventsService.addEvent(data).then(docRef => {
      console.log("Document written with ID: ", docRef.id);
      this.eventId = docRef.id;
      this.eventLink = this.eventLink + this.eventId;
      this.nextForm()
      this.presentToast('Event successfully created', 'success');
    })
    .catch(error => {
      console.error("Error adding document: ", error)
      this.presentToast('Error adding event', 'danger')
    })

  }

  nextForm() {
    for (let i = 0; i < this.hiddenDivs.length - 1; i++) {
      if (this.hiddenDivs[i] == false) {
        this.hiddenDivs[i] = true
        this.hiddenDivs[i+1] = false
        break
      }
    }

    this.eventName = this.eventsService.form.value['Event_Name']
    this.eventDescription = this.eventsService.form.value['Event_Description']
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

  copyToClipboard(val: string){
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    this.presentToast('Copied to clipboard!', 'success');
  }
}
