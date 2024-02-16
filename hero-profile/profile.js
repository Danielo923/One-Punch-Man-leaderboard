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
    if (buttonId === "up" && data[indexInData].upvoteButton == false) {
        data[indexInData].upvotes++;
        data[indexInData].upvoteButton = true;
        document.getElementById("up").disabled = true;

        if (data[indexInData].downvoteButton == true) {
            data[indexInData].downvotes--;
            data[indexInData].downvoteButton = false;
            document.getElementById("down").disabled = false;
        }
        localStorage.setItem("data", JSON.stringify(data));
    } else if (buttonId === "down" && data[indexInData].downvoteButton == false) {
        data[indexInData].downvotes++;
        data[indexInData].downvoteButton = true;
        document.getElementById("down").setAttribute("disabled", "");
        if (data[indexInData].upvoteButton == true) {
            data[indexInData].upvotes--;
            data[indexInData].upvoteButton = false;
            document.getElementById("up").removeAttribute("disabled");
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