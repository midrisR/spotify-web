import axios from 'axios';
const scopes = [
	'user-read-playback-position',
	'user-modify-playback-state',
	'user-read-email',
	'playlist-modify-private',
	'playlist-read-collaborative',
	'user-follow-read',
	'streaming',
	'user-read-playback-state',
	'user-read-recently-played',
	'user-read-currently-playing',
	'user-top-read',
];

export const getTokenFromUrl = () => {
	return window.location.hash
		.substring(1)
		.split('&')
		.reduce((initial, item) => {
			var parts = item.split('=');
			initial[parts[0]] = decodeURIComponent(parts[1]);
			return initial;
		}, {});
};
export const setAuthHeader = () => {
	try {
		const params = JSON.parse(localStorage.getItem('token'));
		if (params) {
			axios.defaults.headers.common[
				'Authorization'
			] = `Bearer ${params.access_token}`;
		}
	} catch (error) {
		console.log('Error setting auth', error);
	}
};
export const loginUrl = () => {
	window.location = `${process.env.REACT_APP_AUTHORIZE_URL}?client_id=${
		process.env.REACT_APP_CLIENT_ID
	}&redirect_uri=${process.env.REACT_APP_REDIRECT_URL}&scope=${scopes.join(
		'%20'
	)}&response_type=token&show_dialog=true`;
};

export const loginURI = () => {
	window.location = `${process.env.REACT_APP_AUTHORIZE_URL}?client_id=${
		process.env.REACT_APP_CLIENT_ID
	}&response_type=code&&show_dialog=true&redirect_uri=${
		process.env.REACT_APP_REDIRECT_URL
	}&scope=${scopes.join('%20')}`;
};
