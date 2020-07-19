import { Injectable } from '@angular/core';
import { PostsService } from '../../posts.service';
import { Post } from '../../post.model';
import { Category } from './category.model';
import { CategoryFactory } from './category.factory';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(
    private postsService: PostsService,
    private categoryFactory: CategoryFactory
  ) {}

  async getCategories(): Promise<Category> {
    const posts: Post[] = await this.postsService.getPosts();

    const root: Category[] = posts.reduce((categories, post) => {
      const date = new Date(post.date);
      const year = date.getFullYear();
      const month = date.getMonth();
      const day = date.getDate();

      const yearIndex = categories.findIndex((item) => item.value === year);

      if (yearIndex === -1) {
        const dayNode = this.categoryFactory.createDayNode(date);
        const monthNode = this.categoryFactory.createMonthNode(date, {
          nodes: [dayNode],
        });
        const yearNode = this.categoryFactory.createYearNode(date, {
          nodes: [monthNode],
        });

        categories.push(yearNode);
        return categories;
      }

      const monthIndex = categories[yearIndex].nodes.findIndex(
        (child) => child.value === month
      );

      if (monthIndex === -1) {
        const dayNode = this.categoryFactory.createDayNode(date);
        const monthNode = this.categoryFactory.createMonthNode(date, {
          nodes: [dayNode],
        });

        categories[yearIndex].addSubCategory(monthNode);
        return categories;
      }

      if (
        categories[yearIndex].nodes[monthIndex].nodes.findIndex(
          (item) => item.value === day
        ) === -1
      ) {
        const dayNode = this.categoryFactory.createDayNode(date);
        categories[yearIndex].nodes[monthIndex].addSubCategory(dayNode);
      }

      return categories;
    }, []);

    return new Category({ value: -1, text: 'All', nodes: [...root] });
  }

  filterPosts(posts: Post[], rootCategory: Category): Post[] {
    const filterCategories = this.flattenCategories(rootCategory).filter(
      (category) => category.checked
    );

    return posts.filter((post) =>
      filterCategories.some((category) => category.isValid(new Date(post.date)))
    );
  }

  private flattenCategories(rootCategory: Category): Category[] {
    const stack = [rootCategory];
    const result = [];

    while (stack.length) {
      const next = stack.pop();
      if (Array.isArray(next.nodes)) {
        stack.push(...next.nodes);
        result.push(next);
      }
    }

    return result;
  }
}
