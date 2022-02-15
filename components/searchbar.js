import { useCallback, useState} from 'react'
import styles from '../styles/Home.module.css'

export default function Searchbar({onTermUpdate}) {
	
	const [term, setTerm] = useState('')
	
	let onSearchUpdate = onTermUpdate
	
	const onChange = useCallback((ev) => {
		const term = ev.target.value
		setTerm(term)
		onSearchUpdate(term)
	}, [])
	
	return(
	  <div>
	    <input
		  className={styles['search-box']}
		  onChange={onChange}
		  placeholder='Search profiles'
		  type='text'
		  value={term}
		/>
	  </div>
	)
}