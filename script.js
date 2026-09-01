/* =========================================================
   LUMA — LOGIN + SIGNUP + FRIENDS UI
========================================================= */

const USERS_KEY = "LUMA_USERS";
const CURRENT_USER_KEY = "LUMA_CURRENT_USER";
const FRIENDS_KEY = "LUMA_FRIENDS";
const REQUESTS_KEY = "LUMA_FRIEND_REQUESTS";
const MESSAGES_KEY = "LUMA_MESSAGES";


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
   APP ELEMENTS
========================================================= */

const authContainer =
    document.getElementById("authContainer");

const lumaApp =
    document.getElementById("lumaApp");

const currentAvatar =
    document.getElementById("currentAvatar");

const currentDisplayName =
    document.getElementById("currentDisplayName");

const currentUsername =
    document.getElementById("currentUsername");

const friendsView =
    document.getElementById("friendsView");

const chatView =
    document.getElementById("chatView");

const emptyMain =
    document.getElementById("emptyMain");

const friendsList =
    document.getElementById("friendsList");

const friendSectionTitle =
    document.getElementById("friendSectionTitle");

const friendSectionDescription =
    document.getElementById("friendSectionDescription");

const pendingCount =
    document.getElementById("pendingCount");

const dmList =
    document.getElementById("dmList");

const profilePanel =
    document.getElementById("profilePanel");

const addFriendModal =
    document.getElementById("addFriendModal");

const friendUsernameInput =
    document.getElementById("friendUsernameInput");

const friendError =
    document.getElementById("friendError");

const messagesArea =
    document.getElementById("messagesArea");

const messageInput =
    document.getElementById("messageInput");

const chatName =
    document.getElementById("chatName");

const chatStatus =
    document.getElementById("chatStatus");

const chatAvatar =
    document.getElementById("chatAvatar");

const chatWelcomeAvatar =
    document.getElementById("chatWelcomeAvatar");

const chatWelcomeName =
    document.getElementById("chatWelcomeName");


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

    toast.textContent =
        message;

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

                if (!input) return;


                const showing =
                    input.type === "text";


                if (showing) {

                    input.type =
                        "password";

                    this.classList.remove(
                        "showing"
                    );

                    this.setAttribute(
                        "aria-label",
                        "Show password"
                    );

                    this.setAttribute(
                        "title",
                        "Show password"
                    );

                } else {

                    input.type =
                        "text";

                    this.classList.add(
                        "showing"
                    );

                    this.setAttribute(
                        "aria-label",
                        "Hide password"
                    );

                    this.setAttribute(
                        "title",
                        "Hide password"
                    );

                }

            }
        );

    });

}


setupPasswordButtons();


/* =========================================================
   VALIDATION
========================================================= */

function validUsername(username) {

    return /^[A-Za-z0-9_-]{2,24}$/.test(
        username
    );

}


function validPassword(password) {

    return /^[A-Za-z0-9]{6,32}$/.test(
        password
    );

}


function validDisplayName(name) {

    return (
        name.trim().length >= 1 &&
        name.length <= 32
    );

}


/* =========================================================
   LIVE FILTERS
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

                }

            });


        const oldHTML =
            this.innerHTML;

        this.innerHTML =
            "✓ Password generated!";

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

        signupError.textContent =
            "";

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

        button.disabled =
            true;


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
                    new Date().toISOString(),

                avatar:
                    null,

                discord:
                    null

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

            button.disabled =
                false;


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

        loginError.textContent =
            "";

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

        button.disabled =
            true;


        setTimeout(() => {

            const session = {

                id:
                    user.id,

                username:
                    user.username,

                displayName:
                    user.displayName,

                avatar:
                    user.avatar || null,

                discord:
                    user.discord || null

            };


            localStorage.setItem(
                CURRENT_USER_KEY,
                JSON.stringify(session)
            );


            button.classList.remove(
                "loading"
            );

            button.disabled =
                false;


            enterLuma(
                session
            );

        }, 650);

    }
);


/* =========================================================
   SESSION
========================================================= */

function getCurrentUser() {

    try {

        const saved =
            localStorage.getItem(
                CURRENT_USER_KEY
            );

        if (!saved) return null;

        return JSON.parse(saved);

    } catch {

        return null;

    }

}


