package com.example.hiazee.data.remote.models

data class PaymentDetailsModel(
    val status: String,
    val amount: Double,
    val url: String,
    val expireDate: String? = null
)
