package com.example.hiazee.ui.fragments

import android.os.Bundle
import android.os.Handler
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import androidx.viewpager2.widget.ViewPager2
import com.example.hiazee.R
import com.example.hiazee.data.ProductModel
import com.example.hiazee.data.SliderModel
import com.example.hiazee.ui.adapters.HomeProductAdapter
import com.example.hiazee.ui.adapters.SliderAdapter
import me.relex.circleindicator.CircleIndicator3

// TODO: Rename parameter arguments, choose names that match
// the fragment initialization parameters, e.g. ARG_ITEM_NUMBER
private const val ARG_PARAM1 = "param1"
private const val ARG_PARAM2 = "param2"

/**
 * A simple [Fragment] subclass.
 * Use the [HomeFragment.newInstance] factory method to
 * create an instance of this fragment.
 */
class HomeFragment : Fragment() {
    // TODO: Rename and change types of parameters
    private var param1: String? = null
    private var param2: String? = null

    lateinit var isViewImage: ViewPager2
    lateinit var sliderList: ArrayList<SliderModel>
    lateinit var sliderAdapter: SliderAdapter
    lateinit var indicator: CircleIndicator3

    val sliderHandler = Handler()

    private lateinit var recyclerView1: RecyclerView
    private lateinit var recyclerView2: RecyclerView
    private lateinit var productAdapter1: HomeProductAdapter
    private lateinit var productAdapter2: HomeProductAdapter
    private val productList1 = listOf(
        ProductModel("https://source.unsplash.com/random/400x230/?plants", "Product 1", "$10"),
        ProductModel(
            "https://source.unsplash.com/random/400x230/?nature,plants",
            "Product 2",
            "$20"
        ),
        ProductModel(
            "https://source.unsplash.com/random/400x230/?greenery,plants",
            "Product 3",
            "$30"
        ),
    )
    private val productList2 = listOf(
        ProductModel(
            "https://source.unsplash.com/random/400x230/?greenery,plants",
            "Product 1",
            "$10"
        ),
        ProductModel(
            "https://source.unsplash.com/random/400x230/?gardening,plants",
            "Product 2",
            "$20"
        ),
        ProductModel(
            "https://source.unsplash.com/random/400x230/?flowers,plants",
            "Product 3",
            "$30"
        ),
    )

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        arguments?.let {
            param1 = it.getString(ARG_PARAM1)
            param2 = it.getString(ARG_PARAM2)
        }
    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_home, container, false)
    }

    companion object {
        /**
         * Use this factory method to create a new instance of
         * this fragment using the provided parameters.
         *
         * @param param1 Parameter 1.
         * @param param2 Parameter 2.
         * @return A new instance of fragment HomeFragment.
         */
        // TODO: Rename and change types and number of parameters
        @JvmStatic
        fun newInstance(param1: String, param2: String) =
            HomeFragment().apply {
                arguments = Bundle().apply {
                    putString(ARG_PARAM1, param1)
                    putString(ARG_PARAM2, param2)
                }
            }
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        initSliderHome(view)

        initRecyclerView1(view)
        initRecyclerView2(view)
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

//        val compositePageTransformer = CompositePageTransformer()
//        compositePageTransformer.addTransformer(MarginPageTransformer(36))
//        compositePageTransformer.addTransformer(object : ViewPager2.PageTransformer {
//            override fun transformPage(page: View, position: Float) {
//                val r = 1 - abs(position)
//                page.scaleY = 0.85f + r * 0.15f
//            }
//        })

//        isViewImage.setPageTransformer(compositePageTransformer)
        isViewImage.registerOnPageChangeCallback(object : ViewPager2.OnPageChangeCallback() {
            override fun onPageSelected(position: Int) {
                super.onPageSelected(position)

                sliderHandler.removeCallbacks(sliderRunnable)
                sliderHandler.postDelayed(sliderRunnable, 5000)

//                if(position == sliderList.size - 2){
//                    isViewImage.post(runnable)
//                }
            }
        })
    }

    private fun initRecyclerView1(view: View) {
        recyclerView1 = view.findViewById(R.id.homeProductRecyclerView1)
        recyclerView1.layoutManager =
            LinearLayoutManager(context, LinearLayoutManager.HORIZONTAL, false)
        productAdapter1 = HomeProductAdapter(requireContext(), productList1)
        recyclerView1.adapter = productAdapter1
    }

    private fun initRecyclerView2(view: View) {
        recyclerView2 = view.findViewById(R.id.homeProductRecyclerView2)
        recyclerView2.layoutManager =
            LinearLayoutManager(context, LinearLayoutManager.HORIZONTAL, false)
        productAdapter2 = HomeProductAdapter(requireContext(), productList2)
        recyclerView2.adapter = productAdapter2
    }

    val sliderRunnable = Runnable {
        isViewImage.currentItem =
            if (isViewImage.currentItem < sliderList.size - 1) isViewImage.currentItem + 1 else 0
    }
//    val runnable = Runnable {
//        sliderList.addAll(sliderList)
//        sliderAdapter.notifyDataSetChanged()
//    }

    override fun onPause() {
        super.onPause()
        sliderHandler.removeCallbacks(sliderRunnable)
    }

    override fun onResume() {
        super.onResume()
        sliderHandler.postDelayed(sliderRunnable, 5000)
    }
}