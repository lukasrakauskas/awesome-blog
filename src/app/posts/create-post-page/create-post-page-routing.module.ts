import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreatePostPageComponent } from './create-post-page.component';

const routes: Routes = [
  {
    path: '',
    component: CreatePostPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreatePostPageRoutingModule {}
