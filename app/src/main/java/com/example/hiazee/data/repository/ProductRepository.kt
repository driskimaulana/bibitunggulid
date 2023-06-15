package com.example.hiazee.data.repository

import androidx.lifecycle.LiveData
import androidx.lifecycle.liveData
import com.example.hiazee.data.remote.api.ApiService
import com.example.hiazee.data.remote.models.ProductModel
import com.example.hiazee.utils.Result

class ProductRepository private constructor(
    private val apiService: ApiService,
) {

    fun getAllProducts(key: String = ""): LiveData<Result<List<ProductModel>>> = liveData {
        emit(Result.Loading)

        try {
            val response = apiService.getAllProducts(key)
            if (response.status != "error") {
                emit(Result.Success(response.data))
            } else {
                emit(Result.Error(response.message))
            }
        } catch (e: Exception) {
            emit(Result.Error(e.message.toString()))
        }
    }

    fun getProductsTerlaris(): LiveData<Result<List<ProductModel>>> = liveData {
        emit(Result.Loading)

        try {
            val response = apiService.getProductsTerlaris()
            if (response.status != "error") {
                emit(Result.Success(response.data))
            } else {
                emit(Result.Error(response.message))
            }
        } catch (e: Exception) {
            emit(Result.Error(e.message.toString()))
        }
    }

    fun getProductsTerbaru(): LiveData<Result<List<ProductModel>>> = liveData {
        emit(Result.Loading)

        try {
            val response = apiService.getProductsTerbaru()
            if (response.status != "error") {
                emit(Result.Success(response.data))
            } else {
                emit(Result.Error(response.message))
            }
        } catch (e: Exception) {
            emit(Result.Error(e.message.toString()))
        }
    }

    fun getDetailProduct(productId: String): LiveData<Result<ProductModel>> = liveData {
        emit(Result.Loading)

        try {
            val response = apiService.getDetailProduct(productId)
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