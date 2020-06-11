import Network from './Network';
import SolutionInfo from './SolutionInfo';

export default class DancingLinks {

  network: Network = new Network();

  addRow(row: any, columns: any[]) {
    this.network.addRow(row, columns);
  }

  solveOne(): any[] {
    const solutionInfo: SolutionInfo = this.network.resolve(1);
    if (solutionInfo.foundMaxSolutions) {
      return solutionInfo.solutions[0];
    } else {
      return [];
    }
  }

  solveLimit(limit: number): any[][] {
    const solutionInfo: SolutionInfo = this.network.resolve(limit);
    return solutionInfo.solutions;
  }

  hasMultiSolution(): boolean {
    const solutionInfo: SolutionInfo = this.network.resolve(2);
    if (solutionInfo.foundMaxSolutions) {
      return true;
    }
    return false;
  }
}