#!/usr/bin/env python3

# Remote library imports
from flask import Flask, request
from flask_restful import Resource
from flask_cors import CORS
from flask_migrate import Migrate
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData

# Local imports
from config import app, db, api

# Add your model imports
from models import Student, Course, Enrollment, Review

# Views go here!
@app.route('/')
def index():
    return '<h1>Project Server</h1>'

if __name__ == '__main__':
    app.run(port=5555, debug=True)
