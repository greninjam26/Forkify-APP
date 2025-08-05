const showRecipe = async function () {
	try {
		// console.log("??");
		const resp = await fetch(
			"https://forkify-api.jonas.io/api/v2/recipes/5ed6604591c37cdc054bc886"
		);
		// console.log(resp);
		if (!resp.ok) throw new Error(`🐛 💥 ${resp.message} (${resp.status})`);
		const data = await resp.json();
		console.log(data);

		
	} catch (err) {
		console.error(err);
	}
};

showRecipe();
// console.log("hi");
