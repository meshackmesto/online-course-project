#!/usr/bin/env python3

# Remote library imports
from flask import Flask, request, session, make_response, jsonify
from flask_restful import Resource
from flask_cors import CORS
from flask_migrate import Migrate
from flask_restful import Api
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema


# Local imports
from config import app, db, api


# Add your model imports
from models import Student, Course, Enrollment, Review

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

db.init_app(app)
migrate = Migrate (app, db)
api = Api(app)

# Views go here!
class StudentSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Student
        load_instance = True

student_schema = StudentSchema()
students_schema = StudentSchema(many=True)

class CourseSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Course
        load_instance = True

course_schema = CourseSchema()
courses_schema = CourseSchema(many=True)

class EnrollmentSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Enrollment
        load_instance = True

enrollment_schema = EnrollmentSchema()
enrollments_schema = EnrollmentSchema(many=True)

class ReviewSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Review
        load_instance = True

review_schema = ReviewSchema()
reviews_schema = ReviewSchema(many=True)


class Students(Resource):
    def get(self, student_id):
        student = Student.query.get(student_id)
        if student:
            return jsonify(student.to_dict())
        return {'message': 'Student not found'}, 404

    def delete(self, student_id):
        student = Student.query.get(student_id)
        if student:
            db.session.delete(student)
            db.session.commit()
            return {'message': 'Student deleted'}
        return {'message': 'Student not found'}, 404

    def put(self, student_id):
        student = Student.query.get(student_id)
        if student:
            data = request.json
            student.first_name = data.get('first_name', student.first_name)
            student.last_name = data.get('last_name', student.last_name)
            student.email = data.get('email', student.email)
            student.password_hash = data.get('password_hash', student.password_hash)
            db.session.commit()
            return jsonify(student.to_dict())
        return {'message': 'Student not found'}, 404

class StudentListResource(Resource):
    def get(self):
        students = Student.query.all()
        return jsonify([student.to_dict() for student in students])

    def post(self):
        data = request.json
        new_student = Student(
            first_name=data['first_name'],
            last_name=data['last_name'],
            email=data['email'],
            password_hash=data['password_hash']
        )
        db.session.add(new_student)
        db.session.commit()
        return jsonify(new_student.to_dict()), 201

class Courses(Resource):
    def get(self):
        courses = [course.to_dict() for course in Course.query.all()]
        return make_response(jsonify(courses), 200)

    def post(self):
        data = request.get_json()

        new_course = Course(
            title=data['title'],
            description=data['description']
        )
        
        db.session.add(new_course)
        db.session.commit()

        return make_response(jsonify(new_course.to_dict()), 201)

    def patch(self, course_id):
        course = Course.query.get_or_404(course_id)
        course.title = request.json.get('title', course.title)
        course.description = request.json.get('description', course.description)
        db.session.commit()
        return course_schema.dump(course)

    def delete(self, course_id):
        course = Course.query.get(course_id)
        if course:
            db.session.delete(course)
            db.session.commit()
            return {'message': 'Course deleted'}
        return {'message': 'Course not found'}, 404

    def put(self, course_id):
        course = Course.query.get(course_id)
        if course:
            data = request.json
            course.title = data.get('title', course.title)
            course.description = data.get('description', course.description)
            db.session.commit()
            return jsonify(course.to_dict())
        return {'message': 'Course not found'}, 404

class CourseListResource(Resource):
    def get(self):
        courses = Course.query.all()
        return jsonify([course.to_dict() for course in courses])

    def post(self):
        data = request.json
        new_course = Course(
            title=data['title'],
            description=data.get('description')
        )
        db.session.add(new_course)
        db.session.commit()
        return jsonify(new_course.to_dict()), 201

class Enrollments(Resource):
    def get(self, enrollment_id):
        enrollment = Enrollment.query.get(enrollment_id)
        if enrollment:
            return jsonify(enrollment.to_dict())
        return {'message': 'Enrollment not found'}, 404

    def delete(self, enrollment_id):
        enrollment = Enrollment.query.get(enrollment_id)
        if enrollment:
            db.session.delete(enrollment)
            db.session.commit()
            return {'message': 'Enrollment deleted'}
        return {'message': 'Enrollment not found'}, 404

    def put(self, enrollment_id):
        enrollment = Enrollment.query.get(enrollment_id)
        if enrollment:
            data = request.json
            enrollment.student_id = data.get('student_id', enrollment.student_id)
            enrollment.course_id = data.get('course_id', enrollment.course_id)
            db.session.commit()
            return jsonify(enrollment.to_dict())
        return {'message': 'Enrollment not found'}, 404

class EnrollmentListResource(Resource):
    def get(self):
        enrollments = Enrollment.query.all()
        return jsonify([enrollment.to_dict() for enrollment in enrollments])

    def post(self):
        data = request.json
        new_enrollment = Enrollment(
            student_id=data['student_id'],
            course_id=data['course_id']
        )
        db.session.add(new_enrollment)
        db.session.commit()
        return jsonify(new_enrollment.to_dict()), 201

class Reviews(Resource):
    def get(self, review_id):
        review = Review.query.get(review_id)
        if review:
            return jsonify(review.to_dict())
        return {'message': 'Review not found'}, 404

    def delete(self, review_id):
        review = Review.query.get(review_id)
        if review:
            db.session.delete(review)
            db.session.commit()
            return {'message': 'Review deleted'}
        return {'message': 'Review not found'}, 404

    def put(self, review_id):
        review = Review.query.get(review_id)
        if review:
            data = request.json
            review.rating = data.get('rating', review.rating)
            review.comment = data.get('comment', review.comment)
            db.session.commit()
            return jsonify(review.to_dict())
        return {'message': 'Review not found'}, 404

class ReviewListResource(Resource):
    def get(self):
        reviews = Review.query.all()
        return jsonify([review.to_dict() for review in reviews])

    def post(self):
        data = request.json
        new_review = Review(
            student_id=data['student_id'],
            course_id=data['course_id'],
            rating=data['rating'],
            comment=data['comment']
        )
        db.session.add(new_review)
        db.session.commit()
        return review_schema.dump(new_review), 201
    
api.add_resource(StudentList, '/students')
api.add_resource(Students, '/students/<int:student_id>')
api.add_resource(CourseList, '/courses')
api.add_resource(Courses, '/courses/<int:course_id>')
api.add_resource(EnrollmentList, '/enrollments')
api.add_resource(Enrollments, '/enrollments/<int:enrollment_id>')
api.add_resource(ReviewList, '/reviews')
api.add_resource(Reviews, '/reviews/<int:review_id>')

if __name__ == '__main__':
    app.run(port=5555, debug=True)
