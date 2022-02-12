import cache from 'memory-cache'
import axios from 'axios'
import {error} from '../models/error'

const root = 'https://swapi.dev/api/'

let getByIdUrl = (service, id) => root + service + '/' + id
let getAllUrl = (service) => root + service

async function callSwapi(req) {
	try {
		const res = await axios.get(req)
		return res.data
	} catch(ex) {
		console.log(ex)
		return error(ex)
	}
}

export async function person(id) {
	const req = getByIdUrl('people', id)
	return await callSwapi(req)
}

export async function peopleCount() {
	const req = getAllUrl('people')
	const data = await callSwapi(req)
	if (data && data.isError) {
		return data
	}
	if (!data || !data.count) {
		return error('No people found')
	}
	return data.count
}

export async function ship(id) {
	const req = getByIdUrl('starships', id)
	return await callSwapi(req)
}

export async function film(id) {
	const req = getByIdUrl('films', id)
	return await callSwapi(req)
}