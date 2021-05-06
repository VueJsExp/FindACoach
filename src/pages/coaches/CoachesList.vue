<template>
    <section>
        FILTER
    </section>
    <section>
        <base-card>
            <div class="controls">
                <base-button mode="outline">Refresh</base-button>
                <!-- <router-link to="/register">Register as Coach</router-link> -->
                <base-button link to="/register">Register as Coach</base-button>
            </div>
            <ul v-if="hasCoaches">
                <coach-item
                    v-for="coach in filteredCoaches"
                    :id="coach.id"
                    :key="coach.id"
                    :first-name="coach.firstName"
                    :last-name="coach.lastName"
                    :areas="coach.areas"
                    :rate="coach.hourlyRate"
                />

                <!-- <span>{{ coach.firstName }}</span> -->
            </ul>
            <h3 v-else>
                No coaches found.
            </h3>
        </base-card>
    </section>
</template>

<script>
import CoachItem from "../../components/coaches/CoachItem.vue";
import { mapGetters } from "vuex";
export default {
    components: {
        CoachItem
    },
    computed: {
        filteredCoaches() {
            // console.log(this.$store.getters["coaches/coaches"]);
            return this.$store.getters["coaches/coaches"];
        },
        ...mapGetters("coaches", ["hasCoaches"])
    }
};
</script>

<style scoped>
ul {
    list-style: none;
    margin: 0;
    padding: 0;
}

.controls {
    display: flex;
    justify-content: space-between;
}
</style>
