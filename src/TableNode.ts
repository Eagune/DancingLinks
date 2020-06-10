import CircularListNode from './CircularListNode';
import ColumnHeader from './ColumnHeader';
import RowHeader from './RowHeader';

export default class TableNode {
  
  rowHeader: RowHeader;
  columnHeader: ColumnHeader;
  rowChain: CircularListNode = new CircularListNode(this);
  colChain: CircularListNode = new CircularListNode(this);

  constructor(rowHeader?: RowHeader, columnHeader?: ColumnHeader) {
    this.rowHeader = rowHeader;
    this.columnHeader = columnHeader;
  }

  addToHeadersChains() {
		if (this.rowHeader != null) {
      this.rowChain.spliceInto(this.rowHeader.rowChain.previous);
      this.rowHeader.actives++;
		}
		if (this.columnHeader != null) {
      this.colChain.spliceInto(this.columnHeader.colChain.previous);
      this.columnHeader.actives++;
		}
  }
  
  forEachColumn(fn) {
    this.rowChain.forEach(fn);
  }
  
  forEachRow(fn) {
    this.colChain.forEach(fn);
  }

  hideFromRowChain() {
    this.rowChain.hide();
    if (this.rowHeader != null) {
      this.rowHeader.actives--;
    }
  }

  hideFromColumnChain() {
    this.colChain.hide();
    if (this.columnHeader != null) {
      this.columnHeader.actives--;
    }
  }
  
  toString() {
		return `{${this.rowHeader} x ${this.columnHeader}}`; 
	}
}