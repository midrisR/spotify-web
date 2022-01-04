import React, { useContext, useEffect } from 'react';
import { GlobalContext } from '../context/GlobalState';
import Tracks from '../components/Tracks';
import Artists from '../components/Artists';
const Search = () => {
	const { handleSearch, artists, tracks, relatedArtists, getRelatedArtists } =
		useContext(GlobalContext);

	useEffect(() => {
		if (artists !== null) {
			getRelatedArtists(artists[0].id);
		}
		// eslint-disable-next-line
	}, [artists]);
	return (
		<>
			<div className='group items-center ml-0 md:ml-8 relative w-full flex lg:w-72 '>
				<svg
					className='absolute fill-current h-4 hidden left-0 ml-4 pointer-events-none text-gray-500 w-4 group-hover:text-gray-400 sm:block'
					xmlns='http://www.w3.org/2000/svg'
					viewBox='0 0 20 20'>
					<path d='M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z' />
				</svg>
				<input
					type='text'
					className='bg-gray-900 block leading-normal pl-10 py-1.5 pr-4 ring-opacity-90 rounded-2xl text-gray-400 w-full focus:border-transparent focus:outline-none focus:ring-1 focus:ring-blue-500'
					placeholder='Search'
					onChange={(e) => handleSearch(e.target.value)}
				/>
			</div>
			<div className='md:flex md:flex-wrap justify-center px-5 md:px-1 lg:px-6'>
				{artists !== null && (
					<div className='w-full md:w-2/5'>
						<Artists artists={artists} />
					</div>
				)}
				{tracks !== null && (
					<div className='w-full md:w-3/5'>
						<div className='flex justify-between mb-1 lg:mb-4 items-center px-1 mt-3'>
							<h1 className='text-white text-xl font-bold uppercase lg:px-4'>
								Songs
							</h1>
							<span className='text-white text-xs font-semibold uppercase'>
								see all
							</span>
						</div>
						<Tracks tracks={tracks} />
					</div>
				)}
			</div>
			{relatedArtists !== null && (
				<>
					<h1 className='text-white font-bold text-2xl mt-4 px-4'>
						Related Artists
					</h1>
					<div className='flex flex-wrap'>
						{relatedArtists.artists.slice(0, 4).map((artist, i) => (
							<div className='w-1/2 md:w-1/4 p-2 md:p-3' key={i}>
								<div className='overflow-hidden rounded-2xl'>
									<img
										src={artist.images[1].url}
										alt={artist.name}
									/>
								</div>

								<p className='text-white text-xl font-bold my-3 px-2'>
									{artist.name}
								</p>
							</div>
						))}
					</div>
				</>
			)}
		</>
	);
};
export default Search;
