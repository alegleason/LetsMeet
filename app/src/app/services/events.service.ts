import { AngularFirestore } from '@angular/fire/firestore';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class EventsService {
  form: FormGroup;
  errorMessage: string = '';

  form_messages = {
    'Event_Name': [
      { type: 'required', message: 'Name is required' },
    ],
    'Event_Password': [
      { type: 'required', message: 'Password is required' },
    ],
    'Event_CPassword': [
      { type: 'required', message: 'Confirm password is required' },
    ],
    'Event_Timezone': [
      { type: 'required', message: 'Timezone is required' },
    ],
    'Event_StartTime': [
      { type: 'required', message: 'Start date is required' },
    ],
    'Event_EndTime': [
      { type: 'required', message: 'End date is required' },
    ]
  };


  constructor(private firestore: AngularFirestore, private formBuilder: FormBuilder) {
    this.form = formBuilder.group({
      Event_Name: ['', Validators.required],
      Event_Password: ['', Validators.required],
      Event_CPassword: ['', Validators.required],
      Event_Timezone: ['', Validators.required],
      Event_StartTime: ['', Validators.required],
      Event_EndTime: ['', Validators.required],
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


