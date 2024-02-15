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
    let data;
    if (localStorage.getItem("data")) {
        data = JSON.parse(localStorage.getItem("data"));
    } else {
        data = await getHeroes();
    }
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    const hero = data.find((item) => {
        if (item.id == id) {
            return item;
        }
    });
    if (hero) {
        const profileimg = document.getElementById('profileimg');''
        profileimg.src = hero.image;
        const name = document.getElementById('card2');
        name.innerHTML = '<h2>' + hero.name + '</h2>';
        const power = document.getElementById('card3');
        power.innerHTML = hero.power;
        if (hero.activity.text) {
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

document.addEventListener("keydown", function (event) {
    if (event.key === "c") {
        console.log("clear");
        localStorage.clear();
        showHeroProfile();
    }
});

showHeroProfile()