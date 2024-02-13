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
    let data;
    if (localStorage.getItem("data")) {
        console.log("localstorage");
        data = localStorage.getItem("data");
    } else {
        data = getHeroes();
    }
    const eliteLeaderboardElement = document.getElementById('eliteLeaderboard');
    const leaderboardElement = document.getElementById('leaderboard');
    for (let i = 0; i < 10; i++) {
        const item = JSON.parse(data)[i];
        const listItem = document.createElement('tr');
        listItem.classList.add('elite-hero-card');
        listItem.innerHTML = `
            <td><img class="elite-hero-image" src="${item.image}" alt="Foto of ${item.name}"></td>
            <td class="elite-hero-name">${item.name}</td>
            <td class="elite-hero-rank">${item.rank}</td>
        `;
        eliteLeaderboardElement.appendChild(listItem);
    }
    for (let i = 10; i < data.length; i++) {
        const item = JSON.parse(data)[i];
        const listItem = document.createElement('tr');
        listItem.classList.add('hero-card');
        listItem.innerHTML = `
            <td><img class="hero-image" src="${item.image}" alt="Foto of ${item.name}"></td>
            <td class="hero-name">${item.name}</td>
            <td class="hero-rank">${item.rank}</td>
        `;
        leaderboardElement.appendChild(listItem);
    }
}

// localStorage.clear()
leaderboard();