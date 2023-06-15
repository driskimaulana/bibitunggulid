package com.example.hiazee.ui.adapters

import android.annotation.SuppressLint
import android.content.Context
import android.content.Intent
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.ImageView
import android.widget.TextView
import androidx.cardview.widget.CardView
import androidx.core.content.ContextCompat.startActivity
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide
import com.example.hiazee.R
import com.example.hiazee.data.remote.models.ProductModel
import com.example.hiazee.ui.activities.DetailProductActivity
import com.example.hiazee.ui.activities.OrderListActivity
import java.text.DecimalFormat

class HomeProductAdapter(private val context: Context, private val productList: List<ProductModel>) :
    RecyclerView.Adapter<HomeProductAdapter.ViewHolder>() {

    private var itemClickListener: ItemClickListener? = null

    inner class ViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        val productImage: ImageView = itemView.findViewById(R.id.productImage)
        val productName: TextView = itemView.findViewById(R.id.productName)
        val productPrice: TextView = itemView.findViewById(R.id.productPrice)
        val addButton: Button = itemView.findViewById(R.id.addButton)

        val productCard: CardView = itemView.findViewById(R.id.productCard)
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        val view =
            LayoutInflater.from(context).inflate(R.layout.product_card, parent, false)
        return ViewHolder(view)
    }

    @SuppressLint("SetTextI18n")
    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        val product = productList[position]

        Glide.with(context)
            .load(product.pictures[0])
            .into(holder.productImage)
        holder.productName.text = product.productName

        val decimalFormat = DecimalFormat("#,###")
        val formattedPrice = decimalFormat.format(product.unitPrice.toInt())
        holder.productPrice.text = "Rp $formattedPrice"

        holder.addButton.setOnClickListener {
            itemClickListener?.onAddButtonClicked(product.id.toString())
        }

        holder.productCard.setOnClickListener{
            val intent = Intent(context, DetailProductActivity::class.java)
            intent.putExtra("id", product.id.toString())
            context.startActivity(intent)
        }
    }

    override fun getItemCount(): Int {
        return productList.size
    }

    fun setItemClickListener(listener: ItemClickListener) {
        itemClickListener = listener
    }

    interface ItemClickListener {
        fun onAddButtonClicked(productId: String)
    }
}