const url =
	'https://newsapi.org/v2/top-headlines?country=us&apiKey=a33faca6a113424f9f9119b4147a897b';

async function getArticles() {
	const response = await fetch(url);
	const json = await response.json();
	const { articles } = json;
	document.getElementById('title').innerHTML = `CoderNews`;
	const articlesHTML = articles.map(renderArticle);
	document.getElementById('newsList').innerHTML = articlesHTML.join('');
}
getArticles();

function renderArticle(article) {
	return `<li class="mb-3 align-self-center article">
	<div id="title">
	${article.title}
	</div>
	<div class="happy">
	<img src="${article.urlToImage}" alt="Snow" />
  </div>
	<i class="fa fa-edit fa-xs"></i><h4 class="mb-0">${article.author}</h4>
	<h6 class="mb-0"><a href="${article.url}">${article.source.name}</a></h6>
  <p><i class="fa fa-envelope"></i>${article.content}</p>
</li>
`;
}
renderArticle();

function produceUrl() {
	const foo = window.Location.search
		.split('?')[1]
		.split('&')
		.map((qP) => {
			const [fisrtIndex, secondIndex] = qP.split('=');
			return {
				[firstIndex]: secondIndex,
			};
		});
	let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=a33faca6a113424f9f9119b4147a897b`;
	url = url + queryParams.map((p) => (url += `&${p.key}=${p.val}`));
	return foo;
}
produceUrl();

async function fetchArticles() {
	// fetch(url, object);
	const r = fetch(
		`https://newsapi.org/v2/top-headlines?country=us&apiKey=a33faca6a113424f9f9119b4147a897b`
	).then((r) => {
		console.log({ r });
	});
	// const queryParams = produceUrl();
	try {
		const resp = await fetch('&language=en&category=health');
		const json = await resp.json();
		console.log({ article: json.articles[0], json });
	} catch (error) {
		console.log({ error, foo: 'bar', spam: 'ham' });
	}
}
fetchArticles();
