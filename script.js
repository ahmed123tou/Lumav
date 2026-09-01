/* =========================================================
   LUMA
   LOCAL LOGIN + SIGNUP SYSTEM
========================================================= */

const USERS_KEY = "LUMA_USERS";
const CURRENT_USER_KEY = "LUMA_CURRENT_USER";
const GENERATED_PASSWORD_KEY = "LUMA_GENERATED_PASSWORD";


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

const generatePassword =
    document.getElementById("generatePassword");

const signupUsername =
    document.getElementById("signupUsername");

const displayName =
    document.getElementById("displayName");

const signupPassword =
    document.getElementById("signupPassword");

const confirmPassword =
    document.getElementById("confirmPassword");


/* =========================================================
   STORAGE
========================================================= */

function getUsers() {

    try {

        return JSON.parse(
            localStorage.getItem(USERS_KEY)
        ) || [];

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

    toast.textContent = message;

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 2500);

}


/* =========================================================
   LOGIN / SIGNUP SWITCH
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
   PASSWORD EYE BUTTONS
========================================================= */

document
    .querySelectorAll(".password-toggle")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const target =
                    button.getAttribute(
                        "data-target"
                    );

                const input =
                    document.getElementById(target);

                if (!input) return;


                const openEye =
                    button.querySelector(
                        ".eye-open"
                    );

                const closedEye =
                    button.querySelector(
                        ".eye-closed"
                    );


                if (
                    input.type === "password"
                ) {

                    input.type = "text";

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

                } else {

                    input.type = "password";

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

                }

            }
        );

    });


/* =========================================================
   USERNAME RULE
   ONLY:
   A-Z
   a-z
   0-9
   _
   -
========================================================= */

function validUsername(username) {

    return /^[A-Za-z0-9_-]{2,24}$/.test(
        username
    );

}


/* =========================================================
   DISPLAY NAME
========================================================= */

function validDisplayName(name) {

    return (
        name.trim().length >= 1 &&
        name.length <= 32
    );

}


/* =========================================================
   PASSWORD RULE
   ONLY LETTERS + NUMBERS
========================================================= */

function validPassword(password) {

    return /^[A-Za-z0-9]{6,32}$/.test(
        password
    );

}


/* =========================================================
   GENERATE RANDOM PASSWORD
========================================================= */

function createRandomPassword(length = 12) {

    const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    let password = "";

    const randomValues =
        new Uint32Array(length);

    crypto.getRandomValues(
        randomValues
    );


    for (
        let i = 0;
        i < length;
        i++
    ) {

        password +=
            characters[
                randomValues[i] %
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
            createRandomPassword(12);


        /* Put it in both fields */

        signupPassword.value =
            password;

        confirmPassword.value =
            password;


        /* Temporarily save it */

        sessionStorage.setItem(
            GENERATED_PASSWORD_KEY,
            password
        );


        /* Make password visible */

        signupPassword.type =
            "text";

        confirmPassword.type =
            "text";


        /* Update eye buttons */

        document
            .querySelectorAll(
                '.password-toggle[data-target="signupPassword"], .password-toggle[data-target="confirmPassword"]'
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

            });


        showToast(
            "Random password generated!"
        );

    }
);


/* =========================================================
   BLOCK INVALID USERNAME CHARACTERS
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
   BLOCK INVALID PASSWORD CHARACTERS
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
   RESTORE GENERATED PASSWORD
========================================================= */

const savedGeneratedPassword =
    sessionStorage.getItem(
        GENERATED_PASSWORD_KEY
    );


if (savedGeneratedPassword) {

    /*
        We don't automatically display it.
        If the user generated one earlier in
        this browser session, it can be restored
        when entering the signup page.
    */

    console.log(
        "Luma generated password is available in this session."
    );

}


/* =========================================================
   SIGNUP
========================================================= */

signup.addEventListener(
    "submit",
    event => {

        event.preventDefault();

        signupError.textContent = "";


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


        if (name.length > 32) {

            signupError.textContent =
                "Display name cannot be longer than 32 characters.";

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
           USERS
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


            users.push(newUser);

            saveUsers(users);


            /*
                Remove temporary generated
                password after account creation.
            */

            sessionStorage.removeItem(
                GENERATED_PASSWORD_KEY
            );


            button.classList.remove(
                "loading"
            );

            button.disabled = false;


            signup.reset();


            openLogin();


            document
                .getElementById(
                    "loginUsername"
                )
                .value = username;


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

        loginError.textContent = "";


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

        button.disabled = true;


        setTimeout(() => {

            localStorage.setItem(
                CURRENT_USER_KEY,
                JSON.stringify({

                    id:
                        user.id,

                    username:
                        user.username,

                    displayName:
                        user.displayName

                })
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
                user
            );

        }, 650);

    }
);


/* =========================================================
   EXISTING SESSION
========================================================= */

const currentUser =
    localStorage.getItem(
        CURRENT_USER_KEY
    );


if (currentUser) {

    try {

        const user =
            JSON.parse(
                currentUser
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
