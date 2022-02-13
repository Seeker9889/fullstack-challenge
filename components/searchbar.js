import { useCallback, useState} from 'react'

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
		  onChange={onChange}
		  placeholder='Search profiles'
		  type='text'
		  value={term}
		/>
	  </div>
	)
}