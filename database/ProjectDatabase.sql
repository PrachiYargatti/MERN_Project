DROP DATABASE IF EXISTS project_db;

CREATE DATABASE project_db;

USE project_db;


-- ==========================================
-- USERS TABLE
-- ==========================================

CREATE TABLE users (
    email VARCHAR(50) PRIMARY KEY,
    password VARCHAR(100) NOT NULL,
    role ENUM('admin', 'student') NOT NULL
);


-- ==========================================
-- PASSWORD INFORMATION
-- ==========================================
-- Admin password:
-- admin
--
-- SHA256(admin):
-- 8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918
--
-- Student password:
-- sunbeam
--
-- SHA256(sunbeam):
-- 9c5a1404f4fe95498da15717f093cc99c945c6d99a7d31d6bd4081e33e638aaa


-- ==========================================
-- ADMIN USERS
-- ==========================================

INSERT INTO users
(email, password, role)
VALUES

(
    'prachi@gmail.com',
    '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918',
    'admin'
),

(
    'sanika@gmail.com',
    '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918',
    'admin'
),

(
    'sanmati@gmail.com',
    '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918',
    'admin'
),

(
    'pratiksha@gmail.com',
    '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918',
    'admin'
);


-- ==========================================
-- STUDENT USERS
-- ==========================================

INSERT INTO users
(email, password, role)
VALUES

(
    'rahul@gmail.com',
    '9c5a1404f4fe95498da15717f093cc99c945c6d99a7d31d6bd4081e33e638aaa',
    'student'
),

(
    'rohini@gmail.com',
    '9c5a1404f4fe95498da15717f093cc99c945c6d99a7d31d6bd4081e33e638aaa',
    'student'
),

(
    'vikram@gmail.com',
    '9c5a1404f4fe95498da15717f093cc99c945c6d99a7d31d6bd4081e33e638aaa',
    'student'
),

(
    'meera@gmail.com',
    '9c5a1404f4fe95498da15717f093cc99c945c6d99a7d31d6bd4081e33e638aaa',
    'student'
);


-- ==========================================
-- COURSES TABLE
-- ==========================================

CREATE TABLE courses (
    course_id INT PRIMARY KEY,
    course_name VARCHAR(50) NOT NULL,
    description VARCHAR(255),
    fees INT NOT NULL CHECK (fees >= 0),
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    video_expire_days INT NOT NULL CHECK (video_expire_days >= 0),

    CHECK (end_date >= start_date)
);


-- ==========================================
-- COURSES DATA
-- ==========================================

INSERT INTO courses
(
    course_id,
    course_name,
    description,
    fees,
    start_date,
    end_date,
    video_expire_days
)
VALUES

-- Old / expired courses

(
    101,
    'Web Dev Basics',
    'HTML, CSS, JS fundamentals',
    2500,
    '2025-01-10',
    '2025-02-28',
    49
),

(
    102,
    'Python',
    'Core Python + problem solving',
    3000,
    '2025-01-01',
    '2026-12-31',
    729
),

(
    103,
    'Data Science Intro',
    'Statistics + Python + ML basics',
    4500,
    '2025-02-01',
    '2025-04-01',
    59
),

(
    104,
    'Java',
    'Core Java to Spring Boot',
    5000,
    '2025-12-01',
    '2026-01-31',
    61
),

(
    105,
    'AI Foundations',
    'Neural nets + modern AI concepts',
    6000,
    '2025-02-10',
    '2025-04-20',
    69
),

(
    106,
    'SQL & Databases',
    'MySQL, queries, joins, modeling',
    2200,
    '2025-01-12',
    '2025-02-25',
    44
),

(
    107,
    'Cybersecurity 101',
    'Ethical hacking basics',
    5500,
    '2025-03-01',
    '2025-04-15',
    45
),

(
    201,
    'React',
    'Deep dive into React and Hooks',
    5000,
    '2026-02-01',
    '2026-03-31',
    58
),

(
    202,
    'ML',
    'ML algorithms and hands-on projects',
    6500,
    '2025-12-25',
    '2026-02-15',
    52
),

(
    203,
    'Cloud Architecture',
    'Designing scalable cloud systems',
    7000,
    '2026-01-05',
    '2026-03-01',
    55
),

(
    205,
    'MERN',
    'MongoDB, Express.js, React, Node.js',
    4000,
    '2025-12-10',
    '2026-01-05',
    26
),

(
    206,
    '.NET Fullstack',
    'C#, ASP.NET Core, Web API, SQL',
    5800,
    '2025-02-15',
    '2025-04-10',
    54
),


-- ==========================================
-- LONG ACTIVE COURSES
-- These are intended to appear on Home
-- ==========================================

(
    301,
    'React JS',
    'Frontend development with React',
    4500,
    '2026-01-01',
    '2030-12-31',
    60
),

