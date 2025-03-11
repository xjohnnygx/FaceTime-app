const roomInput = document.querySelector("#roomInput") as HTMLInputElement;
const joinButton = document.querySelector("#joinButton") as HTMLButtonElement;
const createButton = document.querySelector("#createButton") as HTMLButtonElement;


joinButton.addEventListener("click", function() {
    const roomId = roomInput.value;
    window.location.href = `/room/${roomId}?role=guest`;
});

createButton.addEventListener("click", async function() {
    const characters = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let roomId = "";
    for (var i = 0; i < 30; ++i) {
        const choice = Math.floor(Math.random() * characters.length);
        roomId += characters[choice];
    }
    window.location.href = `/room/${roomId}?role=host`;
});

roomInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        joinButton.click();
    }
});