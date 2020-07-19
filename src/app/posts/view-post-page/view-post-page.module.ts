import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewPostPageComponent } from './view-post-page.component';
import { ViewPostPageRoutingModule } from './view-post-page-routing.module';
import { PostsModule } from '../posts.module';

@NgModule({
  declarations: [ViewPostPageComponent],
  imports: [CommonModule, PostsModule, ViewPostPageRoutingModule],
})
export class ViewPostPageModule {}
