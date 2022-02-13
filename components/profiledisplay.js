import styles from '../styles/Home.module.css'

export default function ProfileDisplay({profileSelection}) {
console.log(profileSelection)
	if (!profileSelection) {
		return(
			<div className={styles.grid}>
			  Waiting for selection
			</div>
	)}
	else {
		return(
			<div className={styles.grid}>
				{profileSelection.name}
			</div>
	)}
}