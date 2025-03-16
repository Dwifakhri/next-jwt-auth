// /* eslint-disable @typescript-eslint/no-explicit-any */
// import axios from "axios";
// // import { cookies } from "next/headers";
// import { redirect } from "next/navigation";

// const api = axios.create({
//   baseURL: "http://localhost:8000" + "/api"
// });

// // const cookie = cookies();

// api.interceptors.request.use(
//   async (config) => {
//     const token = (await cookie).get("token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     if (error.response?.status === 401) {
//       (await cookie).delete("token");
//       return redirect("/login");
//     }
//     return Promise.reject(error);
//   }
// );

// export default api;
