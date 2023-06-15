package com.example.hiazee.ui.viewmodels

import androidx.lifecycle.ViewModel
import com.example.hiazee.data.remote.models.UserData
import com.example.hiazee.data.repository.CartRepository
import com.example.hiazee.data.repository.ProductRepository
import com.example.hiazee.data.repository.UserRepository
import kotlinx.coroutines.flow.Flow

class SearchViewModel(
    private val userRepository: UserRepository,
    private val productRepository: ProductRepository,
    private val cartRepository: CartRepository
) : ViewModel() {

    fun getAllProducts(key: String) = productRepository.getAllProducts(key)

    fun addProductToCart(
        token: String,
        productId: String
    ) = cartRepository.addProductToCart(
        token,
        productId
    )

    fun getUserData(): Flow<UserData> = userRepository.getUserData()
}
