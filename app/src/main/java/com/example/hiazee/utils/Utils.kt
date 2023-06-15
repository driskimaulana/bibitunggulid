package com.example.hiazee.utils

import com.example.hiazee.data.remote.models.CartModel
import org.json.JSONException
import org.json.JSONObject
import java.text.NumberFormat
import java.util.*

fun extractErrorMessage(errorResponse: String?): String {
    return try {
        val json = JSONObject(errorResponse)
        json.getString("message")
    } catch (e: JSONException) {
        "Unknown error occurred"
    }
}

fun calculateTotalPrice(cartItemList: List<CartModel>): String {
    var totalPrice = 0
    for (cartItem in cartItemList) {
        totalPrice += cartItem.unitPrice * cartItem.count
    }
    return formatPrice(totalPrice)
}

fun formatPrice(price: Int): String {
    val formattedPrice = NumberFormat.getNumberInstance(Locale.getDefault()).format(price)
    return "Rp $formattedPrice"
}