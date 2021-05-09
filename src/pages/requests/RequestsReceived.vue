<template>
    <base-dialog :show="!!error" @close="handleError" title="Failed to load requests">
        <p>{{ error }}</p>
    </base-dialog>
    <section>
        <base-card>
            <header>
                <h2>Requests Received</h2>
            </header>
            <div v-if="isLoading">
                <base-spinner />
            </div>
            <ul v-else-if="hasRequests && !isLoading">
                <request-item
                    v-for="request in receivedRequests"
                    :id="request.id"
                    :key="request.id"
                    :email="request.userEmail"
                    :message="request.message"
                />
            </ul>
            <h3 v-else>You haven't received any requests yet!</h3>
        </base-card>
    </section>
</template>

<script>
// import { mapGetters } from "vuex";
import RequestItem from "../../components/requests/RequestItem.vue";
export default {
    components: {
        RequestItem
    },
    data() {
        return {
            error: null,
            isLoading: false
        };
    },
    computed: {
        receivedRequests() {
            // console.log(this.$store.getters["requests/requests"]);
            return this.$store.getters["requests/requests"];
        },
        // ...mapGetters("requests", ["hasRequests"])
        hasRequests() {
            // console.log("from loading requests received");
            // console.log(this.$store.getters["requests/requests"]);
            // console.log(this.$store.getters["requests/hasRequests"]);
            return this.$store.getters["requests/hasRequests"];
        }
    },
    mounted() {
        this.loadRequests();
    },
    methods: {
        async loadRequests() {
            this.isLoading = true;
            try {
                await this.$store.dispatch("requests/loadRequests");
            } catch(error) {
                this.error = error.message || "Something went wrong";
                return;
            }
            this.isLoading = false;
        },
        handleError() {
            this.isLoading = false;
            this.error = null;
        }
    }
}
</script>

<style scoped>
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}
</style>