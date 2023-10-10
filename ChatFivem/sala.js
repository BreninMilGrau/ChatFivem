const firebaseConfig = {
    apiKey: "AIzaSyBqpNdQnTP5bMDVD-1kHP4eq9i2_JSXYJE",
    authDomain: "chatfivem.firebaseapp.com",
    databaseURL: "https://chatfivem-default-rtdb.firebaseio.com",
    projectId: "chatfivem",
    storageBucket: "chatfivem.appspot.com",
    messagingSenderId: "800766203069",
    appId: "1:800766203069:web:a1db8bf50b6dc63cfc53d4",
    measurementId: "G-1EEJC6T3GD"
  };

firebase.initializeApp(firebaseConfig);

inicializar();

function inicializar() {
    const nomeUsuario = localStorage.getItem("nomeUsuario");
    console.log(nomeUsuario);
    document.getElementById("nomeUsuario").textContent = "Olá, " + nomeUsuario

}

function addSala() {
    const nomeSala = document.getElementById("nomeSala").value;
    console.log(nomeSala);
    if (nomeSala)
    firebase.database().ref('/').child(nomeSala).set({
        purpose: "Sala criada com sucesso ✅"
    });
    //privar sala

    carregaSala(nomeSala);
}

function getData() {
    firebase.database().ref('/').on("value", snapshot => {
        let salas = [];
        snapshot.forEach(childSnapshot => {
            const childKey = childSnapshot.key;
            const html = '<div class="nomeSala" id="'
            + childKey
            + '" onclick="carregaSala(this.id)">#'
            + childKey
            + '</div>'
            salas.push(html)    
        })
        document.getElementById("output").innerHTML = salas.join("")
        // const output = document.getElementById("output");
        // const output.innerHTML = salas.join("")
    });
}

function carregaSala(sala) {
    localStorage.setItem("nomeSala", sala);
    location = "chat.html";
}

    