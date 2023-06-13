package com.example.hiazee.ui.activities

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import androidx.activity.viewModels
import androidx.fragment.app.Fragment
import androidx.lifecycle.lifecycleScope
import com.example.hiazee.R
import com.example.hiazee.databinding.ActivityMainBinding
import com.example.hiazee.ui.fragments.HomeFragment
import com.example.hiazee.ui.fragments.ProfileFragment
import com.example.hiazee.ui.viewmodels.MainViewModel
import com.example.hiazee.utils.ViewModelFactory
import kotlinx.coroutines.launch

class MainActivity : AppCompatActivity() {
    private lateinit var binding: ActivityMainBinding
    private val viewModel: MainViewModel by viewModels {
        ViewModelFactory.getInstance(this)
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        checkToken()

        binding.bottomNavigationBar.setOnItemSelectedListener {
            when(it.itemId){
                R.id.home       -> replaceFragment(HomeFragment())
                R.id.profile    -> replaceFragment(ProfileFragment())
                else            -> {}
            }
            true
        }
    }

    private fun checkToken() {
        lifecycleScope.launch {
            viewModel.getUserData().collect { userData ->
                if (userData.token.isEmpty()) {
                    logout()
                } else {
                    binding.bottomNavigationBar.visibility = View.VISIBLE
                    replaceFragment(HomeFragment())
                }
            }
        }
    }

    private fun logout() {
        viewModel.deleteUserData()

        val intent = Intent(this, LoginActivity::class.java)
        startActivity(intent)
        finish()
    }

    private fun replaceFragment(fragment: Fragment){
        val fragmentManager = supportFragmentManager
        val fragmentTransaction = fragmentManager.beginTransaction()
        fragmentTransaction.replace(R.id.mainScreenFragment, fragment)
        fragmentTransaction.commit()
    }
}