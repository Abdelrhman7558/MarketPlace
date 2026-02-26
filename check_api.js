const fetch = require('cross-fetch');
const fs = require('fs');

async function checkApi() {
    console.log("Fetching API...");
    try {
        const res = await fetch("https://parallelbroker.com/api/1.1/init/data?location=https%3A%2F%2Fparallelbroker.com%2Fmarketplace");
        const json = await res.json();
        fs.writeFileSync('f:\\Marketplace\\bubble_init.json', JSON.stringify(json, null, 2));
        console.log("Saved to bubble_init.json, length: " + json.length);

        let foundItems = 0;
        // Search json deeply for any text resembling a product
        const stringified = JSON.stringify(json);
        console.log("Total string length: " + stringified.length);
        // let's look for EAN-like things or names like "EUCERIN"
        const matches = stringified.match(/.{0,50}EUCERIN.{0,50}/g);
        console.log("Matches for EUCERIN: ", matches ? matches.slice(0, 3) : 0);

    } catch (e) {
        console.error("Error fetching", e);
    }
}
checkApi();
