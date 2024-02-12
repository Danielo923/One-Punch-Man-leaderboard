function getHeroes() {
    fetch('../heroes.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch heroes');
            }
            return response.json();
        })
        .then(data => {
            localStorage.setItem("data", JSON.stringify(data));
            return data;
        })
        .catch(error => {
            console.error('Error fetching heroes:', error);
            throw error;
        });
}

function leaderboard() {
    if (localStorage.getItem("data")) {
        console.log("aiejvnsibvishbvr");
        data = JSON.parse(localStorage.getItem("data"));
    } else {
        data = JSON.stringify(getHeroes());
    }
    // const leaderboardElement = document.getElementById('leaderboard');
    // leaderboardElement.innerHTML = 
}

// localStorage.clear()
leaderboard();