import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import axios from 'axios'
import Searchbar from '../components/searchbar'
import ProfileDisplay from '../components/profiledisplay'
import Tray from '../components/tray'
import styles from '../styles/Home.module.css'
import { useState } from 'react'

export default function Home() {
	
  const [searchResults, setSearchResults] = useState('')
  const [profileSelection, setProfileSelection] = useState('')
  
  let searchController = new AbortController();
  let profileController = new AbortController();
  const onPageIncrement = async (newPage) => {
	  
  }
  const onTermUpdate = async (term) => {
	  searchController.abort()
	  searchController = new AbortController();
	  if (term && term.length > 0) {
		  try {
			  const searchResults = await axios.get('/api/people/search/' + term, {
				  signal: searchController.signal
			  })
			  if (searchResults && searchResults.data) {
				  setSearchResults(searchResults.data)
			  }
		  } catch (ex) {
			  // Treat as empty search bar 
		  }
	  }
	  else {
		  setSearchResults(null)
	  }
  }
  const onPersonSelect = async (personId) => {
	  if (personId && personId > 0) {
		  try {
			  const profileSelection = await axios.get('/api/profile/' + personId, {
				  signal: profileController.signal
			  })
			  //console.log(profileSelection)
			  if (profileSelection && profileSelection.data) {
				  setProfileSelection(profileSelection.data)
			  }
		  } catch (ex) {
			  // Treat as empty search bar 
		  }
	  }
	  else {
		  profileController.abort()
		  profileController = new AbortController();
		  setProfileSelection(null)
	  }
  }
  
  return (
    <div className={styles.container}>
      <Head>
        <title>SWAPI Profile Search</title>
        <meta name="description" content="SWAPI Interface in Next.js" />
        <link rel="icon" href="swapi-favicon.png" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          SWAPI Profile Search
        </h1>
		<ProfileDisplay profileSelection={profileSelection} />
		<Tray searchResults={searchResults} onPageIncrement={onPageIncrement} onPersonSelect={onPersonSelect} />
      </main>

      <div className={styles['search-area']}>
	    <Searchbar onTermUpdate={onTermUpdate}/>
      </div>
      <footer className={styles.footer}>
	    <div className={styles['footer-contents']}>
	      Powered by:
		  <Link href="https://swapi.dev/">
            <a target="_blank" rel="noopener noreferrer">SWAPI</a>
		  </Link>
		  |
		  <Link href="https://nextjs.org/">
            <a target="_blank" rel="noopener noreferrer">Next.js</a>
		  </Link>
		  |
		  <Link href="https://www.npmjs.com/package/memory-cache">
            <a target="_blank" rel="noopener noreferrer">memory-cache</a>
		  </Link>
		</div>
      </footer>
    </div>
  )
}
