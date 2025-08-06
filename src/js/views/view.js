import icons from "url:../../img/icons.svg";

export default class View {
	_data;

	render(data) {
		if (!data || (Array.isArray(data) && data.length == 0))
			return this.renderError();
		this._data = data;
		const html = this._generateHTML();
		this._replaceParent(html);
	}

	_clearParent() {
		this._parentEl.innerHTML = "";
	}

	_replaceParent(html) {
		this._clearParent();
		this._parentEl.insertAdjacentHTML("afterbegin", html);
	}

	addSpinner() {
		const html = `
      <div class="spinner">
        <svg>
          <use href="${icons}#icon-loader"></use>
        </svg>
      </div>
    `;
		this._replaceParent(html);
	}

	renderError(message = this._errorMessage) {
		const html = `
      <div class="error">
        <div>
          <svg>
            <use href="${icons}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div> 
    `;
		this._replaceParent(html);
	}

	renderMessage(message = this._message) {
		const html = `
      <div class="message">
        <div>
          <svg>
            <use href="${icons}#icon-smile"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div> 
    `;
		this._replaceParent(html);
	}
}
