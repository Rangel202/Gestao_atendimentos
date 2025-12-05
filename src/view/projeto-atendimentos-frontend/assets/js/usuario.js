// Lista inicial (fake)
let usuarios = [
    { id: 1, nome: "João Silva", login: "joao.s", perfil: "Administrador" },
    { id: 2, nome: "Maria Santos", login: "maria.s", perfil: "Operador" },
];

function atualizarTabela() {
    const tabela = document.getElementById("listaUsuarios");
    tabela.innerHTML = "";

    usuarios.forEach(u => {
        tabela.innerHTML += `
            <tr>
                <td>${u.nome}</td>
                <td>${u.login}</td>
                <td>${u.perfil}</td>
                <td>
                    <button class="btn btn-small" onclick="editarUsuario(${u.id})">✏️</button>
                    <button class="btn btn-small btn-danger" onclick="excluirUsuario(${u.id})">🗑️</button>
                </td>
            </tr>
        `;
    });
}

// Modal
function abrirModal() {
    document.getElementById("modalUsuario").classList.remove("hidden");
    document.getElementById("tituloModal").innerText = "Adicionar Usuário";

    document.getElementById("idUsuario").value = "";
    document.getElementById("nomeUsuario").value = "";
    document.getElementById("loginUsuario").value = "";
    document.getElementById("perfilUsuario").value = "Operador";
}

function fecharModal() {
    document.getElementById("modalUsuario").classList.add("hidden");
}

function salvarUsuario() {
    const id = document.getElementById("idUsuario").value;
    const nome = document.getElementById("nomeUsuario").value;
    const login = document.getElementById("loginUsuario").value;
    const perfil = document.getElementById("perfilUsuario").value;

    if (!nome || !login) {
        alert("Preencha todos os campos!");
        return;
    }

    if (id) {
        // editar
        const user = usuarios.find(u => u.id == id);
        user.nome = nome;
        user.login = login;
        user.perfil = perfil;
    } else {
        // adicionar
        usuarios.push({
            id: Date.now(),
            nome,
            login,
            perfil
        });
    }

    fecharModal();
    atualizarTabela();
}

function editarUsuario(id) {
    const user = usuarios.find(u => u.id === id);

    document.getElementById("idUsuario").value = user.id;
    document.getElementById("nomeUsuario").value = user.nome;
    document.getElementById("loginUsuario").value = user.login;
    document.getElementById("perfilUsuario").value = user.perfil;

    document.getElementById("tituloModal").innerText = "Editar Usuário";

    document.getElementById("modalUsuario").classList.remove("hidden");
}

function excluirUsuario(id) {
    if (!confirm("Tem certeza que deseja excluir este usuário?")) return;

    usuarios = usuarios.filter(u => u.id !== id);
    atualizarTabela();
}

atualizarTabela();
