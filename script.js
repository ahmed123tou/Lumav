/* =========================================================
   LUMA
   LOGIN + SIGNUP
========================================================= */


/* =========================================================
   STORAGE
========================================================= */

const USERS_KEY = "LUMA_USERS";

const CURRENT_USER_KEY =
    "LUMA_CURRENT_USER";


/* =========================================================
   ELEMENTS
========================================================= */

const loginForm =
    document.getElementById("loginForm");

const signupForm =
    document.getElementById("signupForm");

const showSignup =
    document.getElementById("showSignup");

const showLogin =
    document.getElementById("showLogin");

const login =
    document.getElementById("login");

const signup =
    document.getElementById("signup");

const loginError =
    document.getElementById("loginError");

const signupError =
    document.getElementById("signupError");

const toast =
    document.getElementById("toast");


const signupUsername =
    document.getElementById(
        "signupUsername"
    );

const displayName =
    document.getElementById(
        "displayName"
    );

const signupPassword =
    document.getElementById(
        "signupPassword"
    );

const confirmPassword =
    document.getElementById(
        "confirmPassword"
    );

const generatePassword =
    document.getElementById(
        "generatePassword"
    );


/* =========================================================
   GET USERS
========================================================= */

function getUsers() {

    try {

        const saved =
            localStorage.getItem(
                USERS_KEY
            );

        if (!saved) {
            return [];
        }

        const users =
            JSON.parse(saved);

        return Array.isArray(users)
            ? users
            : [];

    } catch {

        return [];

    }

}


/* =========================================================
   SAVE USERS
========================================================= */

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

    toast.textContent =
        message;

    toast.classList.add(
        "show"
    );

    setTimeout(() => {

        toast.classList.remove(
            "show"
        );

    }, 2500);

}


/* =========================================================
   SWITCH TO SIGNUP
========================================================= */

function openSignup() {

    loginForm.classList.remove(
        "active"
    );

    signupForm.classList.add(
        "active"
    );

    loginError.textContent = "";

    signupError.textContent = "";

    document.title =
        "Luma — Register";

}


/* =========================================================
   SWITCH TO LOGIN
========================================================= */

function openLogin() {

    signupForm.classList.remove(
        "active"
    );

    loginForm.classList.add(
        "active"
    );

    loginError.textContent = "";

    signupError.textContent = "";

    document.title =
        "Luma — Login";

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
   WORKS FOR EVERY EYE BUTTON
========================================================= */

document
    .querySelectorAll(".eye-button")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const passwordId =
                    button.dataset.password;

                const input =
                    document.getElementById(
                        passwordId
                    );

                if (!input) {
                    return;
                }


                const openEye =
                    button.querySelector(
                        ".eye-open"
                    );

                const closedEye =
                    button.querySelector(
                        ".eye-closed"
                    );


                const showing =
                    input.type === "text";


                if (showing) {

                    /* HIDE */

                    input.type =
                        "password";

                    openEye.style.display =
                        "block";

                    closedEye.style.display =
                        "none";

                    button.setAttribute(
                        "aria-label",
                        "Show password"
                    );

                    button.setAttribute(
                        "title",
                        "Show password"
                    );

                } else {

                    /* SHOW */

                    input.type =
                        "text";

                    openEye.style.display =
                        "none";

                    closedEye.style.display =
                        "block";

                    button.setAttribute(
                        "aria-label",
                        "Hide password"
                    );

                    button.setAttribute(
                        "title",
                        "Hide password"
                    );

                }

            }
        );

    });


/* =========================================================
   USERNAME VALIDATION
========================================================= */

function validUsername(username) {

    /*
        Allowed:

        A-Z
        a-z
        0-9
        _
        -

        Nothing else.
    */

    return /^[A-Za-z0-9_-]{2,24}$/
        .test(username);

}


/* =========================================================
   PASSWORD VALIDATION
========================================================= */

function validPassword(password) {

    /*
        Letters + numbers only.
    */

    return /^[A-Za-z0-9]{6,32}$/
        .test(password);

}


/* =========================================================
   DISPLAY NAME VALIDATION
========================================================= */

function validDisplayName(name) {

    return (
        name.trim().length >= 1 &&
        name.length <= 32
    );

}


/* =========================================================
   CLEAN USERNAME WHILE TYPING
========================================================= */

signupUsername.addEventListener(
    "input",
    () => {

        signupUsername.value =
            signupUsername.value.replace(
                /[^A-Za-z0-9_-]/g,
                ""
            );

    }
);


/* =========================================================
   CLEAN PASSWORD WHILE TYPING
========================================================= */

signupPassword.addEventListener(
    "input",
    () => {

        signupPassword.value =
            signupPassword.value.replace(
                /[^A-Za-z0-9]/g,
                ""
            );

    }
);


confirmPassword.addEventListener(
    "input",
    () => {

        confirmPassword.value =
            confirmPassword.value.replace(
                /[^A-Za-z0-9]/g,
                ""
            );

    }
);


/* =========================================================
   RANDOM PASSWORD GENERATOR
========================================================= */

