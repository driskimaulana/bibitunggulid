package com.example.hiazee.ui.activities

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import android.widget.Toast
import androidx.activity.viewModels
import com.example.hiazee.data.remote.models.UserData
import com.example.hiazee.databinding.ActivityLoginBinding
import com.example.hiazee.databinding.ActivityRegisterBinding
import com.example.hiazee.ui.viewmodels.AuthViewModel
import com.example.hiazee.utils.Result
import com.example.hiazee.utils.ViewModelFactory

class RegisterActivity : AppCompatActivity() {
    private lateinit var binding: ActivityRegisterBinding
    private val viewModel: AuthViewModel by viewModels {
        ViewModelFactory.getInstance(this)
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityRegisterBinding.inflate(layoutInflater)
        setContentView(binding.root)

        initActionView()
    }

    private fun initActionView() {
        binding.buttonMasuk.setOnClickListener {
            val fullname = binding.textFieldFullname.editText?.text.toString()
            val email = binding.textFieldEmail.editText?.text.toString()
            val phone = binding.textFieldPhone.editText?.text.toString()
            val password = binding.customPasswordInput.getPassword()
            register(fullname, email, phone, password)
        }

        binding.masukButton.setOnClickListener {
            val intent = Intent(this, LoginActivity::class.java)
            startActivity(intent)
            finish()
        }
    }

    private fun register(fullname: String, email: String, phone: String, password: String) {
        viewModel.register(fullname, email, phone, password).observe(this) {
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
                        loadingState(false)
                        Toast.makeText(this, it.error, Toast.LENGTH_SHORT)
                            .show()
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