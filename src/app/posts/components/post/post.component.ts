import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Post } from '../../post.model';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent {
  @Input() post: Post;
  @Input() partialBody = false;
  @Output() deletePost: EventEmitter<any> = new EventEmitter();

  onDeletePost(): void {
    this.deletePost.emit();
  }
}
