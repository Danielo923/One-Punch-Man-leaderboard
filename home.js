/* eslint-disable max-len */
let sortFilter = null;
let sortType = "rating";
async function getHeroes() {
    try {
        const response = await fetch('heroes.json');
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
    sortType = "rating";
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
    Top3LeaderboardElement.innerHTML = '';
    for (let i = 0; i < 3; i++) {
        const item = data[i];
        const star = starRating(item.rating);
        const listItem = document.createElement('tr');
        listItem.classList.add('top3-hero-card');
        listItem.onclick = function () {
            window.location.href = `hero-profile/profile.html?id=${item.id}`;
        };
        listItem.innerHTML = `
            <td><img class="top3-hero-image" src="${item.image}" alt="Foto of ${item.name}"></td>
            <td class="top3-hero-name">${item.rank} | ${item.name}</td>
            <td class="top3-hero-number"><span class="star-top3">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star" viewBox="0 0 16 16">
                <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z"/>
                </svg></span> ${item.rating}
            </td>
            <td><h2 class="hero-placement">${i + 1}</h2></td>
        `;
        Top3LeaderboardElement.appendChild(listItem);
    }
}
// localStorage.clear();
leaderboard();

document.addEventListener("keydown", function (event) {
    if (event.key === "c") {
        console.log("clear");
        localStorage.clear();
        leaderboard();
    }
});

setInterval(function () {
    leaderboard();
    console.log("leaderboard updated");
}, 5000);