import { Routes, Route, Link, Navigate, Redirect } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Weather from './components/Weather';
import Train from './components/Train';
import Todo from './components/Todo';
import Tomorrow from './components/Tomorrow';
import { todoList } from './test/_test_TodoData';
import './App.css';
import Home from './components/Home';
import Secret from './Secret';
import Login from './Login';
import WithAuth from './withAuth';

function App(props) {
	const [train, setTrain] = useState(undefined);
	const [todo, setTodo] = useState(todoList);
	const [state, setState] = useState(null);
	const [loggedin, setLoggedin] = useState(false);

	useEffect(() => {
		fetch('/express_backend')
			.then((res) => res.json())
			.then((data) => setState(data.express));
	}, []);

	return (
		<>
			<div className='container-box'>
				{/* Box A - Weather */}
				{/* <section className="box box-a text-center py-md"> */}
				<div className='box-inner' id='box-inner'>
					<div className='weather'>
						<Weather />
					</div>

					{/* </section> */}

					{/* Box B - Train  */}
					<div className='train'>
						<Train train={train} setTrain={setTrain} />
					</div>

					{/* Box C - Todo Task List */}
					<div className='todo'>
						<Todo
							todo={todo}
							setTodo={setTodo}
							todoList={todoList}
							setLoggedin={setLoggedin}
						/>
					</div>
					<div>{/* <Tomorrow /> */}</div>

					<div className='App'>
						<header className='App-header'>
							<p>{!state ? 'Loading...' : state}</p>
						</header>
					</div>

					<footer className='footer'>
						<div className='footer-container'>
							<p>© 2022 Anthony Tong</p>
						</div>
					</footer>
				</div>
			</div>
		</>
	);
}

export default App;
