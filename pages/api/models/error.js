export function error(ex) {
	return {
		isError: true,
		msg: 'API Communication Error',
		ex: ex
	}
}