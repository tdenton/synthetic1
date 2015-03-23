from __future__ import division
import sys, os
from flask import Flask, request, render_template, Response

# Globals
app = Flask(__name__)
app._static_folder = "dist"

# Routes
@app.route("/")
@app.route("/<path:path>")
def index(path="index.html"):
    return app.send_static_file(path)


if __name__ == "__main__":
	host = '0.0.0.0'
	port = 5000
	debug = False
	if len(sys.argv) > 1:
		host = sys.argv[1]
	if len(sys.argv) > 2:
		port = int(sys.argv[2])
	if len(sys.argv) > 3:
		debug = bool(sys.argv[3])
        app.run(debug=debug, host=host, port=port)
