package com.example.hiazee.data.remote.api

import com.example.hiazee.data.remote.models.*
import com.example.hiazee.data.remote.requests.AddProductToCartRequest
import com.example.hiazee.data.remote.requests.AddShipAddressRequest
import com.example.hiazee.data.remote.requests.LoginRequest
import retrofit2.Call
import retrofit2.http.*

interface ApiService {
    @POST("authentication/signin")
    fun login(@Body request: LoginRequest): Call<ApiResponse<UserData>>

    @GET("product")
    suspend fun getAllProducts(): ApiResponse<List<ProductModel>>

    @GET("product?keyfilter=terlaris")
    suspend fun getProductsTerlaris(): ApiResponse<List<ProductModel>>

    @GET("product?keyfilter=terbaru")
    suspend fun getProductsTerbaru(): ApiResponse<List<ProductModel>>

    @GET("product/{id}")
    suspend fun getDetailProduct(
        @Path("id") id: String
    ): ApiResponse<ProductModel>

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

    @DELETE("shipaddress/{id}")
    suspend fun deleteShipAddress(
        @Header("Authorization") token: String,
        @Path("id") id: String
    ): ApiResponseNoData

    @POST("carts")
    fun addProductToCart(
        @Header("Authorization") token: String,
        @Body request: AddProductToCartRequest
    ): Call<ApiResponse<CartModel>>
}