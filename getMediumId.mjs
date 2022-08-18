import fetch from 'node-fetch'

const medkey = process.env.MEDIUM_KEY || ''

async function getMediumId() {
  console.log(medkey)
  await fetch(`https://api.medium.com/v1/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${medkey}`,
      "Content-Type": "application/json",
      Accept: "application/json",
      "Accept-Charset": "utf-8",
    },
  }).then(r => r.json()).then(r => console.log(r))
}

getMediumId();