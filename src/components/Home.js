import { useState, useEffect } from 'react';

export default function Home() {
	const [message, Setmessage] = useState({ message: 'loading...' });

	useEffect(() => {
		fetch('/api/home')
			.then((res) => res.text())
			.then((res) => Setmessage({ message: res }));
	});
	return (
		<div>
			<h1>Home</h1>
			<p>{message.message}</p>
		</div>
	);
}
