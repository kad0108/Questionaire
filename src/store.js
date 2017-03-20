const KEY = 'questionaire'

// if(!window.sessionStorage.getItem(KEY)){
// 	let data = {
// 		formList: []
// 	};
// 	localStorage.setItem(KEY, JSON.stringify(data));
// }

export default {
	fetch () {
		return JSON.parse(window.sessionStorage.getItem(KEY) || '{}')
	},
	save (store) {
		window.sessionStorage.setItem(KEY, JSON.stringify(store))
	},
	del () {
		window.sessionStorage.removeItem(KEY);
	}
}