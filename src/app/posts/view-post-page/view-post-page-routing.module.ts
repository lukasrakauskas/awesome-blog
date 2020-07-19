import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewPostPageComponent } from './view-post-page.component';

const routes: Routes = [
  {
    path: '',
    component: ViewPostPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewPostPageRoutingModule {}
