export async function sendEvents(events, dsName, dsAppendToken) {
    const date = new Date();
    events.forEach(ev => {
        ev.timestamp = date.toISOString().slice(0, 19)
    });
    const headers = {
        'Authorization': `Bearer ${dsAppendToken}`,
    };
    const url = 'https://api.tinybird.co/' // you may be on a different host
    const rawResponse = await fetch(`${url}v0/events?name=${dsName}`, {
        method: 'POST',
        body: events.map(JSON.stringify).join('\n'),
        headers: headers,
    });
    const content = await rawResponse.json();
    console.log(content);
}

export async function getTinybirdData(endpoint, params = {}) {
    const token = import.meta.env.VITE_TB_READ_TOKEN;
    const host = import.meta.env.VITE_TB_HOST;

    // const url = `https://${host}/v0/pipes/${endpoint}.json`

    let url = new URL(`https://${host}/v0/pipes/${endpoint}.json`)

    // Looping through the keys in the params object and adding them to the URL
    for (const key in params) {
        if (params.hasOwnProperty(key)) {
            url.searchParams.append(key, params[key]);
        }
    }

    const response = await fetch(url, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    const res = await response.json();

    if (response.ok) {
        return res.data;
    } else {
        throw new Error(res);
    }
}
