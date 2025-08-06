import View from "./view";
import icons from "url:../../img/icons.svg";

class ResultView extends View {
	_parentEl = document.querySelector(".results");
	_errorMessage = "No recipe found for your input, Please try again!";
	_message = "";

	_generateHTML() {
		return this._data.map(this._generateHTMLPreview).join("");
	}

	_generateHTMLPreview(result) {
		const curID = window.location.hash.slice(1);
		return `
      <li class="preview">
        <a class="preview__link ${
			curID === result.id && "preview__link--active"
		}" href="#${result.id}">
          <figure class="preview__fig">
            <img src="${result.image}" alt="${result.title}" />
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">${result.title}</h4>
            <p class="preview__publisher">${result.publisher}</p>
            <div class="preview__user-generated">
              <svg>
                <use href="${icons}#icon-user"></use>
              </svg>
            </div>
          </div>
        </a>
      </li>
    `;
	}
}

export default new ResultView();
