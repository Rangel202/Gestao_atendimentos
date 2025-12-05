// formulario.js — controla campos dinâmicos, logout e submissão fake

document.addEventListener("DOMContentLoaded", () => {
  const publico = document.getElementById("publico");
  const camposBox = document.getElementById("camposDinamicos");
  const tipo = document.getElementById("tipo");
  const logoutBtn = document.getElementById("logoutBtn");

  // Verifica se usuário está logado
  const user = sessionStorage.getItem("user");
  if (!user) {
    window.location.href = "index.html";
    return;
  }

  // Logout
  logoutBtn.addEventListener("click", () => {
    sessionStorage.clear();
    window.location.href = "index.html";
  });

  // Atualiza campos dinâmicos conforme público
  publico.addEventListener("change", () => {
    const value = publico.value;
    camposBox.innerHTML = "";
    tipo.innerHTML = `<option value="">Selecione...</option>`;

    if (value === "empregador") {
      camposBox.innerHTML = `
        <div class="dynamic-field field">
          <label>🏢 Nome do Empregador</label>
          <input type="text" required>
        </div>

        <div class="dynamic-field field">
          <label>🔢 CNPJ</label>
          <input type="text" required>
        </div>

        <div class="dynamic-field field">
          <label>📞 Telefone</label>
          <input type="text" required>
        </div>
      `;

      tipo.innerHTML += `
        <option value="vaga">Abertura de Vaga</option>
        <option value="documentacao">Documentação</option>
        <option value="informacoes">Informações Gerais</option>
      `;
    }

    if (value === "trabalhador") {
      camposBox.innerHTML = `
        <div class="dynamic-field field">
          <label>🧑 Nome do Trabalhador</label>
          <input type="text" required>
        </div>

        <div class="dynamic-field field">
          <label>🔢 CPF</label>
          <input type="text" required>
        </div>
      `;

      tipo.innerHTML += `
        <option value="seguro_desemprego">Seguro-desemprego</option>
        <option value="intermediacao">Intermediação de Emprego</option>
        <option value="carteira">Carteira de Trabalho</option>
      `;
    }

    if (value === "setor_fgtas") {
      camposBox.innerHTML = `
        <div class="dynamic-field field">
          <label>🏛️ Nome do Setor</label>
          <input type="text" required>
        </div>
      `;

      tipo.innerHTML += `
        <option value="sistema">Problemas no Sistema</option>
        <option value="solicitacao">Solicitação Interna</option>
        <option value="outro">Outro</option>
      `;
    }
  });

  // Submissão do formulário
  document.getElementById("formAtendimento").addEventListener("submit", (e) => {
    e.preventDefault();

    alert("Atendimento registrado com sucesso! 🎉");
    window.location.href = "menu.html";
  });
});
