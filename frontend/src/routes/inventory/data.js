const colors = ["tomato", "gold", "lime green"];

export const visits = {
    title: "Unique visitors",
    type: "line",
    backgroundColor: colors[0],
    labels: ["January", "February", "March", "April", "May", "June"],
    data: [275, 254, 261, 279, 262, 268]
};

export const pages = {
    title: "Top pages",
    type: "bar",
    backgroundColor: colors[0],
    labels: ["/gallery", "/blog", "/about", "/pricing", "/contact"],
    data: [220, 176, 132, 88, 44]
};

export const referrers = {
    title: "Top referrers",
    type: "bar",
    backgroundColor: colors[0],
    labels: ["google", "twitter", "facebook", "linkedin", "dev.to"],
    data: [23, 14, 6, 5, 2]
};

export const os = {
    title: "OS usage",
    type: "doughnut",
    backgroundColor: colors,
    labels: ["Win", "MacOS", "Linux"],
    data: [400, 100, 200]
};

export const browsers = {
    title: "Browser usage",
    type: "doughnut",
    backgroundColor: colors,
    labels: ["Chrome", "Firefox", "Safari"],
    data: [240, 100, 60]
};

export const devices = {
    title: "Device usage",
    type: "doughnut",
    backgroundColor: colors,
    labels: ["Phone", "Desktop"],
    data: [220, 260]
};