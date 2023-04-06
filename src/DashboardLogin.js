import {
	Routes,
	Route,
	Link,
	Navigate,
	Redirect,
	Outlet,
	NavLink,
} from 'react-router-dom';
import { useState, useEffect } from 'react';
import './App.css';
import App from './App';
import Home from './components/Home';
import Secret from './Secret';
import Login from './Login';
import WithAuth from './withAuth';
import LoginGoogle from './LoginGoogle';
import GoogleAuth from './withGoogleAuth';

/* 
- index public route
- hides the main App component which is the Dashboard
- only Home(login prompt) should be visible
*/
function DashboardLogin() {
	const [authUser, setAuthUser] = useState(false);
	useEffect(() => {}, [authUser]);
	const [isActive, setActive] = useState(false);

	function handleToggle() {
		console.log('state was set');
		setActive(!isActive);
	}

	return (
		<>
			<nav className='navbar'>
				<div className='navbar-container'>
					<div className='navbar-logo'>
						<a href=''>
							<img src='' />
						</a>
					</div>

					<ul className='navbar-nav-left'>
						<li>
							<Link to='/'>Home</Link>
						</li>
						<li>
							<Link to='/dashboard'>Dashboard</Link>
						</li>
					</ul>

					<ul className='navbar-nav-right'>
						<li>
							<Link to='/login'>Login</Link>
						</li>
						<li>
							<a href='http://localhost:4000/logout'>Logout</a>
						</li>
					</ul>

					{/* Hamburger Menu */}
					<button
						type='button'
						className={`hamburger-menu-btn ${
							isActive ? 'open' : ''
						}`}
						onClick={handleToggle}
					>
						<span className='hamburger-top'></span>
						<span className='hamburger-middle'></span>
						<span className='hamburger-bottom'></span>
					</button>
				</div>
			</nav>
			<Outlet />

			{/* Mobile Menu Links*/}
			<div className={`mobile-menu ${isActive ? '' : 'hidden'}`}>
				<ul>
					<li>
						<Link to='/'>Home</Link>
					</li>
					<li>
						<Link to='/dashboard'>Dashboard</Link>
					</li>
				</ul>
				<div className='mobile-menu-bottom'>
					<button className='btn btn-dark-outline'>
						{authUser === false ? (
							<Link to='/login'>Sign in</Link>
						) : (
							''
						)}
					</button>
					<button className='btn btn-dark-outline'>
						<a href='http://localhost:4000/logout'>Logout</a>
					</button>
				</div>
			</div>

			<Routes>
				<Route index element={<Home />} />
				<Route
					path='/dashboard'
					element={
						//protecting at component level
						// <GoogleAuth user={user}>
						<App setAuthUser={setAuthUser} />
						// </GoogleAuth>
					}
				/>
				<Route path='/login' element={<LoginGoogle />} />
			</Routes>
		</>
	);
}

export default DashboardLogin;
