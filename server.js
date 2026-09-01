const express = require("express");

const app = express();

const PORT = process.env.PORT || 3000;


/* =========================================================
   DISCORD SETTINGS
========================================================= */

const DISCORD_CLIENT_ID =
    process.env.DISCORD_CLIENT_ID;

const DISCORD_CLIENT_SECRET =
    process.env.DISCORD_CLIENT_SECRET;

const DISCORD_REDIRECT_URI =
    process.env.DISCORD_REDIRECT_URI;


/* =========================================================
   BASIC CHECK
========================================================= */

if (
    !DISCORD_CLIENT_ID ||
    !DISCORD_CLIENT_SECRET ||
    !DISCORD_REDIRECT_URI
) {

    console.warn(
        "⚠️ Discord OAuth environment variables are missing."
    );

}


/* =========================================================
   HOME
========================================================= */

app.get("/", (req, res) => {

    res.send(`
        <h1>Luma OAuth Server</h1>
        <p>Server is online.</p>
    `);

});


/* =========================================================
   DISCORD LOGIN
========================================================= */

app.get("/auth/discord", (req, res) => {

    const params = new URLSearchParams({

        client_id:
            DISCORD_CLIENT_ID,

        redirect_uri:
            DISCORD_REDIRECT_URI,

        response_type:
            "code",

        scope:
            "identify"

    });


    const discordURL =
        `https://discord.com/oauth2/authorize?${params.toString()}`;


    res.redirect(
        discordURL
    );

});


/* =========================================================
   DISCORD CALLBACK
========================================================= */

app.get("/callback", async (req, res) => {

    try {

        const code =
            req.query.code;


        if (!code) {

            return res.status(400).send(`
                <h1>Luma Login Failed</h1>
                <p>No authorization code was provided.</p>
            `);

        }


        /* =============================================
           EXCHANGE CODE FOR TOKEN
        ============================================= */

        const tokenResponse =
            await fetch(
                "https://discord.com/api/v10/oauth2/token",
                {

                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/x-www-form-urlencoded"
                    },

                    body:
                        new URLSearchParams({

                            client_id:
                                DISCORD_CLIENT_ID,

                            client_secret:
                                DISCORD_CLIENT_SECRET,

                            grant_type:
                                "authorization_code",

                            code:
                                code,

                            redirect_uri:
                                DISCORD_REDIRECT_URI

                        })

                }
            );


        const tokenData =
            await tokenResponse.json();


        if (!tokenResponse.ok) {

            console.error(
                "Discord token error:",
                tokenData
            );

            return res.status(400).send(`
                <h1>Luma Login Failed</h1>
                <p>Discord rejected the authorization.</p>
            `);

        }


        /* =============================================
           GET DISCORD USER
        ============================================= */

        const userResponse =
            await fetch(
                "https://discord.com/api/v10/users/@me",
                {

                    headers: {
                        Authorization:
                            `Bearer ${tokenData.access_token}`
                    }

                }
            );


        const discordUser =
            await userResponse.json();


        if (!userResponse.ok) {

            console.error(
                "Discord user error:",
                discordUser
            );

            return res.status(400).send(`
                <h1>Luma Login Failed</h1>
                <p>Could not retrieve your Discord account.</p>
            `);

        }


        /* =============================================
           TEMPORARY TEST RESULT
        ============================================= */

        res.send(`
            <!DOCTYPE html>

            <html>

            <head>

                <title>Luma — Discord Login</title>

                <style>

                    body {
                        margin: 0;
                        min-height: 100vh;

                        display: flex;
                        align-items: center;
                        justify-content: center;

                        background: #111214;

                        color: white;

                        font-family:
                            Arial,
                            sans-serif;
                    }

                    .card {
                        width: 400px;

                        padding: 35px;

                        border-radius: 12px;

                        background: #2b2d31;

                        text-align: center;

                        box-shadow:
                            0 20px 60px
                            rgba(0,0,0,.4);
                    }

                    .avatar {
                        width: 90px;
                        height: 90px;

                        border-radius: 50%;

                        margin-bottom: 15px;
                    }

                    h1 {
                        margin-bottom: 8px;
                    }

                    p {
                        color: #b5bac1;
                    }

                </style>

            </head>

            <body>

                <div class="card">

                    ${
                        discordUser.avatar
                            ? `
                                <img
                                    class="avatar"
                                    src="https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.png"
                                >
                              `
                            : ""
                    }

                    <h1>
                        Welcome to Luma!
                    </h1>

                    <p>
                        Discord account connected.
                    </p>

                    <p>
                        @${discordUser.username}
                    </p>

                    <p>
                        ID: ${discordUser.id}
                    </p>

                </div>

            </body>

            </html>
        `);

    } catch (error) {

        console.error(
            "OAuth error:",
            error
        );

        res.status(500).send(`
            <h1>Luma Server Error</h1>
            <p>Something went wrong while connecting to Discord.</p>
        `);

    }

});


/* =========================================================
   START SERVER
========================================================= */

app.listen(
    PORT,
    () => {

        console.log(
            `🌙 Luma OAuth server running on port ${PORT}`
        );

    }
);
