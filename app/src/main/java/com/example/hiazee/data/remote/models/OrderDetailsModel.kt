package com.example.hiazee.data.remote.models

data class OrderDetailsModel(
    val id: Int,
    val freight: Double,
    val createdAt: String,
    val statusName: String,
    val paymentId: String,
    val fullAddress: String,
    val name: String,
    val shipPhone: String,
    val shipmentId: Int? = null,
    val province: String,
    val city: String,
    val subDistrict: String,
    val postalCode: String,
    val products: Array<ProductInOrderListModel>,
    val courierName: String,
    val phone: String,
    val delieveryTime: String,
    val estimatedReceiveTime: String,
    val totalHarga: Double

)