package com.example.hiazee.ui.activities

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import android.widget.Toast
import androidx.activity.viewModels
import androidx.appcompat.app.AlertDialog
import com.example.hiazee.data.remote.models.UserData
import com.example.hiazee.databinding.ActivityLoginBinding
import com.example.hiazee.ui.viewmodels.AuthViewModel
import com.example.hiazee.utils.ViewModelFactory
import com.example.hiazee.utils.Result

class LoginActivity : AppCompatActivity() {
    private lateinit var binding: ActivityLoginBinding
    private val viewModel: AuthViewModel by viewModels {
        ViewModelFactory.getInstance(this)
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityLoginBinding.inflate(layoutInflater)
        setContentView(binding.root)

        binding.buttonMasuk.setOnClickListener {
            val email = binding.textFieldEmail.editText?.text.toString()
            val password = binding.textFieldPassword.editText?.text.toString()
            login(email, password)
        }
    }

    private fun login(email: String, password: String) {
        viewModel.login(email, password).observe(this) {
            if (it != null) {
                when (it) {
                    is Result.Loading -> {
                        // binding.loadingProgressBar.visibility = View.VISIBLE
                    }
                    is Result.Success -> {
                        // binding.loadingProgressBar.visibility = View.GONE
                        saveUserData(it.data)

                        startMainActivity()
                    }
                    is Result.Error -> {
                        // binding.loadingProgressBar.visibility = View.GONE
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
}