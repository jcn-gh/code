-- Project Requirements for SQL Course

-- The project needs to contain the following technical features:

-- Build a database with the following tables: Students, Courses, Professors, Grades
-- Foreign key relationships between the tables
-- Create a script that populates all of the database tables with sample data
-- SQL query scripts for:
--      The average grade that is given by each professor
--      The top grades for each student
--      Sort students by the courses that they are enrolled in
--      Create a summary report of courses and their average grades, sorted by the most challenging course (course with the lowest average grade) to the easiest course
--      Finding which student and professor have the most courses in common

-------------------------------------------------------------------------------

-- Let's start by creating the tables and their relationships:

CREATE TABLE Professors (
    ProfessorID INT PRIMARY KEY,
    ProfessorName VARCHAR(50)
);

CREATE TABLE Courses (
    CourseID INT PRIMARY KEY,
    CourseName VARCHAR(50),
    ProfessorID INT,
    FOREIGN KEY (ProfessorID) REFERENCES Professors(ProfessorID)
);

CREATE TABLE Students (
    StudentID INT PRIMARY KEY,
    StudentName VARCHAR(50)
);

CREATE TABLE Grades (
    GradeID INT PRIMARY KEY,
    StudentID INT,
    CourseID INT,
    Grade DECIMAL(4, 2),
    FOREIGN KEY (StudentID) REFERENCES Students(StudentID),
    FOREIGN KEY (CourseID) REFERENCES Courses(CourseID)
);

-- Next, let's populate the tables with sample data:

INSERT INTO Professors (ProfessorID, ProfessorName) VALUES
(1, 'Professor A'),
(2, 'Professor B'),
(3, 'Professor C'),
(4, 'Professor D');

INSERT INTO Courses (CourseID, CourseName, ProfessorID) VALUES
(1, 'Mathematics', 1),
(2, 'Physics', 2),
(3, 'Chemistry', 2),
(4, 'Biology', 3),
(5, 'History', 4),
(6, 'English', 4);

INSERT INTO Students (StudentID, StudentName) VALUES
(1, 'Alice'),
(2, 'Bob'),
(3, 'Charlie'),
(4, 'David'),
(5, 'Emily'),
(6, 'Frank');

INSERT INTO Grades (GradeID, StudentID, CourseID, Grade) VALUES
(1, 1, 1, 85.5),
(2, 1, 2, 90.0),
(3, 2, 1, 78.0),
(4, 2, 3, 88.5),
(5, 3, 3, 91.0),
(6, 3, 4, 95.0),
(7, 4, 6, 75.0),
(8, 5, 5, 82.5),
(9, 6, 2, 97.5),
(10, 1, 3, 93.0);

-- Average grade given by each professor:

SELECT p.ProfessorName, AVG(g.Grade) AS AverageGrade
FROM Professors p
JOIN Courses c ON p.ProfessorID = c.ProfessorID
JOIN Grades g ON c.CourseID = g.CourseID
GROUP BY p.ProfessorName;

-- Top grades for each student:

SELECT s.StudentName, MAX(g.Grade) AS TopGrade
FROM Students s
JOIN Grades g ON s.StudentID = g.StudentID
GROUP BY s.StudentName;

-- Sort students by the courses they are enrolled in:

SELECT s.StudentName, c.CourseName
FROM Students s
JOIN Grades g ON s.StudentID = g.StudentID
JOIN Courses c ON g.CourseID = c.CourseID
ORDER BY s.StudentName, c.CourseName;

-- Summary report of courses and their average grades:

SELECT c.CourseName, AVG(g.Grade) AS AverageGrade
FROM Courses c
JOIN Grades g ON c.CourseID = g.CourseID
GROUP BY c.CourseName
ORDER BY AverageGrade;

-- Finding which student and professor have the most courses in common:

SELECT s.StudentName, p.ProfessorName, COUNT(*) AS CommonCourses
FROM Students s
JOIN Grades g ON s.StudentID = g.StudentID
JOIN Courses c ON g.CourseID = c.CourseID
JOIN Professors p ON c.ProfessorID = p.ProfessorID
GROUP BY s.StudentName, p.ProfessorName
ORDER BY CommonCourses DESC
LIMIT 1;