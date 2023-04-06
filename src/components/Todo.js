import { useState, useEffect } from 'react';
import { FiTrash } from 'react-icons/fi';
import { MdOutlineAddTask } from 'react-icons/md';
import {
	Card,
	Image,
	Text,
	Badge,
	Button,
	Group,
	useMantineTheme,
	Input,
} from '@mantine/core';

export default function Todo(props) {
	//state to handle use entry of new task
	const [entry, setEntry] = useState();

	//state to handle the entire Fetchtodo object.
	//state.userItems = array of todo items
	//state.userName = display name from Google login
	const [state, setState] = useState();

	//state to monitor if tasks modified
	const [updateTask, setUpdateTask] = useState(false);

	//state to clear input component after adding task
	const [form, clearForm] = useState();

	useEffect(() => {
		Fetchtodo();
	}, [updateTask]);

	async function Fetchtodo() {
		try {
			let res = await fetch('todos');
			let data = await res.json();
			console.log(data);
			return setState(data);
		} catch (err) {
			console.log(err);
		}
	}

	function handleChange(event) {
		setEntry(event.target.value);
	}

	async function ClickAddTodo(event) {
		event.preventDefault();
		setUpdateTask(!updateTask);
		clearForm('');

		const todoItem = entry;
		try {
			const response = await fetch('todos/createtodo', {
				method: 'post',
				headers: { 'Content-type': 'application/json' },
				body: JSON.stringify({
					todo: todoItem,
				}),
			});
			const data = await response.json();
			console.log(data);
		} catch (err) {
			console.log(err);
		}
	}

	async function markComplete(event, id) {
		event.preventDefault();
		const targetItem = state.userItems.filter((item) => item._id === id);
		const newArrayState = {
			_id: targetItem[0]._id,
			todo: targetItem[0].todo,
			completed: true,
		};

		const todoID = id;
		try {
			const response = await fetch('todos/markComplete', {
				method: 'put',
				headers: { 'Content-type': 'application/json' },
				body: JSON.stringify({
					todoID: todoID,
				}),
			});
			const data = await response.json();
			console.log(data);
		} catch (err) {
			console.log(err);
		}
		setUpdateTask(!updateTask);
	}

	async function markUncomplete(event, id) {
		const todoID = id;
		try {
			const response = await fetch('todos/markUncomplete', {
				method: 'put',
				headers: { 'Content-type': 'application/json' },
				body: JSON.stringify({
					todoID: todoID,
				}),
			});
			const data = response.json();
			console.log(data);
		} catch (err) {
			console.log(err);
		}
		setUpdateTask(!updateTask);
	}

	async function deleteTodo(id) {
		setUpdateTask(!updateTask);
		const todoID = id;
		try {
			const response = await fetch('/todos/delete', {
				method: 'delete',
				headers: { 'Content-type': 'application/json' },
				body: JSON.stringify({
					todoID: todoID,
				}),
			});
			const data = response.json();
			console.log(data);
		} catch (err) {
			console.log(err);
		}
	}
	function getRandomInt(max) {
		return Math.floor(Math.random() * max);
	}

	function TaskItems() {
		return state.userItems.map((item) => (
			<div className='tasks--items'>
				<ul>
					<li
						key={item._id}
						id={item._id}
						className={
							item.completed === true
								? 'completed'
								: 'notcompleted'
						}
						onClick={(e) => {
							item.completed === true
								? markUncomplete(e, item._id)
								: markComplete(e, item._id);
						}}
					>
						{item.todo}
						<button
							className='tasks--del'
							onClick={() => deleteTodo(item._id)}
						>
							<FiTrash />
						</button>
					</li>
				</ul>
			</div>
		));
	}

	const theme = useMantineTheme();

	const secondaryColor =
		theme.colorScheme === 'dark'
			? theme.colors.dark[1]
			: theme.colors.gray[7];

	function printData() {
		console.log(state);
		console.log('todo level', props.setLoggedin(state.loginStatus));
	}

	return (
		<>
			<Card className='tasks' shadow='sm' p='lg'>
				<Group
					position='apart'
					style={{ marginBottom: 5, marginTop: theme.spacing.sm }}
				>
					<Text weight={500}>
						Hi{' '}
						{state && state.userName
							? state.userName
							: 'Guest User'}
						, here are your tasks:{' '}
					</Text>
				</Group>
				<Text
					size='sm'
					style={{ color: secondaryColor, lineHeight: 1.5 }}
				>
					{state && <TaskItems />}
				</Text>
				<br />
				<Input
					type='text'
					required
					minLength='4'
					maxLength='1000'
					size='10'
					onChange={handleChange}
					value={form}
					placeholder='What do you need to do?'
				/>
				<Button
					className='addtask'
					onClick={ClickAddTodo}
					variant='light'
					color='blue'
					fullWidth
					style={{ marginTop: 14 }}
				>
					Add to List
				</Button>
			</Card>

			<button onClick={printData}>Print state data to console</button>
		</>
	);
}
