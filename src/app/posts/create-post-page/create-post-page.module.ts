import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreatePostPageComponent } from './create-post-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreatePostPageRoutingModule } from './create-post-page-routing.module';

@NgModule({
  declarations: [CreatePostPageComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CreatePostPageRoutingModule,
  ],
})
export class CreatePostPageModule {}
