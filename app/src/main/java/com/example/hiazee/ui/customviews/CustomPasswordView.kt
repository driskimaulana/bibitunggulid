package com.example.hiazee.ui.customviews

import android.annotation.SuppressLint
import android.content.Context
import android.text.InputType
import android.util.AttributeSet
import android.view.LayoutInflater
import android.view.MotionEvent
import androidx.core.content.ContextCompat
import com.example.hiazee.R
import com.google.android.material.textfield.TextInputEditText
import com.google.android.material.textfield.TextInputLayout

@SuppressLint("ClickableViewAccessibility")
class CustomPasswordView @JvmOverloads constructor(
    context: Context,
    attrs: AttributeSet? = null,
    defStyleAttr: Int = 0
) : TextInputLayout(context, attrs, defStyleAttr) {

    private val editTextPassword: TextInputEditText

    init {
        LayoutInflater.from(context).inflate(R.layout.custom_password_view, this, true)

        editTextPassword = findViewById(R.id.editTextPassword)
        editTextPassword.setOnTouchListener { _, event ->
            if (event.action == MotionEvent.ACTION_UP) {
                val drawableEnd = editTextPassword.compoundDrawablesRelative[2]
                if (drawableEnd != null && event.rawX >= (editTextPassword.right - drawableEnd.bounds.width())) {
                    togglePasswordVisibility()
                    return@setOnTouchListener true
                }
            }
            return@setOnTouchListener false
        }
    }

    private fun togglePasswordVisibility() {
        val inputType =
            if (editTextPassword.inputType == InputType.TYPE_TEXT_VARIATION_VISIBLE_PASSWORD) {
                InputType.TYPE_CLASS_TEXT or InputType.TYPE_TEXT_VARIATION_PASSWORD
            } else {
                InputType.TYPE_CLASS_TEXT or InputType.TYPE_TEXT_VARIATION_VISIBLE_PASSWORD
            }

        editTextPassword.inputType = inputType
        editTextPassword.setSelection(editTextPassword.text?.length ?: 0)
        updateTogglePasswordIcon()
    }

    private fun updateTogglePasswordIcon() {
        val iconResId =
            if (editTextPassword.inputType == InputType.TYPE_TEXT_VARIATION_VISIBLE_PASSWORD) {
                R.drawable.ic_hide_password
            } else {
                R.drawable.ic_show_password
            }

        editTextPassword.setCompoundDrawablesRelativeWithIntrinsicBounds(
            null,
            null,
            ContextCompat.getDrawable(context, iconResId),
            null
        )
    }

    fun getPassword(): String {
        return editTextPassword.text.toString()
    }

    fun setPassword(password: String) {
        editTextPassword.setText(password)
    }
}
