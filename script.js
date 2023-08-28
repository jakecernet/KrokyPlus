function displayMenu() {
    menu = document.getElementById("menu");
    if (menu.style.height == "300px") {
        menu.style.height = "0px";
    } else {
        menu.style.height = "300px";
    }
}

fetch("https://kroky-plus-backend.vercel.app/api/stat")
    .then((res) => res.json())
    .then((data) => {
        const number_of_users = data.number_users;
        document.getElementById("number_of_users").innerHTML =
            number_of_users;
        const number_of_views = data.number_views;
        document.getElementById("number_of_views").innerHTML =
            number_of_views;

    })
    .catch((err) => {
        const number_of_users = data.number_users;
        document.getElementById("number_of_users").innerHTML =
            "NaN";
        const number_of_views = data.number_views;
        document.getElementById("number_of_views").innerHTML =
        "NaN";
    });

