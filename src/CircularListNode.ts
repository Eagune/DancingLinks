export default class CircularListNode {
  
  next: CircularListNode = this;
  previous: CircularListNode = this;
  data: any = null;
  hidden: boolean = false;
  enumerable: boolean;

  constructor(data: any) {
    this.data = data;
    this.enumerable = data !== undefined ? true : false;
  }

  forEach(fn: Function) {
    let nextNode: CircularListNode = this;
    do {
      let currentNode: CircularListNode = nextNode;
      nextNode = currentNode.next;
      const result = currentNode.enumerable ? fn(currentNode.data, currentNode) : true;
      if (result === false) break;
    } while (nextNode !== this);
  }

  push(data) {
    let node: CircularListNode = new CircularListNode(data);
    node.spliceInto(this);
  }

  spliceInto(newPrevious: CircularListNode) {
    this.previous.next = newPrevious.next;
    this.previous = newPrevious;
    newPrevious.next.previous = this;
    newPrevious.next = this;
  }

  hide() {
    if (this.hidden === false) {
      this.hidden = true;
      this.next.previous = this.previous;
      this.previous.next = this.next;
    }
  }

  restore() {
    if (this.hidden === true) {
      this.hidden = false;
      this.next.previous = this;
      this.previous.next = this;
    }
  }
}