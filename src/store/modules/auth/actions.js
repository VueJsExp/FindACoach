import { API_KEY } from "./keys.js";

let timer;

export default {
    async login(context, payload) {
        // console.log("action auth/login");
        // const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`, {
        //     method: "POST",
        //     body: JSON.stringify({
        //         email: payload.email,
        //         password: payload.password,
        //         returnSecureToken: true
        //     })
        // });

        // const responseData = await response.json();

        // if (!response.ok) {
        //     const error = new Error(responseData.error.message || "Login fails");
        //     throw error;
        // }

        // console.log(responseData);
        // context.commit("setUser", {
        //     token: responseData.idToken,
        //     userId: responseData.localId,
        //     tokenExpiration: responseData.expiresIn
        // });
        return context.dispatch("auth", {
            ...payload,
            mode: "login"
        });
    },
    async signup(context, payload) {
        console.log("action auth/signup");
        // console.log(payload);
        // console.log(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`);
        // const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`, {
        //     method: "POST",
        //     body: JSON.stringify({
        //         email: payload.email,
        //         password: payload.password,
        //         returnSecureToken: true
        //     })
        // });

        // const responseData = await response.json();
        // if (!response.ok) {
        //     console.log(responseData);
        //     console.log(responseData.error);
        //     const error = new Error(responseData.error.message || "Signup fails!");
        //     throw error;
        // }

        // console.log(responseData);
        // context.commit("setUser", {
        //     token: responseData.idToken,
        //     userId: responseData.localId,
        //     tokenExpiration: responseData.expiresIn
        // });
        return context.dispath("auth", {
            ...payload,
            mode: "signup"
        });
    },
    async auth(context, payload) {
        const mode = payload.mode;
        let url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;
        if (mode !== "login") {
            url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;
        }
        // console.log("action auth/auth");

        const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify({
                email: payload.email,
                password: payload.password,
                returnSecureToken: true
            })
        });

        const responseData = await response.json();

        if (!response.ok) {
            const error = new Error(responseData.error.message || `${ mode === "login" ? "Login" : "Registration" } fails`);
            throw error;
        }

        console.log(responseData);

        const expiresIn = (Number(responseData.expiresIn)) * 1000;
        // const expiresIn = 5000;
        // console.log(responseData.expiresIn);

        const expirationDate = new Date().getTime() + expiresIn;
        localStorage.setItem("token", responseData.idToken);
        localStorage.setItem("userId", responseData.localId);
        localStorage.setItem("tokenExpiration", expirationDate);
        // console.log(expiresIn);

        timer = setTimeout(() => {
            context.dispatch("autoLogout");
        }, expiresIn);
        context.commit("setUser", {
            token: responseData.idToken,
            userId: responseData.localId,
        });

    },
    autoLogin(context) {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");
        const tokenExpiration = Number(localStorage.getItem("tokenExpiration"));
        const currentTimeStamp = new Date().getTime();
        const timeRemaining = tokenExpiration - currentTimeStamp;
        if (timeRemaining < 10000) {
            //10 секунд. можно было в 0, но пох
            return;
        }
        timer = setTimeout(() => {
            context.dispatch("autoLogout");
        }, timeRemaining);
        if (token && userId) {
            context.commit("setUser", {
                token,
                userId
            });
        }
    },
    logout(context) {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("tokenExpiration");
        clearTimeout(timer);
        context.commit("setUser", {
            token: null,
            userId: null
        })
    },
    autoLogout(context) {
        context.dispatch("logout");
        context.commit("setAutoLogout");
    }
    
};