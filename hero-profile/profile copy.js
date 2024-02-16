let id;
let indexInData;
let data;

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

async function showHeroProfile() {
    if (localStorage.getItem("data")) {
        data = JSON.parse(localStorage.getItem("data"));
    } else {
        data = await getHeroes();
    }
    const urlParams = new URLSearchParams(window.location.search);
    id = Number(urlParams.get('id'));
    const hero = data.find((item, index) => {
        if (item.id === id) {
            indexInData = index;
            return item;
        }
    });
    if (hero) {
        const profileimg = document.getElementById('profileimg');
        profileimg.src = hero.image;
        const name = document.getElementById('name');
        name.innerText = hero.name;
        const power = document.getElementById('power');
        power.innerText = hero.power;
        const rating = document.getElementById('rating');
        rating.innerText = hero.rating;
        const votes = document.getElementById('votes');
        votes.innerText = hero.upvotes - hero.downvotes;
        if (hero.activity) {
            const activity = document.getElementById('card4');
            activity.innerHTML = `<p> ${hero.activity.text} </p>`
            if (hero.activity.image) {
                activity.innerHTML = `
                <img class="activityimg" src="${hero.activity.image}" alt="Activity image">
                <p> ${hero.activity.text} </p>
                `;
            }
        }
    }
}

function button(buttonId) {
    console.log(buttonId);
    if (buttonId === "up" && data[indexInData].upvoteButton == false) {
        console.log("up uitgevoerd");
        console.log(data[indexInData]);
        data[indexInData].upvotes++;
        data[indexInData].upvoteButton = true;
        upButton = document.getElementById("up");
        // make the button inactive

        if (data[indexInData].downvoteButton == true) {
            data[indexInData].downvotes--;
            data[indexInData].downvoteButton = false;
        }
        localStorage.setItem("data", JSON.stringify(data));
    } else if (buttonId === "down" && data[indexInData].downvoteButton == false) {
        console.log("down uitgevoerd");
        data[indexInData].downvotes++;
        data[indexInData].downvoteButton = true;
        downButton = document.getElementById("down");
        if (data[indexInData].upvoteButton == true) {
            data[indexInData].upvotes--;
            data[indexInData].upvoteButton = false;
        }
        localStorage.setItem("data", JSON.stringify(data));
    }
    showHeroProfile();
}

document.addEventListener("keydown", function (event) {
    if (event.key === "c") {
        console.log("clear");
        localStorage.clear();
        showHeroProfile();
    }
});

showHeroProfile()