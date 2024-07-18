// Cargar header y footer
function loadHeaderFooter() {
    fetch('header.html')
        .then(response => response.text())
        .then(data => {
            document.body.insertAdjacentHTML('afterbegin', data);
            checkLogin();
        });

    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            document.body.insertAdjacentHTML('beforeend', data);
        });
}

// Call loadHeaderFooter on page load
document.addEventListener('DOMContentLoaded', loadHeaderFooter);


// Función para cerrar sesión
function logout() {
    sessionStorage.clear();
    window.location.href = 'login.html';
}

// Manejo del formulario de login
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === "" || password === "") {
        alert("Falta usuario y contraseña");
    } else {
        // Simular validación con JSON
        fetch('users.json')
            .then(response => response.json())
            .then(data => {
                const user = data.users.find(u => u.username === username && u.password === password);
                if (user) {
                    sessionStorage.setItem("isLoggedIn", true);
                    sessionStorage.setItem("username", username);
                    window.location.href = "index.html";
                } else {
                    alert("Usuario o contraseña inválido");
                }
            });
    }
});

// Función para inscribirse y quitarse de la lista
document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault();
    // Lógica para inscribirse
    addUserToList();
});

function addUserToList() {
    const username = sessionStorage.getItem("username");
    fetch('signup.json')
        .then(response => response.json())
        .then(data => {
            if (data.users.length < 18) {
                data.users.push(username);
                alert("Te has anotado exitosamente");
            } else {
                alert("La lista está completa");
            }
        });
}

function removeUser() {
    const username = sessionStorage.getItem("username");
    fetch('signup.json')
        .then(response => response.json())
        .then(data => {
            const index = data.users.indexOf(username);
            if (index > -1) {
                data.users.splice(index, 1);
                alert("Te has quitado de la lista");
            } else {
                alert("No estás en la lista");
            }
        });
}

// Recuperar contraseña
function recoverPassword() {
    const email = prompt("Ingresa tu email:");
    if (email) {
        fetch('users.json')
            .then(response => response.json())
            .then(data => {
                const user = data.users.find(u => u.mail === email);
                if (user) {
                    alert(`Se ha enviado un link de recuperación a ${email}`);
                    // Lógica para enviar email (no implementada)
                } else {
                    alert("Email no encontrado");
                }
            });
    }
}
