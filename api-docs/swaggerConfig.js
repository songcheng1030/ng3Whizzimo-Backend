
const registrationDef = require('./registrationDef');
const sentenceDef = require('./sentenceDef');
const phraseDef = require('./phraseDef');
const passageDef = require('./passageDef');
const workbookSentenceDef  = require('./workbookSentenceDef');
const workbookPhraseDef  = require('./workbookPhraseDef');
const workbookPassageDef  = require('./workbookPassageDef');
const courseDef = require('./courseDef');
const courseWorkbookDef = require('./courseWorkbookDef');
const workbookFileDef = require('./workbookFileDef');
const lessonPlanDef = require('./lessonPlanDef');
const lessonPlanStepDef = require('./lessonPlanStepDef');
const workbookDef = require('./workbookDef');
const userDef = require('./userDef');
const userSettingsDef = require('./userSettingsDef');
const tileBankDef = require('./tileBankDef');
const accountDef = require('./accountDef');
const bundleDef = require('./bundleDef');
const bundleQueueDef = require('./bundleQueueDef');
const courseWorkbookActivityDef = require('./courseWorkbookActivityDef');
const fileDef = require('./fileDef');
const pairingsDef = require('./pairingsDef');
const tilesDef = require('./tilesDef');
const wordDef = require('./wordDef');
const userActivitySettingsDef = require('./userActivitySettingsDef');
const plansDef = require('./planDef');
const account = require('./accountDef');
const subscriptionDef = require('./subscriptionDef');

