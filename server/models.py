from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy

from config import db

# Models go here!
<<<<<<< HEAD
=======
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
>>>>>>> e718fe655831ac39a5b3d23481ffa2cb192bd868