/* =========================================================
   ENTER LUMA
========================================================= */

function enterLuma(user) {

    if (!user) return;


    authContainer.style.display =
        "none";

    lumaApp.classList.add(
        "active"
    );


    currentDisplayName.textContent =
        user.displayName ||
        user.username;

    currentUsername.textContent =
        "@" + user.username;


    setAvatar(
        currentAvatar,
        user
    );


    document.title =
        "Luma";


    showFriends();

}


/* =========================================================
   AVATAR
========================================================= */

function setAvatar(element, user) {

    if (!element) return;


    if (user.avatar) {

        element.innerHTML =
            `<img src="${user.avatar}" alt="">`;

        element.style.background =
            "transparent";

        const image =
            element.querySelector("img");

        image.style.width =
            "100%";

        image.style.height =
            "100%";

        image.style.objectFit =
            "cover";

        image.style.borderRadius =
            "50%";

        return;

    }


    const name =
        user.displayName ||
        user.username ||
        "?";

    element.textContent =
        name.charAt(0).toUpperCase();

}


/* =========================================================
   FRIEND DATA
========================================================= */

function getFriends() {

    try {

        return JSON.parse(
            localStorage.getItem(
                FRIENDS_KEY
            )
        ) || {};

    } catch {

        return {};

    }

}


function saveFriends(data) {

    localStorage.setItem(
        FRIENDS_KEY,
        JSON.stringify(data)
    );

}


function getRequests() {

    try {

        return JSON.parse(
            localStorage.getItem(
                REQUESTS_KEY
            )
        ) || [];

    } catch {

        return [];

    }

}


function saveRequests(data) {

    localStorage.setItem(
        REQUESTS_KEY,
        JSON.stringify(data)
    );

}


function getMessages() {

    try {

        return JSON.parse(
            localStorage.getItem(
                MESSAGES_KEY
            )
        ) || {};

    } catch {

        return {};

    }

}


function saveMessages(data) {

    localStorage.setItem(
        MESSAGES_KEY,
        JSON.stringify(data)
    );

}


/* =========================================================
   CURRENT USER FRIENDS
========================================================= */

function getMyFriends() {

    const user =
        getCurrentUser();

    if (!user) return [];

    const friends =
        getFriends();

    return friends[user.id] || [];

}


/* =========================================================
   FIND USER
========================================================= */

function findUser(username) {

    return getUsers().find(
        user =>
            user.username.toLowerCase() ===
            username.trim().toLowerCase()
    );

}


/* =========================================================
   FRIENDS VIEW
========================================================= */

function showFriends() {

    friendsView.style.display =
        "flex";

    chatView.classList.add(
        "hidden"
    );

    emptyMain.classList.add(
        "hidden"
    );

    profilePanel.classList.add(
        "hidden"
    );

    document
        .querySelectorAll(".friend-tab")
        .forEach(tab => {

            tab.classList.remove(
                "active"
            );

            if (
                tab.dataset.tab ===
                "all"
            ) {

                tab.classList.add(
                    "active"
                );

            }

        });


    renderFriends(
        "all"
    );

}


/* =========================================================
   RENDER FRIENDS
========================================================= */

