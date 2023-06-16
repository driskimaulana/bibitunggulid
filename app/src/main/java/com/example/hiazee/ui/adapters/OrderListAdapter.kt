package com.example.hiazee.ui.adapters

import android.annotation.SuppressLint
import android.content.Context
import android.content.Intent
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide
import com.example.hiazee.R
import com.example.hiazee.data.remote.models.OrderModel
import com.example.hiazee.ui.activities.OrderDetailsActivity
import java.text.SimpleDateFormat
import java.util.Calendar
import java.util.Locale

class OrderListAdapter(private val context: Context, private val orderList: List<OrderModel>) :
    RecyclerView.Adapter<OrderListAdapter.ViewHolder>() {

    inner class ViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        val statusName: TextView = itemView.findViewById(R.id.orderStatus)
        val orderDate: TextView = itemView.findViewById(R.id.orderDate)
        val productName: TextView = itemView.findViewById(R.id.tvProductName)
        val quantity: TextView = itemView.findViewById(R.id.tvQuantity)
        val totalBelanja: TextView = itemView.findViewById(R.id.tvTotalBelanja)
        val otherProduct: TextView = itemView.findViewById(R.id.tvOtherProduct)
        val prodctImage: ImageView = itemView.findViewById(R.id.productImage)
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        val view = LayoutInflater.from(context).inflate(R.layout.order_card, parent, false)
        return ViewHolder(view)
    }

    @SuppressLint("SetTextI18n")
    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        val order = orderList[position]

        holder.statusName.text = order.statusName
        holder.productName.text = order.products[0].productName
        Log.d("driskidebug", "onBindViewHolder: ${order.products[0].quantity}")
        holder.quantity.text = order.products[0].quantity.toString() + " barang"

        val format = SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", Locale.getDefault())
        val date = format.parse(order.createdAt) // Mengonversi string menjadi Date

        val calendar = Calendar.getInstance()
        calendar.time = date
        val dayOfWeek = SimpleDateFormat("EEEE", Locale("id", "ID")).format(date)
        val monthOfYear = SimpleDateFormat("MMM", Locale("id", "ID")).format(date)

        holder.orderDate.text = "${dayOfWeek}, ${date.date}, ${monthOfYear} ${calendar.get(Calendar.YEAR)}"

        var total = order.freight
        for (product in order.products) {
            total += product.quantity * product.unitPrice
        }
        holder.totalBelanja.text = "Total Belanja: Rp $total"
        if (order.products.size == 1) {
            holder.otherProduct.visibility = View.GONE
        }else{
            holder.otherProduct.text = "+${order.products.size-1} barang"
        }

        Glide.with(context).load(order.products[0].pictures[0]).into(holder.prodctImage)

        holder.itemView.setOnClickListener {
            val intent = Intent(context, OrderDetailsActivity::class.java)
            intent.putExtra("id", order.id.toString())

            context.startActivity(intent)
        }

    }

    override fun getItemCount(): Int {
        return orderList.size
    }

}