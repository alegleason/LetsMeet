import { AngularFirestore } from '@angular/fire/firestore';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class EventsService {
  form: FormGroup;
  errorMessage: string = '';

  form_messages = {
    'Event_Name': [
      { type: 'required', message: 'Choose a name with no more than 10 letters or numbers' },
    ],
    'Event_Password': [
      { type: 'required', message: 'Your password should have at least 5 characters' },
    ],
    'Event_CPassword': [
      { type: 'required', message: 'Passwords do not match. Try again' },
    ],
  };

  passwordsMatch(cg: FormGroup): {[err: string]: any} {
    let pwd1 = cg.get('Event_Password');
    let pwd2 = cg.get('Event_CPassword');
    let rv: {[error: string]: any} = {};
    if ((pwd1.touched || pwd2.touched) && pwd1.value !== pwd2.value) {
      rv['passwordMismatch'] = true;
      //pwd1.hasError = true;
      pwd2.setErrors({'incorrect': true});

    }
    console.log(rv);
    return rv;
  }


  constructor(private firestore: AngularFirestore, private formBuilder: FormBuilder) {
    this.form = formBuilder.group({
      Event_Name: ['', Validators.required],
      Event_Password: ['', Validators.required],
      Event_CPassword: ['', Validators.required],
      Event_Description: [''],
    }, { validator: this.passwordsMatch });
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
