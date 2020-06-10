import TableNode from './TableNode';
import RowHeader from './RowHeader';
import CircularListNode from './CircularListNode';

export default class ColumnHeader extends TableNode{
  
  headerData: any;
  actives: number = 0;

  constructor(columnData) {
    super();

    this.headerData = columnData;
    this.colChain.enumerable = false;
  }

  hideColumn(): CircularListNode[] {
    let hiddenNodes: CircularListNode[] =[];
    this.rowChain.hide();
    hiddenNodes.push(this.rowChain);
    this.forEachRow(function(row){
      const rowHeader: RowHeader = row.rowHeader;
      const rowHiddens: CircularListNode[] = rowHeader.hideRow();
      hiddenNodes = hiddenNodes.concat(rowHiddens);
    });
    return hiddenNodes;
  }

  toString() {
    return `${this.headerData}`;
  }
}