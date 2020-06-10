import Network from './Network';
import SolutionInfo from './SolutionInfo';

export class DancingLinks {

  network: Network = new Network();

  addRow(row: any, columns: any[]) {
    this.network.addRow(row, columns);
  }

  solve(): SolutionInfo {
    const solutionInfo: SolutionInfo = this.network.resolve();
    return solutionInfo;
  }
}