function generateRandomPassword(
    length = 12
) {

    const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";


    let password = "";


    /*
        crypto.getRandomValues gives
        us proper browser randomness.
    */

    const random =
        new Uint32Array(length);


    crypto.getRandomValues(
        random
    );


    for (
        let i = 0;
        i < length;
        i++
    ) {

        password +=
            characters[
                random[i] %
                characters.length
            ];

    }


    return password;

}


/* =========================================================
   GENERATE PASSWORD BUTTON
========================================================= */

generatePassword.addEventListener(
    "click",
    () => {

        const password =
            generateRandomPassword(12);


        /* Put password into BOTH fields */

        signupPassword.value =
            password;

        confirmPassword.value =
            password;


        /*
            Show the generated password
            automatically.
        */

        signupPassword.type =
            "text";

        confirmPassword.type =
            "text";


        /*
            Update both eye buttons.
        */

        document
            .querySelectorAll(
                '.eye-button[data-password="signupPassword"], .eye-button[data-password="confirmPassword"]'
            )
            .forEach(button => {

                const openEye =
                    button.querySelector(
                        ".eye-open"
                    );

                const closedEye =
                    button.querySelector(
                        ".eye-closed"
                    );

                openEye.style.display =
                    "none";

                closedEye.style.display =
                    "block";

                button.setAttribute(
                    "aria-label",
                    "Hide password"
                );

                button.setAttribute(
                    "title",
                    "Hide password"
                );

            });


        /*
            Change button temporarily
            so the user knows it worked.
        */

        const originalHTML =
            generatePassword.innerHTML;


        generatePassword.innerHTML = `
            <span class="generate-icon">✓</span>
            <span>Password generated!</span>
        `;


        showToast(
            "Random password generated!"
        );


        setTimeout(() => {

            generatePassword.innerHTML =
                originalHTML;

        }, 1800);

    }
);


/* =========================================================
   SIGNUP
========================================================= */

signup.addEventListener(
    "submit",
    event => {

        event.preventDefault();

        signupError.textContent =
            "";


        const button =
            signup.querySelector(
                ".primary-btn"
            );


        const username =
            signupUsername.value.trim();


        const name =
            displayName.value;


        const password =
            signupPassword.value;


        const confirm =
            confirmPassword.value;


        /* =====================================
           USERNAME
        ===================================== */

        if (
            !validUsername(username)
        ) {

            signupError.textContent =
                "Username can only contain letters, numbers, _ and -.";

            return;

        }


        /* =====================================
           DISPLAY NAME
        ===================================== */

        if (
            !validDisplayName(name)
        ) {

            signupError.textContent =
                "Please enter a display name.";

            return;

        }


        /* =====================================
           PASSWORD
        ===================================== */

        if (
            !validPassword(password)
        ) {

            signupError.textContent =
                "Password must be 6–32 characters and contain only letters and numbers.";

            return;

        }


        /* =====================================
           CONFIRM PASSWORD
        ===================================== */

        if (
            password !== confirm
        ) {

            signupError.textContent =
                "Passwords do not match.";

            return;

        }


        /* =====================================
           CHECK USERNAME
        ===================================== */

        const users =
            getUsers();


        const usernameTaken =
            users.some(
                user =>
                    user.username
                        .toLowerCase() ===
                    username.toLowerCase()
            );


        if (usernameTaken) {

            signupError.textContent =
                "That username is already taken.";

            return;

        }


        /* =====================================
           LOADING
        ===================================== */

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


            button.classList.remove(
                "loading"
            );

            button.disabled =
                false;


            signup.reset();


            openLogin();


            document
                .getElementById(
                    "loginUsername"
                )
                .value =
                username;


            showToast(
                "Account created! You can now log in."
            );

        }, 650);

    }
);


/* =========================================================
   LOGIN
========================================================= */

login.addEventListener(
    "submit",
    event => {

        event.preventDefault();

        loginError.textContent =
            "";


        const button =
            login.querySelector(
                ".primary-btn"
            );


        const username =
            document
                .getElementById(
                    "loginUsername"
                )
                .value
                .trim();


        const password =
            document
                .getElementById(
                    "loginPassword"
                )
                .value;


        const users =
            getUsers();


        const user =
            users.find(
                account =>
                    account.username
                        .toLowerCase() ===
                    username.toLowerCase() &&
                    account.password ===
                    password
            );


        if (!user) {

            loginError.textContent =
                "Invalid username or password.";

            return;

        }


        button.classList.add(
            "loading"
        );

        button.disabled =
            true;


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
                JSON.stringify(
                    session
                )
            );


            button.classList.remove(
                "loading"
            );

            button.disabled =
                false;


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
   CHECK EXISTING SESSION
========================================================= */

const existingSession =
    localStorage.getItem(
        CURRENT_USER_KEY
    );


if (existingSession) {

    try {

        const user =
            JSON.parse(
                existingSession
            );

        console.log(
            `Luma session: @${user.username}`
        );

    } catch {

        localStorage.removeItem(
            CURRENT_USER_KEY
        );

    }

}
