function PrimMST(adj, start_idx) {
  let steps = [];
  let result = [];
  let keys = [];
  let in_mst = [];
  for (let i = 0; i < adj.length; i++) {
    keys[i] = Number.MAX_VALUE;
    in_mst[i] = false;
  }
  keys[start_idx] = 0;
  result[start_idx] = -1;
  steps.push("SN" + String(start_idx) + String("-"));
  for (let i = 0; i < adj.length; i++) {
    let min = Number.MAX_VALUE;
    let idx = -1;
    for (let j = 0; j < adj.length; j++) {
      if (!in_mst[j] && keys[j] < min) {
        min = keys[j];
        idx = j;
      }
    }
    if (result[idx] !== -1) {
      steps.push("SE" + String(result[idx]) + String(idx));
    }
    in_mst[idx] = true;
    for (let j = 0; j < adj.length; j++) {
      if (adj[idx][j] && !in_mst[j] && adj[idx][j] < keys[j]) {
        steps.push("PE" + String(idx) + String(j));
        result[j] = idx;
        keys[j] = adj[idx][j];
      }
    }
  }

  return steps;
}

export default PrimMST;
