import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/shared/alert/alert.service';

@Component({
  selector: 'app-create-post-page',
  templateUrl: './create-post-page.component.html',
  styleUrls: ['./create-post-page.component.scss'],
})
export class CreatePostPageComponent implements OnInit {
  postForm: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private postsService: PostsService,
    private router: Router,
    private alertService: AlertService
  ) {
    this.postForm = this.formBuilder.group({
      title: ['', Validators.required],
      body: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  get controls(): any {
    return this.postForm.controls;
  }

  async onSubmit(postData: Partial<Post>): Promise<void> {
    if (!this.postForm.valid) {
      this.submitted = true;
      return;
    }

    this.postForm.reset();
    this.submitted = false;
    try {
      await this.postsService.create(postData);
      this.router.navigate(['/']);
      this.alertService.success('Post created successfully!');
    } catch (error) {
      this.alertService.error('Failed to create a post.');
    }
  }
}
