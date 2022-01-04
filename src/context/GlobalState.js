import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';
import { getTokenFromUrl } from '../Auth/Spotify';
import axios from 'axios';
// initial state
const initialState = {
	token: localStorage.getItem('token'),
	login: localStorage.getItem('token') ? true : false,
	tracks: null,
	albums: null,
	artists: null,
	loading: true,
	play: '',
	status: '',
	device: null,
	playingInfo: null,
	position: 0,
	song: '',
	artist: null,
	userTop: null,
	feature: null,
	newReleases: null,
	categories: null,
	topTrackArtist: null,
	relatedArtists: null,
	progress_ms: 0,
};

// create context
export const GlobalContext = createContext(initialState);
// provider component

export const GlobalProvider = ({ children }) => {
	const [state, dispatch] = useReducer(AppReducer, initialState);
	const _token = getTokenFromUrl(window.location.hash);

	const isLogin = () => {
		if (_token.access_token) {
			const expiryTime = new Date().getTime() + _token.expires_in * 1000;
			localStorage.setItem('token', _token.access_token);
			localStorage.setItem('expiry_time', expiryTime);
			window.history.pushState({}, null, '/');
			window.location.reload();
		}
	};

	const getDevice = async (token) => {
		try {
			await axios.get(`https://api.spotify.com/v1/me/player/devices`, {
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'application/json',
				},
			});
			// console.log(data);
		} catch (error) {
			console.log('getDevice', error);
		}
	};

	const handleSearch = async (e) => {
		try {
			const data = await axios.get(
				`https://api.spotify.com/v1/search?q=${e}&type=track%2Cartist%2Calbum&limit=5&offset=0`,
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem(
							'token'
						)}`,
						'Content-Type': 'application/json',
					},
				}
			);
			const sortByPopularity = (data) =>
				data.sort((firstEl, secondEl) => {
					return secondEl.popularity - firstEl.popularity;
				});

			dispatch({
				type: 'ALBUMS',
				payload: sortByPopularity(data.data.albums.items),
			});

			dispatch({
				type: 'ARTISTS',
				payload: data.data.artists.items,
			});

			dispatch({
				type: 'TRACKS',
				payload: sortByPopularity(data.data.tracks.items),
			});
		} catch (error) {
			console.log('handleSearch', error.message);
		}
	};

	const getCategory = async () => {
		try {
			const data = await axios.get(
				'	https://api.spotify.com/v1/browse/categories?country=ID&locale=id_ID&limit=10',
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem(
							'token'
						)}`,
						'Content-Type': 'application/json',
					},
				}
			);
			dispatch({
				type: 'CATEGORY',
				payload: await data.data.categories,
			});
		} catch (error) {
			console.log(error);
		}
	};

	const featuredPlaylists = async () => {
		try {
			const feature = await axios.get(
				'https://api.spotify.com/v1/browse/featured-playlists?limit=6',
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem(
							'token'
						)}`,
						'Content-Type': 'application/json',
					},
				}
			);
			dispatch({
				type: 'FEATURE',
				payload: feature.data,
			});
		} catch (error) {
			console.log(error);
		}
	};

	const getNewReleases = async () => {
		try {
			const top = await axios.get(
				'https://api.spotify.com/v1/browse/new-releases?country=ID&limit=4',
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem(
							'token'
						)}`,
						'Content-Type': 'application/json',
					},
				}
			);
			dispatch({
				type: 'NEW_RELEASES',
				payload: top.data,
			});
		} catch (error) {
			console.log(error);
		}
	};

	async function GetTopUserItems() {
		try {
			const top = await axios.get(
				'https://api.spotify.com/v1/me/top/tracks',
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem(
							'token'
						)}`,
						'Content-Type': 'application/json',
					},
				}
			);
			dispatch({
				type: 'USER_TOP',
				payload: top.data,
			});
		} catch (error) {
			console.log(error);
		}
	}

	async function getTopTrackArtist(id) {
		try {
			const topTrack = await axios.get(
				`https://api.spotify.com/v1/artists/${id}/top-tracks?market=ID`,
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem(
							'token'
						)}`,
						'Content-Type': 'application/json',
					},
				}
			);
			dispatch({
				type: 'TOP_TRACK_ARTIST',
				payload: topTrack.data.tracks,
			});
		} catch (error) {
			console.log(error);
		}
	}

	const getRelatedArtists = async (id) => {
		try {
			const data = await axios.get(
				`https://api.spotify.com/v1/artists/${id}/related-artists?limit=4`,
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem(
							'token'
						)}`,
						'Content-Type': 'application/json',
					},
				}
			);
			dispatch({
				type: 'RELATED_ARTISTS',
				payload: data.data,
			});
		} catch (error) {
			console.log(error);
		}
	};

	// PLAYER
	const PlayTrack = async (type, id, url, position) => {
		try {
			await axios.put(
				`https://api.spotify.com/v1/me/player/play?device_id=${id}`,
				{
					uris: typeof url === 'string' ? [url] : url,
					offset: {
						position: 0,
					},
					position_ms: type === 'resume' ? position : 0,
				},
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem(
							'token'
						)}`,
						'Content-Type': 'application/json',
					},
				}
			);
			dispatch({
				type: 'RESUME',
				payload: true,
				status: 'play',
			});
		} catch (error) {
			console.log('PlayTrack', error);
		}
	};

	const pausedTrack = async (device, token) => {
		try {
			await axios.put(
				`https://api.spotify.com/v1/me/player/pause?device_id=${device}`,
				{ device_id: device },
				{
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`,
					},
				}
			);
			dispatch({
				type: 'PAUSE',
				payload: false,
				status: 'pause',
			});
		} catch (error) {
			console.log('pausedTrack', error.message);
		}
	};

	const playSong = (song) => {
		dispatch({
			type: 'SET_SONG',
			payload: song,
		});
	};

	const setPlay = (data) => {
		dispatch({
			type: 'PLAY',
			payload: data,
		});
	};

	const setPosition = (ms) => {
		dispatch({
			type: 'POSITION',
			payload: ms,
		});
	};

	const getPlaybackState = async (token) => {
		try {
			const data = await axios.get(
				`https://api.spotify.com/v1/me/player`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
						'Content-Type': 'application/json',
					},
				}
			);
			dispatch({
				type: 'PLAYING_INFO',
				payload: data.data.item,
			});
		} catch (error) {
			console.log('getPlaybackState', error);
		}
	};

	const transferPlayback = async (device_ids) => {
		try {
			const data = await axios.put(
				'https://api.spotify.com/v1/me/player',
				{ device_ids: [device_ids] },
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem(
							'token'
						)}`,
						'Content-Type': 'application/json',
					},
				}
			);
			console.log(data);
		} catch (error) {
			console.log('transferPlayback', error);
		}
	};

	const getArtist = async (id) => {
		try {
			const data = await axios.get(
				`https://api.spotify.com/v1/artists/${id}`,
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem(
							'token'
						)}`,
						'Content-Type': 'application/json',
					},
				}
			);
			dispatch({
				type: 'GET_ARTIST',
				payload: data.data,
			});
		} catch (error) {
			console.log('getArtist', error);
		}
	};

	const getCurrentlyPlaying = async () => {
		try {
			const data = await axios.get(
				'https://api.spotify.com/v1/me/player',
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem(
							'token'
						)}`,
						'Content-Type': 'application/json',
					},
				}
			);
			dispatch({
				type: 'PROGRESS_MS',
				payload: data.data.progress_ms,
			});
		} catch (error) {
			console.log('getCurrentlyPlaying', error);
		}
	};

	return (
		<GlobalContext.Provider
			value={{
				token: state.token,
				loading: state.loading,
				login: state.login,
				albums: state.albums,
				userTop: state.userTop,
				categories: state.categories,
				artists: state.artists,
				tracks: state.tracks,
				song: state.song,
				play: state.play,
				status: state.status,
				device: state.device,
				playingInfo: state.playingInfo,
				position: state.position,
				artist: state.artist,
				feature: state.feature,
				newReleases: state.newReleases,
				topTrackArtist: state.topTrackArtist,
				relatedArtists: state.relatedArtists,
				progress_ms: state.progress_ms,
				getTopTrackArtist,
				getNewReleases,
				getRelatedArtists,
				featuredPlaylists,
				setPosition,
				setPlay,
				isLogin,
				handleSearch,
				GetTopUserItems,
				getCategory,
				playSong,
				PlayTrack,
				getDevice,
				getPlaybackState,
				dispatch,
				pausedTrack,
				transferPlayback,
				getArtist,
				getCurrentlyPlaying,
			}}>
			{children}
		</GlobalContext.Provider>
	);
};
