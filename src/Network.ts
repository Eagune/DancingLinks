import TableNode from './TableNode';
import RowHeader from './RowHeader';
import ColumnHeader from './ColumnHeader';
import SolutionInfo from './SolutionInfo';


export default class Network extends TableNode{
  
  defaultSolutionInfo: SolutionInfo = {
    solutions: [],
    backtrackings: 0,
    foundMaxSolutions: false,
  };

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

  resolve(maxSolution: number, solutionInfo: SolutionInfo = this.defaultSolutionInfo, tryingChoices: any[] = []) {
    const column = this.getMinColumn();

    if (column === null) {
      solutionInfo.solutions.push(tryingChoices);
    } else if (column.actives === 0) {
      solutionInfo.backtrackings++;
		} else {
      const network = this;
      column.forEachRow(function(node: TableNode) {
        const rowHeader = node.rowHeader;
        const trying = tryingChoices.slice();
        trying.push(rowHeader.toString());
        const hidden = rowHeader.chooseRow();
        network.resolve(maxSolution, solutionInfo, trying);
        network.restoreAll(hidden);
        if (maxSolution !== null && solutionInfo.solutions.length >= maxSolution) {
          solutionInfo.foundMaxSolutions = true;
          return false;
        }
      });
    }
    return solutionInfo;
  }

  restoreAll(hidden) {
		for (var i = 0; i < hidden.length; i++) {
      const node = hidden[i];
      node.restore();
      if(node.rowHeader) {
        node.rowHeader.actives++;
      }
      if(node.columnHeader) {
        node.columnHeader.actives++;
      }
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