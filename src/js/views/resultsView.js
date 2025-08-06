import previewView from "./previewView";
import View from "./view";

class ResultView extends View {
	_parentEl = document.querySelector(".results");
	_errorMessage = "No recipe found for your input, Please try again!";
	_message = "";

	_generateHTML() {
		return this._data.map(result => previewView.render(result, false)).join("");
	}
}

export default new ResultView();
