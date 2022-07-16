// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import axios from "axios"

export default function handler(req, res) {
  axios.get(process.env.NEXT_PUBLIC_MP_API_AUTH).then( () => {
    res.json()
    console.log(req.query.code)

  })
}
