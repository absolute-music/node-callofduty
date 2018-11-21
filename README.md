# node-callofduty
Simple little api wrapper for Black Ops 4, Black Ops 3, Infinate Warfare, and WW2. This wrapper uses the[Tracking Network](https://cod.tracker.gg/site-api) Public API
Credits to [ickerio](https://github.com/ickerio), His fortnite.js and pubg.js inspired me to create this api wrapper :)

# Example:
```js
const callofduty = require('node-callofduty');

const client = new callofduty('API KEY');

let data = client.get(callofduty.bo4,"incizzle-1965",callofduty.battlenet).then(data => { 
    console.log(data)
})
```

# API Endpoints

TODO

# Help
If you got any problems send me a message on discord @ incizzle#5554 GLHF!