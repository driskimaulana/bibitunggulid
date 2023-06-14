package com.example.hiazee.data.remote.models

import com.google.gson.annotations.SerializedName

data class ProductInOrderListModel(
    @SerializedName("id")
    val id: Int,
    @SerializedName("productName")
    val productName: String,
    @SerializedName("pictures")
    val pictures: Array<String>,
    @SerializedName("unitPrice")
    val unitPrice: Double,
    @SerializedName("quantity")
    val quantity: Int
)
