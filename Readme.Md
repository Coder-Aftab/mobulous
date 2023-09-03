# Base Path /api

## /admin

    POST: /login

## /user

    POST: /login
    POST: /signup
    GET: /getAggregations

## /products

    GET: /all
    POST: /add

## order

Base Path /api/orders

    only admin can access
    GET: /new ->getNewOrders
    GET: /all ->getAllOrders
    PUT: /:id/accept
    PUT: /:id/reject

    user can access
    POST: /  -> createOrder
    GET: /:id ->getOrderById
    GET: / ->getUserOrders

## notifications

    GET: / -> getNotifications
