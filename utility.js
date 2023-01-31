const {defaultSettings, defaultTileBank, defaultWorkbooks} = require('./constants/constants');

function whizzimoDefaultSettings (data) {
	const signupDate = new Date().toISOString();
	return {
		firebaseId: data.whizzimoId,
		tileBank: defaultTileBank,
		meta: {
			email: data.email,
			lastname: data.lastname,
			firstname: data.firstname,
			role: data.role,
			signupDate: signupDate,
			referredBy: data.code,
			referredByDesc: data.codeDesc,
			cusID: data.cusID,
			teacher: data.teacher,
			teacherCusID: data.teacherCusID,
			auth0Id: data.auth0Id,
			promo: data.promo,
		},
		userSettings: defaultSettings
	};
}

const errorText = {
  missingParametersBody: 'Request body missing required parameters.',
  missingParametersUrl: 'Request URL missing required parameters.',
  illegalParameters: 'Illegal parameters in body of request: courseWorkbookId.',
  rollbackError: 'Unable To Roll back after insertion error.',
  notFound: (objectName) => `${objectName} not found.`,
  invalideBundleType: 'The bundle type is not valid.',
  noBundleItems: 'There are no bundle items in the request body.',
  notAuthorized: 'User is not authorized'
};

const validBundleTypes = [
  "course",
  "workbook",
  "settings"
];

module.exports = {
	whizzimoDefaultSettings,
	errorText,
  	validBundleTypes,
};
