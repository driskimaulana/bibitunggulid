package com.example.hiazee.ui.activities

import android.os.Bundle
import android.util.Log
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.WindowCompat
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.example.hiazee.R
import com.example.hiazee.data.remote.models.ProductInOrderListModel
import com.example.hiazee.databinding.ActivityOrderDetailsBinding
import com.example.hiazee.ui.adapters.ProductInOrderDetailsAdapter

class OrderDetailsActivity : AppCompatActivity() {

    private lateinit var binding: ActivityOrderDetailsBinding
    private lateinit var recyclerViewProducts: RecyclerView
    private lateinit var recyclerViewProductAdapter: ProductInOrderDetailsAdapter

    private lateinit var products: List<ProductInOrderListModel>

    override fun onCreate(savedInstanceState: Bundle?) {
        WindowCompat.setDecorFitsSystemWindows(window, false)
        super.onCreate(savedInstanceState)

        binding = ActivityOrderDetailsBinding.inflate(layoutInflater)
        setContentView(binding.root)

        setSupportActionBar(binding.toolbar)
        binding.toolbar.setNavigationIcon(R.drawable.ic_arrow_back)
        binding.toolbar.setNavigationOnClickListener {
            super.onBackPressed()
        }

        products = listOf(
            ProductInOrderListModel(
                1,
                "Lili Paris 3",
                arrayOf(
                    "https://storage.googleapis.com/bibitunggulid-public/product-images/5fb27400-320f-4eb7-8929-0d7f62bfca52.jpeg",
                    "https://storage.googleapis.com/bibitunggulid-public/product-images/5fb27400-320f-4eb7-8929-0d7f62bfca52.jpeg"
                ),
                10000.0,
                2
            ), ProductInOrderListModel(
                1,
                "Lili Paris 3",
                arrayOf(
                    "https://storage.googleapis.com/bibitunggulid-public/product-images/5fb27400-320f-4eb7-8929-0d7f62bfca52.jpeg",
                    "https://storage.googleapis.com/bibitunggulid-public/product-images/5fb27400-320f-4eb7-8929-0d7f62bfca52.jpeg"
                ),
                10000.0,
                2
            )
        )

        renderProductList()

    }

    private fun renderProductList() {
        initProductList()
    }

    private fun initProductList() {
        recyclerViewProducts = binding.recViewProduct
        Log.d("driskidebug", "1")
        recyclerViewProducts.layoutManager =
            LinearLayoutManager(this, LinearLayoutManager.VERTICAL, false)
        Log.d("driskidebug", "2")

        recyclerViewProductAdapter = ProductInOrderDetailsAdapter(this, products)
        Log.d("driskidebug", "3")

        recyclerViewProducts.adapter = recyclerViewProductAdapter
        Log.d("driskidebug", "4")

    }

}

