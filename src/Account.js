class Account {
    constructor(content) {
        /**
         * Account ID
         * @type {string}
         */
        this.accountid = content.data.metadata.accountId;

        /**
         * Type of Account
         * @type {string}
         */
        this.type = content.data.type;

        /**
         * User Account Handle
         * @type {string}
         */
        this.platformuserhandle = content.data.metadata.platformUserHandle;

        /**
         * Platform ID
         * @type {int}
         */
        this.platformid = content.data.metadata.platformId;

        /**
         * Stats Type
         * @type {Object}
         * @type {string}
         * @type {string}
         * @type {string}
         * @type {string}
         * @type {string}
         * @type {string}
         * @type {string}
         * @type {string}
         */
        this.stats = this._structureGame(content.data.stats);
        
    }

    _structureGame(stats) {
        const newstats = {};
        for (const s in stats) {
            const data = stats[s];
            newstats[data.metadata.key] = {
                name: data.metadata.name,
                category: data.metadata.categoryName,
                categoryKey: data.metadata.categoryKey,
                iconUrl: data.metadata.iconUrl,
                value: data.displayValue,
                valueInt: data.value,
                rank: data.displayRank,
                percentile: data.percentile
            };
        }
        return newstats;
    }

}

module.exports = Account;