CREATE DATABASE project_db;
USE project_db;

-- USERS
CREATE TABLE users (
    email VARCHAR(50) PRIMARY KEY,
    password VARCHAR(20) NOT NULL CHECK (LENGTH(password) >= 8),
    role ENUM('admin', 'student') NOT NULL
);

INSERT INTO users VALUES
('prachi@gmail.com', '12345678', 'admin'),
('sanika@gmail.com', '12345678', 'admin'),
('sanmati@gmail.com', '12345678', 'admin'),
('pratiksha@gmail.com', '12345678', 'admin'),
('rahul@student.com', 'student123', 'student'),
('aisha@student.com', 'learn2025', 'student'),
('vikram@student.com', 'study7890', 'student'),
('meera@student.com', 'classroom8', 'student');

CREATE TABLE courses (
    course_id INT PRIMARY KEY,
    course_name VARCHAR(50) NOT NULL,
    description VARCHAR(255),
    fees INT CHECK (fees >= 0),
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    video_expire_days INT CHECK (video_expire_days >= 0),
    CHECK (end_date >= start_date)
);

INSERT INTO courses VALUES
(101, 'Web Dev Basics', 'HTML, CSS, JS fundamentals', 2500, '2025-01-10', '2025-02-28', 30),
(102, 'Python Mastery', 'Core Python + problem solving', 3000, '2025-01-15', '2025-03-05', 45),
(103, 'Data Science Intro', 'Statistics + Python + ML basics', 4500, '2025-02-01', '2025-04-01', 60),
(104, 'Java Fullstack', 'Core Java to Spring Boot', 5000, '2025-01-20', '2025-03-30', 40),
(105, 'AI Foundations', 'Neural nets + modern AI concepts', 6000, '2025-02-10', '2025-04-20', 75),
(106, 'SQL & Databases', 'MySQL, queries, joins, modeling', 2200, '2025-01-12', '2025-02-25', 30),
(107, 'Cybersecurity 101', 'Ethical hacking basics', 5500, '2025-03-01', '2025-04-15', 30),
(108, 'Cloud Essentials', 'AWS fundamentals & deployments', 4800, '2025-02-05', '2025-03-25', 40);

-- UPCOMING COURSES
INSERT INTO courses VALUES
(201, 'Advanced React', 'Deep dive into React and Hooks', 5000, '2025-12-20', '2026-01-31', 60),
(202, 'Machine Learning', 'ML algorithms and hands-on projects', 6500, '2025-12-25', '2026-02-15', 75),
(203, 'Cloud Architecture', 'Designing scalable cloud systems', 7000, '2026-01-05', '2026-03-01', 90),
(204, 'DevOps Fundamentals', 'CI/CD, Docker, Kubernetes', 5500, '2026-01-10', '2026-02-28', 60),
(205, 'MERN', 'MongoDB, Express.js, React, Node.js', 6000, '2025-12-10', '2026-01-05', 40);

-- STUDENTS TABLE
CREATE TABLE students (
    reg_no INT PRIMARY KEY,
    name VARCHAR(20),
    email VARCHAR(50),
    course_id INT,
    mobile_no BIGINT,
    profile_pic BLOB DEFAULT NULL,
    FOREIGN KEY (course_id) REFERENCES courses(course_id),
    FOREIGN KEY (email) REFERENCES users(email)
);

INSERT INTO students VALUES
(1, 'Rahul', 'rahul@student.com', 105, 9876543214, NULL),
(2, 'Aisha', 'aisha@student.com', 106, 9876543215, NULL),
(3, 'Vikram', 'vikram@student.com', 107, 9876543216, NULL),
(4, 'Meera', 'meera@student.com', 108, 9876543217, NULL);

-- VIDEOS TABLE
CREATE TABLE videos (
    video_id INT PRIMARY KEY,
    course_id INT,
    title VARCHAR(50) NOT NULL,
    description VARCHAR(100),
    youtube_url VARCHAR(100),
    added_at DATE NOT NULL,
    FOREIGN KEY (course_id) REFERENCES courses(course_id)
);

