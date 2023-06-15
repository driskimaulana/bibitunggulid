package com.example.hiazee.ui.activities

import android.annotation.SuppressLint
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
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
import com.example.hiazee.data.remote.models.UserData
import com.example.hiazee.databinding.ActivityCheckoutBinding
import com.example.hiazee.ui.adapters.CartAdapter
import com.example.hiazee.ui.viewmodels.CheckoutViewModel
import com.example.hiazee.utils.Result
import com.example.hiazee.utils.ViewModelFactory
import com.example.hiazee.utils.calculateTotalPrice
import kotlinx.coroutines.launch

class CheckoutActivity : AppCompatActivity() {
    private lateinit var binding: ActivityCheckoutBinding
    private val viewModel: CheckoutViewModel by viewModels {
        ViewModelFactory.getInstance(this)
    }

    private lateinit var userData: UserData

    private lateinit var recyclerViewCheckout: RecyclerView
    private lateinit var recyclerViewCheckoutAdapter: CartAdapter

    private lateinit var alamatId: String

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityCheckoutBinding.inflate(layoutInflater)
        setContentView(binding.root)

        lifecycleScope.launch {
            viewModel.getUserData().collect {
                userData = it
            }
        }

        renderItemList()

        val items = listOf("satu", "dua", "tiga")

        val autoComplete: AutoCompleteTextView = findViewById(R.id.dropdownInput)

        val adapter = ArrayAdapter(this, R.layout.list_dropdown, items)

        autoComplete.setAdapter(adapter)

        autoComplete.onItemClickListener =
            AdapterView.OnItemClickListener { adapterView, view, i, l ->
                alamatId = adapterView.getItemAtPosition(i).toString()
                Toast.makeText(this, "alamat idnya ${alamatId}", Toast.LENGTH_SHORT).show()
            }
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

    private fun initItemList(cartItemList: List<CartModel>) {
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
}