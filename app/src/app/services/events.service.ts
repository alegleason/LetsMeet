import { AngularFirestore } from '@angular/fire/firestore';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class EventsService {
  form: FormGroup;
  errorMessage: string = '';

  form_messages = {
    'Event_Name': [
      { type: 'required', message: 'Choose a name with no spaces in-between and no more than 10 letters or numbers' },
    ],
    'Event_Password': [
      { type: 'required', message: 'Your password should have at least 5 characters' },
    ],
    'Event_CPassword': [
      { type: 'required', message: 'Confirm password is required' },
    ],
    'Event_Timezone': [
      { type: 'required', message: 'Timezone is required' },
    ]
  };


  constructor(private firestore: AngularFirestore, private formBuilder: FormBuilder) {
    this.form = formBuilder.group({
      Event_Name: ['', Validators.required],
      Event_Password: ['', Validators.required],
      Event_CPassword: ['', Validators.required],
      Event_Timezone: ['', Validators.required],
      Event_Description: [''],
    });
  }

  getEvents() {
    return this.firestore.collection("events").snapshotChanges();
  }

  createEvent(data) {
    return new Promise<any>((resolve, reject) =>{
        this.firestore.collection("events")
        .add(data)
        .then(res => {}, err => reject(err));
    });
}
}


