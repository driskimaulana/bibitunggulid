package com.example.hiazee.data.remote.models

import com.google.gson.annotations.SerializedName

data class ApiResponseNoData(
    @SerializedName("status")
    val status: String,
    @SerializedName("message")
    val message: String
)
