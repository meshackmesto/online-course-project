from faker import Faker
from random import randint
from models import Student, Course, Enrollment, Review, Admin
from config import app, db

def generate_student_data(faker):
    students = []
    for _ in range(30):  # Number of students to generate
        student = Student(
            first_name=faker.first_name(),
            last_name=faker.last_name(),
            email=faker.email(),
            password_hash=faker.password()
        )
        students.append(student)
    return students

def generate_course_data():
    courses = [
        {"title": "Geography", "description": "Study of Earth's landscapes, environments, and human interactions with the environment."},
        {"title": "Civil Engineering", "description": "Design, construction, and maintenance of infrastructure such as roads, bridges, buildings, and water systems."},
        {"title": "Cognitive Science", "description": "Interdisciplinary study of the mind and intelligence."},
        {"title": "Medical Ethics", "description": "Ethical principles and dilemmas in medical practice and healthcare."},
        {"title": "Environmental Engineering", "description": "Application of engineering principles to protect and improve the environment."},
        {"title": "Game Design", "description": "Principles and techniques for designing interactive games."},
        {"title": "Biomedical Engineering", "description": "Application of engineering principles and techniques to medical and biological problems."},
        {"title": "Neuroscience", "description": "Study of the nervous system, including the brain, neurons, and neural circuits."},
        {"title": "Public Health", "description": "Science and practice of protecting and improving the health of communities."},
        {"title": "Industrial Design", "description": "Design and development of products, systems, and services that improve usability, aesthetics, and functionality."},
        {"title": "Electrical Engineering", "description": "Study and application of electricity, electronics, and electromagnetism."},
        {"title": "International Relations", "description": "Study of interactions between states, international organizations, and global issues."},
        {"title": "Nursing", "description": "Practice and profession focused on healthcare and patient care."},
        {"title": "Artificial Intelligence", "description": "Study of creating intelligent agents and systems capable of learning and problem-solving."},
        {"title": "Human Resources Management", "description": "Management of human capital within organizations."},
        {"title": "Archaeology", "description": "Study of human history and prehistory through excavation and analysis of artifacts and other physical remains."},
        {"title": "Music Production", "description": "Creation and recording of music using technology and sound engineering techniques."},
        {"title": "Medical Informatics", "description": "Application of information technology to healthcare delivery, management, and research."},
        {"title": "Ethnic Studies", "description": "Interdisciplinary study of ethnicity, race, and cultural identity."},
        {"title": "Supply Chain Management", "description": "Management of the flow of goods and services, including procurement, logistics, inventory management, and supply chain strategy."},
        {"title": "Geopolitics", "description": "Study of the influence of geography, politics, and economics on international relations and global conflicts."},
        {"title": "Digital Marketing", "description": "Use of digital technologies and platforms for marketing products and services."},
        {"title": "Clinical Psychology", "description": "Application of psychological principles and techniques to diagnose and treat mental health disorders."},
        {"title": "Renewable Energy Engineering", "description": "Engineering solutions for harnessing renewable energy sources such as solar, wind, hydro, and geothermal energy."},
        {"title": "Conflict Resolution", "description": "Study of resolving conflicts through negotiation, mediation, and arbitration."},
        {"title": "Media Studies", "description": "Critical analysis of media forms, communication technologies, and media culture."},
        {"title": "Philosophy of Science", "description": "Study of the foundations, methods, and implications of science."},
        {"title": "Financial Accounting", "description": "Principles and practices of recording, analyzing, and reporting financial transactions."},
        {"title": "Sports Science", "description": "Scientific study of human performance and physical activity."},
        {"title": "Veterinary Medicine", "description": "Practice and profession of treating and caring for animals."},
        {"title": "Machine Learning", "description": "Study of algorithms and statistical models that computer systems use to perform tasks without explicit instructions."},
        {"title": "Medical Sociology", "description": "Study of societal influences on health, illness, and healthcare systems."},
        {"title": "Theoretical Physics", "description": "Study of fundamental principles and theories in physics."},
        {"title": "Fashion Merchandising", "description": "Study of fashion industry processes, trends, and consumer behavior."},
        {"title": "Digital Art", "description": "Creation of visual artwork using digital technology."},
        # Add more courses as needed
    ]
    return courses

def generate_admin_data(faker):
    admins = []
    for _ in range(5):  # Number of admins to generate
        admin = Admin(
            username=faker.user_name(),
            password_hash=faker.password()
        )
        admins.append(admin)
    return admins

def seed_data():
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        db.drop_all()
        db.create_all()

        # Create Students
        students = generate_student_data(fake)
        db.session.add_all(students)
        db.session.commit()

        # Create Courses
        course_data = generate_course_data()
        courses = []
        for course in course_data:
            new_course = Course(
                title=course["title"],
                description=course["description"]
            )
            courses.append(new_course)
        db.session.add_all(courses)
        db.session.commit()

        # Create Enrollments
        enrollments = []
        for _ in range(25):  # Number of enrollments to generate
            enrollment = Enrollment(
                student_id=randint(1, len(students)),
                course_id=randint(1, len(courses))
            )
            enrollments.append(enrollment)
        db.session.add_all(enrollments)
        db.session.commit()

        # Create Reviews
        reviews = []
        for _ in range(30):  # Number of reviews to generate
            review = Review(
                rating=randint(1, 5),
                comment=fake.text()
            )
            reviews.append(review)
        db.session.add_all(reviews)
        db.session.commit()

        # Create Admins
        admins = generate_admin_data(fake)
        db.session.add_all(admins)
        db.session.commit()

        print("Seeding complete!")

if __name__ == '__main__':
    seed_data()
