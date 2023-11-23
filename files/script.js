function displayMenu() {
    menu = document.getElementById("menu");
    if (menu.style.left == "0%") {
        menu.style.left = "-100%";
    } else {
        menu.style.left = "0%";
    }
}

fetch("https://kroky-plus-backend.vercel.app/api/stat")
    .then((res) => res.json())
    .then((data) => {
        const number_of_users = data.number_users;
        document.getElementById("number_of_users").innerHTML =
            number_of_users;
    });
