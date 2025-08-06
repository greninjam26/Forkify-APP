import { MODEL_CLOSE_SECONDS } from "./config";
import * as model from "./model";
import addRecipeView from "./views/addRecipeView";
import bookmarksView from "./views/bookmarksView";
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
		bookmarksView.update(model.state.bookmarks);

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

const controlEditBookmark = function () {
	// add or remove bookmark
	if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
	else model.removeBookmark(model.state.recipe.id);
	console.log(model.state.recipe);

	// update the recipe view
	recipeView.update(model.state.recipe);

	// render the bookmarks view
	bookmarksView.render(model.state.bookmarks);
};

const controlBookmark = function () {
	bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
	try {
		// show spinner
		addRecipeView.addSpinner();

		// Upload the new recipe data
		await model.uploadRecipe(newRecipe);

		// render the new recipe
		recipeView.render(model.state.recipe);

		// display success Message
		addRecipeView.renderMessage();

		// render bookmark
		bookmarksView.render(model.state.bookmarks);

		// change ID in the URL
		window.history.pushState(null, "", `#${model.state.recipe.id}`);

		// close form window
		setTimeout(function () {
			addRecipeView.toggleWindow();
		}, MODEL_CLOSE_SECONDS);
	} catch (err) {
		console.error(err);
		addRecipeView.renderError(err);
	}
};

const init = function () {
	bookmarksView.addHandlerRender(controlBookmark);
	recipeView.addHandlerRender(controlRecipe);
	recipeView.addHandlerUpdateServings(controlServings);
	recipeView.addHandlerAddBookmark(controlEditBookmark);
	searchView.addHandlerRender(controlSearch);
	paginationView.addHandlerClick(controlPagination);
	addRecipeView.addHandlerUpload(controlAddRecipe);
};

init();
