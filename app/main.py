import os
import datetime
from flask import Flask, send_file, render_template, request

app = Flask(__name__)


@app.route("/hello")
def hello():
    return "Hello World from Flask in a uWSGI Nginx Docker container with \
     Python 3.7 (from the example template)"

# @app.route("/miditrack")
# def template_test():
#     title = "miditrack rendering at: {0}".format(datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"))
#     return render_template('index.html.j2', title=title)
#


@app.route("/")
@app.route("/index.html")
def home():
    title = "home rendering at: {0}".format(datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"))
    return render_template('index.html', title=title)

@app.route("/miditrack/<guid>")
def miditrack(guid):
    #miditrack = request.args.get('miditrack')
    if guid:
        title = "miditrack guid: {1} rendering at: {0}".format(datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"), guid)
    else:
        title = "root rendering at: {0}".format(datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"))

    return render_template('index.html', title=title)
    # index_path = os.path.join(app.static_folder, "index.html")
    # return send_file(index_path)

@app.route("/audio/<guid>")
def audio(guid):
    #miditrack = request.args.get('miditrack')
    if guid:
        title = "miditrack guid: {1} rendering at: {0}".format(datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"), guid)
        image_url = f"https://img.neux.io/audio/{guid}"
    else:
        title = "root rendering at: {0}".format(datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"))
        image_url = "https://i.pinimg.com/originals/93/bb/15/93bb15fc20dfe3be424647b78c187f78.gif"

    return render_template('index.html', title=title, image_url=image_url)
    # index_path = os.path.join(app.static_folder, "index.html")
    # return send_file(index_path)



# Everything not declared before (not a Flask route / API endpoint)...
@app.route("/<path:path>")
def route_frontend(path):
    # ...could be a static file needed by the front end that
    # doesn't use the `static` path (like in `<script src="bundle.js">`)
    file_path = os.path.join(app.static_folder, path)
    if os.path.isfile(file_path):
        return send_file(file_path)
    # ...or should be handled by the SPA's "router" in front end
    else:
        return render_template('index.html', title="title-fallback")


if __name__ == "__main__":
    # Only for debugging while developing
    app.run(host="0.0.0.0", debug=True, port=80)
