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

const nomeUsuario = localStorage.getItem("nomeUsuario")
const nomeSala = localStorage.getItem("nomeSala")

inicializar

function inicializar() {
    document.getElementById("nomeSala").textContent = '#' + nomeSala;

    getData();
}

function getData() {
    const output = document.getElementById("output");

    firebase.database().ref('/' + nomeSala).on("value", snapshot => {

        output.innerHTML = "";
        snapshot.forEach(childSnapshot => {
            const childKey = childSnapshot.key;
            //SE HOUVER A CRIAÇÃO (CHILDKEY =PASTA DENTRO DA PASTA)
            if(childKey != "purpose") {
                //VAR   GUARDAR MSG
                const childMsg = childSnapshot.val();
                //VAR NOME USUARIO
                const nome = childMsg.nome;
                //MSG DE USUARIO
                const msg = childMsg.mensagem;
                //LIKE
                const likes = childMsg.likes;

                const chatCard = document.createElement("div");
                chatCard.className = "chatCard";
                const chatNome = document.createElement("h4");
                chatNome.className = "chatNome";
                chatNome.textContent = nome;
                chatCard.appendChild(chatNome);
                const row = document.createElement("div");
                row.className = "row";
                chatCard.appendChild(row);
                const col = document.createElement("div");
                col.className = "col";
                row.appendChild(col);
                const chatMsg = document.createElement("h5");
                chatMsg.className = "chatMsg";
                chatMsg.textContent = msg;
                col.appendChild(chatMsg);
                const colAuto = document.createElement("div");
                colAuto.className = "col-auto";
                row.appendChild(colAuto);
                const botaoLike = document.createElement("button");
                botaoLike.className = "btn btn-info";
                botaoLike.id = childKey;
                botaoLike.value = likes;
                botaoLike.setAttribute("onclick", "likeMsg(this.id)");
                botaoLike.innerHTML = '<i class="fa-regular fa-thumbs-up"></i> ' + likes;
                colAuto.appendChild(botaoLike);
                output.appendChild(chatCard);
            }
        });
    });
}
