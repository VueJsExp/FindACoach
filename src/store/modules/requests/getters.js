export default {
    requests(state, _, _2, rootGetters) {
        // return state.requests;
        const coachId = rootGetters.userId;
        return state.requests.filter(request => coachId === request.coachId);
    },
    hasRequests(_, getters) {
        return getters.requests && getters.requests.length > 0;
    }
};
