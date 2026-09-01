```javascript
/* =========================================================
   LUMA — LOGIN + SIGNUP + TEST CHAT
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

        const saved =
            localStorage.getItem(USERS_KEY);

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

    document.title =
        "Luma — Register";

}


function openLogin() {

    signupForm.classList.remove("active");

    loginForm.classList.add("active");

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
   IMPORTANT:
   Uses your current HTML:
   .password-toggle
   data-target="passwordInput"
========================================================= */

function setupPasswordButtons() {

    const buttons =
        document.querySelectorAll(
            ".password-toggle"
        );


    buttons.forEach(button => {

        button.addEventListener(
            "click",
            function () {

                const target =
                    this.getAttribute(
                        "data-target"
                    );


                const input =
                    document.getElementById(
                        target
                    );


                if (!input) {
                    return;
                }


                const hidden =
                    input.type === "password";


                if (hidden) {

                    input.type = "text";

                    this.setAttribute(
                        "aria-label",
                        "Hide password"
                    );

                    this.setAttribute(
                        "title",
                        "Hide password"
                    );

                    this.classList.add(
                        "showing"
                    );

                    const openEye =
                        this.querySelector(
                            ".eye-open"
                        );

                    const closedEye =
                        this.querySelector(
                            ".eye-closed"
                        );

                    if (openEye) {
                        openEye.style.display =
                            "none";
                    }

                    if (closedEye) {
                        closedEye.style.display =
                            "block";
                    }

                } else {

                    input.type =
                        "password";

                    this.setAttribute(
                        "aria-label",
                        "Show password"
                    );

                    this.setAttribute(
                        "title",
                        "Show password"
                    );

                    this.classList.remove(
                        "showing"
                    );

                    const openEye =
                        this.querySelector(
                            ".eye-open"
                        );

                    const closedEye =
                        this.querySelector(
                            ".eye-closed"
                        );

                    if (openEye) {
                        openEye.style.display =
                            "block";
                    }

                    if (closedEye) {
                        closedEye.style.display =
                            "none";
                    }

                }

            }
        );

    });

}


setupPasswordButtons();


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

function generateRandomPassword(
    length = 12
) {

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


        signupPassword.type =
            "text";

        confirmPassword.type =
            "text";


        document
            .querySelectorAll(
                ".password-toggle"
            )
            .forEach(button => {

                const id =
                    button.getAttribute(
                        "data-target"
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


                    const openEye =
                        button.querySelector(
                            ".eye-open"
                        );

                    const closedEye =
                        button.querySelector(
                            ".eye-closed"
                        );


                    if (openEye) {
                        openEye.style.display =
                            "none";
                    }

                    if (closedEye) {
                        closedEye.style.display =
                            "block";
                    }

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


        if (!validUsername(username)) {

            signupError.textContent =
                "Username can only contain letters, numbers, _ and -.";

            return;

        }


        if (!validDisplayName(name)) {

            signupError.textContent =
                "Please enter a display name.";

            return;

        }


        if (!validPassword(password)) {

            signupError.textContent =
                "Password must be 6–32 characters and contain only letters and numbers.";

            return;

        }


        if (password !== confirm) {

            signupError.textContent =
                "Passwords do not match.";

            return;

        }


        const users =
            getUsers();


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


            loginUsername.value =
                username;

            loginPassword.value =
                password;


            signup.reset();


            button.classList.remove(
                "loading"
            );

            button.disabled = false;


            openLogin();


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


            /* =====================================
               OPEN LUMA APP
            ===================================== */

            openLumaApp(
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


/* =========================================================
   DISCORD OAUTH
========================================================= */

const DISCORD_OAUTH_URL =
    "https://luma-backend-w8gq.onrender.com/auth/discord";


const discordLogin =
    document.getElementById(
        "discordLogin"
    );


const discordSignup =
    document.getElementById(
        "discordLoginSignup"
    );


if (discordLogin) {

    discordLogin.addEventListener(
        "click",
        () => {

            window.location.href =
                DISCORD_OAUTH_URL;

        }
    );

}


if (discordSignup) {

    discordSignup.addEventListener(
        "click",
        () => {

            window.location.href =
                DISCORD_OAUTH_URL;

        }
    );

}


/* =========================================================
   LUMA TEST APP
========================================================= */

function openLumaApp(session) {

    document.title =
        "Luma";


    document.body.innerHTML = `

        <div class="luma-app">

            <aside class="luma-sidebar">

                <div class="luma-home">
                    ✦
                </div>


                <div class="dm-sidebar">

                    <div class="dm-search">
                        <span>Search</span>
                        <span>⌕</span>
                    </div>


                    <button
                        class="friends-button"
                        id="friendsButton"
                    >
                        <span>👥</span>
                        Friends
                    </button>


                    <div class="dm-title">
                        DIRECT MESSAGES
                    </div>


                    <button
                        class="dm-user active"
                        id="testFriend"
                    >

                        <div class="avatar test-avatar">
                            T
                        </div>

                        <div class="dm-user-info">

                            <strong>
                                Luma Test Friend
                            </strong>

                            <small>
                                Online
                            </small>

                        </div>

                        <span class="online-dot"></span>

                    </button>

                </div>

            </aside>


            <main class="luma-main">

                <header class="chat-header">

                    <div class="chat-person">

                        <div class="avatar test-avatar">
                            T
                        </div>

                        <div>

                            <strong>
                                Luma Test Friend
                            </strong>

                            <span>
                                Online
                            </span>

                        </div>

                    </div>

                    <div class="header-actions">
                        🔍
                        📞
                        ⚙
                    </div>

                </header>


                <section
                    class="chat-messages"
                    id="chatMessages"
                >

                    <div class="welcome-chat">

                        <div class="large-avatar">
                            T
                        </div>

                        <h1>
                            Luma Test Friend
                        </h1>

                        <p>
                            This is your test friend.
                        </p>

                        <p>
                            Send a message below to test chatting.
                        </p>

                    </div>

                </section>


                <div class="message-area">

                    <div
                        class="message-input-wrapper"
                    >

                        <button
                            class="chat-plus"
                            id="chatPlus"
                            type="button"
                        >
                            +
                        </button>


                        <input
                            id="messageInput"
                            type="text"
                            placeholder="Message Luma Test Friend"
                            autocomplete="off"
                        >


                        <button
                            class="chat-tool"
                            type="button"
                        >
                            😊
                        </button>


                        <button
                            class="chat-send"
                            id="sendMessage"
                            type="button"
                        >
                            ➤
                        </button>

                    </div>

                </div>

            </main>

        </div>

    `;


    addLumaAppStyles();

    setupTestChat(session);

}


/* =========================================================
   TEST CHAT
========================================================= */

function setupTestChat(session) {

    const input =
        document.getElementById(
            "messageInput"
        );


    const send =
        document.getElementById(
            "sendMessage"
        );


    const messages =
        document.getElementById(
            "chatMessages"
        );


    const friend =
        document.getElementById(
            "testFriend"
        );


    function sendMessage() {

        const text =
            input.value.trim();


        if (!text) {
            return;
        }


        const message =
            document.createElement(
                "div"
            );


        message.className =
            "message-row own";


        message.innerHTML = `

            <div class="avatar user-avatar">
                ${escapeHTML(
                    session.displayName
                        .charAt(0)
                        .toUpperCase()
                )}
            </div>

            <div class="message-content">

                <div class="message-author">
                    ${escapeHTML(
                        session.displayName
                    )}

                    <span>
                        just now
                    </span>
                </div>

                <div class="message-text">
                    ${escapeHTML(text)}
                </div>

            </div>

        `;


        messages.appendChild(
            message
        );


        input.value = "";

        messages.scrollTop =
            messages.scrollHeight;


        /* =====================================
           TEST FRIEND AUTO REPLY
        ===================================== */

        setTimeout(() => {

            const reply =
                document.createElement(
                    "div"
                );


            reply.className =
                "message-row";


            reply.innerHTML = `

                <div class="avatar test-avatar">
                    T
                </div>

                <div class="message-content">

                    <div class="message-author">
                        Luma Test Friend
                        <span>
                            just now
                        </span>
                    </div>

                    <div class="message-text">
                        Test message received! 👋
                    </div>

                </div>

            `;


            messages.appendChild(
                reply
            );


            messages.scrollTop =
                messages.scrollHeight;

        }, 700);

    }


    send.addEventListener(
        "click",
        sendMessage
    );


    input.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Enter"
            ) {

                event.preventDefault();

                sendMessage();

            }

        }
    );


    friend.addEventListener(
        "click",
        () => {

            friend.classList.add(
                "active"
            );

        }
    );

}


/* =========================================================
   ESCAPE USER MESSAGE
========================================================= */

function escapeHTML(text) {

    const div =
        document.createElement(
            "div"
        );

    div.textContent =
        text;

    return div.innerHTML;

}


/* =========================================================
   LUMA APP DESIGN
========================================================= */

function addLumaAppStyles() {

    const style =
        document.createElement(
            "style"
        );


    style.textContent = `

        .luma-app {
            position: fixed;
            inset: 0;

            display: flex;

            background: #111214;
            color: #f2f3f5;

            font-family:
                "gg sans",
                "Noto Sans",
                Arial,
                sans-serif;
        }


        /* ==============================
           LEFT SIDE
        ============================== */

        .luma-sidebar {
            width: 320px;

            display: flex;

            background: #1e1f22;
        }


        .luma-home {
            width: 72px;

            display: flex;
            align-items: center;
            justify-content: center;

            background: #111214;

            color: white;

            font-size: 27px;

            border-right:
                1px solid
                rgba(255,255,255,.04);
        }


        .dm-sidebar {
            width: 248px;

            padding: 12px;

            overflow-y: auto;
        }


        .dm-search {
            height: 34px;

            display: flex;
            align-items: center;
            justify-content: space-between;

            padding: 0 10px;

            margin-bottom: 10px;

            border-radius: 5px;

            background: #111214;

            color: #949ba4;

            font-size: 13px;
        }


        .friends-button {
            width: 100%;
            height: 42px;

            display: flex;
            align-items: center;

            gap: 12px;

            padding: 0 12px;

            border: 0;
            border-radius: 6px;

            background: transparent;

            color: #dbdee1;

            font-size: 14px;
            font-weight: 600;

            cursor: pointer;

            text-align: left;
        }


        .friends-button:hover {
            background: #35373c;
        }


        .dm-title {
            margin:
                22px 8px 8px;

            color: #949ba4;

            font-size: 11px;
            font-weight: 700;

            letter-spacing: .5px;
        }


        .dm-user {
            position: relative;

            width: 100%;

            display: flex;
            align-items: center;

            gap: 10px;

            padding: 7px;

            border: 0;
            border-radius: 6px;

            background: transparent;

            color: #dbdee1;

            cursor: pointer;

            text-align: left;
        }


        .dm-user:hover,
        .dm-user.active {
            background: #35373c;
        }


        .dm-user-info {
            display: flex;

            flex-direction: column;

            min-width: 0;
        }


        .dm-user-info strong {
            overflow: hidden;

            white-space: nowrap;
            text-overflow: ellipsis;

            font-size: 13px;
        }


        .dm-user-info small {
            margin-top: 2px;

            color: #23a55a;

            font-size: 11px;
        }


        .online-dot {
            position: absolute;

            right: 7px;
            bottom: 7px;

            width: 9px;
            height: 9px;

            border-radius: 50%;

            background: #23a55a;

            border:
                2px solid
                #1e1f22;
        }


        /* ==============================
           AVATARS
        ============================== */

        .avatar,
        .large-avatar {
            flex-shrink: 0;

            display: flex;
            align-items: center;
            justify-content: center;

            border-radius: 50%;

            font-weight: 700;
        }


        .avatar {
            width: 36px;
            height: 36px;

            font-size: 15px;
        }


        .large-avatar {
            width: 82px;
            height: 82px;

            margin-bottom: 14px;

            font-size: 30px;
        }


        .test-avatar {
            background:
                linear-gradient(
                    135deg,
                    #5865f2,
                    #7289da
                );

            color: white;
        }


        .user-avatar {
            background:
                linear-gradient(
                    135deg,
                    #23a55a,
                    #1abc9c
                );

            color: white;
        }


        /* ==============================
           MAIN
        ============================== */

        .luma-main {
            flex: 1;

            min-width: 0;

            display: flex;

            flex-direction: column;

            background: #313338;
        }


        .chat-header {
            height: 58px;

            display: flex;
            align-items: center;
            justify-content: space-between;

            padding: 0 20px;

            border-bottom:
                1px solid
                rgba(0,0,0,.25);

            box-shadow:
                0 1px 4px
                rgba(0,0,0,.15);
        }


        .chat-person {
            display: flex;
            align-items: center;

            gap: 10px;
        }


        .chat-person > div:last-child {
            display: flex;

            flex-direction: column;
        }


        .chat-person strong {
            font-size: 15px;
        }


        .chat-person span {
            color: #23a55a;

            font-size: 11px;
        }


        .header-actions {
            display: flex;

            gap: 20px;

            color: #b5bac1;

            font-size: 18px;
        }


        /* ==============================
           MESSAGES
        ============================== */

        .chat-messages {
            flex: 1;

            overflow-y: auto;

            padding: 24px;
        }


        .welcome-chat {
            padding-top: 35vh;

            transform:
                translateY(-120px);
        }


        .welcome-chat h1 {
            margin-bottom: 7px;

            font-size: 25px;
        }


        .welcome-chat p {
            margin-top: 4px;

            color: #b5bac1;

            font-size: 14px;
        }


        .message-row {
            display: flex;

            gap: 12px;

            margin-bottom: 20px;
        }


        .message-row.own {
            margin-top: 20px;
        }


        .message-content {
            min-width: 0;
        }


        .message-author {
            margin-bottom: 3px;

            color: #f2f3f5;

            font-size: 13px;
            font-weight: 600;
        }


        .message-author span {
            margin-left: 5px;

            color: #949ba4;

            font-size: 10px;
            font-weight: 400;
        }


        .message-text {
            color: #dbdee1;

            font-size: 14px;

            word-break: break-word;
        }


        /* ==============================
           INPUT
        ============================== */

        .message-area {
            padding:
                0 20px 20px;
        }


        .message-input-wrapper {
            height: 48px;

            display: flex;
            align-items: center;

            padding: 0 8px;

            border-radius: 8px;

            background: #383a40;
        }


        .message-input-wrapper input {
            flex: 1;

            min-width: 0;

            height: 100%;

            padding: 0 12px;

            border: 0;
            outline: 0;

            background: transparent;

            color: #f2f3f5;

            font-family: inherit;
            font-size: 14px;
        }


        .message-input-wrapper input::placeholder {
            color: #949ba4;
        }


        .chat-plus,
        .chat-tool,
        .chat-send {
            width: 34px;
            height: 34px;

            display: flex;
            align-items: center;
            justify-content: center;

            border: 0;
            border-radius: 6px;

            background: transparent;

            color: #b5bac1;

            font-size: 19px;

            cursor: pointer;
        }


        .chat-plus:hover,
        .chat-tool:hover,
        .chat-send:hover {
            color: white;

            background:
                rgba(255,255,255,.08);
        }


        .chat-send {
            color: #5865f2;
        }


        /* ==============================
           MOBILE
        ============================== */

        @media (max-width: 700px) {

            .luma-sidebar {
                width: 72px;
            }

            .dm-sidebar {
                display: none;
            }

            .chat-header {
                padding: 0 12px;
            }

            .message-area {
                padding:
                    0 10px 10px;
            }

            .chat-messages {
                padding: 15px;
            }

        }

    `;


    document.head.appendChild(
        style
    );

}
```
