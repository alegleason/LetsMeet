import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateEventPageRoutingModule } from './create-event-routing.module';

import { CreateEventPage } from './create-event.page';
import { EventsService } from '../services/events.service';
import { ReactiveFormsModule } from '@angular/forms';

import { CalendarModule } from 'ion2-calendar';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateEventPageRoutingModule,
    ReactiveFormsModule,
    CalendarModule
    ],
  declarations: [CreateEventPage],
  providers: [ EventsService ]
})
export class CreateEventPageModule {}
