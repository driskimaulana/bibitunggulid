package com.example.hiazee.ui.activities.onboarding

import android.content.Context
import android.content.Intent
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.ImageView
import android.widget.TextView
import androidx.appcompat.view.menu.MenuView.ItemView
import androidx.recyclerview.widget.RecyclerView
import com.example.hiazee.R
import com.example.hiazee.data.remote.models.OrderModel
import com.example.hiazee.ui.activities.LoginActivity
import com.example.hiazee.ui.activities.OrderDetailsActivity

class OnBoardingAdapter(private val context: Context, private val onBoardingItems: List<OnBoardingItem>):
RecyclerView.Adapter<OnBoardingAdapter.ViewHolder>() {
    inner class ViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        val textTitle: TextView = itemView.findViewById(R.id.onboardingTitle)
        val textDescription: TextView = itemView.findViewById(R.id.onboardingDescription)
        val imageOnboarding: ImageView = itemView.findViewById(R.id.onboardingImage)
        val btnGabungSekarang: Button = itemView.findViewById(R.id.btnGabungSekarang)
    }

    override fun onCreateViewHolder(
        parent: ViewGroup,
        viewType: Int
    ): ViewHolder {
        val view = LayoutInflater.from(context).inflate(R.layout.item_container_onboarding, parent, false)
        return ViewHolder(view)
    }

    override fun onBindViewHolder(holder: OnBoardingAdapter.ViewHolder, position: Int) {
        val item = onBoardingItems[position]
        holder.textTitle.text = item.title
        holder.textDescription.text = item.description
        holder.imageOnboarding.setImageResource(item.image)

        holder.btnGabungSekarang.setOnClickListener {
            val intent = Intent(context, LoginActivity::class.java)
            context.startActivity(intent)
        }
    }

    override fun getItemCount(): Int {
        return onBoardingItems.size
    }


}