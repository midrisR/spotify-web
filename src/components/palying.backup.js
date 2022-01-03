import React, { useEffect, useContext, useCallback } from 'react';
import { GlobalContext } from '../context/GlobalState';
import Marquee from 'react-fast-marquee';
import useWindowDimensions from '../helpers/getWindowDimensions';
import { FiPlay, FiPause, FiSkipBack, FiSkipForward } from 'react-icons/fi';

import Device from './device';
import {
	MdOutlineDevices,
	MdFormatIndentIncrease,
	MdMicNone,
	MdOutlineVolumeUp,
	MdRepeat,
	MdShuffle,
} from 'react-icons/md';

// Setting the spotifyApi, so that we can use it's functions

const Playing = ({ url }) => {
	console.log(url);
	const [open, setOpen] = React.useState(false);
	const [interval, SetInterval] = React.useState(undefined);
	const {
		PlayTrack,
		song,
		dispatch,
		device,
		playingInfo,
		play,
		setPlay,
		pausedTrack,
		position,
		setPosition,
		getCurrentlyPlaying,
		progress_ms,
		getDevice,
	} = useContext(GlobalContext);

	const { width } = useWindowDimensions();

	const handlePause = () => {
		play
			? pausedTrack(device, localStorage.getItem('token'))
			: PlayTrack('resume', device, url, position);
	};

	const tick = () => {
		if (localStorage.getItem('token')) {
			getCurrentlyPlaying(localStorage.getItem('token'));
		}
	};

	const handleOpen = useCallback(() => {
		setOpen((state) => !state);
	}, []);

	useEffect(() => {
		const scriptTag = document.getElementById('spotify-player');
		getDevice(localStorage.getItem('token'));
		if (!scriptTag) {
			const script = document.createElement('script');
			script.id = 'spotify-player';
			script.type = 'text/javascript';
			script.defer = true;
			script.src = 'https://sdk.scdn.co/spotify-player.js';
			script.async = true;
			document.body.appendChild(script);

			window.onSpotifyWebPlaybackSDKReady = () => {
				const player = new window.Spotify.Player({
					name: 'Web Playback',
					getOAuthToken: (cb) => {
						cb(localStorage.getItem('token'));
					},
					volume: 0.5,
				});

				player.addListener('ready', ({ device_id }) => {
					dispatch({
						type: 'DEVICE',
						payload: device_id,
					});
				});

				player.addListener('player_state_changed', (state) => {
					dispatch({
						type: 'PLAYING_INFO',
						payload: state.track_window.current_track,
					});
					setPosition(state.position);
					setPlay(!state.paused);
				});
				player.connect();
			};
		}
		getCurrentlyPlaying(localStorage.getItem('token'));
		if (song) PlayTrack('play', device, url, 0);

		SetInterval(() =>
			setInterval(() => {
				tick();
			}, 5000)
		);
		return () => {
			clearInterval(interval);
		};
		// eslint-disable-next-line
	}, [song]);
	return (
		<div className='w-full p-3 bg-gray-900 fixed bottom-0 text-white px-10'>
			<div className='progress'>
				{playingInfo !== null && (
					<div
						className='progress__bar'
						style={{
							width:
								progress_ms !== undefined
									? (progress_ms * 100) /
											playingInfo.duration_ms +
									  '%'
									: 0,
							transition: 'width 2s',
						}}></div>
				)}
			</div>
			<div className='flex flex-col lg:flex-row items-center'>
				<div className='w-full lg:w-1/3 flex items-center'>
					{playingInfo !== null && (
						<img
							src={playingInfo.album.images[0].url}
							alt={playingInfo.name}
							width='48'
						/>
					)}
					{playingInfo && (
						<div className='ml-2 w-full'>
							{width <= 720 ? (
								<Marquee gradient={false}>
									<p className='mx-3 text-xs lg:text-base'>
										{playingInfo.name}
									</p>
								</Marquee>
							) : (
								<p className='font-semibold'>
									{playingInfo.name}
								</p>
							)}
							<span className='text-xs font-semibold'>
								{playingInfo.artists[0].name}
							</span>
						</div>
					)}
				</div>
				<div className='w-full lg:w-1/3 flex justify-center px-4 py-3 lg:py-0'>
					<div className='w-full lg:w-1/2 flex justify-between'>
						<MdRepeat size='14' />
						<FiSkipBack size='14' />
						{play ? (
							<FiPause size='14' onClick={handlePause} />
						) : (
							<FiPlay size='14' onClick={handlePause} />
						)}
						<FiSkipForward size='14' />
						<MdShuffle size='14' />
					</div>
				</div>
				<div className='w-full lg:w-1/3 flex justify-end'>
					<div className='w-full lg:w-1/2 flex items-center justify-between py-2 px-4'>
						<MdMicNone size='18' />
						<MdFormatIndentIncrease size='18' />
						<MdOutlineDevices size='18' onClick={handleOpen} />
						<MdOutlineVolumeUp size='18' />
					</div>
				</div>
			</div>
			<Device open={open} setOpen={handleOpen} />
		</div>
	);
};

export default React.memo(Playing);
