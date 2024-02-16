let sortFilter = null;
let sortType = "rating";

async function getHeroes() {
    try {
        const response = await fetch('../heroes.json');
        if (!response.ok) {
            throw new Error('Failed to fetch heroes');
        }
        const data = await response.json();
        localStorage.setItem("data", JSON.stringify(data));
        return data;
    } catch (error) {
        console.error('Error fetching heroes:', error);
        throw error;
    }
}
function sort(data) {
    if (sortFilter != null) {
        data = data.filter(function (item) {
            return item.rank === sortFilter;
        });
        return data;
    }
    return data;
}

function starRating(rating) {
    let star = "C";
    if (rating >= 900 && rating < 2300) {
        star = "B";
    } else if (rating >= 2300 && rating < 5000) {
        star = "A";
    } else if (rating >= 5000) {
        star = "S";
    }
    return star;
}

async function leaderboard() {
    let data;
    let sortTypeShow = null;
    if (localStorage.getItem("data")) {
        data = JSON.parse(localStorage.getItem("data"));
    } else {
        data = await getHeroes();
    }
    data = sort(data);
    if (sortType === "rating") {
        data.sort(function (a, b) {
            sortTypeShow = "rating";
            return b.rating - a.rating;
        });
    } else {
        data.sort(function (a, b) {
            sortTypeShow = null;
            return b.upvotes - b.downvotes - (a.upvotes - a.downvotes);
        });
    }
    const Top3LeaderboardElement = document.getElementById('top3Leaderboard');
    const eliteLeaderboardElement = document.getElementById('eliteLeaderboard');
    const leaderboardElement = document.getElementById('leaderboard');
    Top3LeaderboardElement.innerHTML = '';
    eliteLeaderboardElement.innerHTML = '';
    leaderboardElement.innerHTML = '';
    for (let i = 0; i < 3; i++) {
        const item = data[i];
        const star = starRating(item.rating);
        const listItem = document.createElement('tr');
        listItem.classList.add('top3-hero-card');
        listItem.onclick = function () {
            window.location.href = `../hero-profile/profile.html?id=${item.id}`;
        };
        const svgElem = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star" viewBox="0 0 16 16">
        <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z"/>
        </svg>`;
        const thumbsUp = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
        class="bi bi-hand-thumbs-up larger-svg" viewBox="0 0 16 16">
        <path
            d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2 2 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a10 10 0 0 0-.443.05 9.4 9.4 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a9 9 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.2 2.2 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.9.9 0 0 1-.121.416c-.165.288-.503.56-1.066.56z" />
        </svg>`;
        listItem.innerHTML = `
            <td><img class="top3-hero-image" src="${item.image}" alt="Foto of ${item.name}"></td>
            <td class="top3-hero-name">${item.rank} | ${item.name}</td>
            <td class="top3-hero-number"><span class="star-top3">
                ${sortTypeShow ? svgElem : thumbsUp}
                </span> ${item[sortTypeShow] || item.upvotes - item.downvotes}
            </td>
            <td><h2 class="hero-placement">${i + 1}</h2></td>
        `;
        Top3LeaderboardElement.appendChild(listItem);
    }
    for (let i = 3; i < 10; i++) {
        const item = data[i];
        const star = starRating(item.rating);
        const listItem = document.createElement('tr');
        listItem.onclick = function () {
            window.location.href = `../hero-profile/profile.html?id=${item.id}`;
        };
        listItem.classList.add('elite-hero-card');
        listItem.innerHTML = `
        <td><img class="elite-hero-image" src="${item.image}" alt="Foto of ${item.name}"></td>
        <td class="elite-hero-name">${item.rank} | ${item.name}</td>
        <td class="elite-hero-number"><span class="star-${star}">
            ${sortTypeShow ? svgElem : thumbsUp} 
            </span> ${item[sortTypeShow] || item.upvotes - item.downvotes}
        </td>
        <td><h2 class="hero-placement">${i + 1}</h2></td>
        `;
        eliteLeaderboardElement.appendChild(listItem);
    }
    for (let i = 10; i < data.length; i++) {
        const item = data[i];
        const star = starRating(item.rating);
        const listItem = document.createElement('tr');
        listItem.onclick = function () {
            window.location.href = `../hero-profile/profile.html?id=${item.id}`;
        };
        listItem.classList.add('hero-card');
        listItem.innerHTML = `
            <td><h2 class="hero-placement">${i + 1}</h2></td>
            <td><img class="hero-image" src="${item.image}" alt="Foto of ${item.name}"></td>
            <td class="hero-name">${item.rank} | ${item.name}</td>
            <td class="hero-number"><span class="star-${star}">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star" viewBox="0 0 16 16">
                <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z"/>
                </svg></span> ${item[sortTypeShow] || item.upvotes - item.downvotes}
            </td>
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
    leaderboard();
}

document.addEventListener("keydown", function (event) {
    if (event.key === "c") {
        console.log("clear");
        localStorage.clear();
        leaderboard();
    }
});

setInterval(function() {
    leaderboard();
    console.log("leaderboard updated");
}, 1000);

// localStorage.clear();
leaderboard();


// TODO:
// 1. add last filter
// 2. add symbol to upvotes
// 3. 1 blank spot in homepage (leaderboard?) done
// 4. add margin to bottom of profile page done
// 5. like and dislike buttons not spamable done
// 6. live update for the leaderboard done

// 4/6 done