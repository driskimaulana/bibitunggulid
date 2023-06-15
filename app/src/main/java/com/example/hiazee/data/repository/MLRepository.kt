package com.example.hiazee.data.repository

import androidx.lifecycle.LiveData
import androidx.lifecycle.liveData
import com.example.hiazee.data.remote.api.ApiServiceML
import com.example.hiazee.data.remote.models.PredictPlantResponse
import com.example.hiazee.utils.Result
import okhttp3.MultipartBody

class MLRepository private constructor(
    private val apiService: ApiServiceML,
) {
    fun predictPlant(photo: MultipartBody.Part): LiveData<Result<PredictPlantResponse>> = liveData {
        emit(Result.Loading)

        try {
            val response = apiService.predictPlant(photo)
            if (response.isSuccessful) {
                val body = response.body()
                body?.let {emit(Result.Success(body))}
            } else {
                emit(Result.Error(response.message()))
            }
        } catch (e: Exception) {
            emit(Result.Error(e.message.toString()))
        }
    }

    companion object {
        @Volatile
        private var instance: MLRepository? = null
        fun getInstance(
            apiService: ApiServiceML,
        ): MLRepository =
            instance ?: synchronized(this) {
                instance ?: MLRepository(apiService)
            }.also {
                instance = it
            }
    }
}