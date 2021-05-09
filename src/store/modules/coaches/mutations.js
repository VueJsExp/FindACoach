export default {
    registerCoach(state, payload) {
        state.coaches.push(payload);
    },
    setCoaches(state, payload) {
        // console.log("mutation setCoaches");
        // console.log(payload);
        state.coaches = payload;
    }
};