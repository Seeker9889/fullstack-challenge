export function apiError(ex) {
	return {
		isError: true,
		msg: 'API Communication Error',
		ex: ex
	}
}