INSERT INTO videos VALUES
(1, 101, 'HTML Basics', 'Learn HTML structure and tags', 'https://youtu.be/html101', '2025-01-11'),
(2, 101, 'CSS Fundamentals', 'Introduction to styling with CSS', 'https://youtu.be/css101', '2025-01-12'),
(3, 102, 'Python Syntax', 'Learn Python syntax and variables', 'https://youtu.be/python101', '2025-01-16'),
(4, 102, 'Python Loops', 'Master loops and control flow', 'https://youtu.be/python102', '2025-01-18'),
(5, 103, 'Intro to Data Science', 'Basics of data science and statistics', 'https://youtu.be/ds101', '2025-02-02'),
(6, 103, 'Data Cleaning', 'Cleaning datasets with Python', 'https://youtu.be/ds102', '2025-02-05'),
(7, 104, 'Java Basics', 'Core Java fundamentals', 'https://youtu.be/java101', '2025-01-21'),
(8, 104, 'Spring Boot Intro', 'Building APIs with Spring Boot', 'https://youtu.be/java102', '2025-01-25'),
(9, 105, 'AI Concepts', 'Introduction to AI and neural networks', 'https://youtu.be/ai101', '2025-02-12'),
(10, 105, 'AI Project', 'Building a simple AI project', 'https://youtu.be/ai102', '2025-02-20'),
(11, 106, 'SQL Basics', 'Introduction to SQL and queries', 'https://youtu.be/sql101', '2025-01-13'),
(12, 106, 'Joins and Keys', 'Advanced SQL joins and keys', 'https://youtu.be/sql102', '2025-01-20'),
(13, 107, 'Cybersecurity Intro', 'Basics of ethical hacking', 'https://youtu.be/cyber101', '2025-03-02'),
(14, 107, 'Security Tools', 'Hands-on security tools', 'https://youtu.be/cyber102', '2025-03-05'),
(15, 108, 'AWS Fundamentals', 'Cloud basics with AWS', 'https://youtu.be/cloud101', '2025-02-06'),
(16, 108, 'Deploying on Cloud', 'Deploying applications on AWS', 'https://youtu.be/cloud102', '2025-02-15'),
(301, 201, 'React Hooks', 'Modern React hooks', 'https://youtu.be/react2025', '2025-12-01');

-- QUERIES

-- Q1) Write a Sql query that will fetch all upcoming courses.
SELECT *
FROM courses
WHERE start_date > CURDATE()
ORDER BY start_date ASC;

+-----------+---------------------+-------------------------------------+------+------------+------------+-------------------+
| course_id | course_name         | description                         | fees | start_date | end_date   | video_expire_days |
+-----------+---------------------+-------------------------------------+------+------------+------------+-------------------+
|       201 | Advanced React      | Deep dive into React and Hooks      | 5000 | 2025-12-20 | 2026-01-31 |                60 |
|       202 | Machine Learning    | ML algorithms and hands-on projects | 6500 | 2025-12-25 | 2026-02-15 |                75 |
|       203 | Cloud Architecture  | Designing scalable cloud systems    | 7000 | 2026-01-05 | 2026-03-01 |                90 |
|       204 | DevOps Fundamentals | CI/CD, Docker, Kubernetes           | 5500 | 2026-01-10 | 2026-02-28 |                60 |
+-----------+---------------------+-------------------------------------+------+------------+------------+-------------------+

-- Q2) Write a Sql query that will fetch all the registered students along with course name
SELECT
    s.reg_no,
    s.name,
    s.email,
    s.mobile_no,
    c.course_id,
    c.course_name
FROM students s
INNER JOIN courses c ON s.course_id = c.course_id;

