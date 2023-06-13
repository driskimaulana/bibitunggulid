package com.example.hiazee.data.remote.models

data class ProductModel(
    val id: Int,
    val supplierId: Int,
    val productName: String,
    val productDescription: String,
    val categoryId: Int,
    val unitPrice: Double,
    val unitWeight: Double,
    val unitInStock: Int?,
    val adminId: Int,
    val planId: Int?,
    val slug: String,
    val pictures: List<String>,
    val createdAt: String,
    val updatedAt: String
)
