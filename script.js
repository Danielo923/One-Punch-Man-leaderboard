function getHeroes() {
    fetch('../heroes.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch heroes');
            }
            return response.json();
        })
        .then(data => {
            data = localStorage.setItem("data", JSON.stringify(data));
            return data;
        })
        .catch(error => {
            console.error('Error fetching heroes:', error);
            throw error;
        });
}

function leaderboard() {
    if (localStorage.getItem("data")) {
        console.log("localstorage");
        data = localStorage.getItem("data");
    } else {
        data = getHeroes();
    }
    const leaderboardElement = document.getElementById('leaderboard');
    JSON.parse(data).forEach(item => {
        const listItem = document.createElement('tr');
        listItem.classList.add('hero-card');
        listItem.innerHTML = `
            <td>${item.name}</td>
            <td class="hero-power">${item.power}</td>
            <td class="hero-rank">${item.rank}</td>
            `;
        leaderboardElement.appendChild(listItem);
    });
}

// localStorage.clear()
leaderboard();