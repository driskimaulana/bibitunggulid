package com.example.hiazee.ui.activities

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.text.Editable
import android.util.Log
import android.view.View
import android.view.inputmethod.EditorInfo
import android.widget.Toast
import androidx.activity.viewModels
import androidx.lifecycle.lifecycleScope
import androidx.recyclerview.widget.GridLayoutManager
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.example.hiazee.R
import com.example.hiazee.data.remote.models.CartModel
import com.example.hiazee.data.remote.models.ProductModel
import com.example.hiazee.data.remote.models.UserData
import com.example.hiazee.databinding.ActivityCartBinding
import com.example.hiazee.databinding.ActivitySearchBinding
import com.example.hiazee.ui.adapters.CartAdapter
import com.example.hiazee.ui.adapters.HomeProductAdapter
import com.example.hiazee.ui.viewmodels.CartViewModel
import com.example.hiazee.ui.viewmodels.SearchViewModel
import com.example.hiazee.utils.Result
import com.example.hiazee.utils.ViewModelFactory
import kotlinx.coroutines.launch

class SearchActivity : AppCompatActivity() {
    private lateinit var binding: ActivitySearchBinding
    private val viewModel: SearchViewModel by viewModels {
        ViewModelFactory.getInstance(this)
    }

    private lateinit var userData: UserData
    private lateinit var keySearch: String

    private lateinit var recyclerViewProduct: RecyclerView
    private lateinit var recyclerViewProductAdapter: HomeProductAdapter

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivitySearchBinding.inflate(layoutInflater)
        setContentView(binding.root)

        keySearch = intent.getStringExtra("key") ?: ""
        binding.searchInput.text = Editable.Factory.getInstance().newEditable(keySearch)

        lifecycleScope.launch {
            viewModel.getUserData().collect {
                userData = it
            }
        }

        renderProductList(keySearch)
        initActionView()
    }

    private fun renderProductList(key: String) {
        loadingState(true)

        viewModel.getAllProducts(key).observe(this) {
            if (it != null) {
                when (it) {
                    is Result.Loading -> {
                        loadingState(true)
                    }
                    is Result.Success -> {
                        loadingState(false)
                        initDetailView(it.data)
                    }
                    is Result.Error -> {
                        loadingState(false)
                        Toast.makeText(this, it.error, Toast.LENGTH_SHORT).show()
                    }
                }
            }
        }
    }

    private fun initActionView() {
        binding.backButton.setOnClickListener {
            onBackPressedDispatcher.onBackPressed()
        }

        binding.searchInput.setOnEditorActionListener { _, actionId, _ ->
            if (actionId == EditorInfo.IME_ACTION_SEARCH) {
                renderProductList(binding.searchInput.text.toString())
                return@setOnEditorActionListener true
            }
            return@setOnEditorActionListener false
        }
    }

    private fun addProductToCart(productId: String) {
        viewModel.addProductToCart(userData.token, productId)
            .observe(this) {
                if (it != null) {
                    when (it) {
                        is Result.Loading -> {
                            // loadingState(true)
                        }
                        is Result.Success -> {
                            // loadingState(false)
                            Toast.makeText(this, "Product Berhasil Ditambahkan", Toast.LENGTH_SHORT)
                                .show()
                        }
                        is Result.Error -> {
                            // loadingState(false)
                            Toast.makeText(this, it.error, Toast.LENGTH_SHORT).show()
                        }
                    }
                }
            }
    }

    private fun initDetailView(productItemList: List<ProductModel>) {
        recyclerViewProduct = findViewById(R.id.recyclerView)
        val layoutManager: RecyclerView.LayoutManager = GridLayoutManager(this, 2)
        recyclerViewProduct.layoutManager = layoutManager

        recyclerViewProductAdapter = HomeProductAdapter(this, productItemList)

        recyclerViewProductAdapter.setItemClickListener(object :
            HomeProductAdapter.ItemClickListener {
            override fun onAddButtonClicked(productId: String) {
                addProductToCart(productId)
            }
        })

        recyclerViewProduct.adapter = recyclerViewProductAdapter
    }

    private fun loadingState(isLoading: Boolean) {
        if (isLoading) {
            binding.apply {
                recyclerView.visibility = View.INVISIBLE
                progressBar3.visibility = View.VISIBLE
            }
        } else {
            binding.apply {
                recyclerView.visibility = View.VISIBLE
                progressBar3.visibility = View.GONE
            }
        }
    }
}