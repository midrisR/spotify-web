import { useContext, useEffect } from 'react';
import { GlobalContext } from '../context/GlobalState';

const Content = () => {
	const { featuredPlaylists, feature, getNewReleases, newReleases } =
		useContext(GlobalContext);

	useEffect(() => {
		featuredPlaylists();
		getNewReleases();
		// eslint-disable-next-line
	}, []);

	return (
		<div className='w-full lg:w-8/12 bg-gray-800 py-6 px-6 rounded-3xl'>
			{newReleases !== null && (
				<div className='mb-10'>
					<h1 className='text-white text-xl font-bold px-4'>
						New Releases
					</h1>
					<div className='flex flex-wrap'>
						{newReleases.albums.items.map((val, i) => (
							<div key={i} className='w-1/2 md:w-1/4 px-4 py-2'>
								<div className='flex flex-col items-center  overflow-hidden'>
									<div className='rounded-2xl overflow-hidden'>
										<img
											src={val.images[0].url}
											alt={val.name}
										/>
									</div>
									<div className='w-full mt-3'>
										<p className='text-white text-base font-semibold ml-3 truncate'>
											{val.name}
										</p>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			)}

			{feature !== null && (
				<>
					<h1 className='text-white text-xl font-bold px-4'>
						{feature.message}
					</h1>
					<div className='flex flex-wrap'>
						{feature.playlists.items.map((val, i) => (
							<div key={i} className='w-1/2 md:w-1/3 px-4 py-2'>
								<div className='flex items-center'>
									<div className='rounded-2xl overflow-hidden'>
										<img
											src={val.images[0].url}
											alt='{val.name}'
											width={80}
										/>
									</div>
									<p className='text-white text-base font-semibold ml-3'>
										{val.name}
									</p>
								</div>
							</div>
						))}
					</div>
				</>
			)}
		</div>
	);
};

export default Content;
