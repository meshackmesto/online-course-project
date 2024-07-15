#!/usr/bin/env python3

# Remote library imports
from flask import Flask, request , jsonify, make_response
from flask_restful import Resource
from flask_cors import CORS
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy


# Local imports
from config import app, db, api


# Add your model imports
from models import Student, Course, Enrollment, Review
# Views go here!
class Students(Resource):

    def get(self):
        students = [student.to_dict() for student in Student.query.all()]
        return make_response(jsonify(students),200)
    
    def post(self):
        data = request.get_json()

        new_student = Student(
            first_name=data['first_name'],
            last_name=data['last_name'],
            email=data['email'],
            password_hash=data['password_hash']
        )

        db.session.add(new_student)
        db.session.commit()

        return make_response(new_student.to_dict(),201)
    

class CourseBYID(Resource):

    def get(self,id):
        course = Course.query.filter_by(id=id).first().to_dict()
        return make_response(jsonify(course),200)
    
    def patch(self,id):
        data = request.get_json()

        course = Course.query.filter_by(id=id).first()

        course.title = data.get('title', course.title)
        course.description = data.get('description', course.description)

        db.session.commit()

        return make_response(course.to_dict(),200)
    
    def delete(self,id):
        course = Course.query.filter_by(id=id).first()
        db.session.delete(course)
        db.session.commit()

        return make_response(jsonify({'message': 'Course deleted'}),204)


class Enrollment(Resource):
    def get(self,id):
        enrollments =Enrollment.query.filter_by(id=id).first().to_dict()
        return make_response(jsonify(enrollments),200)
    
    def delete(self,id):
        enrollment = Enrollment.query.filter_by(id=id).first()
        db.session.delete(enrollment)
        db.session.commit()

        return make_response(jsonify({'message': 'Enrollment deleted'}),204)
    
class Reviews(Resource):
    def get(self,id):
        reviews = Review.query.filter_by(id=id).first().to_dict()
        return make_response(jsonify(reviews),200)
    
    def delete(self,id):
        review = Review.query.filter_by(id=id).first()
        db.session.delete(review)
        db.session.commit()

        return make_response(jsonify({'message': 'Review deleted'}),204)
    
    # api.add_resource(Reviews, '/reviews/<int:id>')
    api.add_resource(Students, '/students')
    api.add_resource(CourseBYID, '/courses/<int:id>')
    api.add_resource(Enrollment, '/enrollments/<int:id>')
    
        
if __name__ == '__main__':
    app.run(port=5555, debug=True)
