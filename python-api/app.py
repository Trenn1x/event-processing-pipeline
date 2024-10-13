from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/enrich', methods=['POST'])
def enrich_event():
    event = request.json
    
    # Example enrichment: add a "processed" timestamp and location metadata
    enriched_event = {
        "original_event": event,
        "processed_timestamp": "2024-10-13T13:00:00Z",
        "location": "Charleston, SC"
    }

    return jsonify(enriched_event), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
