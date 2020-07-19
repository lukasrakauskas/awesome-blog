import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PostsService } from '../posts.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Post } from '../post.model';
import { AlertService } from 'src/app/shared/alert/alert.service';

@Component({
  selector: 'app-edit-post-page',
  templateUrl: './edit-post-page.component.html',
  styleUrls: ['./edit-post-page.component.scss'],
})
export class EditPostPageComponent implements OnInit {
  post: Post;
  postForm: FormGroup;
  submitted = false;
  loading = true;

  constructor(
    private formBuilder: FormBuilder,
    private postsService: PostsService,
    private router: Router,
    private route: ActivatedRoute,
    private alertService: AlertService
  ) {
    this.postForm = this.formBuilder.group({
      title: ['', Validators.required],
      body: ['', Validators.required],
    });
  }

  async ngOnInit(): Promise<void> {
    this.loading = true;
    const postId = parseInt(this.route.snapshot.paramMap.get('id'), 10);
    try {
      this.post = await this.postsService.getPostById(postId);
      this.postForm.patchValue(this.post);
      this.loading = false;
    } catch (error) {
      this.router.navigate(['/']);
      this.alertService.error('Post could not be loaded');
      this.loading = false;
    }
  }

  get controls(): any {
    return this.postForm.controls;
  }

  async onSubmit(postData: Partial<Post>): Promise<void> {
    if (!this.postForm.valid) {
      this.submitted = true;
      return;
    }

    try {
      await this.postsService.update(this.post.id, postData);
      this.router.navigate(['/']);
      this.alertService.success('Post updated successfully!');
    } catch (error) {
      this.alertService.error('Failed to update a post.');
    }
  }
}
