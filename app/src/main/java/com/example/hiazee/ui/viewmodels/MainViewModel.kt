package com.example.hiazee.ui.viewmodels

import androidx.lifecycle.ViewModel
import androidx.lifecycle.asLiveData
import androidx.lifecycle.viewModelScope
import com.example.hiazee.data.remote.models.UserData
import com.example.hiazee.data.repository.UserRepository
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.launch

class MainViewModel(private val userRepository: UserRepository) : ViewModel() {

    fun getUserData(): Flow<UserData> = userRepository.getUserData()

    fun deleteUserData() {
        viewModelScope.launch {
            userRepository.deleteUserData()
        }
    }
}