const languages = ['en', 'vn', 'fr', 'es', 'zh'];

function createLanguageList() {
	const languageHTML = languages.map(
		(l) => `<a href="http://localhost:5500/index.html?language=${l}">${l}</a>`
	);

	document.getElementById(`languages`).innerHTML = languageHTML.join();
}

createLanguageList();
