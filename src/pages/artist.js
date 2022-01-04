import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalState';
import { ColorExtractor } from 'react-color-extractor';
import { MdVerified } from 'react-icons/md';
import Tracks from '../components/Tracks';
import { BsFillPlayFill, BsFillPauseFill } from 'react-icons/bs';
import styled from 'styled-components';
const Header = styled.div`
	background-image: linear-gradient(to left, ${(props) => props.color});
	border-radius: 1rem;
	position: relative;
	display: flex;
	align-items: center;
	padding: 2rem 1.5rem;
`;

const Artist = () => {
	const {
		artist,
		getArtist,
		topTrackArtist,
		getTopTrackArtist,
		playSong,
		device,
		playingInfo,
		PlayTrack,
		pausedTrack,
		position,
		play,
	} = useContext(GlobalContext);
	const [color, setColor] = useState([]);
	const { id } = useParams();
	const getColors = (colors) => {
		setColor(colors);
	};
	const handlePause = () => {
		play
			? pausedTrack(device, localStorage.getItem('token'))
			: PlayTrack('resume', device, playingInfo.uri, position);
	};
	function hexToRGB(hex, alpha) {
		let r = parseInt(hex.slice(1, 3), 16),
			g = parseInt(hex.slice(3, 5), 16),
			b = parseInt(hex.slice(5, 7), 16);

		if (alpha) {
			return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + alpha + ')';
		} else {
			return 'rgb(' + r + ', ' + g + ', ' + b + ')';
		}
	}
	useEffect(() => {
		getArtist(id);
		getTopTrackArtist(id);
		// eslint-disable-next-line
	}, []);

	const gradient = () => {
		const y = color.map((val) => hexToRGB(val, 0.9));
		return y.slice(3).toString();
	};
	const allUri = () => {
		const b = topTrackArtist.map((val) => {
			return val.uri;
		});
		return b;
	};

	return (
		<div className='w-full lg:w-8/12 bg-gray-800 py-6 px-6 rounded-3xl'>
			{artist && (
				<Header color={gradient(color)} className='w-full mx-auto'>
					<div className='w-full xs:block md:flex items-end'>
						<div className='sm:w-full md:w-auto overflow-hidden rounded-2xl'>
							<ColorExtractor getColors={getColors}>
								<img src={artist.images[1].url} alt='' />
							</ColorExtractor>
						</div>
						<div className='flex flex-col md:ml-6 mt-4 md:mt-0'>
							<div className='flex items-center'>
								<MdVerified color='#3b82f6' size={28} />
								<span className='text-white font-semibold ml-2'>
									Verified Artist
								</span>
							</div>
							<h1 className='text-white text-8xl lg:text-9xl font-black'>
								{artist.name}
							</h1>
							<p className='text-white text-base font-light ml-1 mt-2'>
								{artist.followers.total} Followers
							</p>
						</div>
					</div>
				</Header>
			)}
			{topTrackArtist !== null && (
				<div className='w-full'>
					<div className='flex items-center mt-6 px-4'>
						<div className='justify-center rounded-full bg-green-500 w-16 h-16 p-4 cursor-pointer'>
							{play ? (
								<BsFillPauseFill
									size={36}
									color='#fff'
									onClick={handlePause}
								/>
							) : (
								<BsFillPlayFill
									size={36}
									color='#fff'
									onClick={
										play !== ''
											? handlePause
											: () => playSong(allUri())
									}
								/>
							)}
						</div>
						<button className='ml-4 px-4 py-2 font-semibold text-sm text-white bg-transparent rounded-md border-white border-2 border-solid'>
							Follow
						</button>
					</div>
					<h1 className='text-white font-bold text-2xl my-3 ml-4'>
						Popular
					</h1>
					<Tracks tracks={topTrackArtist} />
				</div>
			)}
		</div>
	);
};

export default Artist;
