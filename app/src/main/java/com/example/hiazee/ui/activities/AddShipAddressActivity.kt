package com.example.hiazee.ui.activities

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import com.example.hiazee.databinding.ActivityAddShipAddressBinding
import com.example.hiazee.databinding.ActivityShipAddressBinding

class AddShipAddressActivity : AppCompatActivity() {
    private lateinit var binding: ActivityAddShipAddressBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityAddShipAddressBinding.inflate(layoutInflater)
        setContentView(binding.root)
    }
}