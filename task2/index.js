//1-create an empty array of students to store students object
let students=[];

//2-create a function createstudent that return obj 
function createstudent(name,age,mark){
    return {name:name,age:age,mark:mark};
}


//3-add the student that return from the function to student array students
students.push(createstudent("Khattab",20,70));
students.push(createstudent("amr",20,80));
students.push(createstudent("sara",20,90));
students.push(createstudent("ramy",20,10));
students.push(createstudent("aya",20,100));


//4-create array for success students
let successStudents =[];

//5-create array for failed students
let failedStudents =[];


//6-for an students array
// a-if the mark more than 50 add it to success students
// b-else add the student to failed students
for(let i=0;i<students.length;i++){
    if(students[i].mark>=50){
        successStudents.push(students[i]);
    }
    else{
        failedStudents.push(students[i]);
    }
}

//7-print the success students and faild students
console.log("success Students",successStudents);
console.log("failed  Students",failedStudents);