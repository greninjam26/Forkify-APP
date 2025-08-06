import * as model from "./model";
import recipeView from "./views/recipeView";
import resultsView from "./views/resultsView";
import searchView from "./views/searchView";

// DOM selection
const recipeDetails = document.querySelector(".recipe");

// utility functions
const addElement = function (element, position, html) {
	element.innerHTML = "";
	element.insertAdjacentHTML(position, html);
};

const controlRecipe = async function () {
	try {
		const id = window.location.hash.slice(1);
		if (!id) return;
		recipeView.addSpinner();
		// fetch the recipe
		await model.fetchRecipe(id);
		console.log(model.state.recipe);
		// render the elements
		recipeView.render(model.state.recipe);
	} catch (err) {
		recipeView.renderError();
	}
};

const controlSearch = async function () {
	try {
		// loading
		resultsView.addSpinner();
		// get the target
		const target = searchView.getTarget();
		// check
		if (!target) return;
		// get the target data
		await model.loadSearchResult(target);
		console.log(model.state.search.results);
		resultsView.render(model.state.search.results);
	} catch (err) {
		console.error(err);
	}
};

const init = function () {
	recipeView.addHandlerRender(controlRecipe);
	searchView.addHandlerRender(controlSearch);
};

init();
