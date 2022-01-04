import React, { useEffect, useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { FiPlay, FiPause, FiSkipBack, FiSkipForward } from 'react-icons/fi';
import { MdRepeat, MdShuffle } from 'react-icons/md';
import styled from 'styled-components';
import image from '../images/disc.jpg';
const Slider = styled.div`
	display: flex;
	position: relative;
	transition: height 0.3s ease 0s;
	z-index: 10;
	margin: 1rem 0;
`;

const Bar = styled.div`
	background-color: rgb(204, 204, 204);
	border-radius: 0px;
	box-sizing: border-box;
	height: 4px;
	position: relative;
	width: 100%;
`;

const Wrapper = styled.div`
	box-sizing: border-box;
	display: inline-block;
	padding: 0px;
	transition: height 0.4s ease 0s, width 0.4s ease 0s;
	height: 4px;
	width: 100%;
`;

const Progess = styled.div`
	width: ${(props) => props.widthPro || 0};
	background-color: rgb(17, 24, 39);
	border-radius: 0px;
	position: absolute;
	height: 100%;
	top: 0px;
`;

const ProgressBar = styled.div`
	left: ${(props) => props.left || 0};
	box-sizing: border-box;
	height: 4px;
	position: absolute;
	transition: height 0.4s ease 0s, width 0.4s ease 0s;
	bottom: 0%;
`;

const Span = styled.span`
	background-color: #fff;
	border: 0px;
	border-radius: 50%;
	box-sizing: border-box;
	display: block;
	position: absolute;
	transition: height 0.4s ease 0s, width 0.4s ease 0s;
	height: 10px;
	left: ${(props) => props.left || '5px'};
	top: -3px;
	width: 10px;
`;

const Playing = ({ url }) => {
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
		status,
	} = useContext(GlobalContext);

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

	const time = (data) => {
		return data.toFixed(1);
	};

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
						payload:
							state.track_window &&
							state.track_window.current_track,
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
		<div className='p-10 mx-auto'>
			<div className='overflow-hidden rounded-xl w-1/2 mx-auto'>
				{playingInfo !== null ? (
					<img
						src={playingInfo.album.images[0].url}
						alt={playingInfo.name}
					/>
				) : (
					<img src={image} alt='not playing' />
				)}
			</div>
			{playingInfo && (
				<div className='bar-info'>
					<p className='font-semibold text-white text-xl text-center my-2'>
						{playingInfo.name}
					</p>
					<p className='text-base font-semibold text-white text-center'>
						{playingInfo.artists[0].name}
					</p>
				</div>
			)}

			<Slider>
				<Wrapper>
					<Bar role='presentation'>
						{playingInfo !== null && (
							<>
								<Progess
									widthPro={
										progress_ms !== undefined
											? time(
													(progress_ms * 100) /
														playingInfo.duration_ms
											  ) + '%'
											: song !== url && 0
									}></Progess>
								<ProgressBar
									role='presentation'
									left={
										progress_ms !== undefined
											? time(
													(progress_ms * 100) /
														playingInfo.duration_ms
											  ) + '%'
											: song !== url && 0
									}>
									<Span
										tabIndex='0'
										role='slider'
										aria-label='slider handle'
										aria-orientation='horizontal'
										aria-valuemin='0'
										aria-valuenow='11.5'
										aria-valuemax='100'
										left={
											progress_ms !== undefined
												? time(
														(progress_ms * 100) /
															playingInfo.duration_ms
												  ) + '%'
												: song !== url && 0
										}></Span>
								</ProgressBar>
							</>
						)}
					</Bar>
				</Wrapper>
			</Slider>

			<div className='flex justify-center px-4 py-3 lg:py-0 mt-4'>
				<div className='w-full flex justify-between '>
					<MdRepeat color='#fff' size={22} />
					<FiSkipBack color='#fff' size={22} />
					{play ? (
						<FiPause onClick={handlePause} color='#fff' size={22} />
					) : (
						<FiPlay onClick={handlePause} color='#fff' size={22} />
					)}
					<FiSkipForward color='#fff' size={22} />
					<MdShuffle color='#fff' size={22} />
				</div>
			</div>
		</div>
	);
};

export default React.memo(Playing);
