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
        return item.id === id;
    });
    if (hero) {
        const profileimg = document.getElementById('profileimg');
        profileimg.src = hero.img;
    }
}