function renderFriends(tab) {

    const user =
        getCurrentUser();

    if (!user) return;


    const friendIds =
        getMyFriends();


    let friends =
        friendIds
            .map(id =>
                getUsers().find(
                    account =>
                        account.id === id
                )
            )
            .filter(Boolean);


    if (tab === "online") {

        friends =
            friends.filter(
                friend =>
                    friend.online
            );

        friendSectionTitle.textContent =
            "Online";

        friendSectionDescription.textContent =
            "Friends who are currently online.";

    } else if (tab === "pending") {

        renderPending();

        return;

    } else if (tab === "blocked") {

        friendSectionTitle.textContent =
            "Blocked";

        friendSectionDescription.textContent =
            "People you've blocked.";

        renderEmptyTab(
            "No blocked users"
        );

        return;

    } else {

        friendSectionTitle.textContent =
            "All Friends";

        friendSectionDescription.textContent =
            "Everyone on your friends list.";

    }


    friendsList.innerHTML =
        "";


    if (!friends.length) {

        friendsList.innerHTML = `
            <div class="no-friends">
                <div class="no-friends-icon">👥</div>
                <h2>
                    ${tab === "online"
                        ? "Nobody is online"
                        : "It's quiet here..."}
                </h2>
                <p>
                    ${tab === "online"
                        ? "Your online friends will appear here."
                        : "Add someone to your friends list and start hanging out."}
                </p>
                <button id="emptyAddFriend">
                    Add Friend
                </button>
            </div>
        `;


        const button =
            document.getElementById(
                "emptyAddFriend"
            );

        if (button) {

            button.addEventListener(
                "click",
                openAddFriend
            );

        }

        return;

    }


    friends.forEach(friend => {

        const card =
            document.createElement(
                "div"
            );

        card.className =
            "friend-card";


        card.innerHTML = `

            <div class="friend-avatar">
                ${getInitial(friend)}
            </div>

            <div class="friend-info">

                <strong>
                    ${escapeHTML(
                        friend.displayName
                    )}
                </strong>

                <span>
                    ${friend.online
                        ? "● Online"
                        : "Offline"}
                </span>

            </div>

            <div class="friend-actions">

                <button
                    class="friend-action message-friend"
                    title="Message"
                >
                    💬
                </button>

            </div>

        `;


        card
            .querySelector(
                ".message-friend"
            )
            .addEventListener(
                "click",
                event => {

                    event.stopPropagation();

                    openChat(
                        friend
                    );

                }
            );


        card.addEventListener(
            "click",
            () => {

                openChat(
                    friend
                );

            }
        );


        friendsList.appendChild(
            card
        );

    });

}


/* =========================================================
   PENDING
========================================================= */

function renderPending() {

    friendSectionTitle.textContent =
        "Pending";

    friendSectionDescription.textContent =
        "Friend requests waiting for a response.";


    const user =
        getCurrentUser();

    const requests =
        getRequests();


    const incoming =
        requests.filter(
            request =>
                request.to === user.id &&
                request.status === "pending"
        );


    friendsList.innerHTML =
        "";


    pendingCount.textContent =
        incoming.length;


    if (!incoming.length) {

        renderEmptyTab(
            "No pending requests"
        );

        return;

    }


    incoming.forEach(request => {

        const sender =
            getUsers().find(
                account =>
                    account.id ===
                    request.from
            );

        if (!sender) return;


        const card =
            document.createElement(
                "div"
            );

        card.className =
            "friend-card";


        card.innerHTML = `

            <div class="friend-avatar">
                ${getInitial(sender)}
            </div>

            <div class="friend-info">

                <strong>
                    ${escapeHTML(
                        sender.displayName
                    )}
                </strong>

                <span>
                    @${escapeHTML(
                        sender.username
                    )}
                </span>

            </div>

            <div class="friend-actions">

                <button
                    class="friend-action accept-request"
                    title="Accept"
                >
                    ✓
                </button>

                <button
                    class="friend-action decline-request"
                    title="Decline"
                >
                    ×
                </button>

            </div>

        `;


        card
            .querySelector(
                ".accept-request"
            )
            .addEventListener(
                "click",
                () => {

                    acceptRequest(
                        request.id
                    );

                }
            );


        card
            .querySelector(
                ".decline-request"
            )
            .addEventListener(
                "click",
                () => {

                    declineRequest(
                        request.id
                    );

                }
            );


        friendsList.appendChild(
            card
        );

    });

}


/* =========================================================
   EMPTY TAB
========================================================= */

function renderEmptyTab(title) {

    friendsList.innerHTML = `

        <div class="no-friends">

            <div class="no-friends-icon">
                ✓
            </div>

            <h2>
                ${title}
            </h2>

            <p>
                Nothing to show here right now.
            </p>

        </div>

    `;

}


/* =========================================================
   ADD FRIEND
========================================================= */

function openAddFriend() {

    addFriendModal.classList.add(
        "active"
    );

    friendUsernameInput.value =
        "";

    friendError.textContent =
        "";

    setTimeout(() => {

        friendUsernameInput.focus();

    }, 50);

}


