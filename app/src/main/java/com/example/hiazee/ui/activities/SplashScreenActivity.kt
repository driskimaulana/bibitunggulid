package com.example.hiazee.ui.activities

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.os.Handler
import android.view.View
import androidx.activity.viewModels
import androidx.lifecycle.lifecycleScope
import com.example.hiazee.R
import com.example.hiazee.ui.activities.onboarding.OnBoardingActivity
import com.example.hiazee.ui.activities.onboarding.OnBoardingAdapter
import com.example.hiazee.ui.fragments.HomeFragment
import com.example.hiazee.ui.viewmodels.MainViewModel
import com.example.hiazee.utils.ViewModelFactory
import kotlinx.coroutines.launch

class SplashScreenActivity : AppCompatActivity() {

    private val viewModel: MainViewModel by viewModels {
        ViewModelFactory.getInstance(this)
    }
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_splash_screen)

        Handler().postDelayed({
            checkToken()
            finish()
        }, 2000)

    }

    private fun checkToken() {
        lifecycleScope.launch {
            viewModel.getUserData().collect { userData ->
                if (userData.token.isEmpty()) {
                    logout()
                } else {
                    startMainActivity()
                }
            }
        }
    }

    private fun logout() {
        viewModel.deleteUserData()
        val i = Intent(
            this,
            OnBoardingActivity::class.java
        )

//        val intent = Intent(this, LoginActivity::class.java)
        startActivity(i)
        finish()
    }

    private fun startMainActivity(){
        val i = Intent(
            this,
            MainActivity::class.java
        )
        startActivity(i)
        finish()
    }

}