export default {
    async contactCoach(context, payload) {
        // const requestId = new Date().toISOString();
        // const requestId = `req${(+new Date()).toString(16)}`;
        // console.log(requestId);
        const newRequest = {
            // id: requestId,
            // coachId: payload.coachId,
            userEmail: payload.email,
            message: payload.message
        };
        // console.log(newRequest);
        // const response = await fetch(
        //     `https://vue-http-demo-30060-default-rtdb.firebaseio.com/requests/${requestId}.json`,
        //     {
        //         method: "PUT",
        //         body: JSON.stringify(newRequest)
        //     }
        // );
        //другой метод - firebase странная хрень
        const response = await fetch(
            `https://vue-http-demo-30060-default-rtdb.firebaseio.com/requests/${payload.coachId}.json`,
            {
                method: "POST",
                body: JSON.stringify(newRequest)
            }
        );

        const responseData = await response.json();
        //фича firebase
        newRequest.id = responseData.name;
        newRequest.coachId = payload.coachId;

        if (!response.ok) {
            // console.log("action requests/contactCoach");
            // console.log(response);
            const error = new Error(responseData.message || "Failed to contact!");
            throw error;
        }

        context.commit("addRequest", newRequest);
    },
    async loadRequests(context) {
        const coachId = context.rootGetters.userId;
        const response = await fetch(`https://vue-http-demo-30060-default-rtdb.firebaseio.com/requests/${coachId}.json`);
        const responseData = await response.json();

        // console.log("action request/loadRequest");
        // console.log(responseData);

        if (!response.ok) {
            const error = new Error(responseData.message || "Failed to fetch!");
            throw error;
        }

        const requests = [];
        for (const key in responseData) {
            const data = responseData[key];
            // console.log(data);
            const request = {
                id: key,
                coachId: coachId,
                userEmail: data.userEmail,
                message: data.message
            };
            // console.log(request);
            requests.push(request);
        }
        context.commit("setRequests", requests);
    }
};
