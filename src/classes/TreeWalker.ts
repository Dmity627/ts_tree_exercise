import { ITreeNodeHandler } from "src/interfaces/ITreeNodeHandler";
import { ITreeWalker } from "src/interfaces/ITreeWalker";
import { TreeNode } from "src/models/TreeNode";

export class TreeWalker<TNode extends TreeNode, THandler extends ITreeNodeHandler<TreeNode>> implements ITreeWalker<THandler, TNode> {

  private nodes: TNode[] = [];

  public init(rawData: TNode[]): Promise<void> {
    const hashTable: {} = {};
    rawData.forEach(item => hashTable[item.id] = {...item, children: []})
    rawData.forEach((item) => {
      if(item.parentId && hashTable[item.parentId]) {
        hashTable[item.parentId].children.push(hashTable[item.id]);
      } else {
        this.nodes.push(hashTable[item.id]);
      }
    });
    this.displayTree(this.nodes);
    console.log();
    return;                    
  }

  public async reverseWalk(handler: THandler): Promise<void> {
    for (const node of this.nodes) {
      await this.traverseFromBottom(node, null, handler);
    }
    this.displayTree(this.nodes);
  } 

  private async traverseFromBottom(node: TreeNode, parent: TreeNode | null, handler: THandler): Promise<void> {
    for (const child of node.children) {
      await this.traverseFromBottom(child, node, handler);
    }
    await handler.handleNode(node, parent);
  } 

  private displayTree(nodes: TreeNode[], depth: number = 0): void {
    for (const node of nodes) {
      const indent: string = "  ".repeat(depth);
      const valueString: string = `value: ${node.value}, `;
      const valueToParentString: string = `valueToParent: ${node.valueToParent}`;
      console.log(`${indent}Node ${node.id} - condition: ${node.addValueCondition}, ${valueString}${valueToParentString}`);
      if (node.children) {
        this.displayTree(node.children, depth + 1);
      }
    }
  }
}
