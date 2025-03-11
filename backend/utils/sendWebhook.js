const axios = require('axios');

const sendWebhook = async (data, email) => {
    try {
        await axios.post("https://rnd-assignment.automations-3d6.workers.dev/", data, {
            headers: {
                "X-Candidate-Email": email,
                "Content-Type": "application/json"
            }
        });
        console.log("Webhook Sent Successfully");
    } catch (error) {
        console.error("Webhook Failed", error);
    }
};

module.exports = sendWebhook;
