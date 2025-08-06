class searchView {
	_parentEl = document.querySelector(".search");

	getTarget() {
		const target = this._parentEl.querySelector(".search__field").value;
		this._clearInput();
		return target;
	}

	_clearInput() {
		this._parentEl.querySelector(".search__field").value = "";
		this._parentEl.querySelector(".search__field").blur();
	}

	addHandlerRender(handler) {
		this._parentEl.addEventListener("submit", function (e) {
			e.preventDefault();
			handler();
		});
	}
}

export default new searchView();
