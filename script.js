function getHeroes() {
  return fetch('heroes.json')
    .then(response => response.json())
    .then(data => data);
}
function leaderboard() {
    
}