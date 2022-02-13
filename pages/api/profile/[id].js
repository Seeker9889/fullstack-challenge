import * as constants from '../../../models/constants'
import {profile} from '../../../gateway/swapi'
import {logDebug} from '../../../util/logger'

/*
Example request and response:
GET: http://localhost:3000/api/profile/20
RESPONSE: {
    "name": "Yoda",
    "height": "66",
    "weight": "17",
    "hairColor": "white",
    "dob": "896BBY",
    "species": ["Yoda's species"],
    "films": ["The Empire Strikes Back", "Return of the Jedi", "The Phantom Menace", "Attack of the Clones", "Revenge of the Sith"],
    "ships": []
}
*/
export default async function useHandler(req, res) {
	const { query: { id }, method } = req
	if (method !== 'GET') {
		res.setHeader('Allow', ['GET'])
		return res.status(constants.METHOD_NOT_ALLOWED).end(method + ' not allowed')
	}
	
	const result = await profile(id)
	logDebug(`Profile search for id:${id} yielded ${JSON.stringify(result)}`)
	
	res.status(constants.SUCCESS).json(result)
}
