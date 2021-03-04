import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class EventsService {
  constructor(private firestore: AngularFirestore) {

  }

  getEvents() {
    return this.firestore.collection("events").snapshotChanges();
  }
}


