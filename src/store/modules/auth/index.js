import authMutations from "./mutations.js";
import authActions from "./actions.js";
import authGetters from "./getters.js";
const authModule = {
    namespaced: true,
    state() {
        return {
            userId: null,
            token: null,
            didAutoLogout: false
        };
    },
    mutations: authMutations,
    actions: authActions,
    getters: authGetters
};

export default authModule;