import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditPostPageComponent } from './edit-post-page.component';

const routes: Routes = [
  {
    path: '',
    component: EditPostPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditPostPageRoutingModule {}
