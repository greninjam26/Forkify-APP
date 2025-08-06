import { TIMEOUT_SECONDS } from "./config";

export const timeout = function (s) {
	return new Promise(function (_, reject) {
		setTimeout(function () {
			reject(new Error(`Request took too long! Timeout after ${s} seconds`));
		}, s * 1000);
	});
};

export const getData = async function (url) {
	try {
		const resp = await Promise.race([fetch(url), timeout(TIMEOUT_SECONDS)]);
		if (!resp.ok) throw new Error(`🐛 💥 ${resp.message} (${resp.status})`);
		return await resp.json();
	} catch (err) {
		throw err;
	}
};

export const sendData = async function (url, uploadData) {
	try {
		const resp = await Promise.race([
			fetch(url, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(uploadData),
			}),
			timeout(TIMEOUT_SECONDS),
		]);
		if (!resp.ok) throw new Error(`🐛 💥 ${resp.message} (${resp.status})`);
		return await resp.json();
	} catch (err) {
		throw err;
	}
};
