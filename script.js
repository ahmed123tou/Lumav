/* =========================================================
   LUMA — LOGIN + SIGNUP
========================================================= */

const USERS_KEY = "LUMA_USERS";
const CURRENT_USER_KEY = "LUMA_CURRENT_USER";


/* =========================================================
   ELEMENTS
========================================================= */

const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");

const showSignup = document.getElementById("showSignup");
const showLogin = document.getElementById("showLogin");

const login = document.getElementById("login");
const signup = document.getElementById("signup");

const loginError = document.getElementById("loginError");
const signupError = document.getElementById("signupError");

const toast = document.getElementById("toast");

const loginUsername = document.getElementById("loginUsername");
const loginPassword = document.getElementById("loginPassword");

const signupUsername = document.getElementById("signupUsername");
const displayName = document.getElementById("displayName");
const signupPassword = document.getElementById("signupPassword");
const confirmPassword = document.getElementById("confirmPassword");

const generatePassword =
    document.getElementById("generatePassword");


/* =========================================================
   USERS
========================================================= */

function getUsers() {
    try {
        const saved = localStorage.getItem(USERS_KEY);

        if (!saved) {
            return [];
        }

        const users = JSON.parse(saved);

        return Array.isArray(users) ? users : [];

    } catch {
        return [];
    }
}


function saveUsers(users) {
    localStorage.setItem(
        USERS_KEY,
        JSON.stringify(users)
    );
}


/* =========================================================
   TOAST
========================================================= */

function showToast(message) {

    if (!toast) return;

    toast.textContent = message;

    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2500);
}


/* =========================================================
   SWITCH LOGIN / SIGNUP
========================================================= */

function openSignup() {

    loginForm.classList.remove("active");
    signupForm.classList.add("active");

    loginError.textContent = "";
    signupError.textContent = "";

    document.title = "Luma — Register";
}


function openLogin() {

    signupForm.classList.remove("active");
    loginForm.classList.add("active");

    loginError.textContent = "";
    signupError.textContent = "";

    document.title = "Luma — Login";
}


showSignup.addEventListener(
    "click",
    openSignup
);


showLogin.addEventListener(
    "click",
    openLogin
);


/* =========================================================
   PASSWORD SHOW / HIDE
========================================================= */

function setupEyeButtons() {

    const eyeButtons =
        document.querySelectorAll(".eye-button");


    eyeButtons.forEach(button => {

        button.addEventListener("click", function () {

            const passwordId =
                this.getAttribute("data-password");

            const input =
                document.getElementById(passwordId);

            if (!input) {
                return;
            }


            const isHidden =
                input.type === "password";


            if (isHidden) {

                /* SHOW */

                input.type = "text";

                this.classList.add("showing");

                this.setAttribute(
                    "aria-label",
                    "Hide password"
                );

                this.setAttribute(
                    "title",
                    "Hide password"
                );

            } else {

                /* HIDE */

                input.type = "password";

                this.classList.remove("showing");

                this.setAttribute(
                    "aria-label",
                    "Show password"
                );

                this.setAttribute(
                    "title",
                    "Show password"
                );

            }

        });

    });

}


setupEyeButtons();


/* =========================================================
   USERNAME RULE
========================================================= */

function validUsername(username) {

    return /^[A-Za-z0-9_-]{2,24}$/.test(
        username
    );

}


/* =========================================================
   PASSWORD RULE
========================================================= */

function validPassword(password) {

    return /^[A-Za-z0-9]{6,32}$/.test(
        password
    );

}


/* =========================================================
   DISPLAY NAME RULE
========================================================= */

function validDisplayName(name) {

    return (
        name.trim().length >= 1 &&
        name.length <= 32
    );

}


/* =========================================================
   USERNAME LIVE FILTER
========================================================= */

signupUsername.addEventListener(
    "input",
    function () {

        this.value =
            this.value.replace(
                /[^A-Za-z0-9_-]/g,
                ""
            );

    }
);


/* =========================================================
   PASSWORD LIVE FILTER
========================================================= */

signupPassword.addEventListener(
    "input",
    function () {

        this.value =
            this.value.replace(
                /[^A-Za-z0-9]/g,
                ""
            );

    }
);


confirmPassword.addEventListener(
    "input",
    function () {

        this.value =
            this.value.replace(
                /[^A-Za-z0-9]/g,
                ""
            );

    }
);


/* =========================================================
   RANDOM PASSWORD
========================================================= */

function generateRandomPassword(length = 12) {

    const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    let password = "";

    const randomValues =
        new Uint32Array(length);

    crypto.getRandomValues(
        randomValues
    );

    for (let i = 0; i < length; i++) {

        password +=
            characters[
                randomValues[i] %
                characters.length
            ];

    }

    return password;
}


/* =========================================================
   GENERATE PASSWORD
========================================================= */

