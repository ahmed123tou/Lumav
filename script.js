```javascript
/* =========================================================
   LUMA — LOCAL LOGIN & SIGNUP SYSTEM
   No backend required.
   Accounts are stored in this browser using localStorage.
========================================================= */

const USERS_KEY = "LUMA_USERS";
const CURRENT_USER_KEY = "LUMA_CURRENT_USER";

/* =========================
   ELEMENTS
========================= */

const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");

const showSignup = document.getElementById("showSignup");
const showLogin = document.getElementById("showLogin");

const login = document.getElementById("login");
const signup = document.getElementById("signup");

const loginError = document.getElementById("loginError");
const signupError = document.getElementById("signupError");

const toast = document.getElementById("toast");

/* =========================
   STORAGE
========================= */

function getUsers() {
    try {
        return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
    } catch {
        return [];
    }
}

function saveUsers(users) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

/* =========================
   TOAST
========================= */

function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2500);
}

/* =========================
   SWITCH LOGIN / SIGNUP
========================= */

showSignup.addEventListener("click", () => {
    loginForm.classList.remove("active");
    signupForm.classList.add("active");

    loginError.textContent = "";
    signupError.textContent = "";

    document.title = "Luma — Register";
});

showLogin.addEventListener("click", () => {
    signupForm.classList.remove("active");
    loginForm.classList.add("active");

    loginError.textContent = "";
    signupError.textContent = "";

    document.title = "Luma — Login";
});

/* =========================
   PASSWORD SHOW / HIDE
========================= */

document.querySelectorAll(".show-password").forEach(button => {
    button.addEventListener("click", () => {
        const targetId = button.dataset.target;
        const input = document.getElementById(targetId);

        if (input.type === "password") {
            input.type = "text";
            button.textContent = "Hide";
        } else {
            input.type = "password";
            button.textContent = "Show";
        }
    });
});

/* =========================
   VALIDATION
========================= */

function validUsername(username) {
    return /^[a-zA-Z0-9_.-]{2,24}$/.test(username);
}

function validDisplayName(name) {
    return name.trim().length >= 2 && name.trim().length <= 32;
}

/* =========================
   SIGNUP
========================= */

signup.addEventListener("submit", event => {
    event.preventDefault();

    signupError.textContent = "";

    const button = signup.querySelector(".primary-btn");

    const username = document
        .getElementById("signupUsername")
        .value
        .trim();

    const displayName = document
        .getElementById("displayName")
        .value
        .trim();

    const password = document.getElementById("signupPassword").value;

    const confirmPassword =
        document.getElementById("confirmPassword").value;

    /* Username validation */

    if (!validUsername(username)) {
        signupError.textContent =
            "Username must be 2–24 characters and can only contain letters, numbers, _, . or -.";
        return;
    }

    /* Display name validation */

    if (!validDisplayName(displayName)) {
        signupError.textContent =
            "Display name must be between 2 and 32 characters.";
        return;
    }

    /* Password validation */

    if (password.length < 6) {
        signupError.textContent =
            "Password must be at least 6 characters.";
        return;
    }

    /* Confirm password */

    if (password !== confirmPassword) {
        signupError.textContent =
            "Passwords do not match.";
        return;
    }

    /* Existing username */

    const users = getUsers();

    const usernameTaken = users.some(
        user => user.username.toLowerCase() === username.toLowerCase()
    );

    if (usernameTaken) {
        signupError.textContent =
            "That username is already taken.";
        return;
    }

    /* Loading */

    button.classList.add("loading");
    button.disabled = true;

    setTimeout(() => {

        const newUser = {
            id: crypto.randomUUID
                ? crypto.randomUUID()
                : Date.now().toString(),

            username: username,

            displayName: displayName,

            password: password,

            createdAt: new Date().toISOString()
        };

        users.push(newUser);
        saveUsers(users);

        button.classList.remove("loading");
        button.disabled = false;

        signup.reset();

        /* Switch to login */

        signupForm.classList.remove("active");
        loginForm.classList.add("active");

        document.title = "Luma — Login";

        loginError.textContent = "";

        document.getElementById("loginUsername").value =
            username;

        showToast("Account created! You can now log in.");

    }, 650);
});

/* =========================
   LOGIN
========================= */

login.addEventListener("submit", event => {
    event.preventDefault();

    loginError.textContent = "";

    const button = login.querySelector(".primary-btn");

    const username = document
        .getElementById("loginUsername")
        .value
        .trim();

    const password =
        document.getElementById("loginPassword").value;

    const users = getUsers();

    const user = users.find(
        account =>
            account.username.toLowerCase() ===
                username.toLowerCase() &&
            account.password === password
    );

    if (!user) {
        loginError.textContent =
            "Invalid username or password.";
        return;
    }

    button.classList.add("loading");
    button.disabled = true;

    setTimeout(() => {

        /*
            Save the currently logged-in user.
            We'll use this later when we build
            the actual Luma app.
        */

        localStorage.setItem(
            CURRENT_USER_KEY,
            JSON.stringify({
                id: user.id,
                username: user.username,
                displayName: user.displayName
            })
        );

        button.classList.remove("loading");
        button.disabled = false;

        showToast(`Welcome back, ${user.displayName}!`);

        /*
            For now, don't redirect anywhere.
            The main Luma app will be connected here
            in the next step.
        */

        console.log("Logged in user:", user);

    }, 650);
});

/* =========================
   AUTO-DETECT CURRENT USER
========================= */

const currentUser =
    localStorage.getItem(CURRENT_USER_KEY);

if (currentUser) {
    try {
        const user = JSON.parse(currentUser);

        console.log(
            `Luma session found for @${user.username}`
        );

    } catch {
        localStorage.removeItem(CURRENT_USER_KEY);
    }
}
```
