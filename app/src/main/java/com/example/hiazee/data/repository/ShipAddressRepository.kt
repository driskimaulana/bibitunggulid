package com.example.hiazee.data.repository

import androidx.lifecycle.LiveData
import androidx.lifecycle.liveData
import com.example.hiazee.data.remote.api.ApiService
import com.example.hiazee.data.remote.models.ApiResponseNoData
import com.example.hiazee.data.remote.models.ShipAddressModel
import com.example.hiazee.data.remote.models.UserData
import com.example.hiazee.data.remote.requests.AddShipAddressRequest
import com.example.hiazee.data.remote.requests.LoginRequest
import com.example.hiazee.utils.Result
import com.example.hiazee.utils.extractErrorMessage
import retrofit2.awaitResponse

class ShipAddressRepository private constructor(
    private val apiService: ApiService,
) {

    fun getAllShipAddress(token: String): LiveData<Result<List<ShipAddressModel>>> = liveData {
        emit(Result.Loading)

        try {
            val response = apiService.getAllShipAddress("Bearer $token")
            if (response.status != "error") {
                emit(Result.Success(response.data))
            } else {
                emit(Result.Error(response.message))
            }
        } catch (e: Exception) {
            emit(Result.Error(e.message.toString()))
        }
    }

    fun addShipAddress(
        token: String,
        addShipAddressRequest: AddShipAddressRequest
    ): LiveData<Result<ShipAddressModel>> = liveData {
        emit(Result.Loading)

        try {
            val response = apiService.addShipAddress("Bearer $token", addShipAddressRequest).awaitResponse()
            if (response.isSuccessful) {
                val apiResponse = response.body()
                if (apiResponse != null) {
                    emit(Result.Success(apiResponse.data))
                }
            } else {
                val errorResponse = response.errorBody()?.string()
                emit(Result.Error(extractErrorMessage(errorResponse)))
            }
        } catch (e: Exception) {
            emit(Result.Error(e.message.toString()))
        }
    }

    fun deleteShipAddress(token: String, id: String): LiveData<Result<String>> = liveData {
        emit(Result.Loading)

        try {
            val response = apiService.deleteShipAddress("Bearer $token", id)
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
        private var instance: ShipAddressRepository? = null
        fun getInstance(
            apiService: ApiService,
        ): ShipAddressRepository =
            instance ?: synchronized(this) {
                instance ?: ShipAddressRepository(apiService)
            }.also {
                instance = it
            }
    }
}