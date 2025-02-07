const API_URL = "http://localhost:5000/api/actions";

document.addEventListener("DOMContentLoaded", function () {
    const actionForm = document.getElementById("actionForm");
    const actionsList = document.getElementById("actionsList");
    const token = localStorage.getItem("token");

    if (!token) {
        alert("Você precisa estar logado para acessar esta página.");
        window.location.href = "login.html";
        return;
    }

    // Adicionar uma nova ação sustentável
    actionForm.addEventListener("submit", async function (e) {
        e.preventDefault();
        const title = document.getElementById("title").value;
        const description = document.getElementById("description").value;
        const category = document.getElementById("category").value;
        const points = document.getElementById("points").value;

        try {
            const res = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ title, description, category, points })
            });

            const data = await res.json();
            if (res.ok) {
                alert("Ação registrada com sucesso!");
                actionForm.reset();
                fetchActions();
            } else {
                alert(`Erro: ${data.error}`);
            }
        } catch (error) {
            alert("Erro ao registrar ação. Tente novamente.");
        }
    });

    // Buscar e exibir ações cadastradas
    async function fetchActions() {
        try {
            const res = await fetch(API_URL, {
                headers: { "Authorization": `Bearer ${token}` }
            });
            const data = await res.json();
            actionsList.innerHTML = "";

            data.forEach(action => {
                const actionItem = document.createElement("li");
                actionItem.innerHTML = `
                    <strong>${action.title}</strong> - ${action.category} - ${action.points} pontos
                    <p>${action.description}</p>
                    <button onclick="deleteAction('${action._id}')">Deletar</button>
                `;
                actionsList.appendChild(actionItem);
            });
        } catch (error) {
            console.error("Erro ao buscar ações", error);
        }
    }

    // Deletar uma ação sustentável
    window.deleteAction = async function (id) {
        if (!confirm("Tem certeza que deseja excluir esta ação?")) return;

        try {
            const res = await fetch(`${API_URL}/${id}`, {
                method: "DELETE",
                headers: { "Authorization": `Bearer ${token}` }
            });

            if (res.ok) {
                alert("Ação excluída com sucesso!");
                fetchActions();
            } else {
                alert("Erro ao excluir ação.");
            }
        } catch (error) {
            alert("Erro ao excluir ação. Tente novamente.");
        }
    };

    fetchActions();
});