function closeAddFriend() {

    addFriendModal.classList.remove(
        "active"
    );

}


document
    .getElementById(
        "addFriendButton"
    )
    .addEventListener(
        "click",
        openAddFriend
    );


document
    .getElementById(
        "emptyAddFriend"
    )
    .addEventListener(
        "click",
        openAddFriend
    );


document
    .getElementById(
        "closeAddFriend"
    )
    .addEventListener(
        "click",
        closeAddFriend
    );


addFriendModal.addEventListener(
    "click",
    event => {

        if (
            event.target ===
            addFriendModal
        ) {

            closeAddFriend();

        }

    }
);


/* =========================================================
   SEND FRIEND REQUEST
========================================================= */

document
    .getElementById(
        "addFriendForm"
    )
    .addEventListener(
        "submit",
        event => {

            event.preventDefault();

            friendError.textContent =
                "";

            const me =
                getCurrentUser();

            const target =
                findUser(
                    friendUsernameInput.value
                );


            if (!target) {

                friendError.textContent =
                    "No Luma user with that username was found.";

                return;

            }


            if (
                target.id ===
                me.id
            ) {

                friendError.textContent =
                    "You can't add yourself.";

                return;

            }


            const friends =
                getMyFriends();


            if (
                friends.includes(
                    target.id
                )
            ) {

                friendError.textContent =
                    "You're already friends.";

                return;

            }


            const requests =
                getRequests();


            const existing =
                requests.find(
                    request =>
                        request.status === "pending" &&
                        (
                            (
                                request.from === me.id &&
                                request.to === target.id
                            ) ||
                            (
                                request.from === target.id &&
                                request.to === me.id
                            )
                        )
                );


            if (existing) {

                friendError.textContent =
                    "A friend request already exists.";

                return;

            }


            requests.push({

                id:
                    crypto.randomUUID(),

                from:
                    me.id,

                to:
                    target.id,

                status:
                    "pending",

                createdAt:
                    new Date().toISOString()

            });


            saveRequests(
                requests
            );


            closeAddFriend();


            showToast(
                `Friend request sent to ${target.username}.`
            );

        }
    );


/* =========================================================
   ACCEPT REQUEST
========================================================= */

function acceptRequest(requestId) {

    const me =
        getCurrentUser();

    const requests =
        getRequests();

    const request =
        requests.find(
            item =>
                item.id ===
                requestId
        );


    if (!request) return;


    const friends =
        getFriends();


    if (!friends[me.id]) {
        friends[me.id] = [];
    }

    if (!friends[request.from]) {
        friends[request.from] = [];
    }


    if (
        !friends[me.id].includes(
            request.from
        )
    ) {

        friends[me.id].push(
            request.from
        );

    }


    if (
        !friends[request.from].includes(
            me.id
        )
    ) {

        friends[request.from].push(
            me.id
        );

    }


    request.status =
        "accepted";


    saveFriends(
        friends
    );

    saveRequests(
        requests
    );


    showToast(
        "Friend request accepted!"
    );


    renderFriends(
        "pending"
    );

    renderDMList();

}


/* =========================================================
   DECLINE
========================================================= */

function declineRequest(requestId) {

    const requests =
        getRequests();


    const request =
        requests.find(
            item =>
                item.id ===
                requestId
        );


    if (!request) return;


    request.status =
        "declined";


    saveRequests(
        requests
    );


    showToast(
        "Friend request declined."
    );


    renderFriends(
        "pending"
    );

}


/* =========================================================
   DM LIST
========================================================= */

function renderDMList() {

    const friendIds =
        getMyFriends();


    dmList.innerHTML =
        "";


    if (!friendIds.length) {

        dmList.innerHTML = `

            <div class="empty-dms">

                <div>💬</div>

                <span>
                    No conversations yet
                </span>

                <small>
                    Add a friend to start chatting.
                </small>

            </div>

        `;

        return;

    }


    friendIds.forEach(id => {

        const friend =
            getUsers().find(
                user =>
                    user.id === id
            );

        if (!friend) return;


        const item =
            document.createElement(
                "button"
            );

        item.className =
            "friend-card";

        item.style.width =
            "100%";

        item.style.border =
            "none";

        item.style.background =
            "transparent";


        item.innerHTML = `

            <div class="friend-avatar">
                ${getInitial(friend)}
            </div>

            <div class="friend-info">

                <strong>
                    ${escapeHTML(
                        friend.displayName
                    )}
                </strong>

                <span>
                    ${friend.online
                        ? "Online"
                        : "Offline"}
                </span>

            </div>

        `;


        item.addEventListener(
            "click",
            () => {

                openChat(
                    friend
                );

            }
        );


        dmList.appendChild(
            item
        );

    });

}


