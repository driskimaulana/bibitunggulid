package com.example.hiazee.ui.activities

import android.os.Bundle
import com.google.android.material.snackbar.Snackbar
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.WindowCompat
import androidx.navigation.findNavController
import androidx.navigation.ui.AppBarConfiguration
import androidx.navigation.ui.navigateUp
import androidx.navigation.ui.setupActionBarWithNavController
import com.example.hiazee.R
import com.example.hiazee.databinding.ActivityKebijakanPrivasiBinding

class KebijakanPrivasiActivity : AppCompatActivity() {

    private lateinit var binding: ActivityKebijakanPrivasiBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        WindowCompat.setDecorFitsSystemWindows(window, false)
        super.onCreate(savedInstanceState)

        binding = ActivityKebijakanPrivasiBinding.inflate(layoutInflater)
        setContentView(binding.root)

        setSupportActionBar(binding.toolbar)

        binding.toolbar.setNavigationOnClickListener {
            super.onBackPressed();
        }
        binding.toolbar.setNavigationIcon(R.drawable.ic_arrow_back)


    }

}