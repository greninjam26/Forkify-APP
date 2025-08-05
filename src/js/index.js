const showRecipe = async function () {
	try {
		// console.log("??");
		const resp = await fetch(
			"https://forkify-api.jonas.io/api/v2/recipes/664c8f193e7aa067e94e8355"
		);
		// console.log(resp);
		if (!resp.ok) throw new Error(`🐛 💥 ${resp.message} (${resp.status})`);
		const data = await resp.json();
		console.log(data);

		let { recipe } = data.data;
		recipe = {
			id: recipe.id,
			title: recipe.title,
			publier: recipe.publier,
			sourceUrl: recipe.source_url,
			image: recipe.image_url,
			servings: recipe.servings,
			cookingTime: recipe.cooking_time,
			ingredints: recipe.ingredints,
		};
    console.log(recipe);
	} catch (err) {
		console.error(err);
	}
};

showRecipe();
// console.log("hi");
