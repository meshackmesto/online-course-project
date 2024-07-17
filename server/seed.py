from faker import Faker
from random import randint
from models import Student, Course, Enrollment, Review
from config import app, db

def generate_course_data():
    courses = [
    {"title": "Geography", "description": "Study of Earth's landscapes, environments, and human interactions with the environment. Includes physical geography, human geography, and geographic information systems (GIS)."},
    {"title": "Civil Engineering", "description": "Design, construction, and maintenance of infrastructure such as roads, bridges, buildings, and water systems. Covers structural engineering, geotechnical engineering, and transportation engineering."},
    {"title": "Cognitive Science", "description": "Interdisciplinary study of the mind and intelligence. Includes cognitive psychology, neuroscience, artificial intelligence, linguistics, and philosophy of mind."},
    {"title": "Medical Ethics", "description": "Ethical principles and dilemmas in medical practice and healthcare. Covers patient autonomy, informed consent, euthanasia, and ethical issues in medical research."},
    {"title": "Environmental Engineering", "description": "Application of engineering principles to protect and improve the environment. Covers air and water quality management, wastewater treatment, and environmental impact assessment."},
    {"title": "Game Design", "description": "Principles and techniques for designing interactive games. Includes game mechanics, game engines, game aesthetics, and game development processes."},
    {"title": "Biomedical Engineering", "description": "Application of engineering principles and techniques to medical and biological problems. Covers medical device design, biomechanics, biomaterials, and tissue engineering."},
    {"title": "Neuroscience", "description": "Study of the nervous system, including the brain, neurons, and neural circuits. Covers neurobiology, cognitive neuroscience, neuroimaging, and neurological disorders."},
    {"title": "Public Health", "description": "Science and practice of protecting and improving the health of communities. Includes epidemiology, biostatistics, health policy, and global health."},
    {"title": "Industrial Design", "description": "Design and development of products, systems, and services that improve usability, aesthetics, and functionality. Covers product design process, ergonomics, and user-centered design."},
    {"title": "Electrical Engineering", "description": "Study and application of electricity, electronics, and electromagnetism. Includes circuit design, power systems, telecommunications, and control systems."},
    {"title": "International Relations", "description": "Study of interactions between states, international organizations, and global issues. Covers diplomacy, international law, conflict resolution, and global governance."},
    {"title": "Nursing", "description": "Practice and profession focused on healthcare and patient care. Covers nursing theory, clinical practice, nursing ethics, and healthcare leadership."},
    {"title": "Artificial Intelligence", "description": "Study of creating intelligent agents and systems capable of learning and problem-solving. Includes machine learning, natural language processing, robotics, and AI ethics."},
    {"title": "Human Resources Management", "description": "Management of human capital within organizations. Covers recruitment, training and development, compensation and benefits, and employee relations."},
    {"title": "Archaeology", "description": "Study of human history and prehistory through excavation and analysis of artifacts and other physical remains. Includes archaeological methods, cultural heritage, and archaeological theory."},
    {"title": "Music Production", "description": "Creation and recording of music using technology and sound engineering techniques. Covers audio production, music mixing, mastering, and studio recording."},
    {"title": "Medical Informatics", "description": "Application of information technology to healthcare delivery, management, and research. Includes health information systems, electronic health records, and medical data analysis."},
    {"title": "Ethnic Studies", "description": "Interdisciplinary study of ethnicity, race, and cultural identity. Covers cultural studies, social justice, intersectionality, and ethnic literature."},
    {"title": "Supply Chain Management", "description": "Management of the flow of goods and services, including procurement, logistics, inventory management, and supply chain strategy."},
    {"title": "Geopolitics", "description": "Study of the influence of geography, politics, and economics on international relations and global conflicts. Includes strategic studies, geopolitical analysis, and security studies."},
    {"title": "Digital Marketing", "description": "Use of digital technologies and platforms for marketing products and services. Includes social media marketing, search engine optimization (SEO), and digital advertising."},
    {"title": "Clinical Psychology", "description": "Application of psychological principles and techniques to diagnose and treat mental health disorders. Includes psychotherapy, psychological assessment, and counseling."},
    {"title": "Renewable Energy Engineering", "description": "Engineering solutions for harnessing renewable energy sources such as solar, wind, hydro, and geothermal energy. Covers renewable energy systems design, optimization, and integration."},
    {"title": "Conflict Resolution", "description": "Study of resolving conflicts through negotiation, mediation, and arbitration. Includes conflict analysis, peacebuilding, and conflict management strategies."},
    {"title": "Media Studies", "description": "Critical analysis of media forms, communication technologies, and media culture. Covers media theory, media production, digital media, and media effects."},
    {"title": "Philosophy of Science", "description": "Study of the foundations, methods, and implications of science. Includes scientific reasoning, epistemology, philosophy of biology, and philosophy of physics."},
    {"title": "Financial Accounting", "description": "Principles and practices of recording, analyzing, and reporting financial transactions. Covers financial statements, auditing, and international financial reporting standards (IFRS)."},
    {"title": "Sports Science", "description": "Scientific study of human performance and physical activity. Includes exercise physiology, sports nutrition, biomechanics, and sports psychology."},
    {"title": "Veterinary Medicine", "description": "Practice and profession of treating and caring for animals. Covers animal anatomy, physiology, diseases, veterinary surgery, and preventive care."},
    {"title": "Machine Learning", "description": "Study of algorithms and statistical models that computer systems use to perform tasks without explicit instructions. Includes supervised learning, unsupervised learning, and reinforcement learning."},
    {"title": "Medical Sociology", "description": "Study of societal influences on health, illness, and healthcare systems. Covers social determinants of health, healthcare disparities, and medical ethics."},
    {"title": "Theoretical Physics", "description": "Study of fundamental principles and theories in physics. Includes quantum field theory, string theory, particle physics, and cosmology."},
    {"title": "Fashion Merchandising", "description": "Study of fashion industry processes, trends, and consumer behavior. Covers fashion marketing, retailing, fashion buying, and merchandising strategies."},
    {"title": "Digital Art", "description": "Creation of visual artwork using digital technology. Includes digital painting, 3D modeling, digital sculpting, and interactive media art."},
    {"title": "Health Informatics", "description": "Application of information technology to healthcare data management and analysis. Includes health information exchange, clinical decision support systems, and telemedicine."},
    {"title": "Social Work", "description": "Profession focused on helping individuals, families, and communities overcome social and psychological challenges. Covers social welfare policy, counseling, and advocacy."},
    {"title": "Industrial Psychology", "description": "Application of psychological principles to workplace environments. Includes employee motivation, organizational behavior, leadership, and human resource management."},
    {"title": "Chemical Engineering", "description": "Design and operation of chemical processes and manufacturing plants. Covers chemical reaction engineering, process control, and industrial chemistry."},
    {"title": "Data Science", "description": "Interdisciplinary field focused on extracting knowledge and insights from data. Includes data analysis, machine learning, big data technologies, and data visualization."},
    {"title": "Digital Humanities", "description": "Application of digital tools and methods to humanities disciplines. Includes digital archives, text mining, cultural analytics, and digital storytelling."},
    {"title": "Environmental Law", "description": "Study of laws and regulations concerning environmental protection and sustainability. Covers environmental policy, natural resource law, and environmental justice."},
    {"title": "Biomedical Science", "description": "Study of biological processes and their relationship to human health and disease. Covers molecular biology, genetics, immunology, and biomedical research methods."},
    {"title": "Urban Design", "description": "Design and planning of urban environments to achieve social, economic, and environmental sustainability. Includes urban morphology, transit-oriented development, and urban revitalization."},
    {"title": "Global Studies", "description": "Interdisciplinary study of global issues, cultures, and international relations. Covers globalization, international development, global governance, and cultural diversity."},
    {"title": "Music Therapy", "description": "Clinical use of music interventions to achieve therapeutic goals. Includes music psychology, therapeutic techniques, and applications in healthcare and rehabilitation."},
    {"title": "Quantum Mechanics", "description": "Fundamental theory in physics describing the behavior of matter and energy at the smallest scales. Covers wave-particle duality, quantum entanglement, and quantum computing."},
    {"title": "Creative Writing", "description": "Practice and techniques of writing fiction, poetry, and creative nonfiction. Includes narrative structure, character development, and literary techniques."},
    {"title": "Information Technology", "description": "Management and use of computer systems and networks to process and distribute data. Includes IT infrastructure, cybersecurity, software development, and IT project management."},
    {"title": "Linguistics", "description": "Scientific study of language and its structure. Includes phonetics, syntax, semantics, sociolinguistics, and historical linguistics."},
    {"title": "Sustainable Development", "description": "Study of sustainable economic growth, environmental protection, and social equity. Includes sustainable resource management, climate change adaptation, and green technologies."},
    {"title": "Medical Physics", "description": "Application of physics principles to healthcare and medical technology. Includes medical imaging,"}]
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
