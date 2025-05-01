document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".login-form");
    
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;
      
      if (username === "" || password === "") {
        alert("Por favor, preencha todos os campos.");
        return;
      }
      
      // Aqui você pode adicionar uma verificação real com backend ou simulação de sucesso
      alert("Login realizado com sucesso!");
      // Redirecionar para o painel ou página inicial do sistema
      window.location.href = "dashboard.html";
    });
  });
  