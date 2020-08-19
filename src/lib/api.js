export async function getDictionary() {
    const resp = await fetch("/api/dict");
    return resp.json();
}