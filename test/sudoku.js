const DancingLinks = require('../dist/bundles/DancingLinks');

function initLocationDict(init_count) {
  var dic = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0]
  ];
  var s = [];
  var i,j,k,a,b,c,d;
  var count = 0;
  while(count < init_count) {
    i = Math.floor(Math.random() * 9);
    j = Math.floor(Math.random() * 9);
    k = Math.floor(Math.random() * 9) + 1;
    a = i * 9 + j;
    if (s.indexOf(a) !== -1) continue;
    b = i * 9 + k + 80;
    if (s.indexOf(b) !== -1) continue;
    c = j * 9 + k + 161;
    if (s.indexOf(c) !== -1) continue;
    d = (Math.floor(i/3) * 3 + Math.floor(j/3)) * 9 + k + 242;
    if (s.indexOf(d) !== -1) continue;
    s.push(a);
    s.push(b);
    s.push(c);
    s.push(d);
    dic[i][j] = k;
    count++;
  }
  return dic;
}

function generateDancingLinks(loc_dic) {
  var dancing_links = new DancingLinks();
  var i,j,k,a,b,c,d,row;
  for(i = 0; i < 9; i++) {
    for(j = 0; j < 9; j++) {
      if (loc_dic[i][j]) {
        k = loc_dic[i][j];
        a = i * 9 + j;
        b = i * 9 + k + 80;
        c = j * 9 + k + 161;
        d = (Math.floor(i/3) * 3 + Math.floor(j/3)) * 9 + k + 242;
        row = (i * 9 + j) * 9 + k - 1;
        dancing_links.addRow(row, [a, b, c, d]);
      } else {
        for(k = 1; k < 10; k++) {
          a = i * 9 + j;
          b = i * 9 + k + 80;
          c = j * 9 + k + 161;
          d = (Math.floor(i/3) * 3 + Math.floor(j/3)) * 9 + k + 242;
          row = (i * 9 + j) * 9 + k - 1;
          dancing_links.addRow(row, [a, b, c, d]);
        }
      }
    }
  }
  return dancing_links;
}

for(var n = 0 ; n < 100; n++) {
  var loc_dic = initLocationDict(11);
  var dancing_links = generateDancingLinks(loc_dic);
  var solution = dancing_links.solveOne();
  console.log(solution);
}
