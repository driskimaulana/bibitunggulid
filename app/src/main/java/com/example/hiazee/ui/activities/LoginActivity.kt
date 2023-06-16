package com.example.hiazee.ui.activities

import android.content.Intent
import android.graphics.Color
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.text.InputType
import android.util.Log
import android.view.View
import android.widget.Toast
import androidx.activity.viewModels
import androidx.appcompat.app.AlertDialog
import androidx.appcompat.content.res.AppCompatResources
import com.example.hiazee.R
import com.example.hiazee.data.remote.models.UserData
import com.example.hiazee.databinding.ActivityLoginBinding
import com.example.hiazee.ui.viewmodels.AuthViewModel
import com.example.hiazee.utils.ViewModelFactory
import com.example.hiazee.utils.Result
import com.google.android.material.textfield.TextInputEditText
import com.google.android.material.textfield.TextInputLayout

class LoginActivity : AppCompatActivity() {
    private lateinit var binding: ActivityLoginBinding
    private val viewModel: AuthViewModel by viewModels {
        ViewModelFactory.getInstance(this)
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityLoginBinding.inflate(layoutInflater)
        setContentView(binding.root)

        initActionView()
    }

    private fun login(email: String, password: String) {
        viewModel.login(email, password).observe(this) {
            if (it != null) {
                when (it) {
                    is Result.Loading -> {
                        loadingState(true)
                    }
                    is Result.Success -> {
                        loadingState(false)
                        saveUserData(it.data)

                        startMainActivity()
                    }
                    is Result.Error -> {
                        Toast.makeText(this, "Login gagal. Periksa data anda.", Toast.LENGTH_SHORT)
                            .show()
                        Log.d("driskidebug", "login: ${it}")
                        loadingState(false)
                    }
                }
            }
        }
    }

    private fun saveUserData(userdata: UserData) {
        viewModel.saveUserData(userdata)
    }

    private fun startMainActivity() {
        val intent = Intent(this, MainActivity::class.java)
        startActivity(intent)
        finish()
    }

    private fun initActionView() {
        binding.buttonMasuk.setOnClickListener {
            val email = binding.textFieldEmail.editText?.text.toString()
            val password = binding.customPasswordInput.getPassword()
            login(email, password)
        }

        binding.daftarButton.setOnClickListener {
            val intent = Intent(this, RegisterActivity::class.java)
            startActivity(intent)
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