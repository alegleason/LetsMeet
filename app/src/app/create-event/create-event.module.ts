import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateEventPageRoutingModule } from './create-event-routing.module';

import { CreateEventPage } from './create-event.page';
import { EventsService } from '../services/events.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateEventPageRoutingModule
    ],
  declarations: [CreateEventPage],
  providers: [EventsService]
})
export class CreateEventPageModule {}
