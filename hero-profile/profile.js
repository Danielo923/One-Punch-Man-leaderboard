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
        power.innerHTML = `
            <h3>${hero.power}</h3>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star" viewBox="0 0 16 16">
            <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z"/>
            </svg></span>
            <h3>${hero.rating}</h3>
            <div class="card-buttons">
                <button class="card-button">
                Button 1
                </button>
                <button class="card-button">
                Button 2
                </button>
            </div>
        
        `;
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