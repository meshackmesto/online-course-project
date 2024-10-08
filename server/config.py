from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from flask_restful import Api
from flask_bcrypt import Bcrypt
import os

# Print the current working directory (useful for debugging)
print(os.getcwd())

# Instantiate app, set attributes
app = Flask(__name__, static_folder="online-course-project/client/build", static_url_path="/")
CORS(app, supports_credentials=True, resources={r"/*": {"origins": "*"}})

# Set up Flask configuration
app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://postgres:VVIPbokYBELamfdSKlXmtnVNDlcFKqAm@junction.proxy.rlwy.net:38575/railway"
app.config['SECRET_KEY'] = 'f6f44f8f6f8d86f41eadf3e47791647c54c36bc297b3d60a'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json_encoder.compact = False

# Define metadata and instantiate db
metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})

db = SQLAlchemy(app, metadata=metadata)
bcrypt = Bcrypt(app)
migrate = Migrate(app, db)
api = Api(app)

# Optional: Log the database URI to verify it's correct (be cautious with logging sensitive information)
print(f"Database URI: {app.config['SQLALCHEMY_DATABASE_URI']}")