/* =========================================================
   OPEN CHAT
========================================================= */

function openChat(friend) {

    friendsView.style.display =
        "none";

    emptyMain.classList.add(
        "hidden"
    );

    chatView.classList.remove(
        "hidden"
    );


    chatName.textContent =
        friend.displayName;

    chatStatus.textContent =
        friend.online
            ? "Online"
            : "Offline";


    setAvatar(
        chatAvatar,
        friend
    );

    setAvatar(
        chatWelcomeAvatar,
        friend
    );


    chatWelcomeName.textContent =
        friend.displayName;


    renderMessages(
        friend.id
    );


    messageInput.focus();

}


/* =========================================================
   SEND MESSAGE
========================================================= */

function sendMessage() {

    const text =
        messageInput.value.trim();

    const me =
        getCurrentUser();

    const friendName =
        chatName.textContent;


    if (!text || !me) return;


    const friend =
        getUsers().find(
            user =>
                user.displayName ===
                friendName
        );


    if (!friend) return;


    const messages =
        getMessages();


    const conversationId =
        getConversationId(
            me.id,
            friend.id
        );


    if (!messages[conversationId]) {
        messages[conversationId] = [];
    }


    messages[conversationId].push({

        id:
            crypto.randomUUID(),

        author:
            me.id,

        text:
            text,

        createdAt:
            new Date().toISOString()

    });


    saveMessages(
        messages
    );


    messageInput.value =
        "";

    autoResizeMessageBox();


    renderMessages(
        friend.id
    );

}


document
    .getElementById(
        "sendButton"
    )
    .addEventListener(
        "click",
        sendMessage
    );


messageInput.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Enter" &&
            !event.shiftKey
        ) {

            event.preventDefault();

            sendMessage();

        }

    }
);


/* =========================================================
   MESSAGE RENDER
========================================================= */

function renderMessages(friendId) {

    const me =
        getCurrentUser();

    const messages =
        getMessages();


    const conversationId =
        getConversationId(
            me.id,
            friendId
        );


    const conversation =
        messages[conversationId] || [];


    const friend =
        getUsers().find(
            user =>
                user.id === friendId
        );


    if (!conversation.length) {

        messagesArea.innerHTML = `

            <div class="chat-welcome">

                <div class="chat-welcome-avatar">
                    ${getInitial(friend)}
                </div>

                <h1>
                    ${escapeHTML(
                        friend.displayName
                    )}
                </h1>

                <p>
                    This is the beginning of your
                    direct message history.
                </p>

            </div>

        `;

        return;

    }


    messagesArea.innerHTML =
        "";


    conversation.forEach(message => {

        const author =
            getUsers().find(
                user =>
                    user.id ===
                    message.author
            );


        if (!author) return;


        const item =
            document.createElement(
                "div"
            );

        item.className =
            "message";


        const time =
            new Date(
                message.createdAt
            ).toLocaleTimeString(
                [],
                {
                    hour: "2-digit",
                    minute: "2-digit"
                }
            );


        item.innerHTML = `

            <div class="message-avatar">
                ${getInitial(author)}
            </div>

            <div class="message-body">

                <div>

                    <span class="message-author">
                        ${escapeHTML(
                            author.displayName
                        )}
                    </span>

                    <span class="message-time">
                        ${time}
                    </span>

                </div>

                <div class="message-text">
                    ${escapeHTML(
                        message.text
                    )}
                </div>

            </div>

        `;


        messagesArea.appendChild(
            item
        );

    });


    messagesArea.scrollTop =
        messagesArea.scrollHeight;

}


/* =========================================================
   CONVERSATION ID
========================================================= */

