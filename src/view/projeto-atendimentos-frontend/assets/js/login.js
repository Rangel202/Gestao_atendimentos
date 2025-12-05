// login.js - lógica simples de front (fake auth) e navegação para menu.html
document.addEventListener('DOMContentLoaded', ()=> {
  const form = document.getElementById('loginForm');
  const demoBtn = document.getElementById('demoBtn');

  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const u = document.getElementById('username').value.trim();
    const p = document.getElementById('password').value.trim();

    // validação simples
    if(!u || !p){
      alert('Preencha usuário e senha.');
      return;
    }

    // Simula autenticação: usuário admin/admin ou qualquer valor -> redireciona
    // Em produção, continuar para backend
    if((u === 'admin' && p === 'admin') || u.length > 0){
      // armazena usuário no sessionStorage para usar nas outras telas
      sessionStorage.setItem('user', JSON.stringify({username: u}));
      window.location.href = 'menu.html';
    } else {
      alert('Usuário ou senha inválidos.');
    }
  });

  demoBtn.addEventListener('click', ()=>{
    sessionStorage.setItem('user', JSON.stringify({username: 'demo'}));
    window.location.href = 'menu.html';
  });
});
