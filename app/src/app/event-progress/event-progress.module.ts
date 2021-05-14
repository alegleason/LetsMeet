import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EventProgressPageRoutingModule } from './event-progress-routing.module';

import { EventProgressPage } from './event-progress.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EventProgressPageRoutingModule
  ],
  declarations: [EventProgressPage]
})
export class EventProgressPageModule {}
