let sortFilter = null;
let sortType = "rating";

async function getHeroes() {
    try {
        const response = await fetch('../heroes.json');
        if (!response.ok) {
            throw new Error('Failed to fetch heroes');
        }
        const data = await response.json();
        data.sort(function(a, b) {
            return b[sortType] - a[sortType];
        });
        localStorage.setItem("data", JSON.stringify(data));
        return data;
    } catch (error) {
        console.error('Error fetching heroes:', error);
        throw error;
    }
}
function sort(data) {
    if (sortFilter != null) {
        data = data.filter(function(item) {
            return item.rank === sortFilter;
        });
        return data;
    }
    return data;
}

async function leaderboard() {
    let data;
    if (localStorage.getItem("data")) {
        data = JSON.parse(localStorage.getItem("data"));
    } else {
        data = await getHeroes();
    }
    data = sort(data);
    const Top3LeaderboardElement = document.getElementById('top3Leaderboard');
    const eliteLeaderboardElement = document.getElementById('eliteLeaderboard');
    const leaderboardElement = document.getElementById('leaderboard');
    Top3LeaderboardElement.innerHTML = '';
    eliteLeaderboardElement.innerHTML = '';
    leaderboardElement.innerHTML = '';
    for (let i = 0; i < 3; i++) {
        const item = data[i];
        const listItem = document.createElement('tr');
        listItem.classList.add('top3-hero-card');
        listItem.innerHTML = `
        <td><img class="top3-hero-image" src="${item.image}" alt="Foto of ${item.name}"></td>
        <td class="top3-hero-name">${item.rank} | ${item.name}</td>
        <td><h2 class="hero-placement">${i + 1}</h2></td>
        `;
        Top3LeaderboardElement.appendChild(listItem);
    }
    for (let i = 3; i < 10; i++) {
        const item = data[i];
        const listItem = document.createElement('tr');
        listItem.classList.add('elite-hero-card');
        listItem.innerHTML = `
        <td><img class="elite-hero-image" src="${item.image}" alt="Foto of ${item.name}"></td>
        <td class="elite-hero-name">${item.rank} | ${item.name}</td>
        <td><h2 class="hero-placement">${i + 1}</h2></td>
        `;
        eliteLeaderboardElement.appendChild(listItem);
    }
    for (let i = 10; i < data.length; i++) {
        const item = data[i];
        const listItem = document.createElement('tr');
        listItem.classList.add('hero-card');
        listItem.innerHTML = `
            <td><h2 class="hero-placement">${i + 1}</h2></td>
            <td><img class="hero-image" src="${item.image}" alt="Foto of ${item.name}"></td>
            <td class="hero-name">${item.rank} | ${item.name}</td>
        `;
        leaderboardElement.appendChild(listItem);
    }
}

function button(buttonId) {
    document.getElementById(`button1`).innerHTML = "clear";
    document.getElementById(`button2`).innerHTML = "S";
    document.getElementById(`button3`).innerHTML = "A";
    document.getElementById(`button4`).innerHTML = "B";
    document.getElementById(`button5`).innerHTML = "C";
    const buttonElement = document.getElementById(`button${buttonId}`);
    if (buttonId === "1") {
        sortFilter = null;
    } else {
        sortFilter = buttonElement.innerHTML;
    }
    buttonElement.innerHTML = "Selected!";
    leaderboard();
}

function leaderboardType(buttonId) {
    document.getElementById(`type1`).innerHTML = "rating";
    document.getElementById(`type2`).innerHTML = "upvotes";
    const buttonElement = document.getElementById(`type${buttonId}`);
    sortType = buttonElement.innerHTML;
    buttonElement.innerHTML = "Selected!";
    localStorage.clear();
    leaderboard();
}

document.addEventListener("keydown", function (event) {
    if (event.key === "c") {
        console.log("clear");
        localStorage.clear();
        leaderboard();
    }
});
// localStorage.clear();
leaderboard();