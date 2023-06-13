package com.example.hiazee.ui.activities

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.JsonToken
import android.util.Log
import android.view.View
import android.widget.Toast
import androidx.activity.viewModels
import androidx.lifecycle.lifecycleScope
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.example.hiazee.R
import com.example.hiazee.data.remote.models.ProductModel
import com.example.hiazee.data.remote.models.ShipAddressModel
import com.example.hiazee.databinding.ActivityShipAddressBinding
import com.example.hiazee.ui.adapters.ShipAddressAdapter
import com.example.hiazee.ui.fragments.HomeFragment
import com.example.hiazee.ui.viewmodels.ShipAddressViewModel
import com.example.hiazee.utils.Result
import com.example.hiazee.utils.ViewModelFactory
import kotlinx.coroutines.launch

class ShipAddressActivity : AppCompatActivity() {
    private lateinit var binding: ActivityShipAddressBinding
    private val viewModel: ShipAddressViewModel by viewModels {
        ViewModelFactory.getInstance(this)
    }

    private lateinit var recyclerViewShipAddress: RecyclerView
    private lateinit var recyclerViewShipAddressAdapter: ShipAddressAdapter

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityShipAddressBinding.inflate(layoutInflater)
        setContentView(binding.root)

        getToken()

        binding.backButton.setOnClickListener {
            onBackPressedDispatcher.onBackPressed()
        }


        binding.buttonAddShipAddress.setOnClickListener{
            val intent = Intent(this, AddShipAddressActivity::class.java)
            startActivity(intent)
        }
    }

    private fun getToken() {
        lifecycleScope.launch {
            viewModel.getUserData().collect { userData ->
                if (userData.token != "") {
                    showShipAddress(userData.token)
                }
            }
        }
    }

    private fun showShipAddress(token: String){
        viewModel.getAllShipAddress(token).observe(this) {
            if (it != null) {
                when (it) {
                    is Result.Loading -> {
                        binding.shipAddressRecyclerViewLoading.visibility = View.VISIBLE
                    }
                    is Result.Success -> {
                        binding.shipAddressRecyclerViewLoading.visibility = View.GONE
                        initShipAddressRecyclerView(it.data)
                    }
                    is Result.Error -> {
                        binding.shipAddressRecyclerViewLoading.visibility = View.GONE
                        Toast.makeText(this, it.error, Toast.LENGTH_SHORT).show()
                    }
                }
            }
        }
    }

    private fun initShipAddressRecyclerView(shipAddressList: List<ShipAddressModel>) {
        recyclerViewShipAddress = findViewById(R.id.recyclerViewShipAddress)
        recyclerViewShipAddress.layoutManager =
            LinearLayoutManager(this, LinearLayoutManager.VERTICAL, false)
        recyclerViewShipAddressAdapter = ShipAddressAdapter(this, shipAddressList)
        recyclerViewShipAddress.adapter = recyclerViewShipAddressAdapter
    }
}