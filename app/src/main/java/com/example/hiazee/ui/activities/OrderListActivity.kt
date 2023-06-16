package com.example.hiazee.ui.activities

import android.os.Bundle
import android.util.Log
import android.view.View
import android.widget.Toast
import androidx.activity.viewModels
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.WindowCompat
import androidx.lifecycle.lifecycleScope
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.example.hiazee.R
import com.example.hiazee.data.remote.models.OrderModel
import com.example.hiazee.data.remote.models.ProductInOrderListModel
import com.example.hiazee.data.remote.models.UserData
import com.example.hiazee.databinding.ActivityOrderListBinding
import com.example.hiazee.ui.adapters.OrderListAdapter
import com.example.hiazee.ui.viewmodels.OrderListViewModel
import com.example.hiazee.ui.viewmodels.ShipAddressViewModel
import com.example.hiazee.utils.Result
import com.example.hiazee.utils.ViewModelFactory
import kotlinx.coroutines.launch

class OrderListActivity : AppCompatActivity() {

    private lateinit var binding: ActivityOrderListBinding

    private val viewModel: OrderListViewModel by viewModels {
        ViewModelFactory.getInstance(this)
    }

    private lateinit var recyclerViewOrderList: RecyclerView
    private lateinit var recyclerViewOrderListAdapter: OrderListAdapter

    private lateinit var userData: UserData

    private lateinit var orderList: List<OrderModel>

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        binding = ActivityOrderListBinding.inflate(layoutInflater)
        setContentView(binding.root)

        lifecycleScope.launch {
            viewModel.getUserData().collect {
                userData = it
            }
        }

        setSupportActionBar(binding.toolbar)
        binding.toolbar.setNavigationOnClickListener {
            super.onBackPressed();
        }
        binding.toolbar.setNavigationIcon(R.drawable.ic_arrow_back)

        orderList = listOf(
            OrderModel(
                10,
                "Waiting for Payment",
                10000.0,
                "2023-06-13T15:14:11.066Z",
                "Galley La Company 03/01, Water Seven, Grand Line 40089",
                listOf(
                    ProductInOrderListModel(
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
            ),
            OrderModel(
                10,
                "Waiting for Payment",
                10000.0,
                "2023-06-13T15:14:11.066Z",
                "Galley La Company 03/01, Water Seven, Grand Line 40089",
                listOf(
                    ProductInOrderListModel(
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
            ),
            )

        renderOrderList()
        val pullToRefresh = binding.swiperefresh
        pullToRefresh.setOnRefreshListener { // your code
            pullToRefresh.isRefreshing = false
            renderOrderList()
            Log.d("driskidebug", "onCreate: Refresh")
        }

    }

    private fun renderOrderList() {
        initOrderList(orderList)
        viewModel.getCustomerOrderList(userData.token).observe(this){
            Log.d("driskidebug", "renderOrderList: ${userData.token}")
            if(it != null){
                when (it) {
                    is Result.Loading -> {
                        loadingState(true)
                    }
                    is Result.Success -> {
                        loadingState(false)
                        initOrderList(it.data)
                    }
                    is Result.Error -> {
                        loadingState(false)
                        Toast.makeText(this, it.error, Toast.LENGTH_SHORT).show()
                    }
                }
            }
        }
    }

    private fun initOrderList(ordersData: List<OrderModel>) {
        recyclerViewOrderList = binding.orderListRecView
        recyclerViewOrderList.layoutManager =
            LinearLayoutManager(this, LinearLayoutManager.VERTICAL, false)
        recyclerViewOrderListAdapter = OrderListAdapter(this, ordersData)
        recyclerViewOrderList.adapter = recyclerViewOrderListAdapter
    }

    private fun loadingState(isLoading: Boolean){
        if (isLoading){
            binding.apply {
                recyclerViewOrderList.visibility = View.GONE
                loadingCircle.visibility = View.VISIBLE
            }
        }else {
            binding.apply {
                recyclerViewOrderList.visibility = View.VISIBLE
                loadingCircle.visibility = View.GONE
            }
        }
    }
}