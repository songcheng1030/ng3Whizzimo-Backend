import {UserActivitySettings} from '../models/UserActivitySettings';

const DefaultActivitySettings = new UserActivitySettings();
DefaultActivitySettings.name = 'Default Settings';
DefaultActivitySettings.isCurrent = true;
DefaultActivitySettings.flashcards = {
    option: 0,
    tileColors: false,
    wordNum: 15
  };
DefaultActivitySettings.whiteboard = {
    lines: false
  };

DefaultActivitySettings.timedReading = {
    wordNum: 15,
    size: 1
  };
DefaultActivitySettings.wordcards = {
    wordNum: 15,
    size: 1
  };
DefaultActivitySettings.lettercards = {
    wordNum: 15,
    size: 1,
    tiles: false
  };
DefaultActivitySettings.blackboard = {
    wordNum: 15,
    firstWord: true,
    lines: true,
    freeze: 0
  };
DefaultActivitySettings.workbookTiles = {
    wordNum: 15,
    firstWord: true,
    lines: true,
    freeze: 0
  };

DefaultActivitySettings.miniTiles = {
    wordNum: 15,
    firstWord: true,
    lines: true
  };

DefaultActivitySettings.spelling = {
    spellCheck: 0,
    workbookTiles: false,
    wordNum: 15
  };
DefaultActivitySettings.sentences = {
    size: 1
};

DefaultActivitySettings.phrases = {
    size: 1
}

DefaultActivitySettings.passages = {
    size: 1
}

DefaultActivitySettings.pdfViewer = {
    isLandscape: false,
    zoom: 1,
    bgColor: 'bg-transparent'
}
DefaultActivitySettings.blankTiles = [
  'tiles.blank.blue',
  'tiles.blank.green',
  'tiles.blank.orange',
  'tiles.blank.red',
  'tiles.blank.yellow'
]

export {DefaultActivitySettings}
