package com.example.hiazee.data.remote.api

import com.example.hiazee.data.remote.models.*
import com.example.hiazee.data.remote.requests.LoginRequest
import retrofit2.Call
import retrofit2.http.Body
import retrofit2.http.GET
import retrofit2.http.Header
import retrofit2.http.POST

interface ApiService {
    @POST("authentication/signin")
    fun login(@Body request: LoginRequest): Call<ApiResponse<UserData>>

    @GET("product")
    suspend fun getAllProducts(): ApiResponse<List<ProductModel>>

    @GET("shipaddress")
    suspend fun getAllShipAddress(
        @Header("Authorization") token: String,
    ): ApiResponse<List<ShipAddressModel>>
}