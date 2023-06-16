package com.example.hiazee.utils

import com.example.hiazee.data.remote.models.CartModel
import com.example.hiazee.data.remote.requests.ProductItem
import org.json.JSONException
import org.json.JSONObject
import java.text.DecimalFormat
import java.text.DecimalFormatSymbols
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

fun calculateTotalPrice(cartItemList: List<CartModel>): Int {
    var totalPrice = 0
    for (cartItem in cartItemList) {
        totalPrice += cartItem.unitPrice * cartItem.count
    }
    return totalPrice
}

fun formatPrice(price: Int): String {
    val formattedPrice = NumberFormat.getNumberInstance(Locale.getDefault()).format(price)
    return "Rp $formattedPrice"
}

fun showPriceIndoFormat(price: Int): String {
    val decimalFormatSymbols = DecimalFormatSymbols().apply {
        groupingSeparator = '.'
    }
    val decimalFormat = DecimalFormat("#,###", decimalFormatSymbols)
    val formattedPrice = decimalFormat.format(price)
    return "Rp. $formattedPrice"
}

fun convertToProductItemList(cartItemList: List<CartModel>): List<ProductItem> {
    val productItemList = mutableListOf<ProductItem>()

    for (cartItem in cartItemList) {
        val productItem = ProductItem(
            id = cartItem.productId,
            quantity = cartItem.count
        )
        productItemList.add(productItem)
    }

    return productItemList
}