import * as model from "./model";
import paginationView from "./views/paginationView";
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
		// render the results
		resultsView.render(model.getSearchResultPage());
		// render the pagination buttons
		paginationView.render(model.state.search);
	} catch (err) {
		console.error(err);
	}
};

const controlPagination = function (nextPage) {
	resultsView.render(model.getSearchResultPage(nextPage));
	paginationView.render(model.state.search);
};

const init = function () {
	recipeView.addHandlerRender(controlRecipe);
	searchView.addHandlerRender(controlSearch);
	paginationView.addHandlerClick(controlPagination);
};

init();
