package com.example.hiazee.ui.activities

import android.annotation.SuppressLint
import android.content.Intent
import android.net.Uri
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.view.View
import android.widget.AdapterView
import android.widget.ArrayAdapter
import android.widget.AutoCompleteTextView
import android.widget.Toast
import androidx.activity.viewModels
import androidx.lifecycle.lifecycleScope
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.example.hiazee.R
import com.example.hiazee.data.remote.models.CartModel
import com.example.hiazee.data.remote.models.ShipAddressModel
import com.example.hiazee.data.remote.models.UserData
import com.example.hiazee.databinding.ActivityCheckoutBinding
import com.example.hiazee.ui.adapters.CartAdapter
import com.example.hiazee.ui.adapters.CheckoutItemAdapter
import com.example.hiazee.ui.viewmodels.CheckoutViewModel
import com.example.hiazee.utils.*
import kotlinx.coroutines.launch

class CheckoutActivity : AppCompatActivity() {
    private lateinit var binding: ActivityCheckoutBinding
    private val viewModel: CheckoutViewModel by viewModels {
        ViewModelFactory.getInstance(this)
    }

    private lateinit var userData: UserData

    private lateinit var recyclerViewCheckout: RecyclerView
    private lateinit var recyclerViewCheckoutAdapter: CheckoutItemAdapter

    private var alamatId: Int = 0

    private lateinit var cartItemListG: List<CartModel>

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityCheckoutBinding.inflate(layoutInflater)
        setContentView(binding.root)

        lifecycleScope.launch {
            viewModel.getUserData().collect {
                userData = it
            }
        }

        initActionView()
        renderItemList()
        renderDropdownInput()
    }

    @SuppressLint("SetTextI18n")
    private fun renderItemList() {
        loadingState(true)

        if (userData.token != "") {
            viewModel.getCart(userData.token).observe(this) {
                if (it != null) {
                    when (it) {
                        is Result.Loading -> {
                            loadingState(true)
                        }
                        is Result.Success -> {
                            loadingState(false)
                            initItemList(it.data)
                            initDetailCheckoutPrice(it.data)
                            cartItemListG = it.data
                        }
                        is Result.Error -> {
                            loadingState(false)
                            Toast.makeText(this, it.error, Toast.LENGTH_SHORT).show()
                        }
                    }
                }
            }
        }
    }

    private fun renderDropdownInput() {
        if (userData.token != "") {
            viewModel.getAllShipAddress(userData.token).observe(this) {
                if (it != null) {
                    when (it) {
                        is Result.Loading -> {
                            // loadingState1(true)
                        }
                        is Result.Success -> {
                            // loadingState1(false)
                            initDropdownInputItemList(it.data)
                        }
                        is Result.Error -> {
                            // loadingState1(false)
                            Toast.makeText(this, it.error, Toast.LENGTH_SHORT).show()
                        }
                    }
                }
            }
        }
    }

    private fun initDropdownInputItemList(address: List<ShipAddressModel>) {
        val items = address.map { it.name }
        val autoComplete: AutoCompleteTextView = findViewById(R.id.dropdownInput)
        val adapter = ArrayAdapter(this, R.layout.list_dropdown, items)
        autoComplete.setAdapter(adapter)

        autoComplete.onItemClickListener =
            AdapterView.OnItemClickListener { adapterView, view, i, l ->
                alamatId = address[i].id
                // Toast.makeText(this, "alamat idnya ${alamatId}", Toast.LENGTH_SHORT).show()
            }
    }

    private fun initItemList(cartItemList: List<CartModel>) {
        recyclerViewCheckout = findViewById(R.id.recyclerViewCheckout)
        recyclerViewCheckout.layoutManager =
            LinearLayoutManager(this, LinearLayoutManager.VERTICAL, false)
        recyclerViewCheckoutAdapter = CheckoutItemAdapter(this, cartItemList)
        recyclerViewCheckout.adapter = recyclerViewCheckoutAdapter
    }

    private fun initDetailCheckoutPrice(cartItemList: List<CartModel>) {
        binding.tvTotalHarga.text =
            formatPrice(calculateTotalPrice(cartItemList))
        binding.tvTotalFullPrice.text =
            formatPrice(calculateTotalPrice(cartItemList) + 10000)
    }

    private fun initActionView() {
        binding.backButton.setOnClickListener {
            onBackPressedDispatcher.onBackPressed()
        }

        binding.beliSekarangButton.setOnClickListener {
            if (alamatId != 0) {
                submitCheckout()
            } else {
                Toast.makeText(this, "Pilih alamat tujuanmu!", Toast.LENGTH_SHORT).show()
            }
        }
    }

    private fun submitCheckout() {
        if (userData.token != "") {
            viewModel.addOrder(userData.token, convertToProductItemList(cartItemListG), alamatId)
                .observe(this) {
                    if (it != null) {
                        when (it) {
                            is Result.Loading -> {
                                loadingStateBayar(true)
                            }
                            is Result.Success -> {
                                loadingStateBayar(false)
                                goToPaymentWeb(it.data.urlPayment)
                            }
                            is Result.Error -> {
                                loadingStateBayar(false)
                                Toast.makeText(this, it.error, Toast.LENGTH_SHORT).show()
                            }
                        }
                    }
                }
        } else {
            Toast.makeText(this, "Tokenmu tidak valid!", Toast.LENGTH_SHORT).show()
        }
    }

    private fun goToPaymentWeb(url: String) {
        val intent = Intent(Intent.ACTION_VIEW)
        intent.setData(Uri.parse(url))
        startActivity(intent)
    }

    private fun loadingState(isLoading: Boolean) {
        if (isLoading) {
            binding.apply {
                recyclerViewCheckout.visibility = View.INVISIBLE
                progressBar.visibility = View.VISIBLE
            }
        } else {
            binding.apply {
                recyclerViewCheckout.visibility = View.VISIBLE
                progressBar.visibility = View.GONE
            }
        }
    }

    private fun loadingStateBayar(isLoading: Boolean) {
        if (isLoading) {
            binding.apply {
                submitTextview.visibility = View.INVISIBLE
                submitLoading.visibility = View.VISIBLE
            }
        } else {
            binding.apply {
                submitTextview.visibility = View.VISIBLE
                submitLoading.visibility = View.GONE
            }
        }
    }
}