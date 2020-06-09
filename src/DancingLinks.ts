import Network from './Network';
import TableNode from './TableNode';

export function initWithData(data) {
  console.log(data);
}

export function dance_link(head, ans) {
  return false;
}

// var head = {};
// var ans = [];
// console.log(dance_link(head, ans));

var network = new Network();

// var rowConstraints = [];
// var colConstraints = [];
// var regionConstraints = [];
// var cellConstraints = [];

// var rows = 9;
// var cols = 9;
// var cells = rows * cols;
// var regions = 9;
// var possibleEntries = [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ];

// function initColumns() {
//   // row 约束
//   for ( var i = 0; i < rows; ++i) {
//     rowConstraints[i] = [];
//     for ( var j = 0; j < possibleEntries.length; ++j) {
//       rowConstraints[i][j] = network.thenAddColumn(possibleEntries[j] + " in row " + i);
//     }
//   }
//   // col 约束
//   for ( var i = 0; i < cols; ++i) {
//     colConstraints[i] = [];
//     for ( var j = 0; j < possibleEntries.length; ++j) {
//       colConstraints[i][j] = network.thenAddColumn(possibleEntries[j] + " in col " + i);
//     }
//   }
//   // region 约束
//   for ( var i = 0; i < regions; ++i) {
//     regionConstraints[i] = [];
//     for ( var j = 0; j < possibleEntries.length; ++j) {
//       regionConstraints[i][j] = network.thenAddColumn(possibleEntries[j] + " in region "	+ i);
//     }
//   }
//   // cell 约束
//   for ( var i = 0; i < cells; ++i) {
//     cellConstraints[i] = network.thenAddColumn("entry in cell " + i);
//   }
// }

// function initRows() {
//   for (var i = 0; i < cells; i++) {
//     for (var j = 0; j < possibleEntries.length; ++j) {
//       var row = Math.floor(i / 9);
//       var col = i % 9;
//       var region = Math.floor(col / 3) + Math.floor(i / 27) * 3;
//       const rowData = possibleEntries.length * i + j;
//       network.addRow(rowData, [
//         rowConstraints[row][j],
//         colConstraints[col][j],
//         regionConstraints[region][j],
//         cellConstraints[i]
//       ]);
//     }
//   }
// }

// initColumns();
// initRows();

/*

1 2 3 4 5 6 7

0 0 1 0 1 1 0
1 0 0 1 0 0 1
0 1 1 0 0 1 0
1 0 0 1 0 0 0
0 1 0 0 0 0 1
0 0 0 1 1 0 1

*/

/*

1 0 1 1
1 0 1 0
0 1 0 1

*/

network.addRow(1, [3, 5, 6]);
network.addRow(2, [1, 4, 7]);
network.addRow(3, [2, 3, 6]);
network.addRow(4, [1, 4]);
network.addRow(5, [2, 7]);
network.addRow(6, [4, 5, 7]);

const solutionInfo = {
  solutions: [],
  backtrackings: 0,
};
network.resolve(solutionInfo);
// console.log(solutionInfo)
// network.forEachColumn(function(node: TableNode){
//   console.log(node.toString());
// })
// network.forEachRow(function(nodeInRow: TableNode){
//   nodeInRow.forEachColumn(function(nodeInCol: TableNode){
//     console.log(nodeInCol.toString());
//   })
// })

// network.rowChain.forEach(function(columnHeader){
//   console.log(columnHeader.columnData)
// })

// network.colChain.forEach(function(rowHeader){
//   rowHeader.forEachColumn(function(node){
//     console.log(node.toString())
//   })
// })

