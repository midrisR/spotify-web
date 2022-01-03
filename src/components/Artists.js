import React from 'react';
import { Link } from 'react-router-dom';
const Artists = ({ artists }) => {
	return (
		<>
			<div className='flex justify-between items-center px-1 mb-0 lg:mb-6 mt-3'>
				<h1 className='text-white text-xl font-bold uppercase'>
					artist
				</h1>
			</div>
			<>
				<div className='artist-card flex lg:block w-5/6 rounded-xl'>
					{artists.length > 0 && (
						<Link to={`/artist/${artists[0].id}`}>
							<div className='overflow-hidden rounded-2xl'>
								<img
									src={
										artists[0].images[0] !== undefined
											? artists[0].images[0].url
											: 'https://djuragan.sgp1.digitaloceanspaces.com/djurkam/production/images/lodgings/5c53b6ccd8ae3.png'
									}
									alt={artists[0].name}
								/>
							</div>
							<div className='text-left mt-4'>
								<h1 className=' text-xl lg:text-2xl text-white font-bold'>
									{artists[0].name}
								</h1>
								<h1 className='mt-1 text-xs lg:text-base text-white font-bold uppercase '>
									artist
								</h1>
							</div>
						</Link>
					)}
				</div>
			</>
		</>
	);
};

export default Artists;
