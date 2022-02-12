import hello from '../../pages/api/hello';

test('says hello', () => {
	const json = jest.fn()
	const status = jest.fn(() => {
		return {
			json
		}
	})
	const res = {
	  status
	}
	
	const req = {}
	hello(req, res)
	
	expect(json.mock.calls[0][0]).toEqual({ text: 'Hi!' })
})