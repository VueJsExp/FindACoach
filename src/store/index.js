import { createStore } from "vuex";

import coachesModule from "./modules/coaches/index.js";
import requestsModule from "./modules/requests/index.js";
import authModule from "./modules/auth/index.js";

const store = createStore({
    modules: {
        coaches: coachesModule,
        requests: requestsModule,
        auth: authModule
    },
    getters: {
        userId(_, getters) {
            // console.log(state);
            return getters["auth/userId"];
        }
    }
});

export default store;
