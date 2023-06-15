package com.example.hiazee.ui.activities

import android.annotation.SuppressLint
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.view.View
import android.widget.Toast
import androidx.activity.viewModels
import androidx.lifecycle.lifecycleScope
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.example.hiazee.R
import com.example.hiazee.data.remote.models.CartModel
import com.example.hiazee.data.remote.models.ShipAddressModel
import com.example.hiazee.data.remote.models.UserData
import com.example.hiazee.databinding.ActivityCartBinding
import com.example.hiazee.databinding.ActivityMainBinding
import com.example.hiazee.ui.adapters.CartAdapter
import com.example.hiazee.ui.adapters.HomeProductAdapter
import com.example.hiazee.ui.adapters.ShipAddressAdapter
import com.example.hiazee.ui.viewmodels.CartViewModel
import com.example.hiazee.ui.viewmodels.DetailProductViewModel
import com.example.hiazee.utils.Result
import com.example.hiazee.utils.ViewModelFactory
import kotlinx.coroutines.launch
import java.text.NumberFormat
import java.util.*

class CartActivity : AppCompatActivity() {
    private lateinit var binding: ActivityCartBinding
    private val viewModel: CartViewModel by viewModels {
        ViewModelFactory.getInstance(this)
    }

    private lateinit var userData: UserData

    private lateinit var recyclerViewCart: RecyclerView
    private lateinit var recyclerViewCartAdapter: CartAdapter

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityCartBinding.inflate(layoutInflater)
        setContentView(binding.root)

        lifecycleScope.launch {
            viewModel.getUserData().collect {
                userData = it
            }
        }

        renderCartItemList()
        initActionView()
    }

    @SuppressLint("SetTextI18n")
    private fun renderCartItemList(){
        loadingState1(true)

        if(userData.token != "") {
            viewModel.getCart(userData.token).observe(this) {
                if (it != null) {
                    when (it) {
                        is Result.Loading -> {
                            loadingState1(true)
                        }
                        is Result.Success -> {
                            loadingState1(false)
                            initCartItemList(it.data)
                            binding.totalPriceCart.text = calculateTotalPrice(it.data)
                            binding.totalItems.text = "${it.data.size.toString()} Items"
                        }
                        is Result.Error -> {
                            loadingState1(false)
                            Toast.makeText(this, it.error, Toast.LENGTH_SHORT).show()
                        }
                    }
                }
            }
        }
    }

    private fun initActionView(){
        binding.backButton.setOnClickListener {
            onBackPressedDispatcher.onBackPressed()
        }
    }

    private fun initCartItemList(cartItemList: List<CartModel>) {
        recyclerViewCart = findViewById(R.id.recyclerViewCart)
        recyclerViewCart.layoutManager =
            LinearLayoutManager(this, LinearLayoutManager.VERTICAL, false)
        recyclerViewCartAdapter = CartAdapter(this, cartItemList)

        recyclerViewCartAdapter.setItemClickListener(object : CartAdapter.ItemClickListener {
            override fun onDeleteButtonClicked(productId: String) {
                deleteProductFromCart(productId)
            }
            override fun onDecreaseButtonClicked(productId: String) {
                reduceProductFromCart(productId)
            }
            override fun onIncreaseButtonClicked(productId: String) {
                addProductFromCart(productId)
            }
        })

        recyclerViewCart.adapter = recyclerViewCartAdapter
    }

    private fun deleteProductFromCart(productId: String){
        if(userData.token != ""){
            viewModel.deleteProductFromCart(userData.token, productId).observe(this) {
                if (it != null) {
                    when (it) {
                        is Result.Loading -> {
                            // loadingState(true)
                        }
                        is Result.Success -> {
                            // loadingState(false)
                            renderCartItemList()
                        }
                        is Result.Error -> {
                            // loadingState(false)
                            Toast.makeText(this, it.error, Toast.LENGTH_SHORT).show()
                        }
                    }
                }
            }
        }
    }

    private fun addProductFromCart(productId: String){
        if(userData.token != ""){
            viewModel.addProductToCart(userData.token, productId).observe(this) {
                if (it != null) {
                    when (it) {
                        is Result.Loading -> {
                            // loadingState(true)
                        }
                        is Result.Success -> {
                            // loadingState(false)
                            renderCartItemList()
                        }
                        is Result.Error -> {
                            // loadingState(false)
                            Toast.makeText(this, it.error, Toast.LENGTH_SHORT).show()
                        }
                    }
                }
            }
        }
    }

    private fun reduceProductFromCart(productId: String){
        if(userData.token != ""){
            viewModel.reduceProductFromCart(userData.token, productId).observe(this) {
                if (it != null) {
                    when (it) {
                        is Result.Loading -> {
                            // loadingState(true)
                        }
                        is Result.Success -> {
                            // loadingState(false)
                            renderCartItemList()
                        }
                        is Result.Error -> {
                            // loadingState(false)
                            Toast.makeText(this, it.error, Toast.LENGTH_SHORT).show()
                        }
                    }
                }
            }
        }
    }

    private fun calculateTotalPrice(cartItemList: List<CartModel>): String {
        var totalPrice = 0
        for (cartItem in cartItemList) {
            totalPrice += cartItem.unitPrice * cartItem.count
        }
        return formatPrice(totalPrice)
    }

    private fun formatPrice(price: Int): String {
        val formattedPrice = NumberFormat.getNumberInstance(Locale.getDefault()).format(price)
        return "Rp $formattedPrice"
    }

    private fun loadingState1(isLoading: Boolean) {
        if (isLoading) {
            binding.apply {
                recyclerViewCart.visibility = View.INVISIBLE
                progressBar.visibility = View.VISIBLE
            }
        } else {
            binding.apply {
                recyclerViewCart.visibility = View.VISIBLE
                progressBar.visibility = View.GONE
            }
        }
    }
}