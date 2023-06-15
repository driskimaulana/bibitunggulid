package com.example.hiazee.ui.activities

import android.Manifest
import android.content.Intent
import android.graphics.BitmapFactory
import android.net.Uri
import android.os.Build
import android.os.Bundle
import android.util.Log
import android.view.WindowInsets
import android.view.WindowManager
import android.widget.Toast
import androidx.activity.result.contract.ActivityResultContracts
import androidx.activity.viewModels
import androidx.appcompat.app.AppCompatActivity
import androidx.camera.core.CameraSelector
import androidx.camera.core.ImageCapture
import androidx.camera.core.ImageCaptureException
import androidx.camera.core.Preview
import androidx.camera.lifecycle.ProcessCameraProvider
import androidx.core.content.ContextCompat
import com.example.hiazee.R
import com.example.hiazee.data.remote.models.PredictPlantResponse
import com.example.hiazee.databinding.ActivityCameraBinding
import com.example.hiazee.ui.viewmodels.CameraViewModel
import com.example.hiazee.ui.viewmodels.DetailProductViewModel
import com.example.hiazee.utils.*
import okhttp3.MediaType.Companion.toMediaType
import okhttp3.MediaType.Companion.toMediaTypeOrNull
import okhttp3.MultipartBody
import okhttp3.RequestBody.Companion.asRequestBody
import java.io.File
import java.util.concurrent.ExecutorService
import java.util.concurrent.Executors

class CameraActivity : AppCompatActivity() {
    private lateinit var binding: ActivityCameraBinding
    private lateinit var cameraExecutor: ExecutorService

    private val viewModel: CameraViewModel by viewModels {
        ViewModelFactory.getInstance(this)
    }

    private var getFile: File? = null
    private var showImage: Boolean = false

    private var cameraSelector: CameraSelector = CameraSelector.DEFAULT_BACK_CAMERA
    private var imageCapture: ImageCapture? = null

    private val launcherIntentGallery = registerForActivityResult(
        ActivityResultContracts.StartActivityForResult()
    ) { result ->
        if (result.resultCode == RESULT_OK) {
            val selectedImg: Uri = result.data?.data as Uri
            val myFile = uriToFile(selectedImg, this@CameraActivity)
            getFile = myFile
            binding.previewImageView.setImageURI(selectedImg)
            freezeCamera()
        }
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityCameraBinding.inflate(layoutInflater)
        setContentView(binding.root)

        cameraExecutor = Executors.newSingleThreadExecutor()

        binding.galleryIcon.setOnClickListener { startGallery() }
        binding.captureImage.setOnClickListener {
            if (showImage) {
                startCamera()
                continueCamera()
            } else {
                takePhoto()
            }
        }
        binding.switchCamera.setOnClickListener {
            cameraSelector =
                if (cameraSelector == CameraSelector.DEFAULT_BACK_CAMERA) CameraSelector.DEFAULT_FRONT_CAMERA
                else CameraSelector.DEFAULT_BACK_CAMERA
            startCamera()
        }
    }

    public override fun onResume() {
        super.onResume()
        hideSystemUI()
        if (!showImage) {
            startCamera()
        }
    }

    override fun onDestroy() {
        super.onDestroy()
        cameraExecutor.shutdown()
    }


    private fun takePhoto() {
        val imageCapture = imageCapture ?: return

        val photoFile = createFile(application)

        val outputOptions = ImageCapture.OutputFileOptions.Builder(photoFile).build()
        imageCapture.takePicture(
            outputOptions,
            ContextCompat.getMainExecutor(this),
            object : ImageCapture.OnImageSavedCallback {
                override fun onError(exc: ImageCaptureException) {
                    Toast.makeText(
                        this@CameraActivity,
                        getString(R.string.failed_take_picture),
                        Toast.LENGTH_SHORT
                    ).show()
                }

                override fun onImageSaved(output: ImageCapture.OutputFileResults) {
                    getFile = photoFile

                    val result = rotateBitmap(
                        BitmapFactory.decodeFile(photoFile.path),
                        cameraSelector == CameraSelector.DEFAULT_BACK_CAMERA
                    )

                    binding.previewImageView.setImageBitmap(result)
                    freezeCamera()
                }
            }
        )
    }

    private fun freezeCamera() {
        showImage = true
        binding.switchCamera.setImageResource(R.drawable.ic_switch_camera_disabled)
        binding.captureImage.setImageResource(R.drawable.ic_capture)

        binding.switchCamera.isEnabled = false

        getPrediction()
    }

    private fun getPrediction() {
        if (getFile != null) {
            val file = reduceFileImage(getFile as File)
            val requestImageFile = file.asRequestBody("image/jpg".toMediaTypeOrNull())
            val imageMultipart: MultipartBody.Part = MultipartBody.Part.createFormData(
                "photo",
                file.name,
                requestImageFile
            )

            viewModel.predictPlant(imageMultipart).observe(this) {
                if (it != null) {
                    when (it) {
                        is Result.Loading -> {
                            // loadingState(true)
                        }
                        is Result.Success -> {
                            // loadingState(false)
                            showPrediction(it.data)
                        }
                        is Result.Error -> {
                            // loadingState(false)
                            Log.d("error", it.error)
                            Toast.makeText(this, it.error, Toast.LENGTH_LONG).show()
                        }
                    }
                }
            }

        }
    }

    private fun showPrediction(pred: PredictPlantResponse) {
        Log.d("masuuk id", pred.id)
        Log.d("masuuk id", pred.productName)

        TODO("Not yet implemented")
    }

    private fun continueCamera() {
        showImage = false
        getFile = null
        binding.previewImageView.setImageResource(android.R.color.transparent)

        binding.switchCamera.isEnabled = true
        binding.switchCamera.setImageResource(R.drawable.ic_switch_camera)
        binding.captureImage.setImageResource(R.drawable.baseline_circle_24)
    }


    private fun startCamera() {

        val cameraProviderFuture = ProcessCameraProvider.getInstance(this)

        cameraProviderFuture.addListener({
            val cameraProvider: ProcessCameraProvider = cameraProviderFuture.get()
            val preview = Preview.Builder()
                .build()
                .also {
                    it.setSurfaceProvider(binding.viewFinder.surfaceProvider)
                }

            imageCapture = ImageCapture.Builder().build()

            try {
                cameraProvider.unbindAll()
                cameraProvider.bindToLifecycle(
                    this,
                    cameraSelector,
                    preview,
                    imageCapture
                )

            } catch (exc: Exception) {
                Toast.makeText(
                    this@CameraActivity,
                    getString(R.string.failed_open_camera),
                    Toast.LENGTH_SHORT
                ).show()
            }
        }, ContextCompat.getMainExecutor(this))
    }

    private fun startGallery() {
        val intent = Intent()
        intent.action = Intent.ACTION_GET_CONTENT
        intent.type = "image/*"
        val chooser = Intent.createChooser(intent, getString(R.string.choose_picture))
        launcherIntentGallery.launch(chooser)
    }

    private fun hideSystemUI() {
        @Suppress("DEPRECATION")
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
            window.insetsController?.hide(WindowInsets.Type.statusBars())
        } else {
            window.setFlags(
                WindowManager.LayoutParams.FLAG_FULLSCREEN,
                WindowManager.LayoutParams.FLAG_FULLSCREEN
            )
        }
        supportActionBar?.hide()
    }

    companion object {
        const val CAMERA_RESULT = 200

        private val REQUIRED_PERMISSIONS = arrayOf(Manifest.permission.CAMERA)
        private const val REQUEST_CODE_PERMISSIONS = 10
    }
}