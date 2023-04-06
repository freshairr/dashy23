import { useState } from 'react';
import { useEffect } from 'react';
import Search from './Search';
import {
	Card,
	Image,
	Text,
	Badge,
	Button,
	Group,
	useMantineTheme,
} from '@mantine/core';

export default function Weather() {
	const [weather, setWeather] = useState('');
	const [coord, setCoord] = useState(''); //73.9712,40.7831

	useEffect(() => {
		if (coord === '') {
			defaultWeather();
		} else {
			getWeather();
		}
	}, [coord]);

	function defaultWeather() {
		const API = '498cab2522c947f995835853221101';
		fetch(
			`http://api.weatherapi.com/v1/forecast.json?key=${API}&q=60607&days=1&aqi=no&alerts=no`
		)
			.then((res) => res.json())
			.then((data) => setWeather(data));
	}

	function getWeather() {
		const API = '498cab2522c947f995835853221101';

		fetch(
			`http://api.weatherapi.com/v1/forecast.json?key=${API}&q=${coord.lat},${coord.lng}&days=1&aqi=no&alerts=no`
		)
			.then((res) => res.json())
			.then((data) => setWeather(data));
	}

	// function weatherButton() {
	//     if(weather == ""){
	//         //coordinate [long,lat] search used for tomorrow.io
	//         //weatherapi can search via zipcode
	//         //search component is leftover
	//         return <Search coord={coord} setCoord={setCoord} getWeather={getWeather} value="Get Weather" />
	//     }else{
	//         return <>
	//         <input type="submit" onClick={getWeather} value="Refresh" />
	//         <br />
	//         <Search coord={coord} setCoord={setCoord} getWeather={getWeather} value="Set Location" />
	//         </>
	//     }
	// }

	function handleRefresh() {
		const API = '498cab2522c947f995835853221101';

		fetch(
			`http://api.weatherapi.com/v1/forecast.json?key=${API}&q=${weather.location.lat},${weather.location.lon}&days=1&aqi=no&alerts=no`
		)
			.then((res) => res.json())
			.then((data) => setWeather(data));
	}

	const theme = useMantineTheme();

	const secondaryColor =
		theme.colorScheme === 'dark'
			? theme.colors.dark[1]
			: theme.colors.gray[7];

	return (
		<>
			{/* <h1>Current Conditions: </h1>           
        {  
        weather == "" ? "nothing to show. please enter a location" : 
        <div className="weather--forecast">
            <div className="top-left">
                <div className="weather--time"><h3>{weather.location.localtime}</h3></div>
                <div className="weather--city"><h2>{weather.location.name}, {weather.location.region} </h2></div>
            </div>
            <div className="top-right">
                <div className="weather--icon"><img src={weather.current.condition.icon} /></div>
                <div className="weather--current"><h2>{weather.current.condition.text }</h2></div>                
            </div>
            
            <div className="horizontal-half-divider"></div>
            <div className="bottom-left">
                <div className="weather--average"><h2>Avg temp: {weather.forecast.forecastday[0].day.avgtemp_f}°</h2></div>                  
            </div>

            <div className="vertical-half-divider"></div>
            <div className="bottom-right">
                <div className="weather--highlow"><h2>High: {`${weather.forecast.forecastday[0].day.maxtemp_f}°`}</h2>
                <h2>Low: {`${weather.forecast.forecastday[0].day.mintemp_f}°`}</h2></div>         
            </div>
        </div>
        }  
               
        <div className="button">
            <button className="weather--button" onClick={handleRefresh}>Refresh</button>
        </div>    
        <br />
        <Search coord={coord} setCoord={setCoord} getWeather={getWeather} value="Set Location" />  */}

			<div
			// style={{ width: 340, margin: "auto" }}
			>
				<Card shadow='sm' p='lg'>
					<Group
						position='apart'
						style={{ marginBottom: 5, marginTop: theme.spacing.sm }}
					>
						<Text weight={500}>Current Conditions: </Text>
					</Group>

					<Text
						size='sm'
						style={{ color: secondaryColor, lineHeight: 1.5 }}
					>
						{weather == '' ? (
							'nothing to show. please enter a location'
						) : (
							<div className='weather--forecast'>
								<div className='top-left'>
									<div className='weather--time'>
										{weather.location.localtime}
									</div>
									<div className='weather--city'>
										{weather.location.name},{' '}
										{weather.location.region}{' '}
									</div>
								</div>
								<div className='top-right'>
									<div className='weather--icon'>
										<img
											src={weather.current.condition.icon}
										/>
									</div>
									<div className='weather--current'>
										{weather.current.condition.text}
									</div>
								</div>

								<div className='horizontal-half-divider'></div>
								<div className='bottom-left'>
									<div className='weather--average'>
										Avg temp:{' '}
										{
											weather.forecast.forecastday[0].day
												.avgtemp_f
										}
										°
									</div>
								</div>

								<div className='vertical-half-divider'></div>
								<div className='bottom-right'>
									<div className='weather--highlow'>
										High:{' '}
										{`${weather.forecast.forecastday[0].day.maxtemp_f}°`}
										<br />
										Low:{' '}
										{`${weather.forecast.forecastday[0].day.mintemp_f}°`}
									</div>
								</div>
							</div>
						)}
					</Text>

					<Button
						onClick={handleRefresh}
						variant='light'
						color='blue'
						fullWidth
						style={{ marginTop: 14 }}
					>
						Refresh
					</Button>
					<br />
					<Search
						coord={coord}
						setCoord={setCoord}
						getWeather={getWeather}
						value='Set Location'
					/>
				</Card>
			</div>
		</>
	);
}
