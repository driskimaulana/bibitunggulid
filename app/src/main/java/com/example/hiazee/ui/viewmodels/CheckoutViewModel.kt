package com.example.hiazee.ui.viewmodels

import androidx.lifecycle.ViewModel
import com.example.hiazee.data.remote.models.UserData
import com.example.hiazee.data.repository.CartRepository
import com.example.hiazee.data.repository.UserRepository
import kotlinx.coroutines.flow.Flow

class CheckoutViewModel(
    private val userRepository: UserRepository,
    private val cartRepository: CartRepository
) : ViewModel() {

    fun getUserData(): Flow<UserData> = userRepository.getUserData()

    fun getCart(token: String) = cartRepository.getCart(token)

    fun deleteProductFromCart(token: String, productId: String) = cartRepository.deleteProductFromCart(token, productId)

    fun addProductToCart(
        token: String,
        productId: String
    ) = cartRepository.addProductToCart(
        token,
        productId
    )

    fun reduceProductFromCart(token: String, productId: String) = cartRepository.reduceProductFromCart(token, productId)
}