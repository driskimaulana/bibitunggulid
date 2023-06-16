package com.example.hiazee.data.remote.api

import com.example.hiazee.data.remote.models.*
import com.example.hiazee.data.remote.requests.*
import retrofit2.Call
import retrofit2.http.*

interface ApiService {
    @POST("authentication/signin")
    fun login(@Body request: LoginRequest): Call<ApiResponse<UserData>>

    @POST("authentication/signup")
    fun register(@Body request: RegisterRequest): Call<ApiResponse<UserData>>

    @GET("product")
    suspend fun getAllProducts(@Query("keyword") keyword: String?): ApiResponse<List<ProductModel>>

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

    @POST("orders")
    fun addOrder(
        @Header("Authorization") token: String,
        @Body request: OrderRequest
    ): Call<ApiResponse<OrderResponse>>

    @DELETE("shipaddress/{id}")
    suspend fun deleteShipAddress(
        @Header("Authorization") token: String,
        @Path("id") id: String
    ): ApiResponseNoData

    @GET("carts")
    suspend fun getCart(
        @Header("Authorization") token: String,
    ): ApiResponse<List<CartModel>>

    @POST("carts")
    fun addProductToCart(
        @Header("Authorization") token: String,
        @Body request: AddProductToCartRequest
    ): Call<ApiResponse<CartModel>>

    @DELETE("carts/{id}")
    suspend fun deleteProductFromCart(
        @Header("Authorization") token: String,
        @Path("id") id: String
    ): ApiResponseNoData

    @PUT("carts/{id}")
    suspend fun reduceProductFromCart(
        @Header("Authorization") token: String,
        @Path("id") id: String
    ): ApiResponseNoData
}