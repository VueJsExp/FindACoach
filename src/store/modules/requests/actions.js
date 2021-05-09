export default {
    async contactCoach(context, payload) {
        const requestId = new Date().toISOString();
        const newRequest = {
            id: requestId,
            coachId: payload.coachId,
            userEmail: payload.email,
            message: payload.message
        };
        // console.log(newRequest);
        const response = await fetch(
            `https://vue-http-demo-30060-default-rtdb.firebaseio.com/requests/${requestId}.json`,
            {
                method: "POST",
                body: JSON.stringify(newRequest)
            }
        );

        const responseData = await response.json();

        if (!response.ok) {
            const error = new Error(responseData.message || "Failed to contact!");
            throw error;
        }

        context.commit("addRequest", newRequest);
    },
    async loadRequests(context) {
        const response = await fetch(`https://vue-http-demo-30060-default-rtdb.firebaseio.com/requests.json`);
        const responseData = await response.json();

        console.log("action request/loadRequest");
        console.log(responseData);

        if (!response.ok) {
            const error = new Error(responseData.message || "Failed to fetch!");
            throw error;
        }

        const requests = [];
        for (const key in responseData) {
            const data = responseData[key];
            const request = {
                id: data.id,
                coachId: data.coachId,
                userEmail: data.userEmail,
                message: data.message
            };
            requests.push(request);
        }
        context.commit("setRequests", requests);
    }
};
