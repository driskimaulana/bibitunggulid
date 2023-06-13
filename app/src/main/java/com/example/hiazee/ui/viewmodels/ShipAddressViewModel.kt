package com.example.hiazee.ui.viewmodels

import androidx.lifecycle.ViewModel
import com.example.hiazee.data.remote.models.UserData
import com.example.hiazee.data.repository.ShipAddressRepository
import com.example.hiazee.data.repository.UserRepository
import kotlinx.coroutines.flow.Flow

class ShipAddressViewModel(private val userRepository: UserRepository, private val shipAddressRepository: ShipAddressRepository) : ViewModel() {

    fun getAllShipAddress(token: String) = shipAddressRepository.getAllShipAddress(token)

    fun getUserData(): Flow<UserData> = userRepository.getUserData()
}