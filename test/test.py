import requests

resp = requests.post("https://ml-bibitunggulid-zldx7crkfq-et.a.run.app", files={'file': open('bunga4.jpg', 'rb')})

print(resp.json())