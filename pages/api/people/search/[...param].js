import * as constants from '../../../../models/constants'
import {searchPeople} from '../../../../gateway/swapi'
import {logDebug} from '../../../../util/logger'

/*
Example request and response:
GET: http://localhost:3000/api/people/search/a/1
RESPONSE: {
    "next": "https://swapi.dev/api/people/?search=a&page=2",
    "results": [{
            "name": "Luke Skywalker",
            "height": "172",
            "weight": "77",
            "hairColor": "blond",
            "dob": "19BBY"
        }, {
            "name": "Darth Vader",
            "height": "202",
            "weight": "136",
            "hairColor": "none",
            "dob": "41.9BBY"
        }, 
		...
    ]
}
*/
export default async function handler(req, res) {
	const { query, method } = req
	if (req.method !== 'GET') {
		res.setHeader('Allow', ['GET'])
		return res.status(constants.METHOD_NOT_ALLOWED).end(method + ' not allowed')
	}
	const param = query.param
	logDebug(param)
	if (param.length < 1 || param[0].length < 1) {
		return res.status(constants.BAD_REQUEST).end('Search needs at least a one-character term')
	}
	const term = param[0]
	let page = 1
	if (param.length > 1 ) {
		const pageInt = parseInt(param[1])
		if (Number.isInteger(pageInt)) {
			page = parseInt(pageInt)
		}
	}
	logDebug(`Searching people for term:"${term}" page:${page}`)
	const result = await searchPeople(term, page)
	logDebug(`People search for term:"${term}" page:${page} yielded ${JSON.stringify(result)}`)
	
	res.status(constants.SUCCESS).json(result)
}
