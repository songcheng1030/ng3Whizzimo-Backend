const userSettings = {
  userId: {
    get: {
      operationId: "getUserSettings",
      summary: "Gets user settings for user",
      produces: [
        "application/json"
      ],
      parameters: [
        {
          "name": "userId",
          "in": "path",
          "description": "Id of user that these settings belong to",
          "type": "string",
          "required": true,
        }
      ],
      "responses": {
        "200": {
          "description": "200 300 response"
        }
      }
    },
  },
  userSettingsId: {
    put: {
      operationId: "putUserSettings",
      summary: "Updates a users Settings",
      produces: [
        "application/json"
      ],
      parameters: [
        {
          "name": "userSettingsId",
          "in": "path",
          "description": "Id of userSettings",
          "type": "string",
          "required": true,
        },
        {
          "name": "userSettings",
          "in": "body",
          "description": "userSettings Object",
          "required": true,
          "schema": {
            "type": "object",
            "required": [],
            "properties": {
              "affixesworkbooktiles" : {
                "type": "boolean"
              },
              "bgcolor": {
                "type": "string",
                "example": "bg-default"
              },
              "blackboard" : {
                "type": "object",
                "example": {
                  cols: 30,
                  rows: 15
                }
              },
              "compoundSounds" : {
                "type": "object",
                "example": {
                  "ace-IHHSSSIL" : 1,
                  "age-IHHJJSIL" : 1,
                  "alk-AWWLLKK" : 1,
                  "all-AWWLL" : 2,
                  "alt-AWWLLTT" : 1,
                  "am-AAEMM" : 1,
                  "an-AAENN" : 1,
                  "ang-AAENGGG" : 2,
                  "ank-AAENGKK" : 2,
                  "arr-ARR" : 1,
                  "arr-AYERR" : 1,
                  "arr-ORR" : 1,
                  "ate-IHHTTSIL" : 1,
                  "bb-BB" : 1,
                  "cc-KK" : 1,
                  "dd-DD" : 1,
                }
              },
              "defaulttextsize" : {
                "type": "number"
              },
              "flashcardstyle" : {
                "type": "boolean"
              },
              "freezerows" : {
                "type": "number"
              },
              "spellcheck": {
                "type": "string",
                "example": "letters"
              },
              "spellingWorkbookTiles" : {
                "type": "boolean"
              },
              "courseLimit": {
                "type": "number",
              },
              "tilefont": {
                "type": "string",
                "example": "ff-arial"
              },
              "tilehighlightcolor": {
                "type": "string",
                "example": "ff-arial"
              },
              "tiles": {
                "type": "object",
                "example": {
                  "GreekCombiningForms" : {
                    "tilebgcolor" : "c-green",
                    "tilefontcolor" : "fc-white"
                  },
                  "LatinChameleonPrefixes" : {
                    "tilebgcolor" : "c-peach",
                    "tilefontcolor" : "fc-black"
                  },
                  "acs" : {
                    "tilebgcolor" : "c-yellow",
                    "tilefontcolor" : "fc-black"
                  },
                  "avs" : {
                    "tilebgcolor" : "c-red",
                    "tilefontcolor" : "fc-white"
                  },
                  "bc" : {
                    "tilebgcolor" : "c-yellow",
                    "tilefontcolor" : "fc-black"
                  },
                  "bl" : {
                    "tilebgcolor" : "c-yellow",
                    "tilefontcolor" : "fc-black"
                  },
                  "blank" : {
                    "tilebgcolor" : "",
                    "tilefontcolor" : ""
                  },
                  "bv" : {
                    "tilebgcolor" : "c-red",
                    "tilefontcolor" : "fc-white"
                  },
                  "cdt" : {
                    "tilebgcolor" : "c-yellow",
                    "tilefontcolor" : "fc-black"
                  },
                  "endblend" : {
                    "tilebgcolor" : "c-cream",
                    "tilefontcolor" : "fc-black"
                  },
                  "gs" : {
                    "tilebgcolor" : "c-green",
                    "tilefontcolor" : "fc-white"
                  },
                  "initblend" : {
                    "tilebgcolor" : "c-cream",
                    "tilefontcolor" : "fc-black"
                  },
                  "pref" : {
                    "tilebgcolor" : "c-blue",
                    "tilefontcolor" : "fc-white"
                  },
                  "rcv" : {
                    "tilebgcolor" : "c-red",
                    "tilefontcolor" : "fc-white"
                  },
                  "roots" : {
                    "tilebgcolor" : "c-orange",
                    "tilefontcolor" : "fc-white"
                  },
                  "sight" : {
                    "tilebgcolor" : "c-transparent",
                    "tilefontcolor" : "fc-red"
                  },
                  "slc" : {
                    "tilebgcolor" : "c-yellow",
                    "tilefontcolor" : "fc-black"
                  },
                  "suff" : {
                    "tilebgcolor" : "c-blue",
                    "tilefontcolor" : "fc-white"
                  },
                  "sym" : {
                    "tilebgcolor" : "c-purple",
                    "tilefontcolor" : "fc-white"
                  },
                  "sym2" : {
                    "tilebgcolor" : "c-lightgreen",
                    "tilefontcolor" : "fc-white"
                  },
                  "vt" : {
                    "tilebgcolor" : "c-red",
                    "tilefontcolor" : "fc-white"
                  }
                }
              },
              "whizzimap": {
                "type": "boolean"
              },
              "workbookLimit": {
                "type": "number"
              },
            }
          }
        },
      ],
      "responses": {
        "200": {
          "description": "200 300 response"
        }
      }
    }
  },
  compoundSounds: {
    put: {
      operationId: "putUserSettingsCompoundSounds",
      summary: "Updates a compound sound",
      produces: [
        "application/json"
      ],
      parameters: [
        {
          "name": "userSettingsId",
          "in": "path",
          "description": "Id of userSettings",
          "type": "string",
          "required": true,
        },
        {
          "name": "compoundSounds",
          "in": "body",
          "description": "userSettings Object",
          "required": true,
          "schema": {
            "type": "object",
            "properties": {
              "name": "ace-IHHSSSIL",
              "value": 2
            }
          }
        },
      ],
      "responses": {
        "200": {
          "description": "200 300 response"
        }
      }
    }
  }
};

module.exports = userSettings;
