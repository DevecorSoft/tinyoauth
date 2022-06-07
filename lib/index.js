/**
 * @typedef UserIdSupplier
 * @type {Object}
 * @property {Function} generate_user_id
 */

/**
 * @typedef TimeSupplier
 * @type {Object}
 * @property {Function} utc_now - current utc time in format
 */

/**
 * @typedef ClientIdentifier
 * @type {Object}
 * @property {String} client_id - client id
 * @property {Strign} client_secret - client secret
 */

/**
 * @typedef ClientIdSupplier
 * @type {Object}
 * @property {Function} generate_cid
 * @property {Function} generate_secret
 */

/**
 * @typedef JwtSupplier
 * @type {Object}
 * @property {Function} sign
 * @property {Function} verify
 */