function getConversationId(
    first,
    second
) {

    return [
        first,
        second
    ]
        .sort()
        .join("_");

}


/* =========================================================
   TABS
========================================================= */

document
    .querySelectorAll(
        ".friend-tab"
    )
    .forEach(tab => {

        tab.addEventListener(
            "click",
            () => {

                document
                    .querySelectorAll(
                        ".friend-tab"
                    )
                    .forEach(item => {

                        item.classList.remove(
                            "active"
                        );

                    });


                tab.classList.add(
                    "active"
                );


                renderFriends(
                    tab.dataset.tab
                );

            }
        );

    });


/* =========================================================
   FRIENDS BUTTON
========================================================= */

document
    .getElementById(
        "friendsButton"
    )
    .addEventListener(
        "click",
        () => {

            showFriends();

            renderDMList();

        }
    );


document
    .getElementById(
        "homeButton"
    )
    .addEventListener(
        "click",
        () => {

            showFriends();

        }
    );


/* =========================================================
   PROFILE
========================================================= */

function openProfile() {

    const user =
        getCurrentUser();

    if (!user) return;


    profilePanel.classList.remove(
        "hidden"
    );


    setAvatar(
        document.getElementById(
            "profileAvatar"
        ),
        user
    );


    document.getElementById(
        "profileDisplayName"
    ).textContent =
        user.displayName;


    document.getElementById(
        "profileUsername"
    ).textContent =
        "@" + user.username;


    document.getElementById(
        "profileUsernameFull"
    ).textContent =
        user.username;

}


document
    .getElementById(
        "profileButton"
    )
    .addEventListener(
        "click",
        openProfile
    );


document
    .getElementById(
        "profileClose"
    )
    .addEventListener(
        "click",
        () => {

            profilePanel.classList.add(
                "hidden"
            );

        }
    );


document
    .getElementById(
        "settingsButton"
    )
    .addEventListener(
        "click",
        () => {

            showToast(
                "Settings are coming next."
            );

        }
    );


/* =========================================================
   LOGOUT
========================================================= */

document
    .getElementById(
        "logoutButton"
    )
    .addEventListener(
        "click",
        () => {

            localStorage.removeItem(
                CURRENT_USER_KEY
            );

            lumaApp.classList.remove(
                "active"
            );

            authContainer.style.display =
                "flex";

            openLogin();

            document.title =
                "Luma — Login";

        }
    );


/* =========================================================
   SEARCH DMS
========================================================= */

document
    .getElementById(
        "dmSearch"
    )
    .addEventListener(
        "input",
        function () {

            const query =
                this.value
                    .trim()
                    .toLowerCase();


            const friendIds =
                getMyFriends();


            const matches =
                friendIds
                    .map(id =>
                        getUsers().find(
                            user =>
                                user.id === id
                        )
                    )
                    .filter(Boolean)
                    .filter(user =>
                        user.username
                            .toLowerCase()
                            .includes(query) ||
                        user.displayName
                            .toLowerCase()
                            .includes(query)
                    );


            dmList.innerHTML =
                "";


            matches.forEach(friend => {

                const item =
                    document.createElement(
                        "button"
                    );

                item.className =
                    "friend-card";

                item.style.width =
                    "100%";

                item.style.border =
                    "none";

                item.innerHTML = `

                    <div class="friend-avatar">
                        ${getInitial(friend)}
                    </div>

                    <div class="friend-info">

                        <strong>
                            ${escapeHTML(
                                friend.displayName
                            )}
                        </strong>

                        <span>
                            @${escapeHTML(
                                friend.username
                            )}
                        </span>

                    </div>

                `;


                item.addEventListener(
                    "click",
                    () => {

                        openChat(
                            friend
                        );

                    }
                );


                dmList.appendChild(
                    item
                );

            });

        }
    );


/* =========================================================
   CHAT PROFILE
========================================================= */

