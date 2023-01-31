class Errors {
    static missingParametersBody: string  = 'Request body missing required parameters.';
    static missingParametersUrl: 'Request URL missing required parameters.';
    static illegalParameters: 'Illegal parameters in body of request: courseWorkbookId.';
    static rollbackError: 'Unable To Roll back after insertion error.';
    static invalidBundleType: 'The bundle type is not valid.';
    static noBundleItems: 'There are no bundle items in the request body.';
    static notAuthorized: 'User is not authorized';
    static noFailure: 'Did not fail';
    static duplicate(objectName:string): string {
        return `Duplicate ${objectName}.`;
    };
    static notFound (objectName: string): string {
        return `${objectName} not found.`;
    };
}

export {Errors};
