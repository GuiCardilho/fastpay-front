import axios from "axios";
import Cookies from "js-cookie";

const token = Cookies.get("user-auth");

const api = axios.create({
	baseURL: process.env.API_PATH,
	headers: {
		Authorization: `Bearer ${token}`,
		"Content-Type": "application/json",
	},
});

api.interceptors.request.use(async (config: any) => {
	config.headers.Authorization = `Bearer ${Cookies.get("user-auth")}`;
	return config;
});

api.interceptors.response.use(
	(response) => response,
	(error) => {
		const err = error.response;
		if (
			(err.data.responseLabel !== "INVALID_CREDENTIALS" &&
				err.status === 401 &&
				err.config &&
				!err.config.__isRetryRequest) ||
			err.data.error === "jwt expired" ||
			err.statusText === "Unauthorized" ||
			err.statusText === "Forbidden" ||
			err.status === 403
		) {
			window.location.replace("/");
		} else {
			return Promise.reject(error);
		}
	},
);

export { api };
