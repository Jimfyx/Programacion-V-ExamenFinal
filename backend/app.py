from flask import Flask
from flask_cors import CORS
from routes.contactRoutes import contact_bp

app = Flask(__name__)
CORS(app)
app.register_blueprint(contact_bp, url_prefix='/api/contact')

if __name__ == '__main__':
    app.run(debug=True)