import { useState, useEffect } from "react";
import {
	Card,
	Image,
	Text,
	Badge,
	Button,
	Group,
	useMantineTheme,
} from "@mantine/core";

export default function Train(props) {
	useEffect(() => {
		arrivalTime();
	}, []);

	function arrivalTime() {
		const API = "89e8ee1674314723b364858afb9b53a1";
		fetch(
			`https://lapi.transitchicago.com/api/1.0/ttarrivals.aspx?key=${API}&stpid=30068&max=3&outputType=JSON`
		)
			.then((res) => res.json())
			.then((data) => trainVariables(data));
	}

	function trainVariables(data) {
		props.setTrain(data);
	}

	function convertArrivalTime(val) {
		var prdt = new Date(`${props.train.ctatt.eta[val].prdt}`);
		var arrT = new Date(`${props.train.ctatt.eta[val].arrT}`);
		//results in milliseconds so we divive 1000ms/1sec and 60sec/min
		var difference = (arrT - prdt) / 1000 / 60;
		return difference;
	}

	function updatedTime() {
		var time = new Date(`${props.train.ctatt.tmst}`);
		return time;
	}

	const theme = useMantineTheme();

	const secondaryColor =
		theme.colorScheme === "dark" ? theme.colors.dark[1] : theme.colors.gray[7];

	return (
		<>
			{/* <div>
            <Card>
            <h1>Train Data</h1>
            {props.train === undefined ? null : 
                <div>
                Station: {props.train.ctatt.eta[0].staNm}
                <br/>
                Arriving in {convertArrivalTime(0)} {convertArrivalTime(0) === 1 ? `minute` : `minutes`}
                <br/>
                Next train arriving in {convertArrivalTime(1)} {convertArrivalTime(1) === 1 ? `minute` : `minutes`}
                <br/>
                {props.train.ctatt.eta[0].stpDe}
                <br/>
                Line: {props.train.ctatt.eta[0].rt}
                </div>
            }
             <h6>Last updated: {new Date().toLocaleTimeString()}</h6>
            <Button variant="white" compact onClick={arrivalTime}>
                {!props.train ? "Get Arrival Times" : "Refresh Times"}
            </Button>
            </Card>
        </div> */}

			<div
			// style={{ width: 340, margin: "auto" }}
			>
				<Card shadow="sm" p="lg">
					<Group
						position="apart"
						style={{ marginBottom: 5, marginTop: theme.spacing.sm }}
					>
						<Text weight={500}>Train Data</Text>
					</Group>

					<Text size="sm" style={{ color: secondaryColor, lineHeight: 1.5 }}>
						{props.train === undefined ? null : (
							<div>
								Station: {props.train.ctatt.eta[0].staNm}
								<br />
								Arriving in {convertArrivalTime(0)}{" "}
								{convertArrivalTime(0) === 1 ? `minute` : `minutes`}
								<br />
								Next train arriving in {convertArrivalTime(1)}{" "}
								{convertArrivalTime(1) === 1 ? `minute` : `minutes`}
								<br />
								{props.train.ctatt.eta[0].stpDe}
								<br />
								Line: {props.train.ctatt.eta[0].rt}
								<br />
								Last updated:{" "}
								{new Date(props.train.ctatt.tmst).toLocaleTimeString()}
							</div>
						)}
					</Text>

					<Button
						onClick={arrivalTime}
						variant="light"
						color="blue"
						fullWidth
						style={{ marginTop: 14 }}
					>
						{!props.train ? "Get Arrival Times" : "Refresh Times"}
					</Button>
				</Card>
			</div>
		</>
	);
}
