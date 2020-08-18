export function translate(block) {
    return block.split(" ").map(txt => {
        if(txt === "is"){
            return { original: txt, translated: "foo" }
        } else {
            return { original: txt }
        }
    })
}

export function escaped(str) {
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}