import { API_URL, KEY, RESULTS_PER_PAGE } from "./config";
import { getData, sendData } from "./helpers";

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

const createRecipeObject = function (data) {
	const { recipe } = data.data;
	return {
		id: recipe.id,
		title: recipe.title,
		publisher: recipe.publisher,
		sourceUrl: recipe.source_url,
		image: recipe.image_url,
		servings: recipe.servings,
		cookingTime: recipe.cooking_time,
		ingredients: recipe.ingredients,
		bookmarked: false,
		...(recipe.key && { key: recipe.key }),
	};
};

export const fetchRecipe = async function (id) {
	try {
		const data = await getData(`${API_URL}${id}`);
		state.recipe = createRecipeObject(data);
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

export const uploadRecipe = async function (newRecipe) {
	try {
		const ingredients = Object.entries(newRecipe)
			.filter(entry => entry[0].startsWith("ingredient") && entry[1] !== "")
			.map(ingredient => {
				const ingredientArr = ingredient[1]
					// .replaceAll(" ", "")
					.split(",");
				if (ingredientArr.length !== 3)
					throw new Error(
						"Wrong ingredient format! Please follow the requirement 😩"
					);
				const [quantity, unit, description] = ingredientArr;
				return { quantity: quantity ? +quantity : null, unit, description };
			});

		const recipe = {
			title: newRecipe.title,
			publisher: newRecipe.publisher,
			source_url: newRecipe.sourceUrl,
			image_url: newRecipe.image,
			servings: +newRecipe.servings,
			cooking_time: +newRecipe.cookingTime,
			ingredients,
		};
		console.log(ingredients);

		const data = await sendData(`${API_URL}?key=${KEY}`, recipe);
		state.recipe = createRecipeObject(data);
		addBookmark(state.recipe);
	} catch (err) {
		throw err;
	}
};
