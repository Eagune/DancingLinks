import TableNode from './TableNode';
import ColumnHeader from './ColumnHeader';

export default class RowHeader extends TableNode{
  
  headerData: any;
  actives: number = 0;

  constructor(headerData) {
    super();

    this.headerData = headerData;
    this.rowChain.enumerable = false;
  }
  
  chooseRow(hiddenNodes) {
    this.forEachColumn(function(node: TableNode) {
      const columnHeader: ColumnHeader = node.columnHeader;
      columnHeader.hideColumn(hiddenNodes);
    });
  }

  hideRow(hiddenNodes) {
    hiddenNodes.push(this.colChain);
    this.colChain.hide();
    this.forEachColumn(function(node: TableNode) {
      hiddenNodes.push(node.colChain);
      node.colChain.hide();
      node.columnHeader.actives--;
    });
  }

  toString() {
    return `${this.headerData}`;
  }
}