import React, { useState, useRef, useCallback } from 'react'
import styles from '../styles/Home.module.css'

export default function Tray({searchResults, onPageIncrement, onPersonSelect}) {

	if (!searchResults || searchResults.results.length < 1) {
		return(
			<div className={styles['tray']}>
			</div>
	)}
	else {
		return(
			<ul className={styles['tray']}>
			{searchResults.results.map( (person) => (
			  <li>
			  <button 
			  className={styles['tray-options']}
			  onClick={() => onPersonSelect(person.id)}>
			  <div className="flex-column">
			  <div className="d-inline-flex">
			  {person.name}
			  </div>
			  <div className="d-inline-flex">
			  {person.dob}
			  </div>
			  </div>
			  </button>
			  </li>
			))}
			</ul>
	)}
}


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