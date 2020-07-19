export class Category {
  type: CategoryType;
  text: string;
  value: number;
  checked = false;
  collapsed = false;
  parent: Category = null;
  nodes: Category[] = [];

  constructor(init?: Partial<Category>) {
    Object.assign(this, init);
    for (const child of this.nodes) {
      child.parent = this;
    }
  }

  addSubCategory(category: Category): void {
    this.nodes.push(category);
    category.parent = this;
  }

  isValid(date: Date): boolean {
    if (this.type === CategoryType.Day) {
      return (
        date.getDate() === this.value &&
        this.parent != null &&
        this.parent.isValidType(date, CategoryType.Month) &&
        this.parent.parent != null &&
        this.parent.parent.isValidType(date, CategoryType.Year)
      );
    }

    if (this.type === CategoryType.Month) {
      return (
        date.getMonth() === this.value &&
        this.parent != null &&
        this.parent.isValidType(date, CategoryType.Year)
      );
    }

    if (this.type === CategoryType.Year) {
      return date.getFullYear() === this.value;
    }

    return false;
  }

  private isValidType(date: Date, type: CategoryType): boolean {
    if (this.type === CategoryType.Day) {
      return date.getDate() === this.value;
    }

    if (this.type === CategoryType.Month) {
      return date.getMonth() === this.value;
    }

    if (this.type === CategoryType.Year) {
      return date.getFullYear() === this.value;
    }

    return false;
  }

  hasNodes(): boolean {
    return this.nodes != null && this.nodes.length !== 0;
  }

  toggleChecked(): void {
    this.checked = !this.checked;
    this.toggleCheckedRecursive(this.checked);
  }

  toggleCheckedRecursive(checked): void {
    if (this.hasNodes()) {
      this.nodes.forEach((node) => {
        node.checked = checked;
        node.toggleCheckedRecursive(checked);
      });
    }
  }

  toggleCollapsed(): void {
    this.collapsed = !this.collapsed;
  }
}

export enum CategoryType {
  Year,
  Month,
  Day,
}
