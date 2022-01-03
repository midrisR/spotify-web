import React, { useContext, useState } from 'react';
import { GlobalContext } from '../context/GlobalState';
import ToMinutes from '../helpers/ToMinutes';
import { FiPlayCircle, FiPause } from 'react-icons/fi';
import ScaleLoader from 'react-spinners/ScaleLoader';

const Tracks = ({ tracks }) => {
	const { playSong, song, play } = useContext(GlobalContext);
	const [icon, setIcon] = useState(false);

	const onHover = (id) => {
		setIcon((prevState) => ({
			[id]: !prevState[id],
		}));
	};
	const leaveHover = (id) => {
		setIcon((prevState) => ({
			[id]: !prevState[id],
		}));
	};
	return (
		<>
			<div className='pb-0 lg:pb-20 '>
				{tracks.map((track, i) => (
					<div
						key={i}
						className='flex justify-between items-center hover:bg-gray-900 hover:bg-opacity-40 hover:rounded-xl px-2 rounded-lg'
						onClick={() => playSong(track.uri)}
						onMouseEnter={() => onHover(i)}
						onMouseLeave={() => leaveHover(i)}>
						<div
							key={i}
							className='py-2 flex items-center text-white'>
							<div className='relative flex justify-center items-center overflow-hidden rounded-xl'>
								<img
									src={
										track.album.images[0]
											? track.album.images[0].url
											: 'https://djuragan.sgp1.digitaloceanspaces.com/djurkam/production/images/lodgings/5c53b6ccd8ae3.png'
									}
									alt={track.name}
									width='50'
								/>
								<div className='absolute'>
									{track.uri === song ? (
										play ? (
											<FiPause className='text-opacity-20 transition duration-700 ease-in-out' />
										) : (
											<FiPlayCircle
												size='24'
												className='text-opacity-20 transition duration-700 ease-in-out'
											/>
										)
									) : (
										icon[i] && (
											<FiPlayCircle
												size='24'
												className='text-opacity-20 transition duration-700 ease-in-out'
											/>
										)
									)}
								</div>
								<div className='absolute'></div>
							</div>
							<div className='overflow-hidden'>
								<p
									className={`${
										track.uri === song
											? 'text-active'
											: 'text-white'
									} ml-3 font-semibold text-sm`}>
									{track.name}
								</p>
								<p className='ml-3 text-white text-xs'>
									{track.artists[0].name}
								</p>
							</div>
						</div>
						<div className='text-white text-xs font-semibold flex item-center'>
							{track.uri === song && play && (
								<ScaleLoader
									color='#fff'
									width={2}
									height={15}
								/>
							)}
							<span className='ml-4 text-white'>
								{ToMinutes(track.duration_ms)}
							</span>
						</div>
					</div>
				))}
			</div>
		</>
	);
};

export default Tracks;
