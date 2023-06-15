package com.example.hiazee.ui.activities

import android.content.Intent
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
import com.example.hiazee.data.remote.models.OrderDetailsModel
import com.example.hiazee.data.remote.models.ProductInOrderListModel
import com.example.hiazee.data.remote.models.UserData
import com.example.hiazee.databinding.ActivityOrderDetailsBinding
import com.example.hiazee.ui.adapters.ProductInOrderDetailsAdapter
import com.example.hiazee.ui.viewmodels.OrderListViewModel
import com.example.hiazee.utils.Result
import com.example.hiazee.utils.ViewModelFactory
import kotlinx.coroutines.launch
import java.text.SimpleDateFormat
import java.util.Calendar
import java.util.Locale

class OrderDetailsActivity : AppCompatActivity() {

    private lateinit var binding: ActivityOrderDetailsBinding
    private val viewModel: OrderListViewModel by viewModels {
        ViewModelFactory.getInstance(this)
    }
    private lateinit var recyclerViewProducts: RecyclerView
    private lateinit var recyclerViewProductAdapter: ProductInOrderDetailsAdapter

    private lateinit var products: List<ProductInOrderListModel>

    private lateinit var userData: UserData

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

        lifecycleScope.launch {
            viewModel.getUserData().collect {
                userData = it
            }
        }

        val id = intent.getStringExtra("id")

        getData(id.toString())

        val pullToRefresh = binding.swiperefresh
        pullToRefresh.setOnRefreshListener { // your code
            pullToRefresh.isRefreshing = false
            getData(id.toString())
            Log.d("driskidebug", "onCreate: Refresh")
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

    }

    private fun getData(id: String) {
        Log.d("driskidebug", "hello getData()")

        if (id != "") {
            viewModel.getCustomerOrderDetails(userData.token, id.toInt()).observe(this) {
                if (it != null) {
                    when (it) {
                        is Result.Loading -> {
                            loadingState(true)
                        }

                        is Result.Success -> {
                            loadingState(false)
                            Log.d("driskidebug", "getData: $it")
                            assignOrderDetails(it.data)
                            renderProductList(it.data.products)
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

    private fun orderFinish(id: String) {
        Log.d("driskidebug", "hello getData()")

        if (id != "") {
            viewModel.changeOrderStatusToFinish(userData.token, id.toInt()).observe(this) {
                if (it != null) {
                    when (it) {
                        is Result.Loading -> {
                            loadingState(true)
                        }

                        is Result.Success -> {
                            loadingState(false)
                            Log.d("driskidebug", "orderFinish: $it")
                            getData(id)
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

    private fun assignOrderDetails(order: OrderDetailsModel) {


        val format = SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", Locale.getDefault())
        val date = format.parse(order.createdAt) // Mengonversi string menjadi Date

        val calendar = Calendar.getInstance()
        calendar.time = date
        val dayOfWeek = SimpleDateFormat("EEEE", Locale("id", "ID")).format(date)
        val monthOfYear = SimpleDateFormat("MMM", Locale("id", "ID")).format(date)

        var totalHargaValue = 0.0
        order.products.forEach {
            totalHargaValue += it.unitPrice * it.quantity
        }


        binding.apply {
            tvOrderDate.text =
                "${dayOfWeek}, ${date.date}, ${monthOfYear} ${calendar.get(Calendar.YEAR)}"

            tvCourierName.text = order.courierName
            tvCourierPhone.text = order.phone
            tvSendName.text = order.name
            tvSendPhone.text = order.shipPhone
            tvSendAddress.text =
                "${order.fullAddress} ${order.subDistrict}, ${order.city}, ${order.province} ${order.postalCode}"


            tvTotalHarga.text = "Rp $totalHargaValue"
            tvFreightPrice.text = order.freight.toString()
            tvTotalFullPrice.text = "Rp ${order.totalHarga + order.freight}"

            btnPay.setOnClickListener {
                val intent = Intent(it.context, OrderPaymentDetailsActivity::class.java)
                intent.putExtra("id", order.id.toString())
                it.context.startActivity(intent)
            }

            btnFinish.setOnClickListener{
                val id = intent.getStringExtra("id")
                Log.d("driskidebug", "finish: ${id}")

                if (id != null){
                    orderFinish(id)
                }

            }

            if (order.statusName.equals("Waiting For Payment")) {
                tvOrderStatus.text = "Menunggu Pembayaran"
                btnFinish.visibility = View.GONE
            } else if (order.statusName.equals("Waiting For Shipment")) {
                tvOrderStatus.text = "Menunggu Pengiriman"
                btnFinish.visibility = View.VISIBLE
                btnPay.visibility = View.GONE
                btnFinish.isClickable = false
            } else if (order.statusName.equals("On Shipping")) {
                tvOrderStatus.text = "Sedang Dikirim"
                btnFinish.visibility = View.VISIBLE
                btnPay.visibility = View.GONE
                btnFinish.isClickable = true
            } else {
                tvOrderStatus.text = "Selesai"
                btnFinish.visibility = View.GONE
                btnPay.visibility = View.GONE
            }

        }
    }

    private fun renderProductList(productList: Array<ProductInOrderListModel>) {
        initProductList(productList)
    }

    private fun initProductList(productList: Array<ProductInOrderListModel>) {
        recyclerViewProducts = binding.recViewProduct
        recyclerViewProducts.layoutManager =
            LinearLayoutManager(this, LinearLayoutManager.VERTICAL, false)
        recyclerViewProductAdapter = ProductInOrderDetailsAdapter(this, productList)
        recyclerViewProducts.adapter = recyclerViewProductAdapter
        Log.d("driskidebug", "4")

    }

    private fun loadingState(isLoading: Boolean) {
        if (isLoading) {
            binding.apply {
                orderDetailsLayout.visibility = View.GONE
                orderDetailsProgressBar.visibility = View.VISIBLE
            }
        } else {
            binding.apply {
                orderDetailsLayout.visibility = View.VISIBLE
                orderDetailsProgressBar.visibility = View.GONE
            }
        }
    }

}

