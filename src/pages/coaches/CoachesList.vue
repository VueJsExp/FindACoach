<template>
    <section>
        <coach-filter @change-filter="setFilters"/>
    </section>
    <section>
        <base-card>
            <div class="controls">
                <base-button mode="outline">Refresh</base-button>
                <!-- <router-link to="/register">Register as Coach</router-link> -->
                <base-button v-if="!isCoach" link to="/register">Register as Coach</base-button>
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
import CoachFilter from "../../components/coaches/CoachFilter.vue";

import { mapGetters } from "vuex";
export default {
    components: {
        CoachItem,
        CoachFilter
    },
    data() {
        return {
            activeFilters: {
                frontend: true,
                backend: true,
                career: true
            }
        };
    },
    computed: {
        filteredCoaches() {
            // console.log(this.$store.getters["coaches/coaches"]);
            // return this.$store.getters["coaches/coaches"];
            const coaches = this.$store.getters["coaches/coaches"];
            // return coaches.filter((coach) => {
            //     return this.activeFilters.find((area, index) => coach.areas[index] && area );
            // });
            return coaches.filter((coach) => {
                if (this.activeFilters.frontend && coach.areas.includes("frontend"))
                    return true;
                if (this.activeFilters.backend && coach.areas.includes("backend"))
                    return true;
                if (this.activeFilters.career && coach.areas.includes("career"))
                    return true;
                return false;
            });
        },
        ...mapGetters("coaches", ["hasCoaches"]),
        isCoach() {
            return this.$store.getters["coaches/isCoach"];
        }
    },
    methods: {
        setFilters(updatedFilters) {
            this.activeFilters = updatedFilters;
        }
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
