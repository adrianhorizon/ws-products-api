const express = require('express');
const app = express();
const { config } = require('./config/index');
const productsApi = require('./routes/products');
const couponApi = require('./routes/coupon');
const { logErrors, wrapErrors, errorHandler } = require('./utils/middleware/errorHandlers');
const notFoundHandler = require('./utils/middleware/notFoundHandler');

app.use(express.json());

productsApi(app);
couponApi(app);

app.use(notFoundHandler);
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);

app.listen(config.port, () => console.log(`Listening ${config.port}`));

