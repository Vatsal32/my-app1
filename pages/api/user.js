export default async function handler(req, res) {
    await fetch("https://assessment.api.vweb.app/user", {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'get',
    }).then(res => res.json()).then(result => res.status(200).json(result));
};