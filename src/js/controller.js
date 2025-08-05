import * as model from "./model";
import recipeView from "./views/recipeView";

// DOM selection
const recipeDetails = document.querySelector(".recipe");

// utility functions
const addElement = function (element, position, html) {
	element.innerHTML = "";
	element.insertAdjacentHTML(position, html);
};

const showRecipe = async function () {
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

const init = function () {
	recipeView.addHandlerRender(showRecipe);
};

init();
