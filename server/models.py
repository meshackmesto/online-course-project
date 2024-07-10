from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from datetime import datetime

from config import db

# Models go here!
class Student(db.Model):
    __tablename__ = 'students'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime,)
    updated_at = db.Column(db.DateTime, default=datetime, onupdate=datetime.utcnow)
    enrollments = db.relationship('Enrollment', back_populates='student', lazy=True)

class Course(db.Model):
    __tablename__ = 'courses'

    id = db.Column(db.Integer,primary_key = True)
    title = db.Column(db.String(255),nullabe = False)
    description = db.Column(db.Text,nullable = True)
    enrollments = db.relationship('Enrollment', back_populates='course', lazy=True)



class Enrollment(db.Model):
    __tablename__ = 'enrollment'
    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey('student.id'), nullable=False)
    course_id = db.Column(db.Integer, db.ForeignKey('course.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime,)
    updated_at = db.Column(db.DateTime, default=datetime, onupdate=datetime.utcnow)
    student = db.relationship('Student', back_populates='enrollments')
    course = db.relationship('Course', back_populates='enrollments')

class Review(db.Model):
    __tablename__ ='review'
    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey('student.id'), nullable=False)
    course_id = db.Column(db.Integer, db.ForeignKey('course.id'), nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    comment = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime,)
    updated_at = db.Column(db.DateTime, default=datetime, onupdate=datetime.utcnow)
    student = db.relationship('Student', back_populates='reviews')
    course = db.relationship('Course', back_populates='reviews')

class Courses(db.Model):
    __tablename__ = 'course'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime,)
    updated_at = db.Column(db.DateTime, default=datetime, onupdate=datetime.utcnow)
    enrollments = db.relationship('Enrollment', back_populates='course', lazy=True)
    reviews = db.relationship('Review', back_populates='course', lazy=True)
    instructors = db.relationship('Instructor', secondary='instructor_course', back_populates='courses')


    
if __name__ == '__main__':
    app.run(debug=True)