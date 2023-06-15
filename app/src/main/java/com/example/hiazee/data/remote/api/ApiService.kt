package com.example.hiazee.data.remote.api

import com.example.hiazee.data.remote.models.*
import com.example.hiazee.data.remote.requests.AddShipAddressRequest
import com.example.hiazee.data.remote.requests.LoginRequest
import retrofit2.Call
import retrofit2.http.*

interface ApiService {
    @POST("authentication/signin")
    fun login(@Body request: LoginRequest): Call<ApiResponse<UserData>>

    @GET("product")
    suspend fun getAllProducts(): ApiResponse<List<ProductModel>>

    @GET("shipaddress")
    suspend fun getAllShipAddress(
        @Header("Authorization") token: String,
    ): ApiResponse<List<ShipAddressModel>>

    @POST("shipaddress")
    fun addShipAddress(
        @Header("Authorization") token: String,
        @Body request: AddShipAddressRequest
    ): Call<ApiResponse<ShipAddressModel>>

    @GET("orders/customer")
    suspend fun getCustomerOrderList(
        @Header("Authorization") token: String,
    ): ApiResponse<List<OrderModel>>

    @GET("orders/details/{id}")
    suspend fun getCustomerOrderDetails(
        @Header("Authorization") token: String,
        @Path("id") orderId: Int,
    ): ApiResponse<OrderDetailsModel>

    @GET("orders/details/payment/{id}")
    suspend fun getCustomerOrderPaymentDetails(
        @Header("Authorization") token: String,
        @Path("id") orderId: Int,
    ): ApiResponse<PaymentDetailsModel>

    @PUT("orders/finish/{id}")
    suspend fun changeOrderStatusToFinish(
        @Header("Authorization") token: String,
        @Path("id") orderId: Int,
    ): ApiResponse<Nothing>


    @DELETE("shipaddress/{id}")
    suspend fun deleteShipAddress(
        @Header("Authorization") token: String,
        @Path("id") id: String
    ): ApiResponseNoData
}