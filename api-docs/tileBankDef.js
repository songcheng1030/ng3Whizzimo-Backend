const tileBank = {
  userId: {
    get: {
      operationId: "getTileBank",
      summary: "Gets tile bank for user",
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
  tileBankId: {
    get: {
      operationId: "putTileBank",
      summary: "Gets a tile bank",
      produces: [
        "application/json"
      ],
      parameters: [
        {
          "name": "tileBankId",
          "in": "path",
          "description": "Id of tileBank",
          "type": "string",
          "required": true,
        },
      ],
      "responses": {
        "200": {
          "description": "200 300 response"
        }
      }
    },
    put: {
      operationId: "putTileBank",
      summary: "Updates a users tile bank",
      produces: [
        "application/json"
      ],
      parameters: [
        {
          "name": "tileBankId",
          "in": "path",
          "description": "Id of tileBank",
          "type": "string",
          "required": true,
        },
        {
          "name": "tileBank",
          "in": "body",
          "description": "tileBank Object",
          "required": true,
          "schema": {
            "type": "object",
            "required": [],
            "properties": {
              "bank": {
                "type": "object",
                "example": {
                  "r0" : {
                    "c0" : "tiles.bv.a",
                    "c1" : "tiles.bc.b",
                    "c10" : "tiles.bc.k",
                    "c11" : "tiles.bc.l",
                    "c12" : "tiles.bc.m",
                    "c13" : "tiles.bc.n",
                    "c2" : "tiles.bc.c",
                    "c3" : "tiles.bc.d",
                    "c4" : "tiles.bv.e",
                    "c5" : "tiles.bc.f",
                    "c6" : "tiles.bc.g",
                    "c7" : "tiles.bc.h",
                    "c8" : "tiles.bv.i",
                    "c9" : "tiles.bc.j"
                  },
                  "r1" : {
                    "c0" : "tiles.bv.o",
                    "c1" : "tiles.bc.p",
                    "c10" : "tiles.bc.y",
                    "c11" : "tiles.bc.z",
                    "c12" : "tiles.bv.y",
                    "c13" : "tiles.blank.red",
                    "c14" : "tiles.blank.yellow",
                    "c2" : "tiles.bc.qu",
                    "c3" : "tiles.bc.r",
                    "c4" : "tiles.bc.s",
                    "c5" : "tiles.bc.t",
                    "c6" : "tiles.bv.u",
                    "c7" : "tiles.bc.v",
                    "c8" : "tiles.bc.w",
                    "c9" : "tiles.bc.x"
                  },
                  "r3" : {
                    "c1" : "tiles.rcv.ar",
                    "c10" : "tiles.cdt.th",
                    "c11" : "tiles.cdt.wh",
                    "c12" : "tiles.cdt.ck",
                    "c2" : "tiles.rcv.er",
                    "c3" : "tiles.rcv.ir",
                    "c4" : "tiles.rcv.or",
                    "c5" : "tiles.rcv.ur",
                    "c8" : "tiles.cdt.ch",
                    "c9" : "tiles.cdt.sh"
                  }
                }
              }
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

module.exports = tileBank;
