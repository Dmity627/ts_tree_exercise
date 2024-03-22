import { ITreeNodeHandler } from "src/interfaces/ITreeNodeHandler";
import { TreeNode } from "src/models/TreeNode";

export class TreeNodeHandler<TNode extends TreeNode> implements ITreeNodeHandler<TNode> {
  
  public async handleNode(node: TNode, parent?: TNode): Promise<void> {
    if (node.addValueCondition) {
        const childrenValueSum: number = this.calculateChildrenValueSum(node.children);
        node.value += childrenValueSum;
    } else {
        if (parent) {
            parent.value += this.calculateChildrenValueToParent(node.children) + node.valueToParent + node.value;
            node.context = true;
            node.value = 0;
        }
    }
  }

  private calculateChildrenValueSum(children: TreeNode[]): number {
      return children.reduce((sum, child) => {
          if (!child.context) {
              return sum + child.valueToParent;
          } else {
              return sum;
          }
      }, 0);
  }

  private calculateChildrenValueToParent(children: TreeNode[]): number {
      return children.reduce((sum, child) => {
          if (!child.context) {
              return sum + child.valueToParent;
          } else {
              return sum;
          }
      }, 0);
  }
} 