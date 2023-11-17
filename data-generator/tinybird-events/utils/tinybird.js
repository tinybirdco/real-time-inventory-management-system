import fs from "fs";


// function that reads in .tinyb file and returns the token
export async function read_tinyb_config(path) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, "utf8", (err, jsonString) => {
            if (err) {
                console.log("File read failed. Try reauthenticating with the Tinybird CLI:", err);
                reject(err);
            }
            const token = JSON.parse(jsonString).token;
            resolve(token);
        });
    });
}

export async function send_data_to_tinybird(name, token, payload) {
    const events_url = "https://api.tinybird.co/v0/events?name=";

    try {
        const response = await fetch(events_url + name, {
            method: "POST",
            body: payload,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return await response.json();
    } catch (error) {
        console.error(error);
        throw error; // Rethrow to allow external handling
    }
}