import React from 'react';

import { loginUrl } from '../Auth/Spotify';
const Login = () => {
	return (
		<div className='absolute top-2/4 left-2/4'>
			<button
				type='button'
				onClick={loginUrl}
				className='px-4 py-2 bg-green-500 text-white text-center font-semibold rounded-lg'>
				Login
			</button>
		</div>
	);
};

export default Login;
