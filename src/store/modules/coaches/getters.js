export default {
    coaches(state) {
        // console.log("getter coaches()");
        // console.log(state.coaches);
        return state.coaches;
    },
    hasCoaches(state) {
        return state.coaches && state.coaches.length;
    },
    isCoach(_, getters, _2, rootGetters) {
        const coaches = getters.coaches;
        const userId = rootGetters.userId;
        // const existingUser = coaches.find((coach) => coach.id === userId);
        return coaches.some(coach => coach.id === userId);
    },
    shouldUpdate(state) {
        const lastFetch = state.lastFetch;
        if (!lastFetch) {
            return true;
        }
        const currentTimeStamp = new Date().getTime();
        return (currentTimeStamp - lastFetch) / 1000 > 60;
    }
};
