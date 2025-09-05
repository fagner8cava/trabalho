function criarConta() {

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    let usuario = {

        nome: document.getElementById("nome__usario_cadastro").value.trim(),
        sobrenome: document.getElementById("sobrenome__usario_cadastro").value,
        email: document.getElementById("email__cadastro").value.trim().toLowerCase(),
        senha: document.getElementById("senha__cadastro").value,
        newsletter: document.getElementById("newsletter").checked,
        favoritos: [],
        assistidos: [],

    }


    if (usuario.nome === false || usuario.sobrenome == false || usuario.email === false || usuario.senha === false) {

        alert("Todos os campos devem ser preenchidos!");

    } else {

        if (usuario.email.includes("@")) {

            let numerosTeste = /\d/.test(usuario.senha);

            let caraterestersTeste = /[!@$%]/.test(usuario.senha);

            let testeEmail = usuarios.find(u => (u.email || "").toLowerCase() === usuario.email);

            if (testeEmail && testeEmail != usuario) {
                alert("Este e-mail já está em uso");
                return;

            } else {

                if (usuario.senha.length > 4 && numerosTeste && caraterestersTeste) {

                    let aceitou = document.getElementById("aceitar__criar").checked;

                    if (aceitou == true) {

                        usuarios.push(usuario);

                        localStorage.setItem("usuarios", JSON.stringify(usuarios));


                        alert("Conta criada!");

                            window.location.href = "pagina11.html";


                    } else {

                        alert("É preciso confirmar que leu os Termos de Serviço");
                    }

                } else {

                    alert("A senha precisa ter mais que quatro caracteres, conter pelo menos um número e um desses caracteres: ! @ $ %");
                }
            }

        } else {

            alert("O e-mail precisa ser válido!");
        }

    }
}

function entrarConta() {

    let email = document.getElementById("email__login").value;
    let senha = document.getElementById("senha__login").value;

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    let procurarUsuario = usuarios.find(u => u.email === email);

    if (email === false || senha === false) {
        alert("Preencha todos os campos!");
        return;

    } else {

        if (procurarUsuario && senha === procurarUsuario.senha) {
            alert("Login realizado com sucesso!");

            localStorage.setItem("logado", JSON.stringify(procurarUsuario));

            window.location.href = "pagina13.html";

            return logado = true;
        } else {
            alert("Email ou senha incorretos!");

        }
    }
}


function nomePagina() {

    let usuarioLogado = JSON.parse(localStorage.getItem("logado"));

    let paginaLogin = document.getElementById("pagina__login");

    paginaLogin.classList.add("pagina__loginclass", "pagina__loginclass:hover");

    if (!usuarioLogado) {
        paginaLogin.textContent = "Entrar";
        paginaLogin.onclick = () => window.location.href = "pagina11.html";
    } else {
        paginaLogin.textContent = `${usuarioLogado.nome}`;
        paginaLogin.onclick = () => window.location.href = "pagina13.html";
    }
}

function nomeBemvindo() {

    let usuarioLogado = JSON.parse(localStorage.getItem("logado"));

    let paginaCadastro = document.getElementById("cadastro__texto");

    paginaCadastro.textContent = `Bem Vindo! ${usuarioLogado.nome}, é um prazer ter você aqui!`;

}

function sairConta() {

    window.location.href = "paginainicial.html";

    localStorage.removeItem("logado");

}

function mudarEmail() {
    let velhoEmail = document.getElementById("velho__email").value.trim().toLowerCase();
    let novoEmail = document.getElementById("novo__email").value.trim().toLowerCase();

    if (velhoEmail === false || novoEmail === false) {

        alert("Preencha os dois campos.");
        return;

    } else {

        let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

        let usuario = usuarios.find(u => (u.email || "").toLowerCase() === velhoEmail);

        if (!usuario) {
            alert("E-mail antigo não encontrado.");
            return;

        } else {


            let testeEmail = usuarios.find(u => (u.email || "").toLowerCase() === novoEmail);

            if (testeEmail && testeEmail != usuario) {
                alert("O novo e-mail já está em uso");
                return;

            } else {

                usuario.email = novoEmail;
                localStorage.setItem("usuarios", JSON.stringify(usuarios));

                alert("E-mail atualizado com sucesso!");

            }
        }
    }
}

function mudarSenha() {

    let velhaSenha = document.getElementById("velha__senha").value.trim().toLowerCase();

    let novaSenha = document.getElementById("nova__senha").value.trim().toLowerCase();

    if (velhaSenha === false || novaSenha === false) {

        alert("Preencha os dois campos.");
        return;

    } else {

        let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

        let usuario = usuarios.find(u => (u.senha || "").toLowerCase() === velhaSenha);

        if (!usuario) {
            alert("senha antiga não corresponde.");
            return;

        } else {

            usuario.email = novoEmail;
            localStorage.setItem("usuarios", JSON.stringify(usuarios));

            alert("Senha atualizada com sucesso!");

        }
    }
}


