from tensorflow import keras
from tensorflow.keras.preprocessing import image
import numpy as np

# Memuat model dari file h5
model = keras.models.load_model('my_model.h5')

# Load and preprocess the image
img_path = 'bunga4.jpg'
img = image.load_img(img_path, target_size=(400, 400))
x = image.img_to_array(img)
x = np.expand_dims(x, axis=0)
x /= 255.0

# Make predictions
predictions = model.predict(x)

# Get the predicted class
predicted_class = np.argmax(predictions)

print("Predicted class:", predicted_class)