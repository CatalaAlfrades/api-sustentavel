const API_URL = "http://localhost:5000/api/auth"; // Ajuste se necessário

document.addEventListener("DOMContentLoaded", function () {
    const registerForm = document.getElementById("registerForm");
    const loginForm = document.getElementById("loginForm");

    // REGISTRO
    if (registerForm) {
        registerForm.addEventListener("submit", async function (e) {
            e.preventDefault();
            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const password = document.getElementById("password").value;

            if (!name || !email || !password) {
                alert("Por favor, preencha todos os campos.");
                return;
            }

            try {
                const res = await fetch(`${API_URL}/register`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ name, email, password }),
                });

                const data = await res.json();
                console.log("Resposta do servidor:", data);

                if (res.ok) {
                    alert("Registro bem-sucedido! Faça login.");
                    window.location.href = "login.html";
                } else {
                    alert(`Erro: ${data.error || "Falha ao registrar."}`);
                }
            } catch (error) {
                console.error("Erro no registro:", error);
                alert("Erro ao registrar. Verifique a conexão com o servidor.");
            }
        });
    }

    // LOGIN
    if (loginForm) {
        loginForm.addEventListener("submit", async function (e) {
            e.preventDefault();
            const email = document.getElementById("loginEmail").value.trim();
            const password = document.getElementById("loginPassword").value;

            if (!email || !password) {
                alert("Por favor, preencha todos os campos.");
                return;
            }

            try {
                const res = await fetch(`${API_URL}/login`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, password }),
                });

                const data = await res.json();
                console.log("Resposta do servidor:", data);

                if (res.ok) {
                    alert("Login bem-sucedido!");
                    localStorage.setItem("token", data.token);
                    window.location.href = "ods.html";
                } else {
                    alert(`Erro: ${data.error || "Falha no login."}`);
                }
            } catch (error) {
                console.error("Erro no login:", error);
                alert("Erro ao fazer login. Verifique a conexão com o servidor.");
            }
        });
    }
});

