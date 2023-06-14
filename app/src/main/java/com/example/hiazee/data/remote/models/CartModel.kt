package com.example.hiazee.data.remote.models

data class CartModel(
    val id: Int,
    val productId: Int,
    val productName: String,
    val unitPrice: Int,
    val pictures: List<String>,
    val count: Int
)

