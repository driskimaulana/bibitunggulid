package com.example.hiazee.ui.activities

import android.annotation.SuppressLint
import android.app.Activity
import android.content.Intent
import android.content.LocusId
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.view.View
import android.widget.Toast
import androidx.activity.result.contract.ActivityResultContracts
import androidx.activity.viewModels
import androidx.lifecycle.lifecycleScope
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.example.hiazee.R
import com.example.hiazee.data.remote.models.ShipAddressModel
import com.example.hiazee.data.remote.models.UserData
import com.example.hiazee.databinding.ActivityShipAddressBinding
import com.example.hiazee.ui.adapters.ShipAddressAdapter
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

    @SuppressLint("SetTextI18n")
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
                        binding.textView9.text = "${it.data.size} Item"
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

        recyclerViewShipAddressAdapter.setOnMenuItemClickListener(object : ShipAddressAdapter.OnMenuItemClickListener {
            override fun onEditClicked(shipAddressId: Int) {
                Log.e("DEBUGNOVALEDIT", shipAddressId.toString())
            }

            override fun onDeleteClicked(shipAddressId: Int) {
                deleteShipData(shipAddressId.toString())
            }
        })

        recyclerViewShipAddress.adapter = recyclerViewShipAddressAdapter
    }

    private fun deleteShipData(id: String){
        viewModel.deleteShipAddress(userData.token, id).observe(this) {
            if (it != null) {
                when (it) {
                    is Result.Loading -> {
                        // loadingState(true)
                    }
                    is Result.Success -> {
                        // loadingState(false)
                        renderShipAddressList()
                    }
                    is Result.Error -> {
                        // loadingState(false)
                        Toast.makeText(this, it.error, Toast.LENGTH_SHORT).show()
                    }
                }
            }
        }
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