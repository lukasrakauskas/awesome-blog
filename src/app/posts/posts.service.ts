import { Injectable } from '@angular/core';
import { Post } from './post.model';

// tslint:disable-next-line: typedef
function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private getNextId(): number {
    const lastId = parseInt(localStorage.getItem('lastId'), 10) + 1;
    if (localStorage.getItem('lastId') != null) {
      localStorage.setItem('lastId', `${lastId}`);
      return lastId;
    }

    localStorage.setItem('lastId', '1');
    return 1;
  }

  async getPosts(): Promise<Post[]> {
    await sleep(200);
    return new Promise((resolve) => {
      const postsData: Post[] = JSON.parse(localStorage.getItem('posts')) || [];
      const posts = postsData.map(
        (postData) => new Post({ ...postData, date: new Date(postData.date) })
      );
      resolve(posts);
    });
  }

  async getPostById(id: number): Promise<Post | null> {
    await sleep(200);
    return new Promise(async (resolve, reject) => {
      const posts = await this.getPosts();
      const filteredPosts = posts.filter((x) => x.id === id);

      if (filteredPosts.length === 0) {
        reject('No post found');
        return;
      }
      resolve(filteredPosts[0]);
    });
  }

  async create(postDetails: Partial<Post>): Promise<Post> {
    await sleep(200);
    return new Promise(async (resolve, reject) => {
      const post = new Post(postDetails);
      post.id = this.getNextId();

      const posts = await this.getPosts();

      localStorage.setItem('posts', JSON.stringify([post, ...posts]));
      resolve(post);
    });
  }

  async delete(postId: number): Promise<boolean> {
    await sleep(200);
    return new Promise(async (resolve, reject) => {
      const posts = await this.getPosts();
      const newPosts = posts.filter((post: Post) => post.id !== postId);

      localStorage.setItem('posts', JSON.stringify(newPosts));
      resolve(true);
    });
  }

  async update(postId: number, postDetails: Partial<Post>): Promise<Post> {
    await sleep(200);
    return new Promise(async (resolve, reject) => {
      const posts = await this.getPosts();
      const postIndex = posts.findIndex((post: Post) => post.id === postId);
      if (postIndex === -1) {
        reject('No post found');
        return;
      }
      const newPost: Post = Object.assign(posts[postIndex], postDetails);
      posts[postIndex] = newPost;
      localStorage.setItem('posts', JSON.stringify(posts));
      resolve(newPost);
    });
  }
}
