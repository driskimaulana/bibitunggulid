package com.example.hiazee.data.remote.requests

data class RegisterRequest(
    val fullName: String,
    val email: String,
    val phone: String,
    val password: String
)
