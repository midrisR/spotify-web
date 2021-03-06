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
	main: `h-screen overflow-auto pb-4 lg:pb-36 pt-4 px-2 md:pb-8 md:pt-4 lg:pt-0 lg:px-4`,
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
							<div className='w-full'>{children}</div>
							<Playing url={song} />
						</main>
					</div>
				</div>
			</div>
		</DashboardProvider>
	);
}
