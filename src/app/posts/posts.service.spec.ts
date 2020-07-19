import { TestBed } from '@angular/core/testing';

import { PostsService } from './posts.service';
import { Post } from './post.model';

describe('PostsService', () => {
  let service: PostsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostsService);

    let store = {};
    const mockLocalStorage = {
      getItem: (key: string): string => {
        return key in store ? store[key] : null;
      },
      setItem: (key: string, value: string) => {
        store[key] = `${value}`;
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      clear: () => {
        store = {};
      },
    };

    let i = 1;
    function mockGetNextId(): number {
      return i++;
    }
    spyOn(localStorage, 'getItem').and.callFake(mockLocalStorage.getItem);
    spyOn(localStorage, 'setItem').and.callFake(mockLocalStorage.setItem);
    spyOn(localStorage, 'removeItem').and.callFake(mockLocalStorage.removeItem);
    spyOn(localStorage, 'clear').and.callFake(mockLocalStorage.clear);
    spyOn<any>(service, 'getNextId').and.callFake(mockGetNextId);
  });

  it('should be created', () => {
    expect(service).toBeDefined();
  });

  describe('getPosts', () => {
    it('should retrieve posts from localStorage', async () => {
      const post = new Post({ title: 'test post' });
      localStorage.setItem('posts', JSON.stringify([post]));
      expect(await service.getPosts()).toEqual([post]);
    });

    it('should return empty array if no posts exist', async () => {
      localStorage.clear();
      expect(await service.getPosts()).toEqual([]);
    });
  });

  describe('getPostById', () => {
    it('should retrieve post from localStorage', async () => {
      const post = new Post({ id: 1, title: 'test post' });
      localStorage.setItem('posts', JSON.stringify([post]));
      expect(await service.getPostById(1)).toEqual(post);
    });

    it('should return error message when post is not found', async () => {
      localStorage.clear();
      await expectAsync(service.getPostById(1)).toBeRejectedWith(
        'No post found'
      );
    });
  });

  describe('create', () => {
    it('should add post to localStorage', async () => {
      const postData = { title: 'test post', body: 'test body' };
      await service.create({ title: 'test post', body: 'test body' });

      const testPost = jasmine.objectContaining({
        ...postData,
      });
      expect(JSON.parse(localStorage.getItem('posts'))).toEqual([testPost]);
    });
  });

  describe('delete', () => {
    it('should remove post from localStorage', async () => {
      const postData = { title: 'test post', body: 'test body' };
      const { id } = await service.create(postData);
      expect(id).toBeGreaterThan(0);
      await service.delete(id);

      const testPost = jasmine.objectContaining({ id });
      expect(JSON.parse(localStorage.getItem('posts'))).not.toEqual([testPost]);
    });
  });

  describe('update', () => {
    it('should update post on localStorage', async () => {
      const postData = { title: 'test post', body: 'test body' };
      const updateData = { title: 'test post edited' };
      const { id } = await service.create(postData);

      await service.update(id, updateData);

      const testPost = jasmine.objectContaining({
        ...postData,
        ...updateData,
      });
      expect(JSON.parse(localStorage.getItem('posts'))).toEqual([testPost]);
    });
  });
});
