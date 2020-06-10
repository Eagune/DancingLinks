import TableNode from './TableNode';
import ColumnHeader from './ColumnHeader';
import CircularListNode from './CircularListNode';

export default class RowHeader extends TableNode{
  
  headerData: any;
  actives: number = 0;

  constructor(headerData) {
    super();

    this.headerData = headerData;
    this.rowChain.enumerable = false;
  }
  
  chooseRow(): CircularListNode[] {
    let hiddenNodes: CircularListNode[] = [];
    this.forEachColumn(function(node: TableNode) {
      const columnHeader: ColumnHeader = node.columnHeader;
      const columnHiddens: CircularListNode[] = columnHeader.hideColumn();
      hiddenNodes = hiddenNodes.concat(columnHiddens);
    });
    return hiddenNodes;
  }

  hideRow(): CircularListNode[] {
    let hiddenNodes: CircularListNode[] = [];
    hiddenNodes.push(this.colChain);
    this.colChain.hide();
    this.forEachColumn(function(node: TableNode) {
      hiddenNodes.push(node.colChain);
      node.hideFromColumnChain();
    });
    return hiddenNodes;
  }

  toString() {
    return `${this.headerData}`;
  }
}