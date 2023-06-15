package com.example.hiazee.ui.activities

import android.app.Activity
import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.JsonToken
import android.view.View
import android.view.inputmethod.EditorInfo
import android.widget.Toast
import androidx.activity.viewModels
import androidx.lifecycle.lifecycleScope
import com.example.hiazee.data.remote.models.UserData
import com.example.hiazee.data.remote.requests.AddShipAddressRequest
import com.example.hiazee.databinding.ActivityAddShipAddressBinding
import com.example.hiazee.databinding.ActivityShipAddressBinding
import com.example.hiazee.ui.viewmodels.ShipAddressViewModel
import com.example.hiazee.utils.Result
import com.example.hiazee.utils.ViewModelFactory
import kotlinx.coroutines.launch

class AddShipAddressActivity : AppCompatActivity() {
    private lateinit var binding: ActivityAddShipAddressBinding
    private val viewModel: ShipAddressViewModel by viewModels {
        ViewModelFactory.getInstance(this)
    }
    private lateinit var userData: UserData

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityAddShipAddressBinding.inflate(layoutInflater)
        setContentView(binding.root)

        lifecycleScope.launch {
            viewModel.getUserData().collect {
                userData = it
            }
        }

        initActionView()
    }

    private fun initActionView() {
        binding.backButton.setOnClickListener {
            onBackPressedDispatcher.onBackPressed()
        }

        binding.buttonSubmit.setOnClickListener {
            val name = binding.etName.text.toString()
            val phone = binding.etPhone.text.toString()
            val province = binding.etProvince.text.toString()
            val city = binding.etCity.text.toString()
            val subDistrict = binding.etSubDistrict.text.toString()
            val fullAddress = binding.etFullAddress.text.toString()
            val postalCode = binding.etPostalCode.text.toString()

            val request = AddShipAddressRequest(
                name = name,
                phone = phone,
                province = province,
                city = city,
                subDistrict = subDistrict,
                fullAddress = fullAddress,
                postalCode = postalCode
            )

            submitAddShipAddress(request)
        }
    }

    private fun submitAddShipAddress(request: AddShipAddressRequest) {
        if (userData.token.isNotEmpty()) {
            viewModel.addShipAddress(userData.token, request)
                .observe(this) {
                    if (it != null) {
                        when (it) {
                            is Result.Loading -> {
                                loadingState(true)
                            }
                            is Result.Success -> {
                                loadingState(false)
                                finishActivity()
                            }
                            is Result.Error -> {
                                loadingState(false)
                                Toast.makeText(this, it.error, Toast.LENGTH_SHORT).show()
                            }
                        }
                    }
                }
        }
    }

    private fun loadingState(isLoading: Boolean) {
        if (isLoading) {
            binding.apply {
                submitTextview.visibility = View.INVISIBLE
                submitLoading.visibility = View.VISIBLE
            }
        } else {
            binding.apply {
                submitTextview.visibility = View.VISIBLE
                submitLoading.visibility = View.GONE
            }
        }
    }

    private fun finishActivity() {
        val intent = Intent()
        setResult(Activity.RESULT_OK, intent)
        finish()
    }
}