(
    302,
    'Node JS',
    'Backend development using Node.js',
    5000,
    '2026-01-01',
    '2030-12-31',
    60
),

(
    303,
    'Python Programming',
    'Python from basics to advanced',
    4000,
    '2026-01-01',
    '2030-12-31',
    60
),

(
    304,
    'Machine Learning',
    'ML algorithms and projects',
    7000,
    '2026-01-01',
    '2030-12-31',
    90
),

(
    305,
    'Cloud Computing',
    'AWS and cloud fundamentals',
    6000,
    '2026-01-01',
    '2030-12-31',
    60
);


-- ==========================================
-- STUDENTS TABLE
-- ==========================================

CREATE TABLE students (
    reg_no INT AUTO_INCREMENT PRIMARY KEY,

    name VARCHAR(50) NOT NULL,

    email VARCHAR(50) NOT NULL,

    course_id INT NOT NULL,

    mobile_no BIGINT NOT NULL,

    profile_pic BLOB DEFAULT NULL,

    UNIQUE(email, course_id),

    CHECK (
        mobile_no BETWEEN 1000000000 AND 9999999999
    ),

    FOREIGN KEY (email)
        REFERENCES users(email)
        ON DELETE CASCADE,

    FOREIGN KEY (course_id)
        REFERENCES courses(course_id)
        ON DELETE CASCADE
);


-- ==========================================
-- STUDENTS DATA
-- ==========================================

INSERT INTO students
(name, email, course_id, mobile_no)
VALUES

(
    'Rahul',
    'rahul@gmail.com',
    301,
    9876543210
),

(
    'Rohini',
    'rohini@gmail.com',
    302,
    9876543211
),

(
    'Vikram',
    'vikram@gmail.com',
    303,
    9876543212
),

(
    'Meera',
    'meera@gmail.com',
    304,
    9876543213
);


-- ==========================================
-- VIDEOS TABLE
-- ==========================================

CREATE TABLE videos (

    video_id INT AUTO_INCREMENT PRIMARY KEY,

    course_id INT NOT NULL,

    title VARCHAR(100) NOT NULL,

    description VARCHAR(255),

    youtube_url VARCHAR(255),

    added_at DATE NOT NULL DEFAULT (CURRENT_DATE),

    FOREIGN KEY (course_id)
        REFERENCES courses(course_id)
        ON DELETE CASCADE
);


-- ==========================================
-- VIDEO DATA
-- ==========================================

INSERT INTO videos
(course_id, title, description, youtube_url)
VALUES

-- Course 101

(
    101,
    'HTML Basics',
    'Learn HTML structure and tags',
    'https://youtu.be/Ut4RpySLM6Y'
),

(
    101,
    'CSS Fundamentals',
    'Introduction to styling with CSS',
    'https://youtu.be/AP3_V7KXHs4'
),


-- Course 102

(
    102,
    'Python Syntax',
    'Learn Python syntax and variables',
    'https://youtu.be/PNSIWjWAA7o'
),

(
    102,
    'Python Loops',
    'Master loops and control flow',
    'https://youtu.be/fIYVzKp0q5w'
),


-- Course 104

(
    104,
    'Java Basics',
    'Core Java fundamentals',
    'https://youtu.be/ntLJmHOJ0ME'
),

(
    104,
    'Spring Boot Intro',
    'Building APIs with Spring Boot',
    'https://youtu.be/Zxwq3aW9ctU'
),


-- Course 301

(
    301,
    'React Hooks',
    'Modern React hooks',
    'https://youtu.be/LOH1l-MP_9k'
),


-- Course 302

(
    302,
    'Node JS Introduction',
    'Node fundamentals',
    'https://youtu.be/TlB_eWDSMt4'
),


-- Course 303

(
    303,
    'Python Basics',
    'Python programming fundamentals',
    'https://youtu.be/_uQrJ0TkZlc'
),


-- Course 304

(
    304,
    'Machine Learning Intro',
    'Machine learning basics',
    'https://youtu.be/GwIo3gDZCVQ'
),


-- Course 305

(
    305,
    'AWS Basics',
    'Cloud computing fundamentals',
    'https://youtu.be/ulprqHHWlng'
);


-- ==========================================
-- VERIFICATION QUERIES
-- ==========================================

-- Check all users
SELECT * FROM users;


-- Check all courses
SELECT * FROM courses;


-- Check currently active courses
SELECT
    course_id,
    course_name,
    description,
    fees,
    start_date,
    end_date
FROM courses
WHERE CURDATE() BETWEEN start_date AND end_date
ORDER BY start_date;


-- Check long active courses
SELECT
    course_id,
    course_name,
    start_date,
    end_date
FROM courses
WHERE course_id BETWEEN 301 AND 305;


-- Check students
SELECT * FROM students;


-- Check videos
SELECT * FROM videos;