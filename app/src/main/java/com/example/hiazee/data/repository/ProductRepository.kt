package com.example.hiazee.data.repository

import androidx.lifecycle.LiveData
import androidx.lifecycle.liveData
import com.example.hiazee.data.remote.api.ApiService
import com.example.hiazee.data.remote.models.ProductModel
import com.example.hiazee.utils.Result

class ProductRepository private constructor(
    private val apiService: ApiService,
) {

    fun getAllProducts(): LiveData<Result<List<ProductModel>>> = liveData {
        emit(Result.Loading)

        try {
            val response = apiService.getAllProducts()
            if (response.status != "error") {
                emit(Result.Success(response.data))
            } else {
                emit(Result.Error(response.message))
            }
        } catch (e: Exception) {
            emit(Result.Error(e.message.toString()))
        }
    }

    companion object {
        @Volatile
        private var instance: ProductRepository? = null
        fun getInstance(
            apiService: ApiService,
        ): ProductRepository =
            instance ?: synchronized(this) {
                instance ?: ProductRepository(apiService)
            }.also {
                instance = it
            }
    }
}