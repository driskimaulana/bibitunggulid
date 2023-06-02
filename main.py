import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'

import io
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras.preprocessing import image
import numpy as np
from flask import Flask, request, jsonify

model = keras.models.load_model("models/modelv1.h5")

def transform_image(image_bytes):
    img = image.load_img(io.BytesIO(image_bytes), target_size=(400,400))
    x = image.img_to_array(img)
    x = np.expand_dims(x, axis=0)
    x /= 255.0
    return x


def predict(x):
    predictions = model.predict(x)
    predictions = tf.nn.softmax(predictions)
    pred0 = predictions[0]
    label0 = np.argmax(pred0)
    return label0

def getClass(prediction):
    dataClass = ""
    if int(prediction) == 0:
        dataClass = "Aloevera"
    elif int(prediction) == 1:
        dataClass = "Anthuriumandreanum"
    elif int(prediction) == 2:
        dataClass = "Araucariaheterophylla"
    elif int(prediction) == 3:
        dataClass = "Bamboo"
    elif int(prediction) == 4:
        dataClass = "Bostonfern"
    elif int(prediction) == 5:
        dataClass = "Croton"
    elif int(prediction) == 6:
        dataClass = "Dieffenbachia"
    elif int(prediction) == 7:
        dataClass = "Epipremnum"
    elif int(prediction) == 8:
        dataClass = "Euphorbiamilii"
    elif int(prediction) == 9:
        dataClass = "Monsteradeliciosa"   
    elif int(prediction) == 10:
        dataClass = "Snake_plant"
    elif int(prediction) == 11:
        dataClass = "Spathiphyllum"
    elif int(prediction) == 12:
        dataClass = "Whiteorchids"
    elif int(prediction) == 13:
        dataClass = "ZZ_plant" 
    
    return dataClass

app = Flask(__name__)

@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        file = request.files.get('file')
        if file is None or file.filename == "":
            return jsonify({"error": "no file"})

        try:
            image_bytes = file.read()
            tensor = transform_image(image_bytes)
            prediction = predict(tensor)
            data_class = getClass(prediction)
            data = {"prediction": str(data_class)}
            return jsonify(data)
        except Exception as e:
            return jsonify({"error": str(e)})

    return "OK"


if __name__ == "__main__":
    app.run(debug=True)