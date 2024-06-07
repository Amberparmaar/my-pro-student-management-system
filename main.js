#! /usr/bin/env node
import inquirer from "inquirer";
// define the student class
class Student {
    static counter = 10000;
    id;
    name;
    courses;
    balance;
    constructor(name) {
        this.id = Student.counter++;
        this.name = name;
        this.courses = []; //initialize an empty array 
        this.balance = 100;
    }
    //method to enrolled a student in a course
    enrolled_course(course) {
        this.courses.push(course);
    }
    // method to view student balance
    view_balance() {
        console.log(`Balnce for ${this.name} : ${this.balance}`);
    }
    //method to pay student fees
    pay_fees(amount) {
        this.balance -= amount;
        console.log(`${amount}Fees pay successfully for ${this.name}`);
    }
    //method to display student status
    show_status() {
        console.log(`Id: ${this.id}`);
        console.log(`Name: ${this.name}`);
        console.log(`Courses: ${this.courses}`);
        console.log(`Balance: ${this.balance}`);
    }
}
// class to manage students
class studentManager {
    students;
    constructor() {
        this.students = [];
    }
    addStudent(name) {
        let student = new Student(name);
        this.students.push(student);
        console.log(`Student : ${name} added successfully. Student ID : ${student.id}`);
    }
    // method to enrolled student
    enrolledStudent(studentId, course) {
        let student = this.findStudent(studentId);
        if (student) {
            student.enrolled_course(course);
            console.log(`${student.name} enrolled in ${course} successfully`);
        }
    }
    // method to view student balance
    viewStudentBalance(studentId) {
        let student = this.findStudent(studentId);
        if (student) {
            student.view_balance();
        }
        else {
            console.log("Student not found. Please enter correct student ID");
        }
    }
    //Method to pay student fees
    payStudentFees(studentId, amount) {
        let student = this.findStudent(studentId);
        if (student) {
            student.pay_fees(amount);
        }
        else {
            console.log("Student not found. Please enter correct student ID");
        }
    }
    // Method to display student student
    showStudentStatus(studentId) {
        let student = this.findStudent(studentId);
        if (student) {
            student.show_status();
        }
    }
    // Method to find a student by student id
    findStudent(studentId) {
        return this.students.find(std => studentId);
    }
}
// Main function
async function main() {
    let studentsManager = new studentManager();
    while (true) {
        let choice = await inquirer.prompt([
            {
                name: "choice",
                type: "list",
                message: "select an option",
                choices: [
                    "Add Student",
                    "Enroll Student",
                    "View Student Balance",
                    "Pay Fees",
                    "Show Status",
                    "Exit"
                ]
            }
        ]);
        // using switch case to handle user choice
        switch (choice.choice) {
            case "Add Student":
                let name_input = await inquirer.prompt([
                    {
                        name: "name",
                        type: "input",
                        message: "Enter a Student Name",
                    }
                ]);
                studentsManager.addStudent(name_input.name);
                break;
            case "Enroll Student":
                let course_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter a student ID",
                    },
                    {
                        name: "course",
                        type: "input",
                        message: "Enter a Course Name",
                    }
                ]);
                studentsManager.enrolledStudent(course_input.student_id, course_input.course);
                break;
            case "View Student Balance":
                let balance_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter a Student ID",
                    }
                ]);
                studentsManager.viewStudentBalance(balance_input.student_id);
                break;
            case "Pay Fees":
                let fees_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter a Student ID",
                    },
                    {
                        name: "amount",
                        type: "number",
                        message: "Enter a amount to pay",
                    }
                ]);
                studentsManager.payStudentFees(fees_input.student_id, fees_input.amount);
                break;
            case "Show Status":
                let status_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter a Student ID",
                    }
                ]);
                studentsManager.showStudentStatus(status_input.student_id);
                break;
            case "Exit":
                console.log("Exiting...");
                process.exit();
        }
    }
}
// calling main function
main();
