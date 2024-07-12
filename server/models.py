<<<<<<< HEAD
=======
from sqlalchemy_serializer import SerializerMixin # type: ignore
from sqlalchemy.ext.associationproxy import association_proxy # type: ignore
from datetime import datetime

from config import app

>>>>>>> f30d4fa8d2ad81e775d7cb0237aaacf316382931
from config import db
from datetime import datetime


# Models go here!
<<<<<<< HEAD
class Student(db.Model):
=======
class Student(db.Model,SerializerMixin):
>>>>>>> f30d4fa8d2ad81e775d7cb0237aaacf316382931
    __tablename__ = 'students'

    id = db.Column(db.Integer, primary_key=True)
    First_name = db.Column(db.String(50), unique=False nullable=False)
    Last_name = db.Column(db.String(50), unique=False, nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
<<<<<<< HEAD
    created_at = db.Column(db.DateTime, default=datetime,)
    updated_at = db.Column(db.DateTime, default=datetime, onupdate=datetime)
    enrollments = db.relationship('Enrollment', back_populates='student', lazy=True)
=======
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
>>>>>>> f30d4fa8d2ad81e775d7cb0237aaacf316382931

    enrollments = db.relationship('Enrollment', back_populates='student', lazy=True)
    reviews = db.relationship('Review', back_populates='student', lazy=True)

class Course(db.Model,SerializerMixin):
    __tablename__ = 'courses'

    id = db.Column(db.Integer,primary_key = True)
    title = db.Column(db.String(255),nullable = False)
    description = db.Column(db.Text,nullable = True)
    enrollments = db.relationship('Enrollment', back_populates='course', lazy=True)
    reviews = db.relationship('Review', back_populates='course', lazy=True)


class Enrollment(db.Model,SerializerMixin):
    __tablename__ = 'enrollments'

    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey('students.id'), nullable=False)
    course_id = db.Column(db.Integer, db.ForeignKey('courses.id'), nullable=False)
    student = db.relationship('Student', back_populates='enrollments')
    course = db.relationship('Course', back_populates='enrollments')

class Review(db.Model,SerializerMixin):
    __tablename__ ='reviews'

    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey('students.id'), nullable=False)
    course_id = db.Column(db.Integer, db.ForeignKey('courses.id'), nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    comment = db.Column(db.String(255), nullable=False)
    student = db.relationship('Student', back_populates='reviews')
<<<<<<< HEAD
    course = db.relationship('Course', back_populates='reviews')
=======
    course = db.relationship('Course', back_populates='reviews')




    
if __name__ == '__main__':
    app.run(debug=True)
>>>>>>> f30d4fa8d2ad81e775d7cb0237aaacf316382931
