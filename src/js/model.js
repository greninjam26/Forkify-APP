export const state = {
	recipe: {},
};

export const fetchRecipe = async function (id) {
	try {
		const resp = await fetch(`https://forkify-api.jonas.io/api/v2/recipes/${id}`);
		if (!resp.ok) throw new Error(`🐛 💥 ${resp.message} (${resp.status})`);
    console.log(resp);
		const data = await resp.json();

		const { recipe } = data.data;
		state.recipe = {
			id: recipe.id,
			title: recipe.title,
			publisher: recipe.publisher,
			sourceUrl: recipe.source_url,
			image: recipe.image_url,
			servings: recipe.servings,
			cookingTime: recipe.cooking_time,
			ingredients: recipe.ingredients,
		};
    console.log(recipe);
	} catch (err) {
    console.error(err);
  }
};
