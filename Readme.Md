# Base Path /api

## /admin

    POST: /login

## /users

    user can access
    POST: /login
    POST: /signup
    GET: /users-products ->getAggregations

    admin can access
    GET: /all ->getUserList
    GET: /search ->searchUser

    PUT: /:id/activate ->activateUser
    PUT: /:id/deactivate ->blockUser
    DELETE: /:id ->deleteUser

## /products

    users can access
    GET: /  ->getProductsBasedOnLocation

    admin can access
    GET: /all -> getAllProducts
    POST: / ->addProduct

## /orders

    only admin can access
    GET: /new ->getNewOrders
    GET: /all ->getAllOrders
    PUT: /:id/accept
    PUT: /:id/reject

    user can access
    POST: /  -> createOrder
    GET: /:id ->getOrderById
    GET: / ->getUserOrders

## /warehouses

    admin can access
    PUT: /:wareHouseId/:productId ->updateProduct
    PUT: / ->createWarehouse

## /notifications

    GET: / -> getNotifications
