import styles from '../styles/Home.module.css'
import Link from 'next/link'

export default function ProfileDisplay({profileSelection}) {
	console.log(profileSelection)
	const makeMultilineEl = (group) => {
		let output = []
		for (let i of group) {
			output.push(<span>{i}</span>)
			output.push(<br/>)
		}
		if (output.length === 0) {
			output.push(<span>None</span>)
		}
		return output
	}
	
	if (!profileSelection) {
		return(
			<div className={styles['profile-area']}>
				<div className={styles['profile-message']}>
				Search below
				</div>
			</div>
	)}
	else {
		const speciesEl = (profileSelection.species.length > 0 
		? (
			  <td className={styles['profile-datum']}>{profileSelection.species.join(', ')}</td>
		)
		: (
			  <td className={styles['profile-datum']}>
			  Human {' '}
			  (
			  <Link href="https://github.com/Juriy/swapi/issues/5#issuecomment-1036982287">
			  <a target="_blank" rel="noopener noreferrer">default</a>
			  </Link>
			  )
			  </td>
		))
		
		let filmEl = []
		for (let i of profileSelection.films) {
			filmEl.push(<span>{i}</span>)
			filmEl.push(<br/>)
		}
		
		return(
			<div className={styles['profile-area']}>
	<table className={styles['profile-card']}>
			  <tr>
			  <td>Name:</td>
			  <td className={styles['profile-datum']}>{profileSelection.name}</td>
			  </tr>
			  <tr>
			  <td>Birth Year:</td>
			  <td className={styles['profile-datum']}>{profileSelection.dob}</td>
			  </tr>
			  <tr>
			  <td>Height:</td>
			  <td className={styles['profile-datum']}>{profileSelection.height} {' '}cm</td>
			  </tr>
			  <tr>
			  <td>Weight:</td>
			  <td className={styles['profile-datum']}>{profileSelection.weight} {' '}kg</td>
			  </tr>
			  <tr>
			  <td>Hair Color:</td>
			  <td className={styles['profile-datum']}>{profileSelection.hairColor}</td>
			  </tr>
			  <tr>
			  <td>Species:</td>
			  {speciesEl}
			  </tr>
			  <tr>
			  <td>Film Appearances:</td>
			  {makeMultilineEl(profileSelection.films)}
			  </tr>
			  <tr>
			  <td>Ships Piloted:</td>
			  {makeMultilineEl(profileSelection.ships)}
			  </tr>
		    </table>
			</div>
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