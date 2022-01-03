import React, { useContext } from 'react';
import Overlay from './provider/overlay';
import TopNavigation from './topnavigation';
import SideNavigation from './sidenavigation';
import DashboardProvider from './provider/context';
import { GlobalContext } from '../context/GlobalState';
import Playing from '../components/Playing';

const style = {
	container: `bg-gray-900 h-screen overflow-hidden relative`,
	mainContainer: `flex flex-col h-screen pl-0 w-full lg:pl-20 lg:space-y-4`,
	main: `h-screen overflow-auto pb-36 pt-4 px-2 md:pb-8 md:pt-4 lg:pt-0 lg:px-4`,
};

export default function DashboardLayout({ children }) {
	const { song } = useContext(GlobalContext);
	return (
		<DashboardProvider>
			<div className={style.container}>
				<div className='flex items-start'>
					<Overlay />
					<SideNavigation mobilePosition='right' />
					<div className={style.mainContainer}>
						<TopNavigation />
						<main className={style.main}>
							<div className='flex flex-wrap'>
								{children}
								{/* widget */}
								<div className='w-full mt-8 lg:mt-0 lg:w-4/12 lg:pl-4'>
									<div className='bg-gray-800 rounded-3xl px-3 py-3 relative'>
										<Playing url={song} />
									</div>
								</div>
							</div>
						</main>
					</div>
				</div>
			</div>
		</DashboardProvider>
	);
}