+--------+--------+--------------------+------------+-----------+-------------------+
| reg_no | name   | email              | mobile_no  | course_id | course_name       |
+--------+--------+--------------------+------------+-----------+-------------------+
|      1 | Rahul  | rahul@student.com  | 9876543214 |       105 | AI Foundations    |
|      2 | Aisha  | aisha@student.com  | 9876543215 |       106 | SQL & Databases   |
|      3 | Vikram | vikram@student.com | 9876543216 |       107 | Cybersecurity 101 |
|      4 | Meera  | meera@student.com  | 9876543217 |       108 | Cloud Essentials  |
+--------+--------+--------------------+------------+-----------+-------------------+

-- Q3) Write an SQL query to fetch the complete details of a student (based on their email) along with the details
-- of the course they are enrolled in.

SELECT *
FROM students s
INNER JOIN courses c ON s.course_id = c.course_id
WHERE s.email = 'meera@student.com';

+--------+-------+-------------------+-----------+------------+--------------------------+-----------+------------------+--------------------------------+------+------------+------------+-------------------+
| reg_no | name  | email             | course_id | mobile_no  | profile_pic              | course_id | course_name      | description                    | fees | start_date | end_date   | video_expire_days |
+--------+-------+-------------------+-----------+------------+--------------------------+-----------+------------------+--------------------------------+------+------------+------------+-------------------+
|      4 | Meera | meera@student.com |       108 | 9876543217 | NULL                     |       108 | Cloud Essentials | AWS fundamentals & deployments | 4800 | 2025-02-05 | 2025-03-25 |                40 |
+--------+-------+-------------------+-----------+------------+--------------------------+-----------+------------------+--------------------------------+------+------------+------------+-------------------+

-- Q4) Write an SQL query to retrieve the course details and the list of non-expired videos for a specific student
-- using their email address. A video is considered active (not expired) if its added_at date plus the course’s
-- video_expire_days has not yet passed compared to the current date.
-- Example: A video added on 2025-01-01 with 30 video_expire_days remains active until 2025-01-31.

INSERT INTO videos VALUES
(402, 108, 'Advanced AWS IAM', 'Deep dive into IAM roles and policies', 'https://youtu.be/aws201', '2025-11-25'),
(403, 108, 'Cloud Security Basics', 'Security best practices on AWS', 'https://youtu.be/aws202', '2025-12-01'),
(404, 108, 'Auto Scaling & Load Balancing', 'High availability on cloud', 'https://youtu.be/aws203', '2025-12-05');

SELECT c.course_id,c.course_name,c.description,c.fees,c.start_date,c.end_date,v.video_id,v.title,v.description AS video_description,v.youtube_url,v.added_at
FROM students s
INNER JOIN courses c
ON s.course_id = c.course_id
INNER JOIN videos v
ON c.course_id = v.course_id
WHERE s.email = 'meera@student.com'
AND DATE_ADD(v.added_at, INTERVAL c.video_expire_days DAY) >= CURDATE();

+-----------+------------------+--------------------------------+------+------------+------------+----------+-------------------------------+---------------------------------------+-------------------------+------------+
| course_id | course_name      | description                    | fees | start_date | end_date   | video_id | title                         | video_description                     | youtube_url             | added_at   |
+-----------+------------------+--------------------------------+------+------------+------------+----------+-------------------------------+---------------------------------------+-------------------------+------------+
|       108 | Cloud Essentials | AWS fundamentals & deployments | 4800 | 2025-02-05 | 2025-03-25 |      402 | Advanced AWS IAM              | Deep dive into IAM roles and policies | https://youtu.be/aws201 | 2025-11-25 |
|       108 | Cloud Essentials | AWS fundamentals & deployments | 4800 | 2025-02-05 | 2025-03-25 |      403 | Cloud Security Basics         | Security best practices on AWS        | https://youtu.be/aws202 | 2025-12-01 |
|       108 | Cloud Essentials | AWS fundamentals & deployments | 4800 | 2025-02-05 | 2025-03-25 |      404 | Auto Scaling & Load Balancing | High availability on cloud            | https://youtu.be/aws203 | 2025-12-05 |
+-----------+------------------+--------------------------------+------+------------+------------+----------+-------------------------------+---------------------------------------+-------------------------+------------+