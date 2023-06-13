package com.example.hiazee.utils

import org.json.JSONException
import org.json.JSONObject

fun extractErrorMessage(errorResponse: String?): String {
    return try {
        val json = JSONObject(errorResponse)
        json.getString("message")
    } catch (e: JSONException) {
        "Unknown error occurred"
    }
}