generatePassword.addEventListener(
    "click",
    function () {

        const password =
            generateRandomPassword(12);


        signupPassword.value =
            password;

        confirmPassword.value =
            password;


        /*
            Show generated password.
        */

        signupPassword.type =
            "text";

        confirmPassword.type =
            "text";


        /*
            Update eye buttons.
        */

        document
            .querySelectorAll(".eye-button")
            .forEach(button => {

                const id =
                    button.getAttribute(
                        "data-password"
                    );

                if (
                    id === "signupPassword" ||
                    id === "confirmPassword"
                ) {

                    button.classList.add(
                        "showing"
                    );

                    button.setAttribute(
                        "aria-label",
                        "Hide password"
                    );

                    button.setAttribute(
                        "title",
                        "Hide password"
                    );

                }

            });


        const oldHTML =
            this.innerHTML;


        this.innerHTML = `
            <span class="generate-icon">✓</span>
            <span>Password generated!</span>
        `;


        showToast(
            "Random password generated!"
        );


        setTimeout(() => {

            this.innerHTML =
                oldHTML;

        }, 1800);

    }
);


/* =========================================================
   SIGNUP
========================================================= */

signup.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();

        signupError.textContent = "";


        const button =
            signup.querySelector(
                ".primary-btn"
            );


        const username =
            signupUsername.value.trim();

        const name =
            displayName.value.trim();

        const password =
            signupPassword.value;

        const confirm =
            confirmPassword.value;


        /* USERNAME */

        if (!validUsername(username)) {

            signupError.textContent =
                "Username can only contain letters, numbers, _ and -.";

            return;
        }


        /* DISPLAY NAME */

        if (!validDisplayName(name)) {

            signupError.textContent =
                "Please enter a display name.";

            return;
        }


        /* PASSWORD */

        if (!validPassword(password)) {

            signupError.textContent =
                "Password must be 6–32 characters and contain only letters and numbers.";

            return;
        }


        /* CONFIRM */

        if (password !== confirm) {

            signupError.textContent =
                "Passwords do not match.";

            return;
        }


        const users =
            getUsers();


        /* CHECK USERNAME */

        const usernameTaken =
            users.some(
                user =>
                    user.username.toLowerCase() ===
                    username.toLowerCase()
            );


        if (usernameTaken) {

            signupError.textContent =
                "That username is already taken.";

            return;
        }


        /* LOADING */

        button.classList.add(
            "loading"
        );

        button.disabled = true;


        setTimeout(() => {

            const newUser = {

                id:
                    crypto.randomUUID
                        ? crypto.randomUUID()
                        : Date.now().toString(),

                username:
                    username,

                displayName:
                    name,

                password:
                    password,

                createdAt:
                    new Date().toISOString()

            };


            users.push(
                newUser
            );

            saveUsers(
                users
            );


            /* =====================================
               REMEMBER LOGIN INFORMATION
            ===================================== */

            loginUsername.value =
                username;

            loginPassword.value =
                password;


            /* =====================================
               RESET SIGNUP
            ===================================== */

            signup.reset();


            /*
                reset() would normally erase the
                generated password, but we already
                copied it to login.
            */


            button.classList.remove(
                "loading"
            );

            button.disabled = false;


            /* =====================================
               GO TO LOGIN
            ===================================== */

            openLogin();


            /*
                Make sure both fields remain filled.
            */

            loginUsername.value =
                username;

            loginPassword.value =
                password;


            showToast(
                "Account created! Your login details are ready."
            );


        }, 650);

    }
);


/* =========================================================
   LOGIN
========================================================= */

login.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();

        loginError.textContent = "";


        const button =
            login.querySelector(
                ".primary-btn"
            );


        const username =
            loginUsername.value.trim();

        const password =
            loginPassword.value;


        const users =
            getUsers();


        const user =
            users.find(
                account =>
                    account.username.toLowerCase() ===
                    username.toLowerCase() &&
                    account.password ===
                    password
            );


        if (!user) {

            loginError.textContent =
                "Invalid username or password.";

            return;
        }


        /* LOADING */

        button.classList.add(
            "loading"
        );

        button.disabled = true;


        setTimeout(() => {

            const session = {

                id:
                    user.id,

                username:
                    user.username,

                displayName:
                    user.displayName

            };


            localStorage.setItem(
                CURRENT_USER_KEY,
                JSON.stringify(session)
            );


            button.classList.remove(
                "loading"
            );

            button.disabled = false;


            showToast(
                `Welcome back, ${user.displayName}!`
            );


            console.log(
                "Luma logged in:",
                session
            );


        }, 650);

    }
);


/* =========================================================
   EXISTING SESSION
========================================================= */

const existingSession =
    localStorage.getItem(
        CURRENT_USER_KEY
    );


if (existingSession) {

    try {

        const session =
            JSON.parse(
                existingSession
            );

        console.log(
            "Luma session:",
            session
        );

    } catch {

        localStorage.removeItem(
            CURRENT_USER_KEY
        );

    }

}
