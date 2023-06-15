package com.example.hiazee.ui.adapters

import android.annotation.SuppressLint
import android.content.Context
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.TextView
import androidx.appcompat.widget.AppCompatButton
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide
import com.example.hiazee.R
import com.example.hiazee.data.remote.models.CartModel
import com.example.hiazee.utils.showPriceIndoFormat

class CartAdapter(private val context: Context, private val cartList: List<CartModel>) :
    RecyclerView.Adapter<CartAdapter.ViewHolder>() {

    private var itemClickListener: CartAdapter.ItemClickListener? = null

    inner class ViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        val productImage: ImageView = itemView.findViewById(R.id.imageView14)
        val productName: TextView = itemView.findViewById(R.id.textView)
        val productPrice: TextView = itemView.findViewById(R.id.textView16)
        val decreaseButton: AppCompatButton = itemView.findViewById(R.id.buttonDecreaseItemCart)
        val itemCount: TextView = itemView.findViewById(R.id.itemCount)
        val increaseButton: AppCompatButton = itemView.findViewById(R.id.buttonIncreaseItemCart)
        val deleteButton: ImageView = itemView.findViewById(R.id.imageView15)
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        val view =
            LayoutInflater.from(context).inflate(R.layout.cart_card, parent, false)
        return ViewHolder(view)
    }

    @SuppressLint("SetTextI18n")
    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        val cartItem = cartList[position]

        Glide.with(holder.itemView.context)
            .load(cartItem.pictures[0])
            .centerCrop()
            .into(holder.productImage)

        holder.productName.text = cartItem.productName
        holder.productPrice.text = showPriceIndoFormat(cartItem.unitPrice)
        holder.itemCount.text = cartItem.count.toString()

        holder.deleteButton.setOnClickListener {
            itemClickListener?.onDeleteButtonClicked(cartItem.productId.toString())
        }

        holder.decreaseButton.setOnClickListener {
            itemClickListener?.onDecreaseButtonClicked(cartItem.productId.toString())
        }

        holder.increaseButton.setOnClickListener {
            itemClickListener?.onIncreaseButtonClicked(cartItem.productId.toString())
        }
    }

    override fun getItemCount(): Int {
        return cartList.size
    }

    fun setItemClickListener(listener: ItemClickListener) {
        itemClickListener = listener
    }

    interface ItemClickListener {
        fun onDeleteButtonClicked(productId: String)
        fun onDecreaseButtonClicked(productId: String)
        fun onIncreaseButtonClicked(productId: String)
    }
}
