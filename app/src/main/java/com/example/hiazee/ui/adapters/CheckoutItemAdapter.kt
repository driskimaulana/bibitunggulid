package com.example.hiazee.ui.adapters

import android.annotation.SuppressLint
import android.content.Context
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide
import com.example.hiazee.R
import com.example.hiazee.data.remote.models.CartModel
import com.example.hiazee.utils.showPriceIndoFormat

class CheckoutItemAdapter(private  val context: Context, private val productList: List<CartModel>) :
    RecyclerView.Adapter<CheckoutItemAdapter.ViewHolder>() {

    inner class ViewHolder(itemView: View): RecyclerView.ViewHolder(itemView){
        val tvProductName: TextView = itemView.findViewById(R.id.tvProductNameOrderDetails)
        val tvQuantity: TextView = itemView.findViewById(R.id.tvQuantityOrderDetails)
        val tvUnitPrice: TextView = itemView.findViewById(R.id.tvUnitPrice)
        val imgProduct: ImageView = itemView.findViewById(R.id.productImageOrderDetails)
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        val view = LayoutInflater.from(context).inflate(R.layout.product_in_order_details_card, parent, false)
        return ViewHolder(view)
    }

    override fun getItemCount(): Int {
        return productList.size
    }

    @SuppressLint("SetTextI18n")
    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        val product = productList[position]

        holder.tvProductName.text = product.productName
        holder.tvQuantity.text = "${product.count} barang"
        holder.tvUnitPrice.text = showPriceIndoFormat(product.unitPrice)
        Glide.with(context)
            .load(product.pictures[0])
            .into(holder.imgProduct)

    }
}