# config.py

from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from flask_restful import Api
from flask_bcrypt import Bcrypt
import secrets
import os

print(os.getcwd())
# Instantiate app, set attributes
secret_key = secrets.token_hex(32)
app = Flask(__name__, static_folder="online-course-project/client/build", static_url_path="/")
CORS(app, supports_credentials=True, resources={r"/*": {"origins": "*"}})
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///instance/app.db'
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'default_secret_key_if_not_set')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json_encoder.compact = False

# Define metadata, instantiate db
metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})

db = SQLAlchemy(app, metadata=metadata)
bcrypt =Bcrypt(app)
migrate = Migrate(app, db)
api = Api(app)





