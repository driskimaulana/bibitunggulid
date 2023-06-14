package com.example.hiazee.ui.fragments

import android.content.Intent
import android.content.LocusId
import android.os.Bundle
import android.os.Handler
import android.util.Log
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import androidx.activity.viewModels
import androidx.appcompat.app.AlertDialog
import androidx.fragment.app.viewModels
import androidx.lifecycle.ViewModelProvider
import androidx.lifecycle.lifecycleScope
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import androidx.viewpager2.widget.ViewPager2
import com.example.hiazee.R
import com.example.hiazee.data.SliderModel
import com.example.hiazee.data.remote.UserDataStore
import com.example.hiazee.data.remote.models.ProductModel
import com.example.hiazee.data.remote.models.UserData
import com.example.hiazee.databinding.FragmentHomeBinding
import com.example.hiazee.ui.activities.LoginActivity
import com.example.hiazee.ui.activities.MainActivity
import com.example.hiazee.ui.adapters.HomeProductAdapter
import com.example.hiazee.ui.adapters.SliderAdapter
import com.example.hiazee.ui.viewmodels.AuthViewModel
import com.example.hiazee.ui.viewmodels.HomeViewModel
import com.example.hiazee.utils.ViewModelFactory
import com.example.hiazee.utils.Result
import kotlinx.coroutines.launch
import me.relex.circleindicator.CircleIndicator3

class HomeFragment : Fragment() {

    private var _binding: FragmentHomeBinding? = null
    private val binding get() = _binding!!

    private val viewModel: HomeViewModel by viewModels {
        ViewModelFactory.getInstance(requireContext())
    }

    lateinit var isViewImage: ViewPager2
    lateinit var sliderList: ArrayList<SliderModel>
    lateinit var sliderAdapter: SliderAdapter
    lateinit var indicator: CircleIndicator3

    val sliderHandler = Handler()

    private lateinit var recyclerView1: RecyclerView
    private lateinit var productAdapter1: HomeProductAdapter
    private lateinit var recyclerView2: RecyclerView
    private lateinit var productAdapter2: HomeProductAdapter

    private lateinit var userData: UserData

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        _binding = FragmentHomeBinding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        lifecycleScope.launch {
            viewModel.getUserData().collect {
                userData = it
            }
        }

        initSliderHome(view)

        viewModel.getProductsTerlaris().observe(this) {
            if (it != null) {
                when (it) {
                    is Result.Loading -> {
                        loadingState1(true)
                    }
                    is Result.Success -> {
                        loadingState1(false)
                        initRecyclerView1(view, it.data)
                    }
                    is Result.Error -> {
                        loadingState1(false)
                        Toast.makeText(requireContext(), it.error, Toast.LENGTH_SHORT).show()
                    }
                }
            }
        }

        viewModel.getProductsTerbaru().observe(this) {
            if (it != null) {
                when (it) {
                    is Result.Loading -> {
                        loadingState2(true)
                    }
                    is Result.Success -> {
                        loadingState2(false)
                        initRecyclerView2(view, it.data)
                    }
                    is Result.Error -> {
                        loadingState2(false)
                        Toast.makeText(requireContext(), it.error, Toast.LENGTH_SHORT).show()
                    }
                }
            }
        }
    }

    private fun initSliderHome(view: View) {
        isViewImage = view.findViewById(R.id.isViewImage)
        sliderList = ArrayList()

        sliderAdapter = SliderAdapter(sliderList, requireContext())

        sliderList.add(SliderModel(0, "https://source.unsplash.com/random/400x230/?plants"))
        sliderList.add(SliderModel(1, "https://source.unsplash.com/random/400x230/?nature,plants"))
        sliderList.add(
            SliderModel(
                2,
                "https://source.unsplash.com/random/400x230/?greenery,plants"
            )
        )
        sliderList.add(
            SliderModel(
                3,
                "https://source.unsplash.com/random/400x230/?gardening,plants"
            )
        )
        sliderList.add(SliderModel(4, "https://source.unsplash.com/random/400x230/?flowers,plants"))

        sliderAdapter.notifyDataSetChanged()

        isViewImage.adapter = sliderAdapter
        isViewImage.clipChildren = false
        isViewImage.clipToPadding = false
        isViewImage.offscreenPageLimit = 3
        isViewImage.getChildAt(0).overScrollMode = RecyclerView.OVER_SCROLL_NEVER

        indicator = view.findViewById(R.id.indicator)
        indicator.setViewPager(isViewImage)

        isViewImage.registerOnPageChangeCallback(object : ViewPager2.OnPageChangeCallback() {
            override fun onPageSelected(position: Int) {
                super.onPageSelected(position)

                sliderHandler.removeCallbacks(sliderRunnable)
                sliderHandler.postDelayed(sliderRunnable, 5000)
            }
        })
    }

    private fun initRecyclerView1(view: View, productList: List<ProductModel>) {
        recyclerView1 = view.findViewById(R.id.homeProductRecyclerView1)
        recyclerView1.layoutManager =
            LinearLayoutManager(context, LinearLayoutManager.HORIZONTAL, false)
        productAdapter1 = HomeProductAdapter(requireContext(), productList)

        productAdapter1.setItemClickListener(object : HomeProductAdapter.ItemClickListener {
            override fun onAddButtonClicked(productId: Int) {
                addProductToCart(productId.toString())
            }
        })
        recyclerView1.adapter = productAdapter1
    }


    private fun initRecyclerView2(view: View, productList: List<ProductModel>) {
        recyclerView2 = view.findViewById(R.id.homeProductRecyclerView2)
        recyclerView2.layoutManager =
            LinearLayoutManager(context, LinearLayoutManager.HORIZONTAL, false)
        productAdapter2 = HomeProductAdapter(requireContext(), productList)
        recyclerView2.adapter = productAdapter2
    }

    val sliderRunnable = Runnable {
        isViewImage.currentItem =
            if (isViewImage.currentItem < sliderList.size - 1) isViewImage.currentItem + 1 else 0
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
                            Toast.makeText(requireContext(), "Product Berhasil Ditambahkan", Toast.LENGTH_SHORT).show()
                        }
                        is Result.Error -> {
                            // loadingState(false)
                            Toast.makeText(requireContext(), it.error, Toast.LENGTH_SHORT).show()
                        }
                    }
                }
            }
    }

    private fun loadingState1(isLoading: Boolean) {
        if (isLoading) {
            binding.apply {
                homeProductRecyclerView1.visibility = View.INVISIBLE
                homeProductRecyclerViewLoading1.visibility = View.VISIBLE
            }
        } else {
            binding.apply {
                homeProductRecyclerView1.visibility = View.VISIBLE
                homeProductRecyclerViewLoading1.visibility = View.GONE
            }
        }
    }

    private fun loadingState2(isLoading: Boolean) {
        if (isLoading) {
            binding.apply {
                homeProductRecyclerView2.visibility = View.INVISIBLE
                homeProductRecyclerViewLoading2.visibility = View.VISIBLE
            }
        } else {
            binding.apply {
                homeProductRecyclerView2.visibility = View.VISIBLE
                homeProductRecyclerViewLoading2.visibility = View.GONE
            }
        }
    }

    override fun onPause() {
        super.onPause()
        sliderHandler.removeCallbacks(sliderRunnable)
    }

    override fun onResume() {
        super.onResume()
        sliderHandler.postDelayed(sliderRunnable, 5000)
    }
}