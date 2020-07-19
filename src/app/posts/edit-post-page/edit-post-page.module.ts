import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditPostPageComponent } from './edit-post-page.component';
import { EditPostPageRoutingModule } from './edit-post-page-routing.module';

@NgModule({
  declarations: [EditPostPageComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    EditPostPageRoutingModule,
  ],
})
export class EditPostPageModule {}
