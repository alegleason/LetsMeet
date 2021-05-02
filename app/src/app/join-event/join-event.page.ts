import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';


@Component({
  selector: 'app-join-event',
  templateUrl: './join-event.page.html',
  styleUrls: ['./join-event.page.scss'],
})
export class JoinEventPage implements OnInit {
  collectionName = 'events';
  eventList: any[];
  currentEvent: any;
  foudEvent = false;
  eventId = '';

  constructor(private router: Router, private firestore: AngularFirestore) {
    // Subscribe to the event list
    this.getEventList().subscribe(events => this.eventList = events);
  }

  ngOnInit() { }

  mainpage() {
    this.router.navigateByUrl('/home');
  }

  /* Call snapshotChanges() method which will get records and also subscribe it to get updates */
  getEventList() {
    return this.firestore.collection(this.collectionName).snapshotChanges();
    /* To read from here use
      this.eventList.forEach(event => {
        console.log(event.payload.doc.data()); - For doc data
        console.log(event.payload.doc.id); - For doc id
      });
    */
  }

  /* Call snapshotChanges() method which will get records and also subscribe it to get updates */
  getEventById(id) {
    return this.firestore.collection(this.collectionName).doc(id);
    /*
    To retrieve the specific event
    this.getEventById('wISvHFVTsfPRmR5SH1zS').get().toPromise()
    .then((docRef) => { this.currentEvent = docRef.data() })
    .catch((error) => { })
    */
  }

  joinEvent() {
    this.eventList.forEach(event => {
      if (event.payload.doc.id == this.eventId) {
        this.foudEvent = true;
        this.currentEvent = event.payload.doc.data();
        return
      }
    });
  }
}
