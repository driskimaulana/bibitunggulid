package com.example.hiazee.ui.activities.onboarding

import android.media.Image
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.LinearLayout
import androidx.core.content.ContextCompat
import androidx.viewpager2.widget.ViewPager2
import com.example.hiazee.R
import com.example.hiazee.databinding.ActivityOnBoardingBinding

class OnBoardingActivity : AppCompatActivity() {

    private lateinit var binding: ActivityOnBoardingBinding

    private lateinit var onBoardingAdapter: OnBoardingAdapter
    private lateinit var indicatorlayout: LinearLayout

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        binding = ActivityOnBoardingBinding.inflate(layoutInflater)
        setContentView(binding.root)


        val onboardingItems = listOf<OnBoardingItem>(
            OnBoardingItem(R.drawable.rafiki,"Hiasi Ruanganmu dengan Tanaman Hias dari Hiazee", "Hadir untuk menghiasi setiap sudut ruanganmu dengan tanaman hias cantik kualitas terbaik. Ruangan jadi lebih nyaman dengan tanaman hias dari Hiazee"),
            OnBoardingItem(R.drawable.amico,"Tanaman Hias Berkualitas dari Toko-toko Pilihan", "Bekerja sama dengan toko-toko pilihan, berkomitmen menyediakan berbagai jenis tanaman hias berkualitas tinggi"),
            OnBoardingItem(R.drawable.cuate, "Mudah, Terjangkau, Diantar Sampai Rumah", "Belanja praktis dengan harga ekonomis, dan kamu tidak perlu repot-repot pergi ke toko fisik, cukup duduk manis dan temukan koleksi tanaman hias menarik melalui aplikasi kami"),
            OnBoardingItem(R.drawable.bro, "Ambil Gambar dan Temukan Tanaman Hias Favoritmu", "Nikmati kemudahan menjelajahi koleksi lengkap tanaman hias dengan inovasi fitur pencarian menggunakan gambar, cukup potret atau unggah gambar dari gadget-mu")
        )

        onBoardingAdapter = OnBoardingAdapter(this, onboardingItems)

        val onboardingViewPager = binding.onboardingViewPager
        onboardingViewPager.adapter = onBoardingAdapter

        indicatorlayout = binding.layoutOnboardingIndicators

        setupOnBoardingIndicators()

        onboardingViewPager.registerOnPageChangeCallback(object: ViewPager2.OnPageChangeCallback(){
            override fun onPageSelected(position: Int) {
                if (binding.onboardingViewPager.currentItem == 3) {
                    binding.btnOnBoardingAction.visibility = View.INVISIBLE
                }else{
                    binding.btnOnBoardingAction.visibility = View.VISIBLE
                }
                super.onPageSelected(position)
                setCurrenctOnBoardingIndicator(position)
            }
        })



        binding.btnOnBoardingAction.setOnClickListener {
            val currentItem = binding.onboardingViewPager.currentItem
            if (currentItem < 3){
                binding.btnOnBoardingAction.visibility = View.VISIBLE
                setCurrenctOnBoardingIndicator(currentItem +1)
                binding.onboardingViewPager.setCurrentItem(currentItem + 1)
            }
        }
    }

    private fun setupOnBoardingIndicators(){
        var indicators: ArrayList<ImageView> = arrayListOf<ImageView>()
        var layoutParams: LinearLayout.LayoutParams = LinearLayout.LayoutParams(
            ViewGroup.LayoutParams.WRAP_CONTENT, ViewGroup.LayoutParams.WRAP_CONTENT
        )
        layoutParams.setMargins(8, 0, 8, 0)
        for (i in 0..3){
            indicators.add(ImageView(applicationContext))
            indicators[i].setImageDrawable(
                ContextCompat
                    .getDrawable(applicationContext, R.drawable.onboarding_indicator_inactive))
            indicators[i].layoutParams = layoutParams
            indicatorlayout.addView(indicators[i])
        }
    }

    private fun setCurrenctOnBoardingIndicator(index: Int){
        var childCount: Int = indicatorlayout.childCount
        for (i in 0..3){
            var imageView: ImageView = indicatorlayout.getChildAt(i) as ImageView
            Log.d("driskidebug", "setupOnBoardingIndicators: hello ${imageView.toString()}")
            if (i == index){
                Log.d("driskidebug", "setupOnBoardingIndicators: hello2 ${imageView.toString()}")
                imageView.setImageDrawable(
                    ContextCompat.getDrawable(applicationContext, R.drawable.onboarding_indicator_active)
                )
            }else {
                imageView.setImageDrawable(
                        ContextCompat.getDrawable(applicationContext, R.drawable.onboarding_indicator_inactive)
                )
            }
        }
    }

}