package com.example.hiazee.ui.activities

import android.annotation.SuppressLint
import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.view.View
import android.widget.ImageView
import android.widget.Toast
import androidx.activity.viewModels
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.lifecycleScope
import com.bumptech.glide.Glide
import com.example.hiazee.R
import com.example.hiazee.data.remote.models.ProductModel
import com.example.hiazee.data.remote.models.UserData
import com.example.hiazee.databinding.ActivityDetailProductBinding
import com.example.hiazee.ui.viewmodels.DetailProductViewModel
import com.example.hiazee.utils.Result
import com.example.hiazee.utils.ViewModelFactory
import com.google.android.material.snackbar.Snackbar
import kotlinx.coroutines.launch
import java.text.DecimalFormat

class DetailProductActivity : AppCompatActivity() {
    private lateinit var binding: ActivityDetailProductBinding
    private val viewModel: DetailProductViewModel by viewModels {
        ViewModelFactory.getInstance(this)
    }

    private lateinit var userData: UserData
    private lateinit var productId: String

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityDetailProductBinding.inflate(layoutInflater)
        setContentView(binding.root)

        productId = intent.getStringExtra("id") ?: ""

        lifecycleScope.launch {
            viewModel.getUserData().collect {
                userData = it
            }
        }

        renderDetailProduct()
        initActionView()
    }

    private fun renderDetailProduct(){
        loadingState1(true)

        if(productId != "") {
            viewModel.getDetailProduct(productId).observe(this) {
                if (it != null) {
                    when (it) {
                        is Result.Loading -> {
                            loadingState1(true)
                        }
                        is Result.Success -> {
                            loadingState1(false)
                            initDetailView(it.data)
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

        binding.btnCartButton.setOnClickListener {
            addProductToCart(productId)
        }
//        binding.cartButton.setOnClickListener {
//            addProductToCart(productId)
//        }
//
//        binding.beliSekarangButton.setOnClickListener {
//            createOrder()
//        }
    }



    private fun addProductToCart(productId: String){
        viewModel.addProductToCart(userData.token, productId)
            .observe(this) {
                if (it != null) {
                    when (it) {
                        is Result.Loading -> {
                            // loadingState(true)
                        }
                        is Result.Success -> {
                            // loadingState(false)
//                            Toast.makeText(this, "Product Berhasil Ditambahkan", Toast.LENGTH_SHORT).show()

//                            val mySnackbar = Snackbar.make(this, "Lanjutkan Ke Keranjang", Snackbar.LENGTH_SHORT)
//                                .setAction("Keranjang", new View.)

                            val snackbar = Snackbar
                                .make(binding.coordinatorLayout, "Lanjut ke keranjang", Snackbar.LENGTH_LONG)
                                .setAction("Buka Keranjang") {
                                    val intent = Intent(this, CartActivity::class.java)
                                    startActivity(intent)
                                }
                            snackbar.show()
                        }
                        is Result.Error -> {
                            // loadingState(false)
                            Toast.makeText(this, it.error, Toast.LENGTH_SHORT).show()
                        }
                    }
                }
            }
    }



    private fun createOrder(){
        Log.d("driskidebug", "createOrder: Clicker")
        Toast.makeText(this, "Clicked", Toast.LENGTH_SHORT)
    }

    @SuppressLint("SetTextI18n")
    private fun initDetailView(product: ProductModel){
        val productImage: ImageView = findViewById(R.id.productImage)
        Glide.with(this)
            .load(product.pictures[0])
            .centerCrop()
            .into(productImage)

        binding.titleProduct.text = product.productName

        val decimalFormat = DecimalFormat("#,###")
        val formattedPrice = decimalFormat.format(product.unitPrice.toInt())
        binding.productPrice.text = "Rp $formattedPrice"

        binding.productDescription.text = product.productDescription
    }

    private fun loadingState1(isLoading: Boolean) {
        if (isLoading) {
            binding.apply {
                scrollView2.visibility = View.INVISIBLE
                progressBar.visibility = View.VISIBLE
            }
        } else {
            binding.apply {
                scrollView2.visibility = View.VISIBLE
                progressBar.visibility = View.GONE
            }
        }
    }
}