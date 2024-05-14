from flask import Flask, request, jsonify
from flask_cors import CORS
from model import prioritize_tasks

app = Flask(__name__)
CORS(app)


@app.route("/prioritize", methods=["POST"])
def prioritize():
    data = request.json
    tasks = data["tasks"]
    prioritized_tasks = prioritize_tasks(tasks)
    return jsonify(prioritized_tasks)


if __name__ == "__main__":
    app.run(debug=True)
