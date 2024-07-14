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
        student = Student.query.get_or_404(student_id)
        return student_schema.dump(student)

    def patch(self, student_id):
        student = Student.query.get_or_404(student_id)
        student.first_name = request.json.get('first_name', student.first_name)
        student.last_name = request.json.get('last_name', student.last_name)
        student.email = request.json.get('email', student.email)
        student.password_hash = request.json.get('password_hash', student.password_hash)
        db.session.commit()
        return student_schema.dump(student)

    def delete(self, student_id):
        student = Student.query.get_or_404(student_id)
        db.session.delete(student)
        db.session.commit()
        return '', 204

class StudentList(Resource):
    def get(self):
        students = Student.query.all()
        return students_schema.dump(students)

    def post(self):
        new_student = student_schema.load(request.json)
        db.session.add(new_student)
        db.session.commit()
        return student_schema.dump(new_student), 201

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
        course = Course.query.get_or_404(course_id)
        db.session.delete(course)
        db.session.commit()
        return '', 204

class CourseList(Resource):
    def get(self):
        courses = Course.query.all()
        return courses_schema.dump(courses)

    def post(self):
        new_course = course_schema.load(request.json)
        db.session.add(new_course)
        db.session.commit()
        return course_schema.dump(new_course), 201

class Enrollments(Resource):
    def get(self, enrollment_id):
        enrollment = Enrollment.query.get_or_404(enrollment_id)
        return enrollment_schema.dump(enrollment)

    def patch(self, enrollment_id):
        enrollment = Enrollment.query.get_or_404(enrollment_id)
        enrollment.student_id = request.json.get('student_id', enrollment.student_id)
        enrollment.course_id = request.json.get('course_id', enrollment.course_id)
        db.session.commit()
        return enrollment_schema.dump(enrollment)

    def delete(self, enrollment_id):
        enrollment = Enrollment.query.get_or_404(enrollment_id)
        db.session.delete(enrollment)
        db.session.commit()
        return '', 204

class EnrollmentList(Resource):
    def get(self):
        enrollments = Enrollment.query.all()
        return enrollments_schema.dump(enrollments)

    def post(self):
        new_enrollment = enrollment_schema.load(request.json)
        db.session.add(new_enrollment)
        db.session.commit()
        return enrollment_schema.dump(new_enrollment), 201

class Reviews(Resource):
    def get(self, review_id):
        review = Review.query.get_or_404(review_id)
        return review_schema.dump(review)
    def patch(self, review_id):
        review = Review.query.get_or_404(review_id)
        review.student_id = request.json.get('student_id', review.student_id)
        review.course_id = request.json.get('course_id', review.course_id)
        review.rating = request.json.get('rating', review.rating)
        review.comment = request.json.get('comment', review.comment)
        db.session.commit()
        return review_schema.dump(review)

    def delete(self, review_id):
        review = Review.query.get_or_404(review_id)
        db.session.delete(review)
        db.session.commit()
        return '', 204

class ReviewList(Resource):
    def get(self):
        reviews = Review.query.all()
        return reviews_schema.dump(reviews)

    def post(self):
        new_review = review_schema.load(request.json)
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
