package com.example.hiazee.data.remote.models

import com.google.gson.annotations.SerializedName

data class OrderModel(
    @SerializedName("id")
    val id: Int,
    @SerializedName("statusName")
    val statusName: String,
    @SerializedName("freight")
    val freight: Double,
    @SerializedName("createdAt")
    val createdAt: String,
    @SerializedName("fullAddress")
    val fullAddress: String,
    @SerializedName("products")
    val products: List<ProductInOrderListModel>
)
