package com.example.hiazee.ui.viewmodels

import android.content.Context
import android.util.Log
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.hiazee.data.remote.UserDataStore
import com.example.hiazee.data.remote.models.LoginResponse
import com.example.hiazee.data.remote.models.UserData
import com.example.hiazee.data.remote.requests.LoginRequest
import com.example.hiazee.data.remote.retrofit.RetrofitClient
import com.example.hiazee.data.repository.UserRepository
import com.example.hiazee.ui.utils.showToast
import kotlinx.coroutines.launch
import org.json.JSONException
import org.json.JSONObject
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class AuthViewModel(private val userRepository: UserRepository) : ViewModel() {

    fun login(email: String, password: String) = userRepository.login(email, password)

    fun saveUserData(userdata: UserData) {
        viewModelScope.launch {
            userRepository.saveUserData(userdata)
        }
    }
}