#!/usr/bin/env python3

# Remote library imports
from flask import Flask, request, session, jsonify, make_response
from flask_restful import Resource, Api
from flask_migrate import Migrate
from flask_cors import CORS
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema

# Local imports
from config import app, db, api

# Add your model imports
from models import Student, Course, MyCourse, Enrollment, Review

migrate = Migrate (app, db)

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'  # Example for SQLite
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'your_secret_key'
CORS(app) 

db.init_app(app)

api = Api(app)


class ClearSession(Resource):

    def delete(self):
    
        session['page_views'] = None
        session['student_id'] = None

        return {}, 204

class Signup(Resource):
     def post(self):
        json = request.get_json()
        student = Student(
            first_name=json['first_name'],
            last_name=json['last_name'],
            email=json['email'],
            password_hash=json['password']
            )
        db.session.add(student)
        db.session.commit()
        return student.to_dict(), 201

class CheckSession(Resource):
    def get(self):
         student = Student.query.filter_by(id=session.get('student_id')).first()
         if student:
            response = make_response(jsonify(student.to_dict()), 200)
            return response
         else:         
            return {}, 204
        

class Login(Resource):
    def post(self):
        student = Student.query.filter(Student.first_name == request.get_json()['firstname']).first()
        if student :
            session['student_id'] = student.id
            response = make_response(jsonify(student.to_dict()), 200)
            return response
        else:
            return {}, 401

        """ json = request.get_json()
        student = Student.query.filter_by(first_name = json()['first_name']).first()
        if student and student.check_password(json['password']):
            db.session['student_id'] = student.id
            return jsonify(student_schema.dump(student)), 200
        return {'message': 'Invalid credentials'}, 401
 """
class Logout(Resource):
    def delete(self):
        session['student_id'] = None
        return {'message': '204: No Content'}, 204
    
        """ db.session.pop('student_id', None) 
        return {'message': 'Logged out'}, 204 """

# Views go here!
class StudentSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Student
        session = db.session
        load_instance = True

student_schema = StudentSchema()
students_schema = StudentSchema(many=True)

class CourseSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Course
        session = db.session
        load_instance = True

course_schema = CourseSchema()
courses_schema = CourseSchema(many=True)

class MyCourseSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = MyCourse
        sqla_session = db.session
        load_instance = True

mycourse_schema = MyCourseSchema()
mycourses_schema = MyCourseSchema(many=True)

class EnrollmentSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Enrollment
        session = db.session
        load_instance = True

enrollment_schema = EnrollmentSchema()
enrollments_schema = EnrollmentSchema(many=True)

class ReviewSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Review
        sqla_session = db.session
        load_instance = True

review_schema = ReviewSchema()
reviews_schema = ReviewSchema(many=True)


class Students(Resource):
    def get(self, student_id):
        student = Student.query.get_or_404(student_id)
        return jsonify(student_schema.dump(student))

    def patch(self, student_id):
        student = Student.query.get_or_404(student_id)
        student.first_name = request.json.get('first_name', student.first_name)
        student.last_name = request.json.get('last_name', student.last_name)
        student.email = request.json.get('email', student.email)
        student._password_hash = request.json.get('password_hash', student.password_hash)
        db.session.commit()
        return jsonify(student_schema.dump(student))

    def delete(self, student_id):
        student = Student.query.get_or_404(student_id)
        db.session.delete(student)
        db.session.commit()
        return '', 204

class StudentList(Resource):
    def get(self):
        students = [student.to_dict() for student in Student.query.all()]
        return make_response(jsonify(students), 200)

    def post(self):
        data = request.get_json()
        new_student = Student(
            first_name=data['first_name'],
            last_name=data['last_name'],
            email=data['email'],
        )
        new_student.password = data['password'] 
        db.session.add(new_student)
        db.session.commit()
        return jsonify(new_student.to_dict()), 201
    
class CourseByID(Resource):
    def get(self, id):
        course = Course.query.filter_by(id=id).first().to_dict()
        return make_response(jsonify(course), 200)
    
    def patch(self, id):
        data = request.get_json()
        course = Course.query.filter_by(id=id).first()
        course.title = data.get('title', course.title)
        course.description = data.get('description', course.description)

class Courses(Resource):
    def get(self, course_id):
       courses = Course.query.get_or_404(course_id)
       response = course_schema.dump(courses)
       return jsonify(response), 200

    def post(self):
        new_course = course_schema.load(request.json)
        db.session.add(new_course)
        db.session.commit()
        response = course_schema.dump(new_course)
        response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')
        return jsonify(response), 201
    
    def delete(self, id):
        course = Course.query.filter_by(id=id).first()
        response = course_schema.dump(course)
        response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')
        return jsonify(response), 201

    def patch(self, course_id):
        course = Course.query.get_or_404(course_id)
        course.title = request.json.get('title', course.title)
        course.description = request.json.get('description', course.description)
        db.session.commit()
        response = course_schema.dump(course)
        response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')
        return jsonify(response)

    def delete(self, course_id):
        course = Course.query.get_or_404(course_id)
        db.session.delete(course)
        db.session.commit()
        return '', 204

