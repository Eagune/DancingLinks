import TableNode from './TableNode';
import RowHeader from './RowHeader';

export default class ColumnHeader extends TableNode{
  
  headerData: any;
  actives: number = 0;

  constructor(columnData) {
    super();

    this.headerData = columnData;
    this.colChain.enumerable = false;
  }

  hideColumn(hiddenNodes) {
    hiddenNodes.push(this.rowChain);
    this.rowChain.hide();
    this.forEachRow(function(row){
      const rowHeader: RowHeader = row.rowHeader;
      rowHeader.hideRow(hiddenNodes);
    });
  }

  toString() {
    return `${this.headerData}`;
  }
}