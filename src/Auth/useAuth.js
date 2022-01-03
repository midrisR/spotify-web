import { useEffect, useState } from 'react';
import axios from 'axios';

export default function useAuth(code) {
	const [accessToken, setAccessToken] = useState('');
	useEffect(() => {
		axios
			.post('http://localhost:5000/login/', { code })
			.then((response) => {
				window.history.pushState({}, null, '/');
				setAccessToken(response.data.accessToken);
			})
			.catch((error) => {
				console.log(error.message);
			});
	}, [code]);

	return accessToken;
}
