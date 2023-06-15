package com.example.hiazee.ui.viewmodels

import androidx.lifecycle.ViewModel
import com.example.hiazee.data.remote.models.UserData
import com.example.hiazee.data.remote.requests.AddShipAddressRequest
import com.example.hiazee.data.repository.OrderListRepository
import com.example.hiazee.data.repository.ShipAddressRepository
import com.example.hiazee.data.repository.UserRepository
import kotlinx.coroutines.flow.Flow

class OrderListViewModel(
    private val userRepository: UserRepository,
    private val orderListRepository: OrderListRepository
) : ViewModel() {

    fun getUserData(): Flow<UserData> = userRepository.getUserData()

    fun getCustomerOrderList(token: String) = orderListRepository.getCustomerOrderList(token)

    fun getCustomerOrderDetails(token: String, orderId: Int) = orderListRepository.getCustomerOrderDetails(token, orderId)

    fun getCustomerOrderPaymentDetails(token: String, orderId: Int) = orderListRepository.getCustomerOrderPaymentDetails(token, orderId)
    fun changeOrderStatusToFinish(token: String, orderId: Int) = orderListRepository.changeOrderStatusToFinish(token, orderId)

}