const express = require("express");
const Todo = require("../models/Todo");

module.exports = {
	getTodo: async (req, res, loginStatus) => {
		console.log("todo controller level => authenticated? ", loginStatus);
		try {
			if (loginStatus === false) {
				const userItems = await Todo.find({
					userId: { $not: /([0-9]+)/ }, //find all items without a userid
				});
				res.status(200).json({ userItems });
			} else if (loginStatus === true) {
				const userItems = await Todo.find({ userId: req.user.id });
				const userName = req.user.displayName;
				res.status(200).json({ userItems, userName, loginStatus });
			}
		} catch (err) {
			console.log("error at getTodo : ", err);
		}
	},
	createTodo: async (req, res) => {
		try {
			if (loginStatus === false) {
				await Todo.create({ todo: req.body.todo, completed: false });
				console.log("Guest user Todo has been added!");
			} else if (loginStatus === true) {
				await Todo.create({
					todo: req.body.todo,
					userId: req.user.id,
					completed: false,
				});
				console.log("Todo has been added!");
			}
		} catch (err) {
			console.log(err);
		}
	},
	markComplete: async (req, res) => {
		try {
			await Todo.findOneAndUpdate(
				{ _id: req.body.todoID },
				{ completed: true }
			);
			console.log("marked complete");
			res.json("marked complete");
		} catch (err) {
			console.log(err);
		}
	},
	markUncomplete: async (req, res) => {
		try {
			await Todo.findOneAndUpdate(
				{ _id: req.body.todoID },
				{ completed: false }
			);
			console.log("marked uncomplete");
			res.json("markd uncomplete");
		} catch (err) {
			console.log(err);
		}
	},
	deleteTodo: async (req, res) => {
		try {
			await Todo.findOneAndDelete({ _id: req.body.todoID });
			console.log("deleted todo item");
		} catch (err) {
			console.log(err);
		}
	},
};
