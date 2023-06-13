package com.example.hiazee.data.remote.models

data class ShipAddressModel(
    val id: Int,
    val name: String,
    val phone: String,
    val province: String,
    val city: String,
    val subDistrict: String,
    val fullAddress: String,
    val postalCode: String,
    val customerId: Int,
    val createdAt: String,
    val updatedAt: String
)
