import cache from 'memory-cache'
import axios from 'axios'
import * as constants from '../models/constants'
import {apiError} from '../models/error'
import {logApi} from '../util/logger'

const root = process.env.SWAPI_ROOT

// Remove all but digits
const idRegex = /[^0-9]/g
const getId = (input) => input.toString().replace(idRegex,'')

// Remove all but letters, digits, and - for, e.g., R2-D2
const searchRegex = /[^a-zA-Z0-9-]/g
const sanitizeSearch = (input) => input.toString().replace(searchRegex,'')

const getByIdUrl = (service, unsanitizedId) => root + service + '/' + getId(unsanitizedId)
const getAllUrl = (service) => root + service
const searchUrl = (service, unsanitizedTerm, page) => root + service + '/?search=' + sanitizeSearch(unsanitizedTerm) + '&page=' + page


async function callSwapi(req) {
	try {
		const res = await axios.get(req)
		return res.data
	} catch(ex) {
		console.log(ex)
		return apiError(ex)
	}
}


// Cache children (ships, species, films) responses for SWAPI_CACHE_TIMEOUT, default 5 min
async function getChildren(urls) {
	const result = []
	if (!urls || urls.length < 1) {
		return result
	}
	
	for (const url of urls) {
		const cacheRes = cache.get(url)
		if (cacheRes) {
			result.push(cacheRes)
		} else {
			const res = await callSwapi(url)
			if (res && !res.isError) {
				cache.put(url, res, constants.SWAPI_CACHE_TIMEOUT)
				result.push(res)
			}
		}
	}
	
	return result
}

export async function person(id) {
	const req = getByIdUrl('people', id)
	return await callSwapi(req)
}

export async function searchPeople(unsanitizedTerm, page=1) {
	const req = searchUrl('people', unsanitizedTerm, page)
	const rawResult = await callSwapi(req)
	
	const result = {
		next: rawResult.next,
		results: rawResult.results.map(x => ({ //Parens for object literal in lambda
			name: x.name,
			height: x.height,
			weight: x.mass,
			hairColor: x.hair_color,
			dob: x.birth_year,
			id: getId(x.url) // e.g. get "3" from "https://swapi.dev/api/people/3/"
		}))
	}
	
	return result
}

export async function profile(id) {
	const profilePerson = await person(id);
	if (!profilePerson || !profilePerson.name) {
		return apiError('No person found for profile')
	}
	
	const speciesUrls = await getChildren(profilePerson.species)
	const profileSpecies = speciesUrls.filter(s => !!s.name).map(s => s.name)
	
	const filmsUrls = await getChildren(profilePerson.films)
	const profileFilms = filmsUrls.filter(f => !!f.title).map(f => f.title)
	
	const shipsUrls = await getChildren(profilePerson.starships)
	const profileShips = shipsUrls.filter(s => !!s.name).map(s => s.name)
	
	const profile = {
		name: profilePerson.name,
		height: profilePerson.height,
		weight: profilePerson.mass,
		hairColor: profilePerson.hair_color,
		dob: profilePerson.birth_year,
		species: profileSpecies,
		films: profileFilms,
		ships: profileShips
	}
	
	return profile
}


// Outside MVP
export async function ship(id) {
	const req = getByIdUrl('starships', id)
	return await callSwapi(req)
}

export async function film(id) {
	const req = getByIdUrl('films', id)
	return await callSwapi(req)
}

export async function species(id) {
	const req = getByIdUrl('species', id)
	return await callSwapi(req)
}

export async function peopleCount() {
	const req = getAllUrl('people')
	const data = await callSwapi(req)
	if (data && data.isError) {
		return data
	}
	if (!data || !data.count) {
		return apiError('No people found')
	}
	return data.count
}