package com.example.hiazee.ui.activities

import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.view.View
import android.widget.Toast
import androidx.activity.viewModels
import com.google.android.material.snackbar.Snackbar
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.WindowCompat
import androidx.lifecycle.lifecycleScope
import androidx.navigation.findNavController
import androidx.navigation.ui.AppBarConfiguration
import androidx.navigation.ui.navigateUp
import androidx.navigation.ui.setupActionBarWithNavController
import com.example.hiazee.R
import com.example.hiazee.data.remote.models.UserData
import com.example.hiazee.databinding.ActivityChangePasswordBinding
import com.example.hiazee.ui.viewmodels.AuthViewModel
import com.example.hiazee.ui.viewmodels.ProfileViewModel
import com.example.hiazee.utils.Result
import com.example.hiazee.utils.ViewModelFactory
import kotlinx.coroutines.launch

class ChangePasswordActivity : AppCompatActivity() {

    private lateinit var binding: ActivityChangePasswordBinding
    private lateinit var userData: UserData


    private val viewModel: ProfileViewModel by viewModels {
        ViewModelFactory.getInstance(this)
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        WindowCompat.setDecorFitsSystemWindows(window, false)
        super.onCreate(savedInstanceState)

        binding = ActivityChangePasswordBinding.inflate(layoutInflater)
        setContentView(binding.root)

        setSupportActionBar(binding.toolbar)
        binding.toolbar.setNavigationOnClickListener {
            super.onBackPressed();
        }
        binding.toolbar.setNavigationIcon(R.drawable.ic_arrow_back)

        lifecycleScope.launch {
            viewModel.getUserData().collect {
                userData = it
            }
        }

        initActionView()

    }

    private fun changePassword(oldPassword: String, newPassword: String) {
        viewModel.changePassword(userData.token, oldPassword, newPassword).observe(this) {
            if (it != null) {
                Log.d("driskidebug", "changePassword: ${it}")
                when (it) {
                    is Result.Loading -> {
                        loadingState(true)
                    }
                    is Result.Success -> {
                        Toast.makeText(this, "Ubah password berhasil.", Toast.LENGTH_SHORT)
                        loadingState(false)
                        super.onBackPressed()
                    }
                    is Result.Error -> {
                        loadingState(false)
                        Toast.makeText(this, it.error, Toast.LENGTH_SHORT)
                            .show()
                    }
                }
            }
        }
    }

    private fun initActionView() {
        binding.btnSubmitChangePassword.setOnClickListener {
            val oldPassword = binding.tfOldPassword.editText?.text.toString()
            val newPassword = binding.newPassword.getPassword()
            changePassword(oldPassword, newPassword)
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

}