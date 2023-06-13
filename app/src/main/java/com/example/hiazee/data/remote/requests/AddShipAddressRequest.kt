package com.example.hiazee.data.remote.requests

data class AddShipAddressRequest(
    val name: String,
    val phone: String,
    val province: String,
    val city: String,
    val subDistrict: String,
    val fullAddress: String,
    val postalCode: String
)
