import * as model from "./model";
import paginationView from "./views/paginationView";
import recipeView from "./views/recipeView";
import resultsView from "./views/resultsView";
import searchView from "./views/searchView";

const controlRecipe = async function () {
	try {
		const id = window.location.hash.slice(1);
		if (!id) return;
		recipeView.addSpinner();

		// update the results
		resultsView.update(model.getSearchResultPage());

		// fetch the recipe
		await model.fetchRecipe(id);
		console.log(model.state.recipe);
		// render the elements
		recipeView.render(model.state.recipe);
	} catch (err) {
		recipeView.renderError(err);
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

const controlServings = function (newServings) {
	// update the recipe serving
	model.updateServings(newServings);
	// update the recipe view
	// recipeView.render(model.state.recipe);
	recipeView.update(model.state.recipe);
};

const controlBookmark = function () {
	if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
	else model.removeBookmark(model.state.recipe.id);
	console.log(model.state.recipe);
	recipeView.render(model.state.recipe);
};

const init = function () {
	recipeView.addHandlerRender(controlRecipe);
	recipeView.addHandlerUpdateServings(controlServings);
	recipeView.addHandlerAddBookmark(controlBookmark);
	searchView.addHandlerRender(controlSearch);
	paginationView.addHandlerClick(controlPagination);
};

init();
