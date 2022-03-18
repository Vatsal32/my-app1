export default async function handler(req, res) {
    const cur = new Date();
    const array  = [[], [], []];
    await fetch("https://assessment.api.vweb.app/rides", {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'get',
    }).then(res => res.json()).then(result => {
        result.forEach((item) => {

            item.station_path.unshift(item.origin_station_code);
            item.station_path.push(item.destination_station_code);

            const it = new Date(item.date);
            if (cur.getDate() === it.getDate() && cur.getMonth() === it.getMonth() && cur.getFullYear() === it.getFullYear()) {
                array[0].push(item);
            } else if (cur.getFullYear() <= it.getFullYear() && cur.getMonth() <= it.getMonth() && cur.getDate() < it.getDate()) {
                array[1].push(item);
            } else {
                array[2].push(item);
            }
        })

        res.status(200).json({data: array});
    }).catch(console.log);
};