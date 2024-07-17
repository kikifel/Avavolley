document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    const recoverButton = document.getElementById("recoverButton");
    const signupButton = document.getElementById("signupButton");
    const removeButton = document.getElementById("removeButton");
    const statsForm = document.getElementById("statsForm");
    const blogForm = document.getElementById("blogForm");
    const changePasswordButton = document.getElementById("changePasswordButton");

    if (loginForm) {
        loginForm.addEventListener("submit", handleLogin);
    }

    if (recoverButton) {
        recoverButton.addEventListener("click", handlePasswordRecovery);
    }

    if (signupButton) {
        signupButton.addEventListener("click", handleSignup);
    }

    if (removeButton) {
        removeButton.addEventListener("click", handleRemoval);
    }

    if (statsForm) {
        statsForm.addEventListener("submit", handleStatsSubmit);
    }

    if (blogForm) {
        blogForm.addEventListener("submit", handleBlogSubmit);
    }

    if (changePasswordButton) {
        changePasswordButton.addEventListener("click", handleChangePassword);
    }

    function handleLogin(event) {
        event.preventDefault();
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        if (!username || !password) {
            alert("Falta usuario y contraseña");
            return;
        }

        fetch("data/users.json")
            .then(response => response.json())
            .then(users => {
                const user = users.find(u => u.username === username && u.password === password);
                if (user) {
                    alert("Inicio de sesión exitoso");
                    sessionStorage.setItem("loggedInUser", JSON.stringify(user));
                    window.location.href = "index.html";
                } else {
                    alert("Usuario o contraseña inválido");
                }
            });
    }

    function handlePasswordRecovery() {
        const email = prompt("Ingrese su correo electrónico:");
        if (!email) {
            alert("Debe ingresar un correo electrónico");
            return;
        }

        fetch("data/users.json")
            .then(response => response.json())
            .then(users => {
                const user = users.find(u => u.email === email);
                if (user) {
                    alert(`Se ha enviado un enlace de recuperación a ${email}`);
                    // Aquí iría la lógica para enviar un correo electrónico con el enlace de recuperación
                } else {
                    alert("Correo electrónico no encontrado");
                }
            });
    }

    function handleSignup() {
        const loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser"));
        if (!loggedInUser) {
            alert("Debe iniciar sesión para anotarse");
            return;
        }

        fetch("data/signups.json")
            .then(response => response.json())
            .then(signups => {
                if (signups.length >= 18) {
                    alert("La lista de inscripciones está llena");
                    return;
                }

                const alreadySignedUp = signups.some(s => s.username === loggedInUser.username);
                if (alreadySignedUp) {
                    alert("Ya está anotado en la lista");
                    return;
                }

                signups.push({
                    username: loggedInUser.username,
                    date: new Date().toISOString()
                });

                saveSignups(signups);
                alert("Inscripción exitosa");
            });
    }

    function handleRemoval() {
        const loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser"));
        if (!loggedInUser) {
            alert("Debe iniciar sesión para quitarse");
            return;
        }

        fetch("data/signups.json")
            .then(response => response.json())
            .then(signups => {
                const newSignups = signups.filter(s => s.username !== loggedInUser.username);

                if (newSignups.length === signups.length) {
                    alert("No está anotado en la lista");
                    return;
                }

                saveSignups(newSignups);
                alert("Eliminado de la lista");
            });
    }

    function handleStatsSubmit(event) {
        event.preventDefault();
        const loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser"));
        if (!loggedInUser || loggedInUser.role !== "Admin") {
            alert("Debe ser un administrador para cargar estadísticas");
            return;
        }

        // Recoger los datos del formulario y guardarlos en las estadísticas
        const statsData = {
            // Ejemplo de cómo recoger los datos del formulario:
            team: document.getElementById("team").value,
            position: document.getElementById("position").value,
            result: document.querySelector('input[name="result"]:checked').value,
            performance: document.getElementById("performance").value
        };

        fetch("data/stats.json")
            .then(response => response.json())
            .then(stats => {
                stats.push(statsData);
                saveStats(stats);
                alert("Estadísticas guardadas con éxito");
            });
    }

    function handleBlogSubmit(event) {
        event.preventDefault();
        const loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser"));
        if (!loggedInUser) {
            alert("Debe iniciar sesión para publicar en el blog");
            return;
        }

        const blogPost = {
            username: loggedInUser.username,
            date: new Date().toISOString(),
            photo: document.getElementById("photo").value,
            text: document.getElementById("text").value
        };

        fetch("data/blogPosts.json")
            .then(response => response.json())
            .then(posts => {
                posts.push(blogPost);
                saveBlogPosts(posts);
                alert("Publicación en el blog exitosa");
            });
    }

    function handleChangePassword() {
        const loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser"));
        if (!loggedInUser) {
            alert("Debe iniciar sesión para cambiar su contraseña");
            return;
        }

        const newPassword = prompt("Ingrese su nueva contraseña:");
        if (!newPassword) {
            alert("Debe ingresar una nueva contraseña");
            return;
        }

        fetch("data/users.json")
            .then(response => response.json())
            .then(users => {
                const user = users.find(u => u.username === loggedInUser.username);
                if (user) {
                    user.password = newPassword;
                    saveUsers(users);
                    alert("Contraseña cambiada con éxito");
                }
            });
    }

    function saveSignups(signups) {
        fetch("data/signups.json", {
            method: "POST",
            body: JSON.stringify(signups),
            headers: {
                "Content-Type": "application/json"
            }
        });
    }

    function saveStats(stats) {
        fetch("data/stats.json", {
            method: "POST",
            body: JSON.stringify(stats),
            headers: {
                "Content-Type": "application/json"
            }
        });
    }

    function saveBlogPosts(posts) {
        fetch("data/blogPosts.json", {
            method: "POST",
            body: JSON.stringify(posts),
            headers: {
                "Content-Type": "application/json"
            }
        });
    }

    function saveUsers(users) {
        fetch("data/users.json", {
            method: "POST",
            body: JSON.stringify(users),
            headers: {
                "Content-Type": "application/json"
            }
        });
    }
    function logout() {
        // Aquí iría la lógica para cerrar sesión
        alert("Sesión cerrada.");
        // Redirigir al login después de cerrar sesión
        window.location.href = "login.html";
    }
    
    function goBack() {
        window.history.back();
    }
    
    // Mostrar el botón de logout si el usuario está logueado
    document.addEventListener("DOMContentLoaded", function() {
        const isLoggedIn = sessionStorage.getItem("isLoggedIn");
        if (isLoggedIn) {
            document.getElementById("logoutButton").style.display = "block";
        }
    });
    
    
});
