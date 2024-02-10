/** @type {import('next').NextConfig} */
const nextConfig = {
	env: {
		/* 		API_PATH: "http://localhost:3001", */ // Local
		API_PATH: "https://fastpay-api-production.up.railway.app", // Production
	},
};

export default nextConfig;
