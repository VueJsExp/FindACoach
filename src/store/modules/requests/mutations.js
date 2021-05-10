export default {
    addRequest(state, payload) {
        // console.log(state.requests);
        state.requests.push(payload);
    },
    setRequests(state, requests) {
        // console.log("mutations requests/setRequests");
        // console.log(requests);
        state.requests = requests;
    }
};
