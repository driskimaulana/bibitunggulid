package com.example.hiazee.ui.fragments

import android.content.Intent
import android.os.Bundle
import android.util.Log
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.viewModels
import androidx.lifecycle.lifecycleScope
import com.example.hiazee.databinding.FragmentProfileBinding
import com.example.hiazee.ui.activities.LoginActivity
import com.example.hiazee.ui.activities.OrderListActivity
import com.example.hiazee.ui.activities.ShipAddressActivity
import com.example.hiazee.ui.viewmodels.ProfileViewModel
import com.example.hiazee.utils.ViewModelFactory
import kotlinx.coroutines.launch

class ProfileFragment : Fragment() {

    private var _binding: FragmentProfileBinding? = null
    private val binding get() = _binding!!

    private val viewModel: ProfileViewModel by viewModels {
        ViewModelFactory.getInstance(requireContext())
    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        _binding = FragmentProfileBinding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        renderUserData()

        binding.buttonLogout.setOnClickListener {
            viewModel.deleteUserData()

            val intent = Intent(activity, LoginActivity::class.java)
            startActivity(intent)
            activity?.finish()
        }

        binding.pengaturanAlamat.setOnClickListener {
            val intent = Intent(activity, ShipAddressActivity::class.java)
            startActivity(intent)
        }

        binding.orderListButton.setOnClickListener{
            val intent = Intent(activity, OrderListActivity::class.java)
            startActivity(intent)
        }
    }

    private fun renderUserData() {
        viewLifecycleOwner.lifecycleScope.launch {
            viewModel.getUserData().collect { userData ->
                if (userData.token != "") {
                    binding.profileFullname.text = userData.fullName
                }
            }
        }
    }
}