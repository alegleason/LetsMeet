import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EventProgressPage } from './event-progress.page';

const routes: Routes = [
  {
    path: '',
    component: EventProgressPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventProgressPageRoutingModule {}
