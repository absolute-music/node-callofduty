const snekfetch = require('snekfetch');
const Account = require('./Account');
/**
 * The client for interacting with the CallofDuty Tracker Network API Token
 * @class Client
 * @param {string} key CallofDuty Tracker Network API Token
 */
class Client {
    constructor(key) {

        if (!key) {
            throw new Error('No API key passed.');
        }

        this.key = key;

        this.headers = {
            'TRN-Api-Key': this.key
        };
        
        this.rateLimit = {
            limit: 30,
            remaining: 30
        };

    }

    /**
     * Makes the request to the API
     * @private
     * @param {string} link URL endpoint of API
     * @returns {Promise<Object>}
     * @memberof Client
     */
    _request(link) {
        return snekfetch.get(link)
            .set(this.headers)
            .then(r => {

                this.rateLimit = {
                    limit: Number(r.headers['x-ratelimit-limit-minute']),
                    remaining: Number(r.headers['x-ratelimit-remaining-minute'])
                };

                if (r.body.error || r.body.message) return Promise.reject(r.body.error);

                return r.body;
            })
            .catch(e => Promise.reject(`HTTP ${e}`));
    }

    /**
     * Get user info
     * @param {string} username username of the user to search for
     * @param {string=} [platform='6'] platform to search for user in (pc, xbl, or psn)
     * @param {boolean=} [raw=false] whether to return raw response from API
     * @returns {(Promise<Account>|Promise<Object>)}
     * @memberof Client
     */
    get(game, username, platform = '6', raw = false) {
        return this._request(` https://api.fortnitetracker.com/v1/profile/${platform}/${username}`)
            .then(r => raw ? r : new Account(r))
            .catch(e => Promise.reject(e));
    }

}

module.exports = Client;