let config = {
  "swagger": "2.0",
  "info": {
    "title": "Whizzimo API",
    "version": "v1"
  },
  securityDefinitions: {
    BasicAuth: {
      type: "basic"
    }
  },
  "paths": {
    "/account/auth0/user/{userId}": accountDef.auth0.user,
    "/account/auth0/user/clever/{emailAddress}": accountDef.auth0.user.clever,
    "/account/auth0/user/resetPassword/{emailAddress}": accountDef.auth0.user.resetPassword,
    "/account/card/{customerId}": accountDef.card,
    "/account/card/{customerId}/{cardId}": accountDef.cardMulti,
    "/account/customer/{customerId}": accountDef.customer,
    "/account/products": accountDef.products,
    "/account/promo/{promoId}": accountDef.promo,
    "/account/promo/{customerId}": accountDef.promoCustDelete,
    "/account/promo/{subscriptionId}": accountDef.promoSubDelete,
    "/account/subscription/customer/{customerId}": accountDef.subscriptionCust,
    "/account/subscription/{subscriptionId}": accountDef.subscriptionEnd,
    "/account/subscription/{subscriptionId}": accountDef.subscriptionSub,
    "/account/subscription/scheduled/{scheduledSubscriptionId}": accountDef.scheduledSubscriptionEnd,
    "/account/subscription/scheduled/{scheduledSubscriptionId}": accountDef.scheduledSubscriptionEnd,
    "/subscription/multiple": subscriptionDef.multipleCreate,
    "/bundle": bundleDef.post,
    "/bundle/multiple": bundleDef.multipleCreate,
    "/bundle/apply": bundleDef.apply,
    "/bundle/user/{userId}": bundleDef.userId,
    "/bundle/{bundleId}": bundleDef.bundleId,
    "/bundleQueue": bundleQueueDef.post,
    "/bundleQueue/send": bundleQueueDef.send,
    "/bundleQueue/user/{userId}": bundleQueueDef.userId,
    "/bundleQueue/{bundleQueueId}": bundleQueueDef.bundleQueueId,
    "/course": courseDef.post,
    "/course/{courseId}": courseDef.courseId,
    "/course/copy/{courseId}": courseDef.courseCopy,
    "/course/shared/{sharedKey}": courseDef.sharedKey,
    "/course/user/{userId}": courseDef.userId,
    "/courseWorkbook": courseWorkbookDef.post,
    "/courseWorkbook/copy/{courseWorkbookId}": courseWorkbookDef.copy,
    "/courseWorkbook/count/workbook/{workbookId}": courseWorkbookDef.count,
    "/courseWorkbook/course/{courseId}": courseWorkbookDef.courseId,
    "/courseWorkbook/{courseWorkbookId}": courseWorkbookDef.courseWorkbookId,
    "/courseWorkbook/{workbookId}/{courseId}": courseWorkbookDef.workbookIdCourseId,
    "/courseWorkbook/workbook/{workbookId}": courseWorkbookDef.workbookId,
    "/courseWorkbookActivity/{courseWorkbookActivityId}": courseWorkbookActivityDef.courseWorkbookActivityId,
    "/courseWorkbookActivity/courseWorkbook/{courseWorkbookId}/activityType/{activityTypeId}": courseWorkbookActivityDef.courseWorkbookId,
    "/file": fileDef.post,
    "/file/multi": fileDef.multi,
    "/file/{fileId}": fileDef.fileId,
    "/file/user/{userId}": fileDef.userId,
    "/lessonPlan": lessonPlanDef.post,
    "/lessonPlan/{lessonPlanId}": lessonPlanDef.lessonPlanId,
    "/lessonPlan/copy/{lessonPlanId}": lessonPlanDef.copy,
    "/lessonPlan/course/{courseId}": lessonPlanDef.courseId,
    "/lessonPlan/course/steps/{courseId}": lessonPlanDef.courseIdSteps,
    "/lessonPlanStep": lessonPlanStepDef.post,
    "/lessonPlanStep/{lessonPlanStepId}": lessonPlanStepDef.lessonPlanStepId,
    "/lessonPlanStep/copy/{lessonPlanStepId}": lessonPlanStepDef.copy,
    "/lessonPlanStep/count/courseWorkbook/{courseWorkbookId}": lessonPlanStepDef.count.courseWorkbookId,
    "/lessonPlanStep/count/workbook/{workbookId}": lessonPlanStepDef.count.workbookId,
    "/lessonPlanStep/lessonPlan/{lessonPlanId}": lessonPlanStepDef.lessonPlanId,
    "/pairings": pairingsDef.get,
    "/pairings/compoundSounds": pairingsDef.compoundSounds,
    "/passage": passageDef.post,
    "/passage/user/{userId}": passageDef.userId,
    "/passage/{passageId}": passageDef.passageId,
    "/phrase": phraseDef.post,
    "/phrase/user/{userId}": phraseDef.userId,
    "/phrase/{phraseId}": phraseDef.phraseId,
    "/plan": plansDef.root,
    "/registration": registrationDef.post,
    "/registration/course": registrationDef.createFirstCourse,
    "/sentence": sentenceDef.post,
    "/sentence/user/{userId}": sentenceDef.userId,
    "/sentence/{sentenceId}": sentenceDef.sentenceId,
    "/tiles": tilesDef.get,
    "/tiles/{query}": tilesDef.query,
    "/tileBank/user/{userId}": tileBankDef.userId,
    "/tileBank/{tileBankId}": tileBankDef.tileBankId,
    "/user/email/{email}": userDef.email,
    "/user/{userId}": userDef.userId,
    "/userSettings/user/{userId}": userSettingsDef.userId,
    "/userSettings/{userSettingsId}": userSettingsDef.userSettingsId,
    "/userSettings/compoundSounds/{userSettingsId}": userSettingsDef.compoundSounds,
    "/userActivitySettings/{userId}": userActivitySettingsDef.post,
    "/userActivitySettings/copy/{userActivitySettingsId}": userActivitySettingsDef.copy,
    "/userActivitySettings/user/{userId}": userActivitySettingsDef.userId,
    "/userActivitySettings/updateCurrent/{userActivitySettingsId}/{userId}": userActivitySettingsDef.updateCurrent,
    "/userActivitySettings/{userActivitySettingsId}": userActivitySettingsDef.userActivitySettingsId,
    "/word/customer/{customerId}": wordDef.post,
    "/word/wordIds": wordDef.wordIds,
    "/word/sound-letter-pairings": wordDef.soundLetterPairings,
    "/word/tiles/wordIds": wordDef.tiles,
    "/workbook": workbookDef.post,
    "/workbook/ids/{ids}": workbookDef.ids,
    "/workbook/user/{userId}": workbookDef.userId,
    "/workbook/{workbookId}": workbookDef.workbookId,
    "/workbookFile": workbookFileDef.post,
    "/workbookFile/multi": workbookFileDef.multi,
    "/workbookFile/workbook/{workbookId}": workbookFileDef.workbookId,
    "/workbookFile/{workbookFileId}": workbookFileDef.workbookFileId,
    "/workbookPassage": workbookPassageDef.post,
    "/workbookPassage/workbook/{workbookId}": workbookPassageDef.workbookId,
    "/workbookPassage/{workbookPassageId}": workbookPassageDef.workbookPassageId,
    "/workbookPhrase": workbookPhraseDef.post,
    "/workbookPhrase/workbook/{workbookId}": workbookPhraseDef.workbookId,
    "/workbookPhrase/{workbookPhraseId}": workbookPhraseDef.workbookPhraseId,
    "/workbookSentence": workbookSentenceDef.post,
    "/workbookSentence/workbook/{workbookId}": workbookSentenceDef.workbookId,
    "/workbookSentence/{workbookSentenceId}": workbookSentenceDef.workbookSentenceId,
  },
  consumes: [
    "application/json"
  ]
};

module.exports = config;
