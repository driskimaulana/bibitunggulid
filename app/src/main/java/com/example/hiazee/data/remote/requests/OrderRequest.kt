package com.example.hiazee.data.remote.requests

data class OrderRequest(
    val products: List<ProductItem>,
    val shipAddressId: Int
)

data class ProductItem(
    val id: Int,
    val quantity: Int
)

