const cryptoURL =
	'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=1&limit=3&convert=USD&CMC_PRO_API_KEY=9229e095-d3f6-4758-8156-ec4a127c964e';

const coin = {
	id: 1,
	name: 'Bitcoin',
	symbol: 'BTC',
	slug: 'bitcoin',
	num_market_pairs: 9852,
	date_added: '2013-04-28T00:00:00.000Z',
	tags: [
		'mineable',
		'pow',
		'sha-256',
		'store-of-value',
		'state-channels',
		'coinbase-ventures-portfolio',
		'three-arrows-capital-portfolio',
		'polychain-capital-portfolio',
	],
	max_supply: 21000000,
	circulating_supply: 18651531,
	total_supply: 18651531,
	platform: null,
	cmc_rank: 1,
	last_updated: '2021-03-12T07:22:02.000Z',
	quote: {
		USD: {
			price: 56772.22509134523,
			volume_24h: 56146078171.69906,
			percent_change_1h: 0.45440337,
			percent_change_24h: 2.1565927,
			percent_change_7d: 20.01380942,
			percent_change_30d: 22.3897859,
			percent_change_60d: 67.00783825,
			percent_change_90d: 209.20232707,
			market_cap: 1058888916230.2034,
			last_updated: '2021-03-12T07:22:02.000Z',
		},
	},
};
const eth = {
	id: 1,
	name: 'Ethereum',
	symbol: 'ETH',
	slug: 'ethereum',
	num_market_pairs: 9852,
	date_added: '2013-04-28T00:00:00.000Z',
	tags: [
		'mineable',
		'pow',
		'sha-256',
		'store-of-value',
		'state-channels',
		'coinbase-ventures-portfolio',
		'three-arrows-capital-portfolio',
		'polychain-capital-portfolio',
	],
	max_supply: 116600000,
	circulating_supply: 18651531,
	total_supply: 116600000,
	platform: null,
	cmc_rank: 1,
	last_updated: '2021-03-12T07:22:02.000Z',
	quote: {
		USD: {
			price: 2100.22509134523,
			volume_24h: 56146078171.69906,
			percent_change_1h: 0.45440337,
			percent_change_24h: 2.1565927,
			percent_change_7d: 20.01380942,
			percent_change_30d: 22.3897859,
			percent_change_60d: 67.00783825,
			percent_change_90d: 209.20232707,
			market_cap: 1058888916230.2034,
			last_updated: '2021-03-12T07:22:02.000Z',
		},
	},
};
let myChart = new Chart(ctx, {
	type: 'line',
	data: {
		labels: ['90d', '60d', '30d', '7d', '24h', '1h', 'Current'],
		datasets: [
			{
				label: 'Price',
				borderWidth: 1,
				borderColor: 'rgba(255, 99, 132, 1)',
				data: getHistoricPrices(eth.quote.USD),
				backgroundColor: 'rgba(255, 99, 132, 0.2)',
			},
		],
	},
});
async function getCryptoPrices() {
	const response = await fetch(cryptoURL);
	const json = await response.json();
	const coin = json.data[0];
	renderLineGraph(coin);
	// console.log(coin);
}
getCryptoPrices();

function renderLineGraph() {
	const ctx = document.getElementById('myChart');
	const price = coin.quote.USD.price;
	// const ethPrice = eth.quote.USD.price;
	const [ninetyAgoPrice] = getHistoricPrices(coin.quote.USD);
	const timeAgo = ['90d', '60d', '30d', '7d', '24h', '1h', 'Current'];
	const myChart = new Chart(ctx, {
		type: 'line',
		data: {
			labels: timeAgo,
			datasets: [
				{
					label: 'Bitcoin Price',
					borderWidth: 1,
					// data: [30000, 45000, 65000, 33000],
					data: getHistoricPrices(coin.quote.USD),
					borderColor: 'rgba(255, 99, 132, 1)',
					backgroundColor: 'rgba(255, 99, 132, 0.2)',
				},
				{
					label: 'Ethereum Price',
					borderWidth: 1,
					// data: [1450, 2500, 4300, 2000],
					data: getHistoricPrices(coin.quote.USD),
					borderColor: 'rgba(255, 99, 132, 1)',
					backgroundColor: 'rgba(255, 140, 0, 0.3)',
				},
				{
					label: 'Litecoin Price',
					borderWidth: 1,
					// data: [240, 440, 190, 140],
					data: getHistoricPrices(coin.quote.USD),
					borderColor: 'rgba(255, 99, 132, 1)',
					backgroundColor: 'rgba(116, 95, 95, 0.85)',
				},
			],
		},
		options: {
			tooltips: {
				enabled: true,
				mode: 'nearest',
			},
			scales: {
				yAxes: [
					{
						ticks: {
							beginAtZero: false,
							suggestedMax: price,
							suggestedMin: ninetyAgoPrice,
						},
					},
				],
			},
		},
	});
}
renderLineGraph();

function getHistoricPrices(prices) {
	const {
		percent_change_90d,
		percent_change_60d,
		percent_change_30d,
		percent_change_7d,
		percent_change_24h,
		percent_change_1h,
		price,
	} = prices;

	const ninetyAgoPrice = calculatePriceFromPercentageChange(
		price,
		percent_change_90d
	);
	const sixtyAgoPrice = calculatePriceFromPercentageChange(
		price,
		percent_change_60d
	);
	const thirtyAgoPrice = calculatePriceFromPercentageChange(
		price,
		percent_change_30d
	);
	const sevenAgoPrice = calculatePriceFromPercentageChange(
		price,
		percent_change_7d
	);
	const dayAgoPrice = calculatePriceFromPercentageChange(
		price,
		percent_change_24h
	);
	const hourAgoPrice = calculatePriceFromPercentageChange(
		price,
		percent_change_1h
	);

	return [
		ninetyAgoPrice,
		sixtyAgoPrice,
		thirtyAgoPrice,
		sevenAgoPrice,
		dayAgoPrice,
		hourAgoPrice,
		price,
	];
}
function calculatePriceFromPercentageChange(currentPrice, percentageChange) {
	let denominator;
	let historicPrice;
	if (percentageChange >= 100) {
		percentageChange = percentageChange + 100;
		denominator = percentageChange * 0.01;
		historicPrice = currentPrice / denominator;
	}

	if (percentageChange < 100 && percentageChange > 0) {
		denominator = 1 + percentageChange / 100;
		historicPrice = currentPrice / denominator;
	}

	if (percentageChange < 0) {
		const original = (currentPrice / (100 + percentageChange)) * 100;
		historicPrice = original;
	}
	return historicPrice;
}
