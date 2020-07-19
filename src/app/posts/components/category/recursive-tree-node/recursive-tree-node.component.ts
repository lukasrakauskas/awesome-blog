import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-recursive-tree-node',
  templateUrl: './recursive-tree-node.component.html',
  styleUrls: ['./recursive-tree-node.component.scss'],
})
export class RecursiveTreeNodeComponent {
  @Input() category;
  @Output() categoryChanged = new EventEmitter<any>();
}
