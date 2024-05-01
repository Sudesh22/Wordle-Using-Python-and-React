from flask import Flask, jsonify, request
from Wordle import newWord, CheckWord
import socket
app = Flask(__name__)

@app.get("/")
def home():
    return("<h1>hello<h1/>")

@app.post("/newWord")
def NewWord():
    response = newWord()
    message = {"answer": response}
    print(message)
    return jsonify(message)

@app.post("/check")
def check():
    text = request.get_json().get("text")
    answer = request.get_json().get("answer")
    print("text is",text,"answer is", answer)
    output = CheckWord(answer, text)
    print("output is",output)
    message = {"answer": answer, "output" : output}
    return jsonify(message)

if __name__ == "__main__":
    app.debug=True
    IPAddr = socket.gethostbyname(socket.gethostname())  
    app.run(host=IPAddr, port=5000)