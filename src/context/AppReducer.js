// eslint-disable-next-line
export default (state, action) => {
	switch (action.type) {
		case 'ALBUMS':
			return {
				...state,
				albums: action.payload,
				loading: false,
			};
		case 'USER_TOP':
			return {
				...state,
				userTop: action.payload,
				loading: false,
			};
		case 'CATEGORY':
			return {
				...state,
				categories: action.payload,
				loading: false,
			};
		case 'TOP_TRACK_ARTIST':
			return {
				...state,
				topTrackArtist: action.payload,
			};
		case 'FEATURE':
			return {
				...state,
				feature: action.payload,
			};
		case 'NEW_RELEASES':
			return {
				...state,
				newReleases: action.payload,
			};
		case 'RELATED_ARTISTS':
			return {
				...state,
				relatedArtists: action.payload,
			};
		case 'ARTISTS':
			return {
				...state,
				artists: action.payload,
				loading: false,
			};
		case 'TRACKS':
			return {
				...state,
				tracks: action.payload,
				loading: false,
			};
		case 'SET_SONG':
			return {
				...state,
				song: action.payload,
			};
		case 'PLAY':
			return {
				...state,
				play: action.payload,
			};
		case 'RESUME':
			return {
				...state,
				play: action.payload,
				status: action.status,
			};
		case 'PAUSE':
			return {
				...state,
				play: action.payload,
				status: action.status,
			};
		case 'POSITION':
			return {
				...state,
				position: action.payload,
			};
		case 'PROGRESS_MS':
			return {
				...state,
				progress_ms: action.payload,
			};
		case 'DEVICE':
			return {
				...state,
				device: action.payload,
			};
		case 'URL':
			return {
				...state,
				url: action.payload,
			};
		case 'PLAYING_INFO':
			return {
				...state,
				playingInfo: action.payload,
			};
		case 'GET_ARTIST':
			return {
				...state,
				artist: action.payload,
				loading: false,
			};
		case 'LOGIN':
			return {
				...state,
				login: localStorage.setItem('login', action.login),
			};

		default:
			return state;
	}
};
