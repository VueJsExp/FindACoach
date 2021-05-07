<template>
    <section v-if="selectedCoach">
        <base-card>
            <h2>{{ fullName }}</h2>
            <h3>${{ rate }}/hour</h3>
        </base-card>
    </section>
    <section v-if="selectedCoach">
        <base-card>
            <header>
                <h2>Interested? Reach out now!</h2>
                <base-button link :to="coachContactLink">Contact</base-button>
            </header>
            <router-view />
        </base-card>
    </section>
    <section v-if="selectedCoach">
        <base-card>
            <base-badge
                v-for="area in areas"
                :key="area"
                :type="area"
                :title="area" />
            <p>{{ description }}</p>
        </base-card>
    </section>
    <section v-if="!selectedCoach">
        <base-card>
            <h2>There is no coach with that id.</h2>
            <base-button link to="/">Return</base-button>
        </base-card>
    </section>
    <!-- DETAILS FOR COACH
    <router-view />
    <base-button link to="/coaches/c1/contact">Contact</base-button> -->
</template>

<script>
export default {
    props: ["id"],
    data() {
        return { 
            selectedCoach: null
        };
    },
    computed: { 
        coachContactLink() {
            return `${this.$route.path}/contact`;
        },
        fullName() {
            return this.selectedCoach.firstName + " " + this.selectedCoach.lastName;
        },
        rate() {
            return this.selectedCoach.hourlyRate;
        },
        areas() {
            return this.selectedCoach.areas;
        },
        description() {
            return this.selectedCoach.description;
        }
    },
    created() {
        const coaches = this.$store.getters["coaches/coaches"];
        // console.log(this.id);
        // console.log(coaches);
        this.selectedCoach = coaches.find((coach) => coach.id === this.id);
    }
}
</script>

<style>

</style>