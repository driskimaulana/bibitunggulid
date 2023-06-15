package com.example.hiazee.data.repository

import android.util.Log
import androidx.lifecycle.LiveData
import androidx.lifecycle.liveData
import com.example.hiazee.data.remote.api.ApiService
import com.example.hiazee.data.remote.models.OrderDetailsModel
import com.example.hiazee.data.remote.models.OrderModel
import com.example.hiazee.data.remote.models.OrderResponse
import com.example.hiazee.data.remote.models.PaymentDetailsModel
import com.example.hiazee.data.remote.requests.AddProductToCartRequest
import com.example.hiazee.data.remote.requests.OrderRequest
import com.example.hiazee.data.remote.requests.ProductItem
import com.example.hiazee.utils.Result
import com.example.hiazee.utils.extractErrorMessage
import retrofit2.awaitResponse


class OrderListRepository private constructor(
    private val apiService: ApiService
){

    fun getCustomerOrderList(token: String): LiveData<Result<List<OrderModel>>> = liveData {
        emit(Result.Loading)

        try {

            val response = apiService.getCustomerOrderList("Bearer $token")
            if (response.status != "error") {
                emit(Result.Success(response.data))
            } else {
                emit(Result.Error(response.message))
            }

        } catch (e: Exception) {
            emit(Result.Error(e.message.toString()))
        }
    }

    fun getCustomerOrderDetails(token: String, orderId: Int): LiveData<Result<OrderDetailsModel>> =
        liveData {
            emit(Result.Loading)
            try {
                val response = apiService.getCustomerOrderDetails("Bearer $token", orderId)
                if (response.status != "error") {
                    emit(Result.Success(response.data))
                } else {
                    emit(Result.Error(response.message))
                }

            } catch (e: Exception) {
                emit(Result.Error(e.message.toString()))
            }
        }

    fun getCustomerOrderPaymentDetails(token: String, orderId: Int): LiveData<Result<PaymentDetailsModel>> =
        liveData {
            emit(Result.Loading)
            try {
                val response = apiService.getCustomerOrderPaymentDetails("Bearer $token", orderId)
                if (response.status != "error") {
                    emit(Result.Success(response.data))
                } else {
                    emit(Result.Error(response.message))
                }
            } catch (e: Exception) {
                emit(Result.Error(e.message.toString()))
            }
        }

    fun changeOrderStatusToFinish(token: String, orderId: Int): LiveData<Result<Nothing>> =
        liveData {
            emit(Result.Loading)
            try {
                val response = apiService.changeOrderStatusToFinish("Bearer $token", orderId)
                if (response.status != "error") {
                    emit(Result.Success(response.data))
                } else {
                    emit(Result.Error(response.message))
                }
            } catch (e: Exception) {
                emit(Result.Error(e.message.toString()))
            }
        }

    fun addOrder(
        token: String,
        products: List<ProductItem>,
        shipAddressId: Int
    ): LiveData<Result<OrderResponse>> = liveData {
        emit(Result.Loading)
        val request = OrderRequest(products, shipAddressId)

        try {
            val response = apiService.addOrder("Bearer $token", request).awaitResponse()
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

    companion object {
        @Volatile
        private var instance: OrderListRepository? = null
        fun getInstance(
            apiService: ApiService,
        ): OrderListRepository =
            instance ?: synchronized(this) {
                instance ?: OrderListRepository(apiService)
            }.also {
                instance = it
            }
    }

}