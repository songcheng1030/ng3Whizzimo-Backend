const plan = {
    root: {
        get: {
            operationId: "getAllActivePlans",
            summary: "Gets all active plans",
            produces: [
                "application/json"
            ],
            parameters: [],
            "responses": {
                "200": {
                    "description": "200 300 response"
                }
            }
        }
    }
};

module.exports = plan;
