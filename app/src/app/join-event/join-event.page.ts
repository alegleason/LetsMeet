import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-join-event',
  templateUrl: './join-event.page.html',
  styleUrls: ['./join-event.page.scss'],
})
export class JoinEventPage implements OnInit {
  collectionName = 'events';
  eventList: any[];
  currentEvent: any;
  foundEvent = false;
  eventId = '';
  hiddenDivs = [false, true, true, true]; // Default it to  [false, true, true, true];
  subscription: any;
  participantName = '';

  constructor(private router: Router, private firestore: AngularFirestore, private route: ActivatedRoute, public toastController: ToastController) {
    // Subscribe to the event list
    this.subscription = this.getEventList().subscribe(async events => {
      await (this.eventList = events);
      // this will wait until this.events has finished loading
      this.checkForParams();
    });
  }

  ngOnInit() { }

  ngOnDestroy()  {
    this.subscription.unsubscribe();
  }

  checkForParams() {
    this.route.queryParams.subscribe(params => {
      let eventId = params['eventId'];

      // If event id is not undefined, join
      if (eventId) {
        this.eventId = eventId;
        this.joinEvent();
      }
    });
  }

  mainpage() {
    this.router.navigateByUrl('/home');
  }

  /* Call snapshotChanges() method which will get records and also subscribe it to get updates.
    To read from here use:
    this.eventList.forEach(event => {
      console.log(event.payload.doc.data()); // For doc data
      console.log(event.payload.doc.id); // For doc id
    });
  */
  getEventList() {
    return this.firestore.collection(this.collectionName).snapshotChanges();

  }

  /*
    To retrieve the specific event
    this.getEventById('wISvHFVTsfPRmR5SH1zS').get().toPromise()
    .then((docRef) => { this.currentEvent = docRef.data() })
    .catch((error) => { })
    */
  getEventById(id) {
    return this.firestore.collection(this.collectionName).doc(id);
  }

  joinEvent() {
    this.eventList.forEach(event => {
      if (event.payload.doc.id == this.eventId) {
        this.foundEvent = true;
        this.currentEvent = event.payload.doc.data();
        return
      }
    });
    if (this.foundEvent) {
      this.nextForm()
    } else {
      this.presentToast('Could not find event, try again!', 'danger');
    }

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

  anonName(e) {
    let isChecked = !e.currentTarget.checked
    // If it is checked, assign as name 'anon', else clear
    if (isChecked) {
      this.participantName = 'Anonymous'
    } else {
      this.participantName = ''
    }
  }

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
