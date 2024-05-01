#! /usr/bin/env node
/*
his project is a simple console based Student Management System. In this project you will be learning how to add new students, how to generate a 5 digit unique studentID for each student, how to enroll students in the given courses. Also, you will be implementing the following operations enroll, view balance, pay tuition fees, show status, etc. The status will show all the details of the student including name, id, courses enrolled and balance.This is one of the best projects to implement the Object Oriented Programming concepts.
*/
import inquirer from "inquirer";
import chalk from "chalk";
console.log(chalk.bgMagenta('\n\n\t\t~~~WELCOME TO STUDENT-INFORMATION-SYSTEM~~~'));
console.log(chalk.bgMagentaBright('\t\t==========================================='));
//class object
//object that show enroll, show status,exit;
class student {
    //static counter = 10000;   //static means for every student id, 5 digits unique id
    id;
    name;
    coursesEnrolled;
    feesAmount;
    constructor(id, name, coursesEnrolled, feesAmount) {
        //this.id = student.counter++;
        this.id = id;
        this.name = name;
        this.coursesEnrolled = coursesEnrolled; //initialize an empty array for courses
        this.feesAmount = feesAmount;
    }
}
let baseId = 11000;
let studentId = "";
let continueEnrollment = true;
let students = [];
do {
    let action = await inquirer.prompt({
        type: "list",
        name: "ans",
        message: chalk.magentaBright("\n\t---What you want to perform?---\n\tplease select an option below:\n"),
        choices: ["Enroll a Student", "Show Student Status", "EXIT"]
    });
    if (action.ans === "Enroll a Student") {
        let studentName = await inquirer.prompt({
            type: "input",
            name: "ans",
            message: chalk.bgMagentaBright("Please Enter Student Name:")
        });
        let trimedstudentname = (studentName.ans).trim().toUpperCase(); // trim whitespace
        let studentNameCheck = students.map(obj => obj.name); // all student
        if (studentNameCheck.includes(trimedstudentname) === false) { //not a duplicate
            if (trimedstudentname !== "") {
                baseId++;
                studentId = "std_id-" + baseId;
                console.log("\n\t Your account has been created!!\n");
                console.log(chalk.magenta(`\tWELCOME "${trimedstudentname}" TO STUDENT MANAGEMENT SYSTEM!`));
                console.log(chalk.magentaBright("\t------------------------------------------------------"));
                let course = await inquirer.prompt({
                    type: "list",
                    name: "ans",
                    message: "Please select a course",
                    choices: ["I.T", "DATABASE", "NETWORKING"]
                });
                let coursefees = 0;
                switch (course.ans) {
                    case "I.T":
                        coursefees = 5000;
                        break;
                    case "DATABASE":
                        coursefees = 2000;
                        break;
                    case "NETWORKING":
                        coursefees = 1000;
                        break;
                }
                let courseconfirm = await inquirer.prompt({
                    type: "confirm",
                    name: "ans",
                    message: ` Are you sure want to enroll is this course "${course.ans}"?`
                });
                if (courseconfirm.ans === true) {
                    let Student = new student(studentId, trimedstudentname, [course.ans], coursefees);
                    students.push(Student);
                    console.log("you have enrolled in this course");
                }
            }
            else {
                console.log("invalid Name");
            }
        }
        else {
            console.log("This name is already exists");
        }
    }
    else if (action.ans === "Show Student Status") {
        if (students.length !== 0) {
            let studentNameCheck = students.map(e => e.name); //show all names of student
            let selectStudent = await inquirer.prompt({
                type: "list",
                name: "ans",
                message: " please select name",
                choices: studentNameCheck
            });
            //foundstudent --- record se check 
            let foundstudent = students.find(Student => Student.name === selectStudent.ans);
            console.log(chalk.magenta(`\n\tStudent Information of ${selectStudent.ans}`));
            console.log(chalk.magenta("========================================\n"), foundstudent);
        }
        else {
            console.log("\nRecord is empty!");
        }
    }
    else if (action.ans === "EXIT") {
        if (continueEnrollment = true) {
            console.log(chalk.bgMagentaBright.yellowBright("\n\t\t~~Thank you for using student management system~~"));
        }
        let userconfirm = await inquirer.prompt({
            type: "confirm",
            name: "ans",
            message: "Are you sure want to Exit?"
        });
        if (userconfirm.ans === true) {
            continueEnrollment = false;
        }
    }
} while (continueEnrollment);
