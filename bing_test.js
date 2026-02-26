const { JSDOM } = require("jsdom");

async function fetchImage(query) {
    const url = `https://www.bing.com/images/search?q=${encodeURIComponent(query)}&form=HDRSC3`;
    console.log("Fetching: " + url);
    try {
        const response = await fetch(url, {
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
            }
        });
        const html = await response.text();
        const dom = new JSDOM(html);
        const imgTags = dom.window.document.querySelectorAll("a.iusc");

        for (let a of imgTags) {
            const mData = a.getAttribute("m");
            if (mData) {
                try {
                    const parsed = JSON.parse(mData);
                    if (parsed.murl) {
                        return parsed.murl;
                    }
                } catch (e) { }
            }
        }
        return null;
    } catch (e) {
        console.error(e);
        return null;
    }
}

fetchImage("3616305254443 MEXX-Black For Her 2pc Gift Set EDP").then(res => console.log("Result:", res));
