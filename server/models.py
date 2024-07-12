import datetime
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Student(db.Model):
    _tablename_= "Students"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)

class Course(db.Model):
    __tablename__ = 'courses'

    id = db.Column(db.Integer,primary_key = True)
    title = db.Column(db.String(255),nullable = False)
    description = db.Column(db.Text,nullable = True)
    enrollments = db.relationship('Enrollment', back_populates='course', lazy=True)
    reviews = db.relationship('Review', back_populates='course', lazy=True)


class Enrollment(db.Model):
    __tablename__ = 'enrollments'

    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey('student.id'), nullable=False)
    course_id = db.Column(db.Integer, db.ForeignKey('course.id'), nullable=False)
    student = db.relationship('Student', back_populates='enrollments')
    course = db.relationship('Course', back_populates='enrollments')

class Review(db.Model):
    __tablename__ ='reviews'

    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey('student.id'), nullable=False)
    course_id = db.Column(db.Integer, db.ForeignKey('course.id'), nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    comment = db.Column(db.String(255), nullable=False)
    student = db.relationship('Student', back_populates='reviews')
    course = db.relationship('Course', back_populates='reviews')




    
if __name__ == '__main__':
    app.run(debug=True)

