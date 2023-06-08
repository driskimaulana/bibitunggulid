package com.example.hiazee.ui.adapters

import android.content.Context
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.Toast
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide
import com.example.hiazee.R
import com.example.hiazee.data.SliderModel

class SliderAdapter(var list: ArrayList<SliderModel>, var context: Context) :
    RecyclerView.Adapter<SliderAdapter.ViewHolder>() {
    class ViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        val sliderImage: ImageView = itemView.findViewById(R.id.slide_image)
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        val view =
            LayoutInflater.from(parent.context).inflate(R.layout.slider_layout, parent, false)
        return ViewHolder(view)
    }

    override fun getItemCount(): Int {
        return list.size
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        var currentItem = list[position]

        Glide.with(context.applicationContext)
            .load(currentItem.image)
            .into(holder.sliderImage)

        holder.itemView.setOnClickListener {
            Toast.makeText(context, currentItem.id.toString(), Toast.LENGTH_SHORT).show()
        }
    }
}