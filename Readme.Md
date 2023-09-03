# Base Path /api

## /admin

    POST: /login

## /user

    user can access
    POST: /login
    POST: /signup
    GET: /users-products

    admin can access
    GET: /all ->getUserList
    GET: /search ->searchUser

    PUT: /:id/activate ->activateUser
    PUT: /:id/deactivate ->blockUser
    PUT: /:id/delete ->deleteUser

## /products

    admin can access
    GET: /all -> getAllProducts
    POST: / ->addProduct
    GET: /  ->filterProducts

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

## /warehouse

    admin can access
    PUT: /:wareHouseId/:productId ->updateProduct
    PUT: / ->createWarehouse

## /notifications

    GET: / -> getNotifications
