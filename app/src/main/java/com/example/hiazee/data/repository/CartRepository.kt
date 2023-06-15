package com.example.hiazee.data.repository

import android.util.Log
import androidx.lifecycle.LiveData
import androidx.lifecycle.liveData
import com.example.hiazee.data.remote.api.ApiService
import com.example.hiazee.data.remote.models.CartModel
import com.example.hiazee.data.remote.requests.AddProductToCartRequest
import com.example.hiazee.utils.Result
import com.example.hiazee.utils.extractErrorMessage
import retrofit2.awaitResponse

class CartRepository private constructor(
    private val apiService: ApiService,
) {

    fun getCart(token: String): LiveData<Result<List<CartModel>>> = liveData {
        emit(Result.Loading)

        try {
            val response = apiService.getCart("Bearer $token")
            if (response.status != "error") {
                emit(Result.Success(response.data))
            } else {
                emit(Result.Error(response.message))
            }
        } catch (e: Exception) {
            emit(Result.Error(e.message.toString()))
        }
    }

    fun addProductToCart(
        token: String,
        productId: String
    ): LiveData<Result<String>> = liveData {
        emit(Result.Loading)
        val request = AddProductToCartRequest(productId)

        try {
            val response = apiService.addProductToCart("Bearer $token", request).awaitResponse()
            if (response.isSuccessful) {
                val apiResponse = response.body()
                if (apiResponse != null) {
                    emit(Result.Success(apiResponse.message))
                }
            } else {
                val errorResponse = response.errorBody()?.string()
                emit(Result.Error(extractErrorMessage(errorResponse)))
            }
        } catch (e: Exception) {
            emit(Result.Error(e.message.toString()))
        }
    }

    fun deleteProductFromCart(token: String, productId: String): LiveData<Result<String>> = liveData {
        emit(Result.Loading)

        try {
            val response = apiService.deleteProductFromCart("Bearer $token", productId)
            if (response.status != "error") {
                emit(Result.Success(response.message))
            } else {
                emit(Result.Error(response.message))
            }
        } catch (e: Exception) {
            emit(Result.Error(e.message.toString()))
        }
    }

    fun reduceProductFromCart(token: String, productId: String): LiveData<Result<String>> = liveData {
        emit(Result.Loading)

        try {
            val response = apiService.reduceProductFromCart("Bearer $token", productId)
            if (response.status != "error") {
                emit(Result.Success(response.message))
            } else {
                emit(Result.Error(response.message))
            }
        } catch (e: Exception) {
            emit(Result.Error(e.message.toString()))
        }
    }

    companion object {
        @Volatile
        private var instance: CartRepository? = null
        fun getInstance(
            apiService: ApiService,
        ): CartRepository =
            instance ?: synchronized(this) {
                instance ?: CartRepository(apiService)
            }.also {
                instance = it
            }
    }
}