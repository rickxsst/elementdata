window.addEventListener('message', function(event) {
    if (event.data.action == "showPlayerList") {
        let playerListContainer = document.getElementById('playerList');
        playerListContainer.innerHTML = '';  // Limpa a lista
        event.data.players.forEach(function(player) {
            let button = document.createElement("button");
            button.textContent = player;
            button.onclick = function() {
                // Quando clicar no jogador, mostrar os dados dele
                fetchPlayerData(player);
            };
            playerListContainer.appendChild(button);
        });
    }
    
    if (event.data.action == "showPlayerData") {
        document.getElementById("playerData").innerHTML = event.data.data;
        document.getElementById("playerDataContainer").style.display = "block";
    }
});

function fetchPlayerData(playerName) {
    // Enviar um pedido para o MTA para pegar os dados do jogador
    fetch(`https://seu-servidor-mta/api/getPlayerData?name=${playerName}`)
    .then(response => response.json())
    .then(data => {
        // Enviar os dados para o MTA
        window.postMessage({
            action: "showPlayerData",
            data: data
        });
    });
}
