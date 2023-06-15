package com.example.hiazee.ui.activities

import android.Manifest
import android.content.Intent
import android.content.pm.PackageManager
import android.graphics.BitmapFactory
import android.location.Location
import android.net.Uri
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.text.Editable
import android.text.TextWatcher
import android.util.Log
import android.view.View
import android.widget.Toast
import androidx.activity.result.contract.ActivityResultContracts
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat
import androidx.lifecycle.ViewModelProvider
import com.example.hiazee.R
import com.example.hiazee.databinding.ActivityBeforeCameraBinding
import com.example.hiazee.utils.ViewModelFactory
import com.example.hiazee.utils.reduceFileImage
import com.example.hiazee.utils.rotateBitmap
import com.example.hiazee.utils.uriToFile
import okhttp3.MediaType.Companion.toMediaType
import okhttp3.MediaType.Companion.toMediaTypeOrNull
import okhttp3.MultipartBody
import okhttp3.RequestBody.Companion.asRequestBody
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response
import java.io.File

class BeforeCameraActivity : AppCompatActivity() {
    private lateinit var binding: ActivityBeforeCameraBinding

    private var getFile: File? = null
    private val launcherIntentCameraX = registerForActivityResult(
        ActivityResultContracts.StartActivityForResult()
    ) {
        if (it.resultCode == CAMERA_RESULT) {
            val myFile = it.data?.getSerializableExtra("picture") as File
            getFile = myFile

            val isBackCamera = it.data?.getBooleanExtra("isBackCamera", true) as Boolean
            val result = rotateBitmap(
                BitmapFactory.decodeFile(myFile.path),
                isBackCamera
            )

            binding.previewImageView.setImageBitmap(result)
        }
    }

    private val launcherIntentGallery = registerForActivityResult(
        ActivityResultContracts.StartActivityForResult()
    ) { result ->
        if (result.resultCode == RESULT_OK) {
            val selectedImg: Uri = result.data?.data as Uri
            val myFile = uriToFile(selectedImg, this@BeforeCameraActivity)
            getFile = myFile
            binding.previewImageView.setImageURI(selectedImg)
        }
    }

    override fun onRequestPermissionsResult(
        requestCode: Int,
        permissions: Array<String>,
        grantResults: IntArray
    ) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults)
        if (requestCode == REQUEST_CODE_PERMISSIONS) {
            if (!allPermissionsGranted()) {
                Toast.makeText(
                    this,
                    getString(R.string.doesnt_get_permission),
                    Toast.LENGTH_SHORT
                ).show()
                finish()
            }
        }
    }

    private fun allPermissionsGranted() = REQUIRED_PERMISSIONS.all {
        ContextCompat.checkSelfPermission(baseContext, it) == PackageManager.PERMISSION_GRANTED
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityBeforeCameraBinding.inflate(layoutInflater)
        setContentView(binding.root)

//        val pref = UserSession.getInstance(dataStore)
//        addStoryViewModel =
//            ViewModelProvider(this, ViewModelFactory(pref))[AddStoryViewModel::class.java]

        if (!allPermissionsGranted()) {
            ActivityCompat.requestPermissions(
                this,
                REQUIRED_PERMISSIONS,
                REQUEST_CODE_PERMISSIONS
            )
        }

//        binding.edDescription.addTextChangedListener(object : TextWatcher {
//            override fun beforeTextChanged(s: CharSequence?, start: Int, count: Int, after: Int) {
//            }
//
//            override fun onTextChanged(s: CharSequence?, start: Int, before: Int, count: Int) {
//                if (!s.isNullOrBlank()) {
//                    binding.uploadButton.isEnabled = true
//                } else {
//                    binding.uploadButton.isEnabled = false
//                    binding.edDescription.error = getString(R.string.fill_in)
//                }
//            }
//
//            override fun afterTextChanged(s: Editable?) {
//            }
//
//        })
        binding.cameraxButton.setOnClickListener { startCameraX() }
        binding.galleryButton.setOnClickListener { startGallery() }
//        binding.uploadButton.setOnClickListener { uploadImage() }

//        fusedLocationClient = LocationServices.getFusedLocationProviderClient(this)
//        getMyLastLocation()
    }

    private fun startCameraX() {
        val intent = Intent(this, CameraActivity::class.java)
        launcherIntentCameraX.launch(intent)
    }

    private fun startGallery() {
        val intent = Intent()
        intent.action = Intent.ACTION_GET_CONTENT
        intent.type = "image/*"
        val chooser = Intent.createChooser(intent, getString(R.string.choose_picture))
        launcherIntentGallery.launch(chooser)
    }

//    private fun uploadImage() {
//        if (getFile != null) {
//            val file = reduceFileImage(getFile as File)
//            val description =
//                binding.edDescription.text.toString().toRequestBody("text/plain".toMediaType())
//            val lat = location.latitude.toFloat()
//            val long = location.longitude.toFloat()
//            val requestImageFile = file.asRequestBody("image/jpeg".toMediaTypeOrNull())
//            val imageMultipart: MultipartBody.Part = MultipartBody.Part.createFormData(
//                "photo",
//                file.name,
//                requestImageFile
//            )
//
//            addStoryViewModel.getToken().observe(
//                this
//            ) { token: String ->
//                val service = ApiConfig.getApiService()
//                    .uploadStories("Bearer $token", imageMultipart, description, lat, long)
//                showLoading(true)
//                service.enqueue(object : Callback<AddNewStory> {
//                    override fun onResponse(
//                        call: Call<AddNewStory>,
//                        response: Response<AddNewStory>
//                    ) {
//                        if (response.isSuccessful) {
//                            showLoading(false)
//                            val responseBody = response.body()
//                            if (responseBody != null && !responseBody.error!!) {
//                                Toast.makeText(
//                                    this@AddStoryActivity,
//                                    responseBody.message,
//                                    Toast.LENGTH_SHORT
//                                ).show()
//                                intentMain()
//                            }
//                        } else {
//                            showLoading(false)
//                            Toast.makeText(
//                                this@AddStoryActivity,
//                                response.message(),
//                                Toast.LENGTH_SHORT
//                            ).show()
//                        }
//                    }
//
//                    override fun onFailure(call: Call<AddNewStory>, t: Throwable) {
//                        showLoading(false)
//                        Toast.makeText(
//                            this@AddStoryActivity,
//                            getString(R.string.failed_retrofit),
//                            Toast.LENGTH_SHORT
//                        ).show()
//                    }
//                })
//            }
//        } else {
//            Toast.makeText(
//                this@AddStoryActivity,
//                getString(R.string.select_image),
//                Toast.LENGTH_SHORT
//            ).show()
//        }
//    }
//

    private fun showLoading(isLoading: Boolean) {
        binding.progressBar.apply {
            visibility = if (isLoading) {
                View.VISIBLE
            } else {
                View.GONE
            }
        }
    }

    private fun intentMain() {
        val i = Intent(this, MainActivity::class.java)
        startActivity(i)
        showLoading(false)
        finish()
    }

    private fun checkPermission(permission: String): Boolean {
        return ContextCompat.checkSelfPermission(
            this,
            permission
        ) == PackageManager.PERMISSION_GRANTED
    }


    companion object {
        const val CAMERA_RESULT = 200

        private val REQUIRED_PERMISSIONS = arrayOf(Manifest.permission.CAMERA)
        private const val REQUEST_CODE_PERMISSIONS = 10
    }
}