import View from "./view";
import icons from "url:../../img/icons.svg";

class PaginationView extends View {
	_parentEl = document.querySelector(".pagination");
	_curPage;

	addHandlerClick(handler) {
		this._parentEl.addEventListener("click", function (e) {
			const btn = e.target.closest(".btn--inline");
			if (!btn) return;
			this._curPage = Number(btn.dataset.nextpage);
			handler(this._curPage);
		});
	}

	_generateHTML() {
		const numPages = Math.ceil(this._data.results.length / this._data.resultsPerPage);
		this._curPage = this._data.page;
		// if there are only 1 page
		if (numPages === 1) {
			return "";
		}

		// if we are on page 1
		if (this._curPage === 1) {
			return this._generateHTMLBtn("right");
		}

		// if we are on the last page
		if (this._curPage === numPages) {
			return this._generateHTMLBtn("left");
		}

		// if we are in the middle
		return `
      ${this._generateHTMLBtn("left")}
      ${this._generateHTMLBtn("right")}
    `;
	}

	_generateHTMLBtn(dir) {
		const nextPage = dir === "right" ? this._curPage + 1 : this._curPage - 1;
		return `
      <button class="btn--inline pagination__btn--${
			dir === "right" ? "next" : "prev"
		}" data-nextpage="${nextPage}">
        <span>Page ${nextPage}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-${dir}"></use>
        </svg>
      </button>
    `;
	}
}

export default new PaginationView();