class EnrollmentResource(Resource):
    def get(self, id):
        enrollment = Enrollment.query.filter_by(id=id).first().to_dict()
        return make_response(jsonify(enrollment), 200)
    
    def delete(self, id):
        enrollment = Enrollment.query.filter_by(id=id).first()
        return '', 204

class CourseList(Resource):
    def get(self):
        courses = Course.query.all()
        return jsonify(courses_schema.dump(courses))

    def post(self):
        new_course = course_schema.load(request.json)
        db.session.add(new_course)
        db.session.commit()
        response = course_schema.dump(new_course)
        response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')
        return jsonify(response), 201

class MyCourses(Resource):
    def get(self, mycourse_id):
        mycourse = MyCourse.query.get_or_404(mycourse_id)
        return jsonify(mycourse_schema.dump(mycourse))

    def patch(self, mycourse_id):
        mycourse = MyCourse.query.get_or_404(mycourse_id)
        mycourse.title = request.json.get('title', mycourse.title)
        mycourse.description = request.json.get('description', mycourse.description)
        db.session.commit()
        response = mycourse_schema.dump(mycourse)
        response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')
        return jsonify(response)

    def post(self):
      try:
        data = request.get_json()
        new_mycourse = mycourse_schema.load(data)
        db.session.add(new_mycourse)
        db.session.commit()
        return jsonify(mycourse_schema.dump(new_mycourse)), 201
      except ValueError as e:
        return {"error":str(e)}, 400
      
    def delete(self, mycourse_id):
        mycourse = MyCourse.query.get_or_404(mycourse_id)
        db.session.delete(mycourse)
        db.session.commit()
        return '', 204

class MyCourseList(Resource):
    def get(self):
        mycourses = MyCourse.query.all()
        return jsonify(mycourses_schema.dump(mycourses))

    def post(self):
        new_mycourse = mycourse_schema.load(request.json)
        db.session.add(new_mycourse)
        db.session.commit()
        response = mycourse_schema.dump(new_mycourse)
        """ response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000') """
        return jsonify(response), 201


class Enrollments(Resource):
    def get(self, enrollment_id):
        enrollment = Enrollment.query.get_or_404(enrollment_id)
        return jsonify(enrollment_schema.dump(enrollment))

    def patch(self, enrollment_id):
        enrollment = Enrollment.query.get_or_404(enrollment_id)
        enrollment.student_id = request.json.get('student_id', enrollment.student_id)
        enrollment.course_id = request.json.get('course_id', enrollment.course_id)
        db.session.commit()
        return jsonify(enrollment_schema.dump(enrollment))

    def delete(self, enrollment_id):
        enrollment = Enrollment.query.get_or_404(enrollment_id)
        db.session.delete(enrollment)
        db.session.commit()
        return make_response(jsonify({'message': 'Enrollment deleted'}), 204)

class EnrollmentList(Resource):
    def get(self):
        enrollments = Enrollment.query.all()
        return jsonify(enrollments_schema.dump(enrollments))

    def post(self):
        new_enrollment = enrollment_schema.load(request.json)
        db.session.add(new_enrollment)
        db.session.commit()
        return jsonify(enrollment_schema.dump(new_enrollment)), 201

class Reviews(Resource):
    # def get(self, id):
    #     review = Review.query.filter_by(id=id).first().to_dict()
    #     return make_response(jsonify(review), 200)
    
    # def delete(self, id):
    #     review = Review.query.filter_by(id=id).first()
    def get(self, review_id):
        review = Review.query.get_or_404(review_id)
        return jsonify(review_schema.dump(review))
    def patch(self, review_id):
        review = Review.query.get_or_404(review_id)
        review.rating = request.json.get('rating', review.rating)
        review.comment = request.json.get('comment', review.comment)
        db.session.commit()
        return jsonify(review_schema.dump(review))

    def delete(self, review_id):
        review = Review.query.get_or_404(review_id)
        db.session.delete(review)
        db.session.commit()
        return make_response(jsonify({'message': 'Review deleted'}), 204)

class ReviewList(Resource):
    def get(self):
        reviews = Review.query.all()
        return jsonify(reviews_schema.dump(reviews))

    def post(self):
        new_review = review_schema.load(request.json, session = db.session)
        db.session.add(new_review)
        db.session.commit()
        return jsonify(review_schema.dump(new_review)), 201

api.add_resource(Login, '/login', endpoint='login')
api.add_resource(CheckSession, '/check_session', endpoint='check_session')
api.add_resource(Logout, '/logout', endpoint='logout')
api.add_resource(ClearSession, '/clear', endpoint='clear')
api.add_resource(Signup, '/signup', endpoint='signup')
api.add_resource(StudentList, '/students')
api.add_resource(Students, '/students/<int:student_id>')
api.add_resource(CourseList, '/courses')
api.add_resource(Courses, '/courses/<int:course_id>')
api.add_resource(MyCourses, '/mycourses/<int:mycourse_id>')
api.add_resource(MyCourseList, '/mycourses')
api.add_resource(EnrollmentList, '/enrollments')
api.add_resource(Enrollments, '/enrollments/<int:enrollment_id>')
api.add_resource(ReviewList, '/reviews')
api.add_resource(Reviews, '/reviews/<int:review_id>')
        

if __name__ == '__main__':
    app.run(port=5555, debug=True)
