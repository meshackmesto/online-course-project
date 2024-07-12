from faker import Faker
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from models import Student, Course, Enrollment, Review
from config import app, db

# Initialize Faker and bind SQLAlchemy app
fake = Faker()

# Function to generate fake data and populate the database
def seed_database():
    # Create some fake students
    for _ in range(10):
        student = Student(
            username=fake.user_name(),
            email=fake.email(),
            password_hash=fake.password(),
            created_at=fake.date_time_this_decade(),
            updated_at=fake.date_time_this_decade()
        )
        db.session.add(student)

    # Create some fake courses
    for _ in range(5):
        course = Course(
            title=fake.catch_phrase(),
            description=fake.text(),
            created_at=fake.date_time_this_decade(),
            updated_at=fake.date_time_this_decade()
        )
        db.session.add(course)

    # Enroll students in courses (randomly)
    students = Student.query.all()
    courses = Course.query.all()
    for student in students:
        for _ in range(fake.random_int(min=1, max=3)):
            course = fake.random_element(courses)
            enrollment = Enrollment(
                student_id=student.id,
                course_id=course.id,
                enrollment_date=fake.date_time_this_decade()
            )
            db.session.add(enrollment)

    # Add some reviews for courses
    for _ in range(15):
        student = fake.random_element(students)
        course = fake.random_element(courses)
        review = Review(
            student_id=student.id,
            course_id=course.id,
            rating=fake.random_int(min=1, max=5),
            comment=fake.text(max_nb_chars=255)
        )
        db.session.add(review)

    # Commit all changes to the database
    db.session.commit()
    print("Database seeded successfully!")

if __name__ == '__main__':
    seed_database()
