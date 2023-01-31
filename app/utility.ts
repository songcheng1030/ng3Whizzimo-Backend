class Utility {
    static errorText = {
        missingParametersBody: 'Request body missing required parameters.',
        missingParametersUrl: 'Request URL missing required parameters.',
        illegalParameters: 'Illegal parameters in body of request: courseWorkbookId.',
        rollbackError: 'Unable To Roll back after insertion error.',
        notFound: (objectName:any) => `${objectName} not found.`,
        invalideBundleType: 'The bundle type is not valid.',
        noBundleItems: 'There are no bundle items in the request body.',
        notAuthorized: 'User is not authorized'
    };
}

export {Utility};
