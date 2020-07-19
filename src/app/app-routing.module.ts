import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostsPageComponent } from './posts/posts-page/posts-page.component';
import { ViewPostPageComponent } from './posts/view-post-page/view-post-page.component';

const routes: Routes = [
  { path: '', component: PostsPageComponent },
  {
    path: 'posts/:id',
    loadChildren: () =>
      import('./posts/view-post-page/view-post-page.module').then(
        (m) => m.ViewPostPageModule
      ),
  },
  {
    path: 'create-post',
    loadChildren: () =>
      import('./posts/create-post-page/create-post-page.module').then(
        (m) => m.CreatePostPageModule
      ),
  },
  {
    path: 'posts/:id/edit',
    loadChildren: () =>
      import('./posts/edit-post-page/edit-post-page.module').then(
        (m) => m.EditPostPageModule
      ),
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
