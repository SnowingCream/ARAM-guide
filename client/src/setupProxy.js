// import { createProxyMiddleware } from "http-proxy-middleware";

// export default function (app) {
//     app.use(
//         "/api",
//         createProxyMiddleware({
//             target: "http://localhost:4000",
//             changeOrigin: true,
//         })
//     );
// };

const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://localhost:4000',
            changeOrigin: true,
        })
    );
};
