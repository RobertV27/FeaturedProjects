// Find set of vertex i
function find(i, parent) {
  while (parent[i] !== i) i = parent[i];
  return i;
}

// Does union of i and j. It returns
// false if i and j are already in same
// set.
function union1(i, j, parent) {
  var a = find(i, parent);
  var b = find(j, parent);
  parent[a] = b;
}

function KruskalMST(adj) {
  let steps = [];
  let parent = Array(adj.length).fill(0);
  let edjs = [];
  // Initialize sets of disjoint sets.
  for (let i = 0; i < adj.length; i++) {
    parent[i] = i;
  }

  for (let i = 0; i < adj.length - 1; i++) {
    for (let j = i + 1; j < adj.length; j++) {
      if (adj[i][j] !== 0) {
        edjs.push([adj[i][j], i, j]);
      }
    }
  }

  edjs.sort(function (a, b) {
    return a[0] - b[0];
  });
  let edge_count = 0;
  for (let i = 0; i < edjs.length; i++) {
    let n1 = edjs[i][1];
    let n2 = edjs[i][2];
    steps.push("PE" + String(n1) + String(n2));
    if (find(n1, parent) !== find(n2, parent)) {
      union1(n1, n2, parent);
      edge_count++;
      steps.push("SE" + String(n1) + String(n2));
    }
    if (edge_count === adj.length - 1) {
      break;
    }
  }
  return steps;
}

export default KruskalMST;
