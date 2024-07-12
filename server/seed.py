from faker import Faker
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from models import Student, Course, Enrollment, Review
from config import app, db

# Local imports

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        # Seed code goes here!
        db.drop_all()
        db.create_all()

        # Create Students
        students = []
        for _ in range(30):  # Change the range for more students
            student = Student(
                username=fake.user_name(),
                email=fake.email(),
                password_hash=fake.password()
            )
            students.append(student)
        db.session.add_all(students)
        db.session.commit()

        # Create Courses
        courses = []
        for _ in range(10):  # Change the range for more courses
            course = Course(
                title=fake.sentence(nb_words=4),
                description=fake.text()
            )
            courses.append(course)
        db.session.add_all(courses)
        db.session.commit()

        # Create Enrollments
        enrollments = []
        for _ in range(25):  # Change the range for more enrollments
            enrollment = Enrollment(
                student_id=rc([student.id for student in students]),
                course_id=rc([course.id for course in courses])
            )
            enrollments.append(enrollment)
        db.session.add_all(enrollments)
        db.session.commit()

        # Create Reviews
        reviews = []
        for _ in range(30):  # Change the range for more reviews
            review = Review(
                student_id=rc([student.id for student in students]),
                course_id=rc([course.id for course in courses]),
                rating=randint(1, 5),
                comment=fake.text()
            )
            reviews.append(review)
        db.session.add_all(reviews)
        db.session.commit()

        print("Seeding complete!")

