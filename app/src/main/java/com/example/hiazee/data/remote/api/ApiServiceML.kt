package com.example.hiazee.data.remote.api

import com.example.hiazee.data.remote.models.PredictPlantResponse
import okhttp3.MultipartBody
import retrofit2.Call
import retrofit2.Response
import retrofit2.http.Multipart
import retrofit2.http.POST
import retrofit2.http.Part
import java.io.File

interface ApiServiceML {

    @Multipart
    @POST("android")
    suspend fun predictPlant(
        @Part file: MultipartBody.Part,
    ): Response<PredictPlantResponse>
}