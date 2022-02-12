import {searchPeople, person, film, ship, species, peopleCount, profile} from '../../pages/api/external/swapi'
import axios from 'axios'

// Data
const people10 = require('../data/people10')
const movie1 = require('../data/film1')
const ship2 = require('../data/ship2')
const people = require('../data/people')
const species1 = require('../data/species1');

const malpeople100 = require('../data/mal-people100');
const malFilm15 = require('../data/mal-film15');
const malFilm16 = require('../data/mal-film16');
const malShip100 = require('../data/mal-ship100');
const malShip101 = require('../data/mal-ship101');

// Setup
//jest.mock('axios');

describe('shallow swapi call', () => {
	beforeEach(() => {
		axios.get.mockReset()
	})
	
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
	it('gets name from species endpoint', async () => {
		axios.get.mockResolvedValueOnce(species1)
		const res = await species(1)
		const name = res.name
		
		expect(axios.get).toHaveBeenCalledWith('https://swapi.dev/api/species/1');
		expect(name).toEqual('Human')
	})
	it('throws error obj on failed call', async() => {
		axios.get.mockRejectedValueOnce()
		// Swallow log to avoid showing expected exception
		const consoleLog = console.log
		console.log = () => {}
		const res = await ship(2)
		console.log = consoleLog
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
		axios.get.mockImplementation((url) => {
			switch (url) {
				case 'https://swapi.dev/api/people/100':
				case 'https://swapi.dev/api/people/100/':
					return Promise.resolve(malpeople100)
				case 'https://swapi.dev/api/species/1':
				case 'https://swapi.dev/api/species/1/':
					return Promise.resolve(species1)
				case 'https://swapi.dev/api/films/15':
				case 'https://swapi.dev/api/films/15/':
					return Promise.resolve(malFilm15)
				case 'https://swapi.dev/api/films/16':
				case 'https://swapi.dev/api/films/16/':
					return Promise.resolve(malFilm16)
				case 'https://swapi.dev/api/starships/100':
				case 'https://swapi.dev/api/starships/100/':
					return Promise.resolve(malShip100)
				case 'https://swapi.dev/api/starships/101':
				case 'https://swapi.dev/api/starships/101/':
					return Promise.resolve(malShip101)
				default:
					return Promise.reject(new Error('unexpected call to '+ url))
			}
		})
			
		const res = await profile(100)
		
		expect(axios.get).toHaveBeenCalledWith('https://swapi.dev/api/people/100');
		expect(res.name).toEqual('Malcolm Reynolds')
		expect(res.height).toEqual('188')
		expect(res.weight).toEqual('84')
		expect(res.hairColor).toEqual('blond')
		expect(res.dob).toEqual('2486')
		expect(res.species[0]).toEqual('Human')
		expect(res.films).toContain('Firefly Series')
		expect(res.films).toContain('Serenity')  // The ship
		expect(res.ships[0]).toEqual('Serenity') // The movie named after the ship
		expect(res.ships[1]).toEqual('Shuttle')
	})
})


describe('shallow swapi call', () => {
	beforeEach(() => {
		axios.get.mockReset()
	})
	
	it('gets name from people endpoint', async () => {
		const res = await searchPeople('wa')
		console.log(res)
	})
})