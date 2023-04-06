import { default as response } from '../test/_test_TomorrowData';

export default function Tomorrow() {
	const key = 'nVjhuq5r8xmzM4Aefh2S1m6NqmqampTL';
	const timelineURL = 'https://api.tomorrow.io/v4/timelines';

	let location = '41.878113,-87.629799';

	const fields =
		'temperature,temperatureApparent,precipitationProbability,sunriseTime,sunsetTime,cloudCover,uvIndex,weatherCode';
	const units = 'imperial';
	const timesteps = 'current,1h,1d';

	// configure the time frame up to 6 hours back and 15 days out
	//Start time in ISO 8601 format "2019-03-20T14:09:50Z" (defaults to now)
	//End time in ISO 8601 format "2019-03-20T14:09:50Z" (defaults to full forecast of the max timestep)
	//const now = moment.utc();
	//const startTime = moment.utc(now).add(0, "minutes").toISOString();
	//const endTime = moment.utc(now).add(1, "days").toISOString();
	const current = new Date();
	const startTime = current.toISOString();
	const endTime = current.setHours(current.getHours() + 6);

	/*
    "US/Pacific": "-08:00"
    "US/Central": "-06:00"
    "US/Eastern": "-05:00"
    */
	const timezone = 'US/Central';

	// request the timelines with all the query string parameters as options
	// const getTimelineParameters =  queryString.stringify({
	//     key,
	//     location,
	//     fields,
	//     units,
	//     timesteps,
	//     startTime,
	//     endTime,
	//     timezone,
	// }, {arrayFormat: "comma"});

	//https://api.tomorrow.io/v4/timelines?location=41.878113,-87.629799&fields=temperature,temperatureApparent,precipitationProbability,sunriseTime,sunsetTime,cloudCover,uvIndex,weatherCodeDay&timesteps=current,1h,1d&startTime=2022-02-24T15:15:09.106Z&endTime=2022-02-25T15:15:09.106Z&units=imperial&apikey=nVjhuq5r8xmzM4Aefh2S1m6NqmqampTL

	// fetch(`${timelineURL}?location=${location}&fields=${fields}&timesteps=${timesteps}&units=${units}&apikey=${key}`)
	// .then(res => res.json())
	// .then(data => console.log(data))

	const weatherCode = {
		0: 'Unknown',
		1000: 'Clear',
		1001: 'Cloudy',
		1100: 'Mostly Clear',
		1101: 'Partly Cloudy',
		1102: 'Mostly Cloudy',
		2000: 'Fog',
		2100: 'Light Fog',
		3000: 'Light Wind',
		3001: 'Wind',
		3002: 'Strong Wind',
		4000: 'Drizzle',
		4001: 'Rain',
		4200: 'Light Rain',
		4201: 'Heavy Rain',
		5000: 'Snow',
		5001: 'Flurries',
		5100: 'Light Snow',
		5101: 'Heavy Snow',
		6000: 'Freezing Drizzle',
		6001: 'Freezing Rain',
		6200: 'Light Freezing Rain',
		6201: 'Heavy Freezing Rain',
		7000: 'Ice Pellets',
		7101: 'Heavy Ice Pellets',
		7102: 'Light Ice Pellets',
		8000: 'Thunderstorm',
	};

	function currentWeather() {
		const current = [response.data.timelines[0].intervals[0].values];
		const timeframe = response.data.timelines[0].timestep;

		return current.map((item) => (
			<article>
				<ul className='weather-result'>
					<li>
						<img
							src={`weather_icons/${item.weatherCode}0_${
								weatherCode[item.weatherCode.toString()]
							}_small@2x.png`}
						/>
					</li>
					<li>
						Weather Code: {weatherCode[item.weatherCode.toString()]}
					</li>
					<li>Temperature: {item.temperature}</li>
					<li>Feels Like: {item.temperatureApparent}</li>
					<li>Rain Probability: {item.precipitationProbability}</li>
					<li>Cloud Coverage: {item.cloudCover}</li>
					<li>UV: {item.uvIndex}</li>
				</ul>
			</article>
		));
	}

	function hourlyWeather() {
		const hourly = [response.data.timelines[1].intervals];
		const timeframe = response.data.timelines[1].timestep;

		return response.data.timelines[1].intervals.map((item, index) => (
			<article>
				<ul className='weather-result'>
					<h5>
						{new Date(item.startTime).toLocaleTimeString([], {
							timeStyle: 'short',
						})}
					</h5>
					<li>
						<img
							src={`weather_icons/${item.values.weatherCode}0_${
								weatherCode[item.values.weatherCode.toString()]
							}_small@2x.png`}
						/>
					</li>
					<li>{weatherCode[item.values.weatherCode.toString()]}</li>
					<li>Temperature: {item.values.temperature}</li>
					<li>Feels Like: {item.values.temperatureApparent}</li>
					<li>
						Rain Probability: {item.values.precipitationProbability}
					</li>
					<li>Cloud Coverage: {item.values.cloudCover}</li>
					<li>UV: {item.values.uvIndex}</li>
				</ul>
			</article>
		));
	}
	//string.split(' ').reverse().join('_') //'Snow_Light'
	// Light Snowhttp://localhost:3000/weather_icons/weather_icons/51000_Light%20Snow_small@2x.png

	function dailyWeather() {
		const daily = response.data.timelines[2].intervals;
		return daily.map((item) => (
			<article>
				<ul className='weather-result'>
					<h5>{new Date(item.startTime).toLocaleDateString()}</h5>
					<li>
						{item.values.weatherCode.toString().indexOf(' ') ===
						-1 ? (
							<img
								src={`weather_icons/${
									item.values.weatherCode
								}0_${
									weatherCode[
										item.values.weatherCode.toString()
									]
								}_small@2x.png`}
							/>
						) : (
							<img
								src={`weather_icons/${
									item.values.weatherCode
								}0_${weatherCode[item.values.weatherCode]
									.split(' ')
									.reverse()
									.join('_')}_small@2x.png`}
							/>
						)}
					</li>
					<li>{weatherCode[item.values.weatherCode.toString()]}</li>
					<li>Feels Like: {item.values.temperatureApparent}</li>
					<li>
						Rain Probability: {item.values.precipitationProbability}
					</li>
					<li>Sunrise: {item.values.sunriseTime}</li>
					<li>Sunset: {item.values.sunsetTime}</li>
					<li>Cloud Coverage: {item.values.cloudCover}</li>
					<li>UV: {item.values.uvIndex}</li>
				</ul>
			</article>
		));
	}

	// function WeatherData() {
	//     return response.data.timelines.map((item, index) =>
	//             <article>
	//                 <h4>{item.timestep}</h4>
	//                 <ul className="weather-result">
	//                     <li>
	//                     {item.intervals[item.intervals.length-1].values.weatherCodeDay === 50000 ? <img src="/weather_icons/50000_snow_small2x.png"/> : null}
	//                     </li>
	//                     <li>Temperature: {item.intervals[item.intervals.length-1].values.temperature}</li>
	//                     <li>Feels Like: {item.intervals[item.intervals.length-1].values.temperatureApparent}</li>
	//                     <li>Rain Probability: {item.intervals[item.intervals.length-1].values.precipitationProbability}</li>
	//                     <li>Cloud Coverage: {item.intervals[item.intervals.length-1].values.cloudCover}</li>
	//                     <li>UV: {item.intervals[item.intervals.length-1].values.uvIndex}</li>
	//                 </ul>
	//             </article>
	//     )
	// }

	return (
		<div>
			<h3>Weather Forecast (by Tomorrow.io)</h3>
			<h4>Current Weather</h4>
			{currentWeather()}
			<h4>Hourly Forecast</h4>
			{hourlyWeather()}
			<h4>Next Day Forecast</h4>
			{dailyWeather()}
		</div>
	);
}
