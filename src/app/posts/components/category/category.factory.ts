import { Injectable } from '@angular/core';
import { Category, CategoryType } from './category.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryFactory {
  private createNode(date: Date, node: Partial<Category>): Category {
    if (node.type === CategoryType.Year) {
      node.text = this.getYear(date);
    }

    if (node.type === CategoryType.Month) {
      node.text = this.getMonth(date);
    }

    if (node.type === CategoryType.Day) {
      node.text = this.getDay(date);
    }

    return new Category({ ...node });
  }

  public createYearNode(date: Date, node?: Partial<Category>): Category {
    return this.createNode(date, {
      ...node,
      type: CategoryType.Year,
      value: date.getFullYear(),
    });
  }

  public createMonthNode(date: Date, node?: Partial<Category>): Category {
    return this.createNode(date, {
      ...node,
      type: CategoryType.Month,
      value: date.getMonth(),
    });
  }

  public createDayNode(date: Date, node?: Partial<Category>): Category {
    return this.createNode(date, {
      ...node,
      type: CategoryType.Day,
      value: date.getDate(),
    });
  }

  private getYear(date: Date): string {
    return date.toLocaleString('default', { year: 'numeric' });
  }

  private getMonth(date: Date): string {
    return date.toLocaleString('default', { month: 'long' });
  }

  private getDay(date: Date): string {
    return date.toLocaleString('default', { day: 'numeric' });
  }
}
