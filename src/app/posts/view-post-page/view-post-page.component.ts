import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';
import { AlertService } from 'src/app/shared/alert/alert.service';

@Component({
  selector: 'app-view-post-page',
  templateUrl: './view-post-page.component.html',
  styleUrls: ['./view-post-page.component.scss'],
})
export class ViewPostPageComponent implements OnInit {
  post: Post;
  loading = true;

  constructor(
    private postsService: PostsService,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService
  ) {}

  async ngOnInit(): Promise<void> {
    const postId = parseInt(this.route.snapshot.paramMap.get('id'), 10);
    this.loading = true;
    try {
      this.post = await this.postsService.getPostById(postId);
      this.loading = false;
    } catch (error) {
      this.router.navigate(['/']);
      this.alertService.error('Post could not be loaded');
      this.loading = false;
    }
  }

  async deletePost(): Promise<void> {
    if (await this.postsService.getPostById(this.post.id)) {
      this.router.navigate(['/']);
      return;
    }

    this.alertService.error('Post was not deleted');
  }
}
