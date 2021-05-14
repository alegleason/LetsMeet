import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JoinEventPageRoutingModule } from './join-event-routing.module';

import { JoinEventPage } from './join-event.page';

import { CalendarModule } from 'ion2-calendar';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JoinEventPageRoutingModule,
    CalendarModule
  ],
  declarations: [JoinEventPage]
})
export class JoinEventPageModule {}
