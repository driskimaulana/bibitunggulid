package com.example.hiazee.data.remote.requests

data class ChangePasswordRequest(
    val oldPassword: String,
    val newPassword: String
)
