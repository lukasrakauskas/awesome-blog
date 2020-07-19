import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

import { PostsService } from './posts.service';
import { PostComponent } from './components/post/post.component';
import { PostsPageComponent } from './posts-page/posts-page.component';
import { CategoryModule } from './components/category/category.module';
import { AlertModule } from '../shared/alert/alert.module';

@NgModule({
  declarations: [PostComponent, PostsPageComponent],
  providers: [PostsService],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    CategoryModule,
    AlertModule,
    NgxPaginationModule,
  ],
  exports: [PostComponent],
})
export class PostsModule {}
