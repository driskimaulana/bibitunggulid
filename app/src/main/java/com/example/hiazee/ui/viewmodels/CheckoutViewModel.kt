package com.example.hiazee.ui.viewmodels

import androidx.lifecycle.ViewModel
import com.example.hiazee.data.remote.models.UserData
import com.example.hiazee.data.remote.requests.ProductItem
import com.example.hiazee.data.repository.CartRepository
import com.example.hiazee.data.repository.OrderListRepository
import com.example.hiazee.data.repository.ShipAddressRepository
import com.example.hiazee.data.repository.UserRepository
import kotlinx.coroutines.flow.Flow

class CheckoutViewModel(
    private val userRepository: UserRepository,
    private val cartRepository: CartRepository,
    private val shipAddressRepository: ShipAddressRepository,
    private val orderListRepository: OrderListRepository
) : ViewModel() {

    fun getUserData(): Flow<UserData> = userRepository.getUserData()

    fun getCart(token: String) = cartRepository.getCart(token)

    fun addOrder(
        token: String,
        products: List<ProductItem>,
        shipAddressId: Int
    ) = orderListRepository.addOrder(
        token,
        products,
        shipAddressId
    )

    fun getAllShipAddress(token: String) = shipAddressRepository.getAllShipAddress(token)
}