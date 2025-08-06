import { API_URL } from "./config";
import { getData } from "./helpers";

export const state = {
	recipe: {},
	search: {
		target: "",
		results: {},
	},
};

export const fetchRecipe = async function (id) {
	try {
		const data = await getData(`${API_URL}${id}`);

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
		throw err;
	}
};

export const loadSearchResult = async function (target) {
	try {
		state.search.target = target;
		const data = await getData(`${API_URL}?search=${target}`);
		console.log(data);
		state.search.results = data.data.recipes.map(recipe => {
			return {
				id: recipe.id,
				title: recipe.title,
				publisher: recipe.publisher,
				image: recipe.image_url,
			};
		});
	} catch (err) {
		throw err;
	}
};
