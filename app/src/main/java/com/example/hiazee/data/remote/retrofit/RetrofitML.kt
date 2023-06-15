package com.example.hiazee.data.remote.retrofit

import com.example.hiazee.data.remote.api.ApiServiceML
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory

object RetrofitML {
    private const val BASE_URL = "https://ml-bibitunggulid-zldx7crkfq-et.a.run.app/"

    private val retrofit: Retrofit by lazy {
        Retrofit.Builder()
            .baseUrl(BASE_URL)
            .addConverterFactory(GsonConverterFactory.create())
            .build()
    }

    val apiService: ApiServiceML by lazy {
        retrofit.create(ApiServiceML::class.java)
    }
}