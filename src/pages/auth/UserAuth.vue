<template>
    <div>
        <base-dialog :show="!!error" @close="handleError" :title="errorTitle">
            <p>{{ error }}</p>
        </base-dialog>
        <base-dialog :show="isLoading" fixed title="Authenticating...">
            <base-spinner />
        </base-dialog>
        <base-card>
            <form @submit.prevent="submitForm">
                <div class="form-control" :class="{ invalid: !email.isValid }">
                    <label for="email">E-mail</label>
                    <input
                        v-model.trim="email.val"
                        type="email"
                        id="email"
                        @blur="clearValidity('email')">
                    <p v-if="!email.isValid">Please enter a valid e-mail.</p>
                </div>
                <div class="form-control" :class="{ invalid: !password.isValid }">
                    <label for="password">Password</label>
                    <input
                        v-model.trim="password.val"
                        type="password"
                        id="password"
                        @blur="clearValidity('password')">
                    <p v-if="!password.isValid">Password must not be empty and be at least 6 characters long.</p>
                </div>
                <base-button>{{ submitButtonCaption }}</base-button>
                <base-button type="button" mode="flat" @click="switchAuthMode">{{
                    switchModeButtonCaption
                }}</base-button>
            </form>
        </base-card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            email: {
                val: "",
                isValid: true
            },
            password: {
                val: "",
                isValid: true
            },
            formIsValid: true,
            mode: "login",
            isLoading: false,
            error: null
        };
    },
    computed: {
        submitButtonCaption() {
            return this.mode === "login" ? "Login" : "Signup";
        },
        switchModeButtonCaption() {
            return this.mode === "login" ? "Signup instead" : "Login instead";
        },
        errorTitle() {
            return this.mode === "login" ? "Authentication is failed!" : "Registration is failed!";
        }
    },
    methods: {
        clearValidity(input) {
            this[input].isValid = true;
        },
        validateForm() {
            this.formIsValid = true;
            if (this.email.val === "" || !this.email.val.includes("@")) {
                this.email.isValid = false;
                this.formIsValid = false;
            }
            if (this.password.val === "" || this.password.val.length < 6) {
                this.password.isValid = false;
                this.formIsValid = false;
            }
        },
        async submitForm() {
            this.validateForm();
            this.isLoading = true;
            if (!this.formIsValid) {
                return;
            }
            const actionPayload = {
                email: this.email.val,
                password: this.password.val
            };
            try {
                if (this.mode === "signup") {
                    await this.$store.dispatch("auth/signup", actionPayload);
                } else {
                    await this.$store.dispatch("auth/login", actionPayload);
                }
                const redirectUrl = "/" + (this.$route.query.redirect || "coaches");
                this.$router.replace(redirectUrl);
            } catch (error) {
                const failMessageVariant = "Failed to " + this.mode === "login" ? "login." : "signup.";
                this.error = error.message || failMessageVariant;
                // console.log("catching error = " + error.message);
                // this.handleError();
                this.isLoading = false;
                return;
            }
            this.isLoading = false;
            // this.
        },
        switchAuthMode() {
            if (this.mode === "login") {
                this.mode = "signup";
            } else {
                this.mode = "login";
            }
        },
        handleError() {
            this.isLoading = false;
            this.error = null;
        }
    }
};
</script>

<style scoped>
form {
    margin: 1rem;
    /* border: 1px solid #ccc;
    border-radius: 12px; */
    padding: 1rem;
}

.form-control {
    margin: 0.5rem 0;
}

label {
    font-weight: bold;
    margin-bottom: 0.5rem;
    display: block;
}

input,
textarea {
    display: block;
    width: 100%;
    font: inherit;
    border: 1px solid #ccc;
    padding: 0.15rem;
}

input:focus,
textarea:focus {
    border-color: #3d008d;
    background-color: #faf6ff;
    outline: none;
}

.invalid label {
    color: red;
}

.invalid input,
.invalid textarea {
    border: 1px solid red;
}
</style>
