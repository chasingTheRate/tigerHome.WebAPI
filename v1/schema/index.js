const debug = require('debug')('schema');
const blindSchema = require('./blindSchema');
const Ajv = require('ajv');

const ajv = Ajv({allErrors: true});

const validate = (schema, data) => {
  debug('validate');
  const valid = ajv.validate(blindSchema, data)
  if (!valid) {
    console.log(ajv.errors);
  }
  return valid;
}

module.exports = {
  blindSchema,
  validate
}