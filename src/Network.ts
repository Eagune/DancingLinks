import TableNode from './TableNode';
import RowHeader from './RowHeader';
import ColumnHeader from './ColumnHeader';

interface SolutionInfo {
  solutions: any[],
  backtrackings: number
}

const defaultSolutionInfo = {
  solutions: [],
  backtrackings: 0,
};

export default class Network extends TableNode{
  
  columns: any = {};

  constructor() {
    super();

    this.rowChain.enumerable = false;
		this.colChain.enumerable = false;
  }

  thenAddColumn(columnData: any): ColumnHeader {
    let column: ColumnHeader = this.columns[columnData];
    if (column === undefined)  {
      column = new ColumnHeader(columnData);
      this.columns[columnData] = column;
      column.rowChain.spliceInto(this.rowChain.previous);
    }
    return column;
  }
  
  addRow(rowData: any, columnDatas: any[]): RowHeader {
    const row: RowHeader = new RowHeader(rowData);
    row.colChain.spliceInto(this.colChain.previous);
    columnDatas.forEach((columnData) => {
      const column = this.thenAddColumn(columnData);
      const node = new TableNode(row, column);
      node.addToHeadersChains();
    })
    return row;
  }

  resolve(solutionInfo: SolutionInfo = defaultSolutionInfo, tryingChoices: any[] = []) {
    const column = this.getMinColumn();
    
    if (column === null) {
      solutionInfo.solutions.push(tryingChoices);
    } else if (column.actives === 0) {
      solutionInfo.backtrackings++;
		} else {
      column.forEachRow((node: TableNode) => {
        if (solutionInfo.solutions.length) {
          return false;
        }
        const rowHeader = node.rowHeader;
        const trying = tryingChoices.slice();
        trying.push(rowHeader.toString());
        var hidden = [];
        rowHeader.chooseRow(hidden);
        this.resolve(solutionInfo, trying);
        this.restoreAll(hidden);
      });
    }
  }

  restoreAll(hidden) {
		for (var i = 0; i < hidden.length; i++) {
      hidden[i].restore();
		}
	}

  getMinColumn(): ColumnHeader {
    var minColum: ColumnHeader = null;
    var count = null;
    this.forEachColumn(function(columnHeader: ColumnHeader) {
      if (count === null || count > columnHeader.actives) {
        minColum = columnHeader;
        count = minColum.actives;
        if (count === 0) return false;
      }
    });
    return minColum;
  }
}