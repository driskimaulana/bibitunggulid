package com.example.hiazee.ui.activities

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import com.example.hiazee.databinding.ActivityCartBinding
import com.example.hiazee.databinding.ActivityMainBinding

class CartActivity : AppCompatActivity() {
    private lateinit var binding: ActivityCartBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityCartBinding.inflate(layoutInflater)
        setContentView(binding.root)
    }
}