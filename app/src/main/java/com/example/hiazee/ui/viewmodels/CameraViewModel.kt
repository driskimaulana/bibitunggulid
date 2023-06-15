package com.example.hiazee.ui.viewmodels

import androidx.lifecycle.ViewModel
import com.example.hiazee.data.repository.MLRepository
import okhttp3.MultipartBody

class CameraViewModel(private val mlRepository: MLRepository) : ViewModel() {
    fun predictPlant(photo: MultipartBody.Part) = mlRepository.predictPlant(photo)

}