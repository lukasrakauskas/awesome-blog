import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryTreeComponent } from './category-tree/category-tree.component';
import { CategoryService } from './category.service';
import { CategoryFactory } from './category.factory';
import { RecursiveTreeNodeComponent } from './recursive-tree-node/recursive-tree-node.component';

@NgModule({
  declarations: [CategoryTreeComponent, RecursiveTreeNodeComponent],
  providers: [CategoryService, CategoryFactory],
  imports: [CommonModule],
  exports: [CategoryTreeComponent, RecursiveTreeNodeComponent],
})
export class CategoryModule {}
