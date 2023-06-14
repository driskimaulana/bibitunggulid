package com.example.hiazee.ui.adapters

import android.content.Context
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.TextView
import androidx.appcompat.view.menu.MenuView.ItemView
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide
import com.example.hiazee.data.remote.models.ProductInOrderListModel
import com.example.hiazee.R

class ProductInOrderDetailsAdapter(private  val context: Context, private val productList: List<ProductInOrderListModel>) :
 RecyclerView.Adapter<ProductInOrderDetailsAdapter.ViewHolder>() {

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

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        val product = productList[position]

        holder.tvProductName.text = product.productName
        holder.tvQuantity.text = "${product.quantity} barang"
        holder.tvUnitPrice.text = "Rp ${product.unitPrice}"
        Glide.with(context)
            .load(product.pictures[0])
            .into(holder.imgProduct)

    }
}