let friendsList = [];

// Exibe alertas personalizados
function showAlert(reason) {
    const messages = {
        emptyName: "Por favor, insira um nome.",
        emptyList: "A lista de sorteio está vazia.",
        default: "Erro desconhecido."
    };

    alert(messages[reason] || messages.default);
}

// Adiciona um nome à lista visualmente
function addNameToList(friendName) {
    const listElement = document.getElementById("listaAmigos");
    const listItem = document.createElement("li");
    
    listItem.textContent = friendName;
    listElement.appendChild(listItem);
}

// Sorteia um nome aleatoriamente da lista
function drawRandomFriend() {
    if (friendsList.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * friendsList.length);
    return friendsList[randomIndex];
}

// Exibe o nome sorteado
function displayDrawResult() {
    document.getElementById("listaAmigos").innerHTML = "";

    const resultContainer = document.getElementById("resultado");
    const selectedFriend = drawRandomFriend();
    
    const resultItem = document.createElement("li");
    resultItem.textContent = `O amigo secreto sorteado é: ${selectedFriend}`;  

    resultContainer.appendChild(resultItem);
}

// Embaralha a lista de nomes (algoritmo Fisher-Yates)
function shuffleFriendList() {
    for (let i = friendsList.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [friendsList[i], friendsList[j]] = [friendsList[j], friendsList[i]];
    }
}

// Inicia o sorteio
function startDraw() {
    if (document.querySelector(".button-reset")) return;

    if (friendsList.length < 1) {
        showAlert("emptyList");
    } else {
        shuffleFriendList();
        displayDrawResult();
        createResetButton();
    }
}

// Adiciona um nome ao sorteio
function addFriend() {
    if (document.querySelector(".button-reset")) return;

    const nameInput = document.querySelector("input");
    const friendName = nameInput.value.trim();

    if (friendName === "") {
        showAlert("emptyName");
    } else {
        friendsList.push(friendName);
        addNameToList(friendName);
        nameInput.value = ""; // Limpa o campo de entrada
    }
}

// Reinicia o sorteio
function resetDraw() {
    document.querySelector(".button-reset")?.remove();
    document.getElementById("resultado").innerHTML = "";
    
    friendsList = [];

    // Remove os estilos de hover dos botões
    document.querySelector(".button-draw")?.classList.remove("no-hover");
    document.querySelector(".button-add")?.classList.remove("button-add-NoHover");
}

// Cria o botão de reiniciar sorteio
function createResetButton() {
    if (document.querySelector(".button-reset")) return;

    // Remove o efeito de hover dos botões
    document.querySelector(".button-draw")?.classList.add("no-hover");
    document.querySelector(".button-add")?.classList.add("button-add-NoHover");

    const buttonContainer = document.querySelector(".button-container");
    const resetButton = document.createElement("button");

    resetButton.className = "button-reset";
    resetButton.innerHTML = `        
        <img src="assets/restart-icon.png" alt="Ícone para reiniciar">
        Reiniciar
    `;
    resetButton.setAttribute("aria-label", "Reiniciar Sorteio");
    resetButton.onclick = resetDraw;

    buttonContainer.appendChild(resetButton);
}