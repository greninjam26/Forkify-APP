import { API_URL, RESULTS_PER_PAGE } from "./config";
import { getData } from "./helpers";

export const state = {
	recipe: {},
	search: {
		target: "",
		results: [],
		resultsPerPage: RESULTS_PER_PAGE,
		page: 1,
	},
	bookmarks: [],
};

export const fetchRecipe = async function (id) {
	try {
		// const data = {
		// 	recipe: {
		// 		publisher: "My Baking Addiction",
		// 		ingredients: [
		// 			{ quantity: 1, unit: "", description: "tbsp. canola or olive oil" },
		// 			{ quantity: 0.5, unit: "cup", description: "chopped sweet onion" },
		// 			{
		// 				quantity: 3,
		// 				unit: "cups",
		// 				description: "diced fresh red yellow and green bell peppers",
		// 			},
		// 			{
		// 				quantity: 1,
		// 				unit: "",
		// 				description: "tube refrigerated pizza dough",
		// 			},
		// 			{ quantity: 0.5, unit: "cup", description: "salsa" },
		// 			{
		// 				quantity: 2,
		// 				unit: "cups",
		// 				description: "sargento chefstyle shredded pepper jack cheese",
		// 			},
		// 			{
		// 				quantity: null,
		// 				unit: "",
		// 				description: "Chopped cilantro or dried oregano",
		// 			},
		// 		],
		// 		source_url:
		// 			"http://www.mybakingaddiction.com/spicy-chicken-and-pepper-jack-pizza-recipe/",
		// 		image_url:
		// 			"http://forkify-api.herokuapp.com/images/FlatBread21of1a180.jpg",
		// 		title: "Spicy Chicken and Pepper Jack Pizza",
		// 		servings: 4,
		// 		cooking_time: 45,
		// 		id: "5ed6604591c37cdc054bc886",
		// 	},
		// };
		// const { recipe } = data;
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
			bookmarked: false,
		};

		if (state.bookmarks.some(bookmark => bookmark.id === id)) {
			state.recipe.bookmarked = true;
		}
	} catch (err) {
		throw err;
	}
};

export const loadSearchResult = async function (target) {
	try {
		state.search.target = target;
		const data = await getData(`${API_URL}?search=${target}`);
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

export const getSearchResultPage = function (page = 1) {
	state.search.page = page;
	const start = state.search.resultsPerPage * (page - 1);
	const end = state.search.resultsPerPage * page; // exclusive

	return state.search.results.slice(start, end);
};

export const updateServings = function (servings) {
	state.recipe.ingredients.forEach(
		ingredient => (ingredient.quantity *= servings / state.recipe.servings)
	);
	state.recipe.servings = servings;
};

const storeBookmarks = function () {
	localStorage.setItem("bookmarks", JSON.stringify(state.bookmarks));
};

export const addBookmark = function (recipe) {
	// add bookmark
	state.bookmarks.push(recipe);

	// mark current recipe as bookmarked
	if (recipe.id === state.recipe.id) {
		state.recipe.bookmarked = true;
	}
	storeBookmarks();
};

export const removeBookmark = function (id) {
	// remove bookmark
	const index = state.bookmarks.findIndex(bookmark => bookmark.id === id);
	state.bookmarks.splice(index, 1);
	// mark current recipe as not bookmarked
	if (id === state.recipe.id) {
		state.recipe.bookmarked = false;
	}
	storeBookmarks();
};

const init = function () {
	const storage = localStorage.getItem("bookmarks");
	if (!storage) return;
	state.bookmarks = JSON.parse(storage);
};

init();
console.log(state);
