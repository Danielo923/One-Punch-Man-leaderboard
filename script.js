let sortFilter = null;

function getHeroes() {
    fetch('../heroes.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch heroes');
            }
            return response.json();
        })
        .then(data => {
            data.sort(function(a, b) {
                return a.rating - b.rating;
            });
            data = localStorage.setItem("data", JSON.stringify(data));
            return data;
        })
        .catch(error => {
            console.error('Error fetching heroes:', error);
            throw error;
        });
}

function sort(data) {
    if (sortFilter != null) {
        data = data.filter(function(item) {
            return item.rank === sortFilter;
        });
        return JSON.stringify(data);
    }
    return JSON.stringify(data);
}

function leaderboard() {
    let data;
    if (localStorage.getItem("data")) {
        console.log("localstorage");
        data = localStorage.getItem("data");
    } else {
        data = getHeroes();
    }
    data = sort(JSON.parse(data));
    const Top3LeaderboardElement = document.getElementById('top3Leaderboard');
    const eliteLeaderboardElement = document.getElementById('eliteLeaderboard');
    const leaderboardElement = document.getElementById('leaderboard');
    Top3LeaderboardElement.innerHTML = '';
    eliteLeaderboardElement.innerHTML = '';
    leaderboardElement.innerHTML = '';
    for (let i = 0; i < 3; i++) {
        const item = JSON.parse(data)[i];
        const listItem = document.createElement('tr');
        listItem.classList.add('top3-hero-card');
        listItem.innerHTML = `
            <td><img class="top3-hero-image" src="${item.image}" alt="Foto of ${item.name}"></td>
            <td class="top3-hero-name">${item.name}</td>
            <td class="top3-hero-rank">${item.rank}</td>
        `;
        Top3LeaderboardElement.appendChild(listItem);
    }
    for (let i = 3; i < 10; i++) {
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

function button(buttonId) {
    document.getElementById(`button1`).innerHTML = "clear";
    document.getElementById(`button2`).innerHTML = "S";
    document.getElementById(`button3`).innerHTML = "A";
    const buttonElement = document.getElementById(`button${buttonId}`);
    if (buttonId === "1") {
        sortFilter = null;
    } else {
        sortFilter = buttonElement.innerHTML;
    }
    buttonElement.innerHTML = "Selected!";
    leaderboard();
}

// localStorage.clear()
leaderboard();