function verificarEmail() {

    let verificarEmail = document.getElementById("email__recuperacao").value.trim().toLowerCase();


    if (verificarEmail === false) {

        alert("Preencha o campo.");
        return;

    } else {

        let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

        let usuario = usuarios.find(u => (u.email || "").toLowerCase() === verificarEmail);

        if (!usuario) {
            alert("E-mail antigo não encontrado.");
            return;

        } else {

            alert("E-mail enviado!");

        }
    }

}

function excluirConta() {

    let confirmar = confirm("Você tem certeza disso?")

    if (confirmar) {

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    let usuarioLogado = JSON.parse(localStorage.getItem("logado"));

    let emailLogado = (usuarioLogado.email).trim().toLowerCase();

    let teste = usuarios.findIndex(u => (u.email || "").toLowerCase() === emailLogado);

    usuarios.splice(teste, 1);

    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    localStorage.removeItem("logado");

    alert("Conta excluída com sucesso.");

    window.location.href = "paginainicial.html";

}
}

function newsletterAtiva() {

    //Salvando no usuario logado//

    let usuarioLogado = JSON.parse(localStorage.getItem("logado"));

    let newsletterVerificar = document.getElementById("newsletter").checked;

    usuarioLogado.newsletter = newsletterVerificar;

    localStorage.setItem("logado", JSON.stringify(usuarioLogado));

    //Salvando no Array do usario//

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    let teste = usuarios.findIndex(u => u.email === usuarioLogado.email);

    usuarios[teste].newsletter = newsletterVerificar;

    localStorage.setItem("usuarios", JSON.stringify(usuarios));

}


function newsletterVerificacao() {

    let newsletterStatus = JSON.parse(localStorage.getItem("logado"));

    if (newsletterStatus.newsletter === true) {

        document.getElementById("newsletter").checked = true;

    }

    else {

        document.getElementById("newsletter").checked = false;

    }
}

function adcionarObras() {

    let nomeobra = document.getElementById("obras__salvas").value

    let tempo = new Date();

    let tempoAno = tempo.getFullYear();

    let tempoMes = tempo.getMonth() + 1;

    let tempoDia = tempo.getDate();

    let adcionar = {
        nomeobra,
        tempoAno,
        tempoMes,
        tempoDia,
    }

    if (nomeobra == false) {
        
        console.log("Nada adicionado.")
    }
    
    else {
        
   

    //Salvando no usuario logado//

    let usuarioLogado = JSON.parse(localStorage.getItem("logado"));

    usuarioLogado.assistidos.push(adcionar);

    localStorage.setItem("logado", JSON.stringify(usuarioLogado));


    //Salvando no Array do usario//

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    let teste = usuarios.findIndex(u => u.email === usuarioLogado.email);

    usuarios[teste].assistidos.push(adcionar);

    localStorage.setItem("usuarios", JSON.stringify(usuarios));
 }
}

function adcionarFavoritos() {

    let adcionarFavoritos = document.getElementById("catalogar__favoritos").value

    if (adcionarFavoritos == false) {
        
        console.log("Nada adicionado.")
    }
    
    else {


    //Salvando no usuario logado//

    let usuarioLogado = JSON.parse(localStorage.getItem("logado"));

    usuarioLogado.favoritos.push(adcionarFavoritos);

    localStorage.setItem("logado", JSON.stringify(usuarioLogado));

    //Salvando no Array do usario//

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    let teste = usuarios.findIndex(u => u.email === usuarioLogado.email);

    usuarios[teste].favoritos.push(adcionarFavoritos);

    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    }
}

function nomesFilmes() {
    let usuarioLogado = JSON.parse(localStorage.getItem("logado")).assistidos;

    let container = document.getElementById("aparecer__filmes");

    container.innerHTML = "";

    usuarioLogado.forEach(p => {

        let pFilmes = document.createElement("div");

        pFilmes.classList.add("filme__item");

        pFilmes.innerHTML = `
      <div class="work-text">
        <p><b>Nome do Filme:</b> ${p.nomeobra}</p>
        <p><b>Data:</b> ${p.tempoDia}/${p.tempoMes}/${p.tempoAno}</p>
      </div>
    `;

        container.appendChild(pFilmes);
    });
}

function elementosInicar() {
    nomePagina();

    
    if (document.getElementById("newsletter") && localStorage.getItem("logado")) {
        newsletterVerificacao();
    }

    if (document.getElementById("aparecer__filmes") && localStorage.getItem("logado")) {
        nomesFilmes();
    }

    if (document.getElementById("cadastro__texto") && localStorage.getItem("logado")) {
        nomeBemvindo();
    }
}


