(async () => {
    document.getElementById("header").innerHTML =
        await (await fetch("/Scripts/header.html")).text();

    document.getElementById("footer").innerHTML =
        await (await fetch("/Scripts/footer.html")).text();
    
    document.getElementById("mainhead").innerHTML =
        await (await fetch("/Scripts/mainhead.html")).text();
})();