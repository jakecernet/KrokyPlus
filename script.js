
document.getElementById("image-widget").style.display = "block";
document.getElementById("stats-widget").style.display = "none";

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
        document.getElementById("image-widget").style.display = "block";
        document.getElementById("stats-widget").style.display = "none";

    }); 
