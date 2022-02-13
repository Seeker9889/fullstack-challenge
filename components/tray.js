import React, { useState, useRef, useCallback } from 'react'
import styles from '../styles/Home.module.css'

export default function Tray({searchResults, onPageIncrement, onPersonSelect}) {

	if (!searchResults || searchResults.results.length < 1) {
		return(
			<div>
			  No results
			</div>
	)}
	else {
		return(
			<ul className={styles['tray']}>
			{searchResults.results.map( (person) => (
			  <li 
			  className={styles['tray-options']}
			  onClick={() => onPersonSelect(person.id)}
			  >
			  {person.name}
			  </li>
			))}
			</ul>
	)}
}