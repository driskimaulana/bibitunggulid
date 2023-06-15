package com.example.hiazee.data.repository

import androidx.lifecycle.LiveData
import androidx.lifecycle.liveData
import com.example.hiazee.data.local.datastore.UserPreference
import com.example.hiazee.data.remote.api.ApiService
import com.example.hiazee.data.remote.models.UserData
import com.example.hiazee.data.remote.requests.LoginRequest
import com.example.hiazee.data.remote.requests.RegisterRequest
import com.example.hiazee.utils.Result
import com.example.hiazee.utils.extractErrorMessage
import retrofit2.awaitResponse

class UserRepository private constructor(
    private val apiService: ApiService,
    private val preferences: UserPreference
) {
    fun login(email: String, password: String): LiveData<Result<UserData>> = liveData {
        emit(Result.Loading)
        val loginRequest = LoginRequest(email, password)

        try {
            val response = apiService.login(loginRequest).awaitResponse()
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

    fun register(
        fullname: String,
        email: String,
        phone: String,
        password: String
    ): LiveData<Result<UserData>> = liveData {
        emit(Result.Loading)
        val registerRequest = RegisterRequest(fullname, email, phone, password)

        try {
            val response = apiService.register(registerRequest).awaitResponse()
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

    suspend fun saveUserData(userdata: UserData) {
        preferences.saveUserData(userdata)
    }

    fun getUserData() = preferences.userDataFlow

    suspend fun deleteUserData() {
        preferences.deleteUserData()
    }

    companion object {
        @Volatile
        private var instance: UserRepository? = null
        fun getInstance(
            apiService: ApiService,
            preferences: UserPreference
        ): UserRepository =
            instance ?: synchronized(this) {
                instance ?: UserRepository(apiService, preferences)
            }.also {
                instance = it
            }
    }
}