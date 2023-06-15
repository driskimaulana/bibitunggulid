package com.example.hiazee.utils

import android.content.Context
import androidx.datastore.core.DataStore
import androidx.datastore.preferences.core.Preferences
import androidx.datastore.preferences.preferencesDataStore
import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider
import com.example.hiazee.data.repository.*
import com.example.hiazee.di.Injection
import com.example.hiazee.ui.viewmodels.*

class ViewModelFactory private constructor(
    private val userRepository: UserRepository,
    private val productRepository: ProductRepository,
    private val shipAddressRepository: ShipAddressRepository,
    private val cartRepository: CartRepository,
    private val orderListRepository: OrderListRepository,
    private val mlRepository: MLRepository

) : ViewModelProvider.NewInstanceFactory() {
    @Suppress("UNCHECKED_CAST")
    override fun <T : ViewModel> create(modelClass: Class<T>): T {
        return when {
            modelClass.isAssignableFrom(MainViewModel::class.java) -> MainViewModel(userRepository) as T
            modelClass.isAssignableFrom(AuthViewModel::class.java) -> AuthViewModel(userRepository) as T
            modelClass.isAssignableFrom(HomeViewModel::class.java) -> HomeViewModel(
                userRepository,
                productRepository,
                cartRepository
            ) as T
            modelClass.isAssignableFrom(ProfileViewModel::class.java) -> ProfileViewModel(
                userRepository
            ) as T
            modelClass.isAssignableFrom(ShipAddressViewModel::class.java) -> ShipAddressViewModel(
                userRepository,
                shipAddressRepository
            ) as T
            modelClass.isAssignableFrom(OrderListViewModel::class.java) -> OrderListViewModel(
                userRepository,
                orderListRepository
            ) as T
            modelClass.isAssignableFrom(DetailProductViewModel::class.java) -> DetailProductViewModel(
                userRepository,
                productRepository,
                cartRepository
            ) as T
            modelClass.isAssignableFrom(CartViewModel::class.java) -> CartViewModel(
                userRepository,
                cartRepository
            ) as T
            modelClass.isAssignableFrom(SearchViewModel::class.java) -> SearchViewModel(
                userRepository,
                productRepository,
                cartRepository
            ) as T
            modelClass.isAssignableFrom(CheckoutViewModel::class.java) -> CheckoutViewModel(
                userRepository,
                cartRepository,
                shipAddressRepository,
                orderListRepository
            ) as T
            modelClass.isAssignableFrom(CameraViewModel::class.java) -> CameraViewModel(
                mlRepository
            ) as T
            else -> throw IllegalArgumentException("Unknown ViewModel class: " + modelClass.name)
        }
    }

    companion object {
        private val Context.dataStore: DataStore<Preferences> by preferencesDataStore(name = "userdata")

        @Volatile
        private var instance: ViewModelFactory? = null
        fun getInstance(context: Context): ViewModelFactory =
            instance ?: synchronized(this) {
                instance ?: ViewModelFactory(
                    Injection.provideUserRepository(context.dataStore),
                    Injection.provideProductRepository(),
                    Injection.provideShipAddressRepository(),
                    Injection.provideCartRepository(),
                    Injection.provideOrderListRepository(),
                    Injection.provideMLRepository()
                    )
            }.also {
                instance = it
            }
    }
}