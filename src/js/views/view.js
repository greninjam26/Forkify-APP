import icons from "url:../../img/icons.svg";

export default class View {
	_data;

	render(data, render = true) {
		if (!data || (Array.isArray(data) && data.length == 0)) return this.renderError();
		// console.log(data);
		this._data = data;
		const html = this._generateHTML();
		if (!render) return html;
		// console.log("?");
		// console.log(html);
		this._replaceParent(html);
	}

	update(data) {
		if (!data || (Array.isArray(data) && data.length == 0)) return this.renderError();
		this._data = data;
		const newHTML = this._generateHTML();
		const newDOM = document.createRange().createContextualFragment(newHTML);
		const newElements = Array.from(newDOM.querySelectorAll("*"));
		const curElements = Array.from(this._parentEl.querySelectorAll("*"));
		newElements.forEach((newEl, i) => {
			const curEl = curElements[i];
			// update changed text
			if (!newEl.isEqualNode(curEl) && newEl.firstChild?.nodeValue.trim() !== "") {
				curEl.textContent = newEl.textContent;
			}
			// update changed attribute
			if (!newEl.isEqualNode(curEl)) {
				Array.from(newEl.attributes).forEach(attribute =>
					curEl.setAttribute(attribute.name, attribute.value)
				);
			}
		});
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