document
    .getElementById(
        "chatProfileButton"
    )
    .addEventListener(
        "click",
        () => {

            const name =
                chatName.textContent;

            const friend =
                getUsers().find(
                    user =>
                        user.displayName ===
                        name
                );

            if (!friend) return;


            profilePanel.classList.remove(
                "hidden"
            );


            setAvatar(
                document.getElementById(
                    "profileAvatar"
                ),
                friend
            );


            document.getElementById(
                "profileDisplayName"
            ).textContent =
                friend.displayName;


            document.getElementById(
                "profileUsername"
            ).textContent =
                "@" + friend.username;


            document.getElementById(
                "profileUsernameFull"
            ).textContent =
                friend.username;

        }
    );


/* =========================================================
   MESSAGE BOX
========================================================= */

function autoResizeMessageBox() {

    messageInput.style.height =
        "auto";

    messageInput.style.height =
        Math.min(
            messageInput.scrollHeight,
            150
        ) + "px";

}


messageInput.addEventListener(
    "input",
    autoResizeMessageBox
);


/* =========================================================
   HELPERS
========================================================= */

function getInitial(user) {

    if (!user) return "?";

    return (
        user.displayName ||
        user.username ||
        "?"
    )
        .charAt(0)
        .toUpperCase();

}


function escapeHTML(value) {

    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");

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


const discordLoginSignup =
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


if (discordLoginSignup) {

    discordLoginSignup.addEventListener(
        "click",
        () => {

            window.location.href =
                DISCORD_OAUTH_URL;

        }
    );

}


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

        enterLuma(
            session
        );

    } catch {

        localStorage.removeItem(
            CURRENT_USER_KEY
        );

    }

}


/* =========================================================
   INITIALIZE
========================================================= */

renderDMList();
/* =========================================================
   LUMA — TEST CHAT
========================================================= */

const chatApp =
    document.getElementById("chatApp");

const messages =
    document.getElementById("messages");

const messageInput =
    document.getElementById("messageInput");

const sendMessage =
    document.getElementById("sendMessage");


/* =========================================================
   OPEN TEST CHAT AFTER LOGIN
========================================================= */

function openTestChat() {

    if (!chatApp) return;

    document.querySelector(".auth-container").style.display =
        "none";

    document.querySelector(".background").style.display =
        "none";

    chatApp.style.display =
        "flex";

}


/* =========================================================
   SEND MESSAGE
========================================================= */

function sendTestMessage() {

    const text =
        messageInput.value.trim();

    if (!text) return;


    const message =
        document.createElement("div");

    message.className =
        "message";


    message.innerHTML = `

        <div class="message-avatar">
            ME
        </div>

        <div class="message-content">

            <div class="message-meta">

                <strong>You</strong>

                <span>
                    Today
                </span>

            </div>

            <div class="message-text"></div>

        </div>

    `;


    message
        .querySelector(".message-text")
        .textContent = text;


    messages.appendChild(message);


    messageInput.value = "";


    messages.scrollTop =
        messages.scrollHeight;


    /* TEST RESPONSE */

    setTimeout(() => {

        const reply =
            document.createElement("div");

        reply.className =
            "message";


        reply.innerHTML = `

            <div class="message-avatar">
                LT
            </div>

            <div class="message-content">

                <div class="message-meta">

                    <strong>LumaTest</strong>

                    <span>
                        Today
                    </span>

                </div>

                <div class="message-text"></div>

            </div>

        `;


        reply
            .querySelector(".message-text")
            .textContent =
                "Got your message! 👋 This is only a test chat.";

        messages.appendChild(reply);


        messages.scrollTop =
            messages.scrollHeight;

    }, 600);

}


/* =========================================================
   SEND BUTTON
========================================================= */

if (sendMessage) {

    sendMessage.addEventListener(
        "click",
        sendTestMessage
    );

}


/* =========================================================
   ENTER TO SEND
========================================================= */

if (messageInput) {

    messageInput.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Enter" &&
                !event.shiftKey
            ) {

                event.preventDefault();

                sendTestMessage();

            }

        }
    );

}


/* =========================================================
   CONNECT LOGIN TO TEST CHAT
========================================================= */

/*
   We only hook into the existing login button.
   Your account creation/login system itself is untouched.
*/

if (login) {

    login.addEventListener(
        "submit",
        () => {

            setTimeout(() => {

                if (
                    localStorage.getItem(
                        CURRENT_USER_KEY
                    )
                ) {

                    openTestChat();

                }

            }, 750);

        }
    );

}
