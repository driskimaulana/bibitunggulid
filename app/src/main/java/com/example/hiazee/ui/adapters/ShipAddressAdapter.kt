package com.example.hiazee.ui.adapters

import android.content.Context
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.ImageView
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide
import com.example.hiazee.R
import com.example.hiazee.data.remote.models.ProductModel
import com.example.hiazee.data.remote.models.ShipAddressModel

class ShipAddressAdapter(private val context: Context, private val shipAddressList: List<ShipAddressModel>) :
    RecyclerView.Adapter<ShipAddressAdapter.ViewHolder>() {

    inner class ViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        val nameValue: TextView = itemView.findViewById(R.id.nameValue)
        val phoneValue: TextView = itemView.findViewById(R.id.phoneValue)
        val provinceValue: TextView = itemView.findViewById(R.id.provinceValue)
        val cityValue: TextView = itemView.findViewById(R.id.cityValue)
        val subdistrictValue: TextView = itemView.findViewById(R.id.subdistrictValue)
        val fullAddressValue: TextView = itemView.findViewById(R.id.fullAddressValue)
        val postalCodeValue: TextView = itemView.findViewById(R.id.postalCodeValue)
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        val view =
            LayoutInflater.from(context).inflate(R.layout.ship_address_card, parent, false)
        return ViewHolder(view)
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        val shipAddress = shipAddressList[position]

        holder.nameValue.text = shipAddress.name
        holder.phoneValue.text = shipAddress.phone
        holder.provinceValue.text = shipAddress.province
        holder.cityValue.text = shipAddress.city
        holder.subdistrictValue.text = shipAddress.subDistrict
        holder.fullAddressValue.text = shipAddress.fullAddress
        holder.postalCodeValue.text = shipAddress.postalCode
    }

    override fun getItemCount(): Int {
        return shipAddressList.size
    }
}