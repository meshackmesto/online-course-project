from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy

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
    title = db.Column(db.String(255),nullable = False)
    description = db.Column(db.Text,nullable = True)
    enrollments = db.relationship('Enrollment', back_populates='course', lazy=True)
    reviews = db.relationship('Review', back_populates='course', lazy=True)




if __name__ == '__main__':
    app.run(debug=True)

