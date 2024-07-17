document.addEventListener('DOMContentLoaded', function() {
    // Login form handling
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            // Simple authentication logic (for demonstration purposes)
            if (username === 'admin' && password === 'password') {
                alert('Login successful!');
                // Redirect to the form page (or another page)
                window.location.href = 'form.html';
            } else {
                alert('Invalid username or password.');
            }
        });
    }

    // Signup form handling
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        const signupList = document.getElementById('signupList');
        const unsubscribeButton = document.getElementById('unsubscribeButton');

        signupForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const name = document.getElementById('name').value;

            if (signupList.children.length < 18) {
                const listItem = document.createElement('li');
                listItem.textContent = name;
                signupList.appendChild(listItem);
            } else {
                alert('Maximum number of signups reached.');
            }
        });

        unsubscribeButton.addEventListener('click', function() {
            const name = document.getElementById('name').value;
            const listItems = signupList.children;

            for (let i = 0; i < listItems.length; i++) {
                if (listItems[i].textContent === name) {
                    signupList.removeChild(listItems[i]);
                    break;
                }
            }
        });
    }

    // Match data form handling
    const matchDataForm = document.getElementById('matchDataForm');
    if (matchDataForm) {
        matchDataForm.addEventListener('submit', function(event) {
            event.preventDefault();
            // Collect and process match data
            const player = document.getElementById('player').value;
            const team = document.getElementById('team').value;
            const position = document.getElementById('position').value;
            const result = document.getElementById('result').value;
            const performance = document.getElementById('performance').value;

            // For demonstration purposes, simply log the data
            console.log({ player, team, position, result, performance });

            alert('Match data submitted!');
        });
    }

    // Blog post form handling
    const blogPostForm = document.getElementById('blogPostForm');
    if (blogPostForm) {
        const blogPostsContainer = document.getElementById('blogPostsContainer');

        blogPostForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const postImage = document.getElementById('postImage').files[0];
            const postText = document.getElementById('postText').value;

            const postDiv = document.createElement('div');
            postDiv.className = 'blog-post';

            if (postImage) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const img = document.createElement('img');
                    img.src = e.target.result;
                    img.alt = 'Blog Post Image';
                    postDiv.appendChild(img);
                }
                reader.readAsDataURL(postImage);
            }

            const textPara = document.createElement('p');
            textPara.textContent = postText;
            postDiv.appendChild(textPara);

            blogPostsContainer.appendChild(postDiv);
        });
    }
});
