from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property
from config import db, bcrypt
from datetime import datetime

# Models go here!
class Student(db.Model, SerializerMixin):
    __tablename__ = 'students'

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime)
    updated_at = db.Column(db.DateTime, default=datetime, onupdate=datetime)

    serialize_rules = ('-courses.students','-enrollments.students','-reviews.students')
    enrollments = db.relationship('Enrollment', back_populates='student', lazy=True)
    reviews = db.relationship('Review', back_populates='student', lazy=True)

    @hybrid_property
    def password_hash(self):
        raise Exception('Password hashes may not be viewed.')
    
    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(
            password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8'))

class Course(db.Model, SerializerMixin):
    __tablename__ = 'courses'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=True)
    serialize_rules = ('-enrollments.course', '-reviews.course',)
    enrollments = db.relationship('Enrollment', back_populates='course', lazy=True)
    reviews = db.relationship('Review', back_populates='course', lazy=True)

class MyCourse(db.Model, SerializerMixin):
    __tablename__ = 'mycourses'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=True)
   

#  Schemas go here!
class Enrollment(db.Model):
    __tablename__ = 'enrollments'

    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey('students.id'), nullable=False)
    course_id = db.Column(db.Integer, db.ForeignKey('courses.id'), nullable=False)
    student = db.relationship('Student', back_populates='enrollments')
    course = db.relationship('Course', back_populates='enrollments')
    

class Review(db.Model, SerializerMixin):
    __tablename__ = 'reviews'

    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey('students.id'), nullable=False)
    course_id = db.Column(db.Integer, db.ForeignKey('courses.id'), nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    comment = db.Column(db.String(255), nullable=False)
    serialize_rules = ('-course.reviews', '-student.reviews')
    student = db.relationship('Student', back_populates='reviews')
    course = db.relationship('Course', back_populates='reviews')
