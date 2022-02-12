import {person, film, ship, peopleCount} from '../../pages/api/external/swapi'
import axios from 'axios'

// Data
const people10 = require('../data/people10')
const movie1 = require('../data/film1')
const ship2 = require('../data/ship2')
const people = require('../data/people')

// Setup
jest.mock('axios');

describe('shallow swapi call', () => {
	it('gets name from people endpoint', async () => {
		axios.get.mockResolvedValueOnce(people10)
		const res = await person(10)
		const name = res.name
		
		expect(axios.get).toHaveBeenCalledWith('https://swapi.dev/api/people/10');
		expect(name).toEqual('Obi-Wan Kenobi')
	})
	it('gets title from film endpoint', async () => {
		axios.get.mockResolvedValueOnce(movie1)
		const res = await film(1)
		const title = res.title
		
		expect(axios.get).toHaveBeenCalledWith('https://swapi.dev/api/films/1');
		expect(title).toEqual('A New Hope')
	})
	it('gets name from ship endpoint', async () => {
		axios.get.mockResolvedValueOnce(ship2)
		const res = await ship(2)
		const name = res.name
		
		expect(axios.get).toHaveBeenCalledWith('https://swapi.dev/api/starships/2');
		expect(name).toEqual('CR90 corvette')
	})
	it('throws error obj on failed call', async() => {
		axios.get.mockRejectedValueOnce()
		const res = await ship(2)
		expect(axios.get).toHaveBeenCalledWith('https://swapi.dev/api/starships/2');
		expect(res.isError).toEqual(true)
	})
	it('finds the number of people', async() => {
		axios.get.mockResolvedValueOnce(people)
		const res = await peopleCount()
		expect(axios.get).toHaveBeenCalledWith('https://swapi.dev/api/people');
		expect(res).toEqual(82)
	})
})

describe('deep swapi call', () => {
	it('gets full profile from profile endpoint', async () => {
		axios.get.mockResolvedValueOnce(people10)
		const res = await person(10)
		const name = res.name
		
		expect(axios.get).toHaveBeenCalledWith('https://swapi.dev/api/people/10');
		expect(name).toEqual('Obi-Wan Kenobi')
	})
})