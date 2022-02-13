export function logDebug(toLog) {
	if (process.env.IS_DEV == 'true') {
		console.log(toLog)
	}
}

export function logApi(toLog) {
	if (process.env.IS_DEV == 'true') {
		console.log(toLog)
	}
}