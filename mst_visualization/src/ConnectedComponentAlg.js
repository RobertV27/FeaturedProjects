function floydWarshall(adj) {
  var dist = Array.from(Array(adj.length), () => new Array(adj.length).fill(0));
  for (let i = 0; i < adj.length; i++) {
    for (let j = 0; j < adj.length; j++) {
      if (adj[i][j] === 0) {
        adj[i][j] = Number.MAX_VALUE;
      }
      dist[i][j] = adj[i][j];
    }
  }
  for (let k = 0; k < adj.length; k++) {
    for (let i = 0; i < adj.length; i++) {
      for (let j = 0; j < adj.length; j++) {
        if (dist[i][k] + dist[k][j] < dist[i][j]) {
          dist[i][j] = dist[i][k] + dist[k][j];
        }
      }
    }
  }
  //console.log(dist);
  for (let i = 0; i < dist.length; i++) {
    for (let j = 0; j < dist.length; j++) {
      if (dist[i][j] === Number.MAX_VALUE) {
        return false;
      }
    }
  }
  return true;
}

export default floydWarshall;
