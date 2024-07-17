from faker import Faker
from random import randint
from models import Student, Course, Enrollment, Review
from config import app, db

def generate_course_data():
    courses = [
        {"title": "Medicine", "description": "Introduction to medical science and healthcare practices."},
        {"title": "Software Engineering", "description": "Principles and practices of software development and maintenance."},
        {"title": "Law", "description": "Study of legal systems, principles, and practices."},
        {"title": "Web Development", "description": "Designing, building, and maintaining websites and web applications."},
        {"title": "UI/UX Design", "description": "Principles of user interface and user experience design."},
        {"title": "Music", "description": "Exploration of musical theory, instruments, and performance."},
        {"title": "Data Analysis", "description": "Techniques and tools for analyzing and interpreting data."},
        {"title": "Dermatology", "description": "Study of skin, its functions, and related diseases."},
        {"title": "Botany", "description": "Science of plant life and development."},
        {"title": "Economics", "description": "Study of production, consumption, and transfer of wealth."},
        {"title": "Psychology", "description": "Study of mind and behavior."},
        {"title": "Physics", "description": "Study of matter, energy, and the fundamental forces of nature."},
        {"title": "Chemistry", "description": "Study of substances, their properties, and reactions."},
        {"title": "Mathematics", "description": "Abstract science of numbers, quantity, and space."},
        {"title": "History", "description": "Study of past events, particularly in human affairs."},
        {"title": "Art", "description": "Exploration of visual arts, including painting, sculpture, and drawing."},
        {"title": "Astronomy", "description": "Study of celestial objects and phenomena."},
        {"title": "Literature", "description": "Study of written works, including fiction, poetry, and drama."},
        {"title": "Sociology", "description": "Study of the development, structure, and functioning of human society."},
        {"title": "Philosophy", "description": "Study of fundamental nature of knowledge, reality, and existence."}
    ]
    return courses

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        db.drop_all()
        db.create_all()

        # Create Students
        students = []
        for _ in range(30):  # Change the range for more students
            student = Student(
                first_name=fake.first_name(),
                last_name=fake.last_name(),
                email=fake.email(),
                password_hash=fake.password()
            )
            students.append(student)
        db.session.add_all(students)
        db.session.commit()

        # Create Courses
        course_data = generate_course_data()
        courses = []
        for course in course_data:  # Iterate over predefined course data
            new_course = Course(
                title=course["title"],
                description=course["description"]
            )
            courses.append(new_course)
        db.session.add_all(courses)
        db.session.commit()

        # Create Enrollments
        enrollments = []
        for _ in range(25):  # Change the range for more enrollments
            enrollment = Enrollment(
                student_id=randint(1, len(students)),
                course_id=randint(1, len(courses))
            )
            enrollments.append(enrollment)
        db.session.add_all(enrollments)
        db.session.commit()

        # Create Reviews
        reviews = []
        for _ in range(30):  # Change the range for more reviews
            review = Review(
                student_id=randint(1, len(students)),
                course_id=randint(1, len(courses)),
                rating=randint(1, 5),
                comment=fake.text()
            )
            reviews.append(review)
        db.session.add_all(reviews)
        db.session.commit()

        print("Seeding complete!")
