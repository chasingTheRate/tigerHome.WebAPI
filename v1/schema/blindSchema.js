
const blindSchema = {
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Blind",
  "description": "Blind properties",
  "type": "object",
  "properties": {
    "ipAddress": {
      "description": "string",
      "type": ["string"]
    },
    "name": {
      "description": "string",
      "type": ["string"]
    },
    "currentPosition": {
      "description": "positive integer",
      "type": ["integer", "string"],
      "pattern": "^[0-9][0-9][0-9]*$"
    },
    "room": {
      "description": "string",
      "type": ["string"]
    },
    "blindState": {
      "description": "string",
      "type": ["string"]
    },
    "port": {
      "description": "positive integer",
      "type": ["integer", "string"],
      "pattern": "^[1-3][1-3]*$",
      "minimum": 1
    },
    "blindId": {
      "description": "string",
      "type": ["string"]
    }
  },
  "required": ["ipAddress", "name", "room", "port"],
  "additionalProperties": true
}

module.exports = blindSchema;