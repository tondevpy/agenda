// Variável que referencia o elemento HTML onde os contatos serão renderizados
let redenrizar = document.querySelector('.redenrizar');

// Array que irá armazenar os contatos
let lista = [];

// Função para carregar a lista do localStorage ao iniciar a página
function carregarListaDoLocalStorage() {
    const listaArmazenada = localStorage.getItem('listaDeContatos');
    if (listaArmazenada) {
        lista = JSON.parse(listaArmazenada);
        renderizar(); // Renderiza os contatos ao carregar do localStorage
    }
}

// Chamada para carregar a lista do localStorage ao iniciar a página
carregarListaDoLocalStorage();

// Função para salvar a lista no localStorage
function salvarListaNoLocalStorage() {
    localStorage.setItem('listaDeContatos', JSON.stringify(lista));
}

// Função para cadastrar um novo contato
function cadastrar() {
    let nome = document.getElementById('nome').value;
    let email = document.getElementById('email').value;
    let telefone = document.getElementById('telefone').value;
    let notificacao = document.getElementById('notificacao');

    if (nome.trim() !== '' && email.trim() !== '' && telefone.trim() !== '') {
        if (conferirContato(email)) {
            notificacao.style.color = 'red';
            notificacao.innerHTML = 'Usuário já existe cadastrado...';
            setTimeout(() => {
                notificacao.innerHTML = '';
            }, 3000);
        } else {
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (regex.test(email)) {
                const contato = {
                    nome: nome,
                    email: email,
                    telefone: telefone,
                };

                lista.push(contato);
                notificacao.style.color = 'green';
                notificacao.innerHTML = 'Usuário cadastrado...';
                redenrizar.innerHTML = '';
                document.getElementById('nome').value = '';
                document.getElementById('email').value = '';
                document.getElementById('telefone').value = '';
                renderizar();
                salvarListaNoLocalStorage(); // Salva a lista no localStorage após cadastrar
                setTimeout(() => {
                    notificacao.innerHTML = '';
                }, 3000);
            } else {
                notificacao.style.color = '#00b4d8';
                notificacao.innerHTML = 'Email em formato incorreto...';
                redenrizar.innerHTML = '';
                setTimeout(() => {
                    notificacao.innerHTML = '';
                }, 3000);
            }
        }
    } else {
        notificacao.style.color = 'yellow';
        notificacao.innerHTML = 'Preencha todos os campos...';
        setTimeout(() => {
            notificacao.innerHTML = '';
        }, 3000);
    }
}

// Função para conferir se o contato já existe na lista
function conferirContato(email) {
    return lista.some((contato) => contato.email === email);
}

// Função para renderizar os contatos na página
function renderizar() {
    redenrizar.innerHTML = ''; // Limpa o conteúdo antes de renderizar novamente
    lista.forEach((element) => {
        let div = document.createElement('div');
        div.className = 'cards';
        redenrizar.appendChild(div);
        let p = document.createElement('p');
        p.innerHTML = 'Contato';
        div.appendChild(p);

        let nomeElement = document.createElement('input');
        nomeElement.value = element.nome;
        nomeElement.className = 'nomeElement';
        let emailElement = document.createElement('input');
        emailElement.value = element.email;
        emailElement.type = 'email';
        emailElement.className = 'emailElement';
        let telefoneElement = document.createElement('input');
        telefoneElement.value = element.telefone;
        telefoneElement.className = 'telefoneElement';

        div.appendChild(nomeElement);
        div.appendChild(emailElement);
        div.appendChild(telefoneElement);

        let btns = document.createElement('div');
        btns.className = 'btns';
        div.appendChild(btns);

        let editar = document.createElement('button');
        editar.style.background = 'green';
        editar.innerHTML = 'Editar';
        editar.onclick = function () {
            modificarContato(element.nome, element.email, element.telefone);
        };

        btns.appendChild(editar);

        let excluir = document.createElement('button');
        excluir.style.background = 'red';
        excluir.innerHTML = 'Excluir';
        excluir.onclick = function () {
            remover(element.email);
        };

        btns.appendChild(excluir);
    });
}

// Função para remover um contato da lista
function remover(email) {
    lista = lista.filter((usuario) => usuario.email !== email);
    salvarListaNoLocalStorage(); // Salva a lista no localStorage após remover
    renderizar(); // Renderiza novamente os contatos após remover
}

// Função para modificar um contato existente
function modificarContato(nome, email, telefone) {
    let inputNome = document.querySelector('.nomeElement').value;
    let inputEmail = document.querySelector('.emailElement').value;
    let inputTelefone = document.querySelector('.telefoneElement').value;
    const indice = lista.findIndex((contato) => contato.email === email);
    if (indice !== -1) {
        lista[indice].nome = inputNome;
        lista[indice].email = inputEmail;
        lista[indice].telefone = inputTelefone;
        salvarListaNoLocalStorage(); // Salva a lista no localStorage após modificar
        renderizar(); // Renderiza novamente os contatos após modificar
    }
}
