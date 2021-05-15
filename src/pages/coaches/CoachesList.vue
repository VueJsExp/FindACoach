<template>
    <div>
        <base-dialog :show="!!error" @close="handleError" title="An error occured!">
            <p>{{ error }}</p>
        </base-dialog>
        <section>
            <coach-filter @change-filter="setFilters" />
        </section>
        <section>
            <base-card>
                <div class="controls">
                    <base-button @click="loadCoaches(true)" mode="outline">Refresh</base-button>
                    <!-- <router-link to="/register">Register as Coach</router-link> -->
                    <base-button v-if="!isLoggedIn" link to="/auth?redirect=register">Login to Register as Coach</base-button>
                    <base-button v-if="isLoggedIn && !isCoach && !isLoading" link to="/register">Register as Coach</base-button>
                </div>
                <div v-if="isLoading">
                    <base-spinner />
                </div>
                <ul v-else-if="hasCoaches">
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
    </div>
</template>

<script>
import CoachItem from "../../components/coaches/CoachItem.vue";
import CoachFilter from "../../components/coaches/CoachFilter.vue";

// import { mapGetters } from "vuex";
export default {
    components: {
        CoachItem,
        CoachFilter
    },
    data() {
        return {
            error: null,
            isLoading: false,
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
            return coaches.filter(coach => {
                if (this.activeFilters.frontend && coach.areas.includes("frontend")) return true;
                if (this.activeFilters.backend && coach.areas.includes("backend")) return true;
                if (this.activeFilters.career && coach.areas.includes("career")) return true;
                return false;
            });
        },
        // ...mapGetters("coaches", ["hasCoaches"]),
        hasCoaches() {
            return this.$store.getters["coaches/hasCoaches"] && !this.isLoading;
        },
        isCoach() {
            return this.$store.getters["coaches/isCoach"];
        },
        isLoggedIn() {
            return this.$store.getters["auth/isAuthenticated"];
        }
    },
    created() {
        this.loadCoaches();
    },
    methods: {
        setFilters(updatedFilters) {
            this.activeFilters = updatedFilters;
        },
        async loadCoaches(refresh = false) {
            // console.log("CoachesList loadCoaches");
            // console.log(refresh);
            this.isLoading = true;
            try {
                await this.$store.dispatch("coaches/loadCoaches", { forceRefresh: refresh });
            } catch (error) {
                this.error = error.message || "Something went wrong!";
            }
            this.isLoading = false;
        },
        handleError() {
            this.error = null;
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
