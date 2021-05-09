<template>
    <base-dialog v-show="!!error" @click="handleError" title="Registration is failed!">
        <p>{{ error }}</p>
    </base-dialog>
    <section>
        <div v-if="isLoading">
            <base-spinner />
        </div>
        <base-card v-else>
            <h2>Register as a coach now!</h2>
            <coach-form @save-data="saveData" />
        </base-card>
    </section>
</template>

<script>
import CoachForm from "../../components/coaches/CoachForm.vue";
export default {
    components: {
        CoachForm
    },
    data() {
        return {
            error: null,
            isLoading: false
        };
    },
    methods: {
        async saveData(formData) {
            // console.log(formData);
            this.isLoading = true;
            try {
                await this.$store.dispatch("coaches/registerCoach", formData);
            } catch(error)  {
                this.error = error.message || "Something went wrong";
                return;
            }
            this.isLoading = false;
            this.$router.replace("/");
        },
        handleError() {
            this.error = null;
            this.isLoading = false;
        }
    }
};
</script>

<style>
</style>
