from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property
from config import db, bcrypt
from datetime import datetime
from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship

Base = declarative_base()

class Enrollment(db.Model):
    __tablename__ = 'enrollments'

    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey('students.id'), nullable=False)
    course_id = db.Column(db.Integer, db.ForeignKey('courses.id'), nullable=False)
    student = db.relationship('Student', back_populates='enrollments')
    course = db.relationship('Course', back_populates='enrollments')

    # Relationship with Admin
    admin_id = db.Column(db.Integer, db.ForeignKey('admins.id'))
    admin = db.relationship('Admin', back_populates='managed_enrollments')

class Student(db.Model, SerializerMixin):
    __tablename__ = 'students'

    id = Column(Integer, primary_key=True)
    first_name = Column(String(50), nullable=False)
    last_name = Column(String(50), nullable=False)
    email = Column(String(100), unique=True, nullable=False)
    _password_hash = Column(String(255), nullable=False)  # Internal storage for password hash
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    enrollments = relationship('Enrollment', back_populates='student', lazy=True)

    # Relationship with Admin
    admin_id = db.Column(db.Integer, db.ForeignKey('admins.id'))
    admin = db.relationship('Admin', back_populates='managed_students')

    # Serialization rules
    serialize_rules = ('-courses.students', '-enrollments.student',)

    @property
    def password_hash(self):
        raise AttributeError('password_hash is not a readable attribute')
    
    @password_hash.setter
    def password_hash(self, password):
        self._password_hash = bcrypt.generate_password_hash(password).decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password.encode('utf-8'))

class Course(db.Model, SerializerMixin):
    __tablename__ = 'courses'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=True)
    serialize_rules = ('-enrollments.course', '-reviews.course',)
    enrollments = db.relationship('Enrollment', back_populates='course', lazy=True)

    # Relationship with Admin
    admin_id = db.Column(db.Integer, db.ForeignKey('admins.id'))
    admin = db.relationship('Admin', back_populates='managed_courses')

class MyCourse(db.Model, SerializerMixin):
    __tablename__= 'mycourses'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=True)

class Review(db.Model, SerializerMixin):
    __tablename__ = 'reviews'

    id = db.Column(db.Integer, primary_key=True)
    rating = db.Column(db.Integer, nullable=False)
    comment = db.Column(db.String(255), nullable=False)

    # Relationship with Admin
    admin_id = db.Column(db.Integer, db.ForeignKey('admins.id'))
    admin = db.relationship('Admin', back_populates='managed_reviews')

class Admin(db.Model, SerializerMixin):
    __tablename__ = 'admins'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    _password_hash = db.Column(db.String(255), nullable=False)  # Internal storage for password hash

    # Relationships
    managed_students = db.relationship('Student', back_populates='admin', lazy=True)
    managed_courses = db.relationship('Course', back_populates='admin', lazy=True)
    managed_enrollments = db.relationship('Enrollment', back_populates='admin', lazy=True)
    managed_reviews = db.relationship('Review', back_populates='admin', lazy=True)

    # Serialization rules
    serialize_rules = ('-courses.students', '-enrollments.student', '-students.enrollments',)
    
    @property
    def password_hash(self):
        raise AttributeError('password_hash is not a readable attribute')
    
    @password_hash.setter
    def password_hash(self, password):
        self._password_hash = bcrypt.generate_password_hash(password).decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password.encode('utf-8'))
