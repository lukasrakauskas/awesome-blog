import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Category } from '../category.model';

@Component({
  selector: 'app-category-tree',
  templateUrl: './category-tree.component.html',
  styleUrls: ['./category-tree.component.scss'],
})
export class CategoryTreeComponent {
  @Input() categories: Category[];
  @Output() categoryChanged = new EventEmitter<any>();
}
