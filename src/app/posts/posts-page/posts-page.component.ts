import { Component, OnInit } from '@angular/core';
import { PostsService } from '../posts.service';
import { Post } from '../post.model';
import { Category } from '../components/category/category.model';
import { CategoryService } from '../components/category/category.service';
import { AlertService } from 'src/app/shared/alert/alert.service';

@Component({
  selector: 'app-posts-page',
  templateUrl: './posts-page.component.html',
  styleUrls: ['./posts-page.component.scss'],
})
export class PostsPageComponent implements OnInit {
  posts: Post[] = [];
  rootCategory: Category = null;
  filteredPosts: Post[] = [];
  loading = false;
  page = 1;

  constructor(
    private postsService: PostsService,
    private categoryService: CategoryService,
    private alertService: AlertService
  ) {}

  async ngOnInit(): Promise<void> {
    this.loading = true;
    try {
      this.posts = await this.postsService.getPosts();
      this.filteredPosts = this.posts;
      this.rootCategory = await this.categoryService.getCategories();
      this.loading = false;
    } catch (error) {
      this.alertService.error('Posts could not be loaded');
      this.loading = false;
    }
  }

  filterByCategories(): void {
    this.page = 1;
    this.filteredPosts = this.categoryService.filterPosts(
      this.posts,
      this.rootCategory
    );
  }

  async deletePost(postId: number): Promise<void> {
    if (await this.postsService.delete(postId)) {
      this.posts = this.posts.filter((post) => post.id !== postId);
      this.filteredPosts = this.posts;
      this.rootCategory = await this.categoryService.getCategories();
      return;
    }

    this.alertService.error('Post coulnd not be deleted');
  }
}
