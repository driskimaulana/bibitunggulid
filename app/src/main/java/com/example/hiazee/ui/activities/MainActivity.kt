package com.example.hiazee.ui.activities

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.provider.ContactsContract.Profile
import androidx.fragment.app.Fragment
import com.example.hiazee.R
import com.example.hiazee.databinding.ActivityMainBinding
import com.example.hiazee.ui.fragments.CartFragment
import com.example.hiazee.ui.fragments.HomeFragment
import com.example.hiazee.ui.fragments.ProfileFragment

class MainActivity : AppCompatActivity() {
    private lateinit var binding: ActivityMainBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)
        replaceFragment(HomeFragment())

        binding.bottomNavigationBar.setOnItemSelectedListener {
            when(it.itemId){
                R.id.home       -> replaceFragment(HomeFragment())
                R.id.cart       -> replaceFragment(CartFragment())
                R.id.profile    -> replaceFragment(ProfileFragment())
                else            -> {}
            }
            true
        }
    }

    private fun replaceFragment(fragment: Fragment){
        val fragmentManager = supportFragmentManager
        val fragmentTransaction = fragmentManager.beginTransaction()
        fragmentTransaction.replace(R.id.mainScreenFragment, fragment)
        fragmentTransaction.commit()
    }
}