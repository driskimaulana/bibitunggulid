package com.example.hiazee.ui.activities

import android.app.Activity
import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.JsonToken
import android.util.Log
import android.view.View
import android.widget.Toast
import androidx.activity.result.contract.ActivityResultContracts
import androidx.activity.viewModels
import androidx.lifecycle.lifecycleScope
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.example.hiazee.R
import com.example.hiazee.data.remote.models.ProductModel
import com.example.hiazee.data.remote.models.ShipAddressModel
import com.example.hiazee.data.remote.models.UserData
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

    private lateinit var userData: UserData

    private lateinit var recyclerViewShipAddress: RecyclerView
    private lateinit var recyclerViewShipAddressAdapter: ShipAddressAdapter

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityShipAddressBinding.inflate(layoutInflater)
        setContentView(binding.root)

        lifecycleScope.launch {
            viewModel.getUserData().collect {
                userData = it
            }
        }

        renderShipAddressList()

        binding.backButton.setOnClickListener {
            onBackPressedDispatcher.onBackPressed()
        }


        binding.buttonAddShipAddress.setOnClickListener{
            openAddShipAddressActivity()
        }
    }

    private fun renderShipAddressList(){
        viewModel.getAllShipAddress(userData.token).observe(this) {
            if (it != null) {
                when (it) {
                    is Result.Loading -> {
                        loadingState(true)
                    }
                    is Result.Success -> {
                        loadingState(false)
                        initShipAddressRecyclerView(it.data)
                    }
                    is Result.Error -> {
                        loadingState(false)
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

    private fun openAddShipAddressActivity() {
        val intent = Intent(this, AddShipAddressActivity::class.java)
        resultLauncher.launch(intent)
    }

    var resultLauncher = registerForActivityResult(ActivityResultContracts.StartActivityForResult()) { result ->
        if (result.resultCode == Activity.RESULT_OK) {
            // There are no request codes
            renderShipAddressList()
            Toast.makeText(this, "SUCCESS ADD SHIP ADDRESS", Toast.LENGTH_SHORT).show()
        }
    }

    private fun loadingState(isLoading: Boolean) {
        if (isLoading) {
            binding.apply {
                recyclerViewShipAddress.visibility = View.INVISIBLE
                shipAddressRecyclerViewLoading.visibility = View.VISIBLE
            }
        } else {
            binding.apply {
                recyclerViewShipAddress.visibility = View.VISIBLE
                shipAddressRecyclerViewLoading.visibility = View.GONE
            }
        }
    }

}