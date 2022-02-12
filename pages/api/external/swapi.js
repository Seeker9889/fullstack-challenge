import cache from 'memory-cache'
import axios from 'axios'
import {apiError} from '../models/error'

const root = 'https://swapi.dev/api/'

let getByIdUrl = (service, id) => root + service + '/' + id
let getAllUrl = (service) => root + service
let searchUrl = (service, term, page) => root + service + '/?search=' + term + '&page=' + page

async function callSwapi(req) {
	try {
		console.log(req)
		const res = await axios.get(req)
		return res.data
	} catch(ex) {
		console.log(ex)
		return apiError(ex)
	}
}

async function getChildren(urls) {
	let result = []
	if (!urls || urls.length < 1) {
		return result
	}
	
	for (const url of urls) {
		const res = await callSwapi(url)
		if (res && !res.isError) {
			result.push(res)
		}
	}
	
	return result
}

export async function person(id) {
	const req = getByIdUrl('people', id)
	return await callSwapi(req)
}

export async function searchPeople(unsanitizedTerm, page=1) {
	const regex = /[^a-zA-Z0-9-]/g
	const term = unsanitizedTerm.replace(regex,'')
	const req = searchUrl('people', term, page)
	return await callSwapi(req)
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