export default {
    async registerCoach(context, formData) {
        const userId = context.rootGetters.userId;
        const coachData = {
            // id: new Date().toISOString(),
            firstName: formData.first,
            lastName: formData.last,
            areas: formData.areas,
            description: formData.desc,
            hourlyRate: formData.rate
        };

        const response = await fetch(`https://vue-http-demo-30060-default-rtdb.firebaseio.com/coaches/${userId}.json`, {
            method: "PUT",
            body: JSON.stringify(coachData)
        });

        const responseData = await response.json();

        if (!response.ok) {
            const error = new Error(responseData.message || "Failed to fetch!");
            throw error;
        }

        context.commit("registerCoach", {
            ...coachData,
            id: userId
        });
    },
    async loadCoaches(context) {
        const response = await fetch(`https://vue-http-demo-30060-default-rtdb.firebaseio.com/coaches.json`);
        const responseData = await response.json();

        if (!response.ok) {
            const error = new Error(responseData.message || "Failed to fetch!");
            throw error;
        }

        const coaches = [];
        for (const key in responseData) {
            const data = responseData[key];
            const coach = {
                id: key,
                firstName: data.firstName,
                lastName: data.lastName,
                areas: data.areas,
                description: data.description,
                hourlyRate: data.hourlyRate
            };
            coaches.push(coach);
        }
        // console.log("action loadCoaches");
        // console.log(coaches);
        context.commit("setCoaches", coaches);
    }
};