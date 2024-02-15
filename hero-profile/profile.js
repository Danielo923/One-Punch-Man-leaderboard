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
    const hero = data.find(function(item) {
        return item.id;
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
            activity.innerHTML = hero.activity.text;
            if (hero.activity.image) {
                const activityimg = document.getElementById('activityimg');
                activityimg.src = hero.activity.image;
            }
        }
    }
}
localStorage.clear();
showHeroProfile()