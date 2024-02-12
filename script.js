function getHeroes() {
    fetch('heroes.json')
    .then(response => response.json())
    .then(data => data);
    return data;
}
function leaderboard() {
   const leaderboardElement = document.getElementById('leaderboard');
    console.log(getHeroes());
//    leaderboardElement.innerHTML = 
}

leaderboard();