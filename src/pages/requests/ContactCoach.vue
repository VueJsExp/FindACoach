<template>
    <div>
        <base-dialog :show="!!error" @close="handleError" title="Failed to contact a Coach">
            <p>{{ error }}</p>
        </base-dialog>

        <form @submit.prevent="submitForm">
            <div class="form-control">
                <label>Your E-Mail</label>
                <input v-model.trim="email" type="email" id="email" />
            </div>
            <div class="form-control">
                <label for="message">Message</label>
                <textarea v-model.trim="message" id="messages" rows="5"></textarea>
            </div>
            <p v-if="!formIsValid" class="errors">Please enter a valid email and non-empty message.</p>
            <div class="actions">
                <base-button>Send Message</base-button>
            </div>
        </form>
    </div>
    
</template>

<script>
export default {
    data() {
        return {
            email: "",
            message: "",
            formIsValid: true,
            error: null,
            isLoading: false
        };
    },
    methods: {
        async submitForm() {
            this.formIsValid = true;
            if (this.email === "" || !this.email.includes("@") || this.message === "") {
                this.formIsValid = false;
                return;
            }
            this.isLoading = true;
            try {
                await this.$store.dispatch("requests/contactCoach", {
                    email: this.email,
                    message: this.message,
                    coachId: this.$route.params.id
                });
            } catch(error) {
                this.error = error.message || "Something went wrong";
                return;
            }
            this.isLoading = false;
            this.$router.replace("/coaches");
        },
        handleError() {
            this.error = null;
            this.isLoading = false;
        }
    }

};
</script>

<style scoped>
form {
    margin: 1rem;
    border: 1px solid #ccc;
    border-radius: 12px;
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

.errors {
    font-weight: bold;
    color: red;
}

.actions {
    text-align: center;
}
</style>
