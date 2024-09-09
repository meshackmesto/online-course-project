# config.py

from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from flask_restful import Api
from flask_bcrypt import Bcrypt

# Instantiate app, set attributes
app = Flask(__name__, static_folder="online-course-project/build", static_url_path="/")
CORS(app, supports_credentials=True, resources={r"/*": {"origins": "*"}})
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SECRET_KEY'] = 'f6f44f8f6f8d86f41eadf3e47791647c54c36bc297b3d60a'
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





