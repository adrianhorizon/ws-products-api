# Products api

- CRUD rest api example 
- two microservices local `http://localhost:3000`
- production coupon GET, POST `https://ws-products-api.adrianhorizon.vercel.app/api/coupon`
- production products CRUD `https://ws-products-api.adrianhorizon.vercel.app/api/products`
- deploy production use [Zeit](Zeit.co)

## Install project

- `$ npm install`

### Set Enviroment to development mode

- `$ npm run init`

### Run project

- `$ npm run develop`

## Docker compile

- `$ npm run docker`

## Docker compose

- docker-compose build
- docker-compose up

### requirements

- `Nodejs`
- `Docker`
- `MongoDb`

### USE coupons api development Postman or soapUi

- GET
```
curl --location --request GET 'http://localhost:3000/api/coupon/'
```

- POST 
```
curl --location --request POST 'http://localhost:3000/api/coupon' \
--header 'Content-Type: application/json' \
--data-raw '{
    "items_ids": ["MLA1", "MLA2", "MLA1"],
    "amount": 5600
}'
```

### USE products api development Postman or soapUi

- GET filter query `name` and `item_id`
```
curl --location --request GET 'http://localhost:3000/api/products?item_id=MLA1'
```

- POST
```
curl --location --request POST 'http://localhost:3000/api/products' \
--header 'Content-Type: application/json' \
--data-raw '{
   "name":"algodon",
   "amount": "5000"
   "item_id": "ML1"
}'
```

- PUT
```
curl --location --request PUT 'http://localhost:3000/api/products/5e0d4e07a246c97e9a07d729' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "algodon",
    "amount": "5.45"
    "item_ud": "MLA"
}'
```

- DELETE
```
curl --location --request DELETE 'http://localhost:3000/api/products/5e0d37dcad07d956423d9de8'
```

### File Structure

```
├── config
├── lib
├── routes
├── services
├── test
└── utils
```