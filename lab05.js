import formatStudentResult, {
  DEPARTMENT_NAME,
  calculateAverage as averageMarks,
  calculateTotal,
  getGrade,
  getStatus
} from "./studentUtils.js";

const coreCourses = ["Programming Fundamentals", "Mathematics I", "Introduction to Computing"];
const electiveCourses = ["Web Development", "Digital Design", "Data Literacy"];
const allCourses = [...coreCourses, ...electiveCourses];
const expandedCourses = [...allCourses, "Artificial Intelligence"];

const student = {
  name: "Ayesha Khan",
  rollNumber: "U2025001",
  department: "Computer Science",
  semester: 2
};

const cgpas = [3.42, 3.67, 3.25, 3.81, 3.54];
const updatedStudent = { ...student, semester: 3, cgpa: cgpas[0] };

function enrollStudent(name, ...courses) {
  return { name, courses };
}

const calculateAverageCGPA = (...values) => values.reduce((sum, value) => sum + value, 0) / values.length;

function getStudentInfo(name, department = "Computer Science") {
  return `${name} is enrolled in the ${department} department.`;
}

const enrollment = enrollStudent(updatedStudent.name, ...allCourses);
const averageCGPA = calculateAverageCGPA(...cgpas);
const highestCGPA = Math.max(...cgpas);

const taskOneOutput = document.querySelector("#task-one-output");
taskOneOutput.innerHTML = `
  <article class="card">
    <h3>Course lists</h3>
    <p class="card-title">Core courses</p>
    <ul class="course-list">${coreCourses.map((course) => `<li>${course}</li>`).join("")}</ul>
    <p class="card-title" style="margin-top: 14px">Elective courses</p>
    <ul class="course-list">${electiveCourses.map((course) => `<li>${course}</li>`).join("")}</ul>
    <p class="muted" style="margin-top: 14px">Combined courses: ${allCourses.length} · Copy with added course: ${expandedCourses.at(-1)}</p>
  </article>
  <article class="card">
    <h3>Enrollment and CGPA</h3>
    <p>${getStudentInfo(updatedStudent.name, updatedStudent.department)}</p>
    <p><strong>Student:</strong> ${updatedStudent.name} · ${updatedStudent.rollNumber}</p>
    <p><strong>Department / semester:</strong> ${updatedStudent.department} · ${updatedStudent.semester}</p>
    <p><strong>Updated CGPA:</strong> ${updatedStudent.cgpa.toFixed(2)}</p>
    <p><strong>Enrolled courses:</strong> ${enrollment.courses.join(", ")}</p>
    <p><strong>CGPAs:</strong> ${cgpas.join(", ")}</p>
    <p><strong>Average:</strong> ${averageCGPA.toFixed(2)} · <strong>Highest:</strong> ${highestCGPA.toFixed(2)}</p>
  </article>
`;

const taskTwoStudents = [
  { name: "Ayesha Khan", rollNumber: "U2025001", assignment: 88, midterm: 79, finalExam: 84 },
  { name: "Bilal Ahmed", rollNumber: "U2025002", assignment: 72, midterm: 68, finalExam: 75 },
  { name: "Sara Malik", rollNumber: "U2025003", assignment: 93, midterm: 89, finalExam: 96 },
  { name: "Hamza Ali", rollNumber: "U2025004", assignment: 48, midterm: 52, finalExam: 45 }
];

document.querySelector("#department-name").textContent = `Department: ${DEPARTMENT_NAME}`;
document.querySelector("#task-two-output").innerHTML = taskTwoStudents.map((studentRecord) => {
  const { name, rollNumber, assignment, midterm, finalExam } = studentRecord;
  const total = calculateTotal(assignment, midterm, finalExam);
  const average = averageMarks(assignment, midterm, finalExam);
  const grade = getGrade(average);
  const status = getStatus(average);

  return `
    <article class="card student-card">
      <h3>${name}</h3>
      <p class="result-meta">Roll number: ${rollNumber}</p>
      <p>${formatStudentResult(name, rollNumber, total)}</p>
      <p>Assignment ${assignment} · Midterm ${midterm} · Final ${finalExam}</p>
      <p><strong>Average:</strong> ${average.toFixed(1)} · <strong>Grade:</strong> ${grade}</p>
      <span class="pill ${status === "Failed" ? "failed" : ""}">${status}</span>
    </article>
  `;
}).join("");

const workflowLog = document.querySelector("#workflow-log");

function logWorkflow(message, type = "") {
  const item = document.createElement("li");
  item.textContent = message;
  if (type) item.className = type;
  workflowLog.append(item);
}

function verifyStudent(roll, callback) {
  setTimeout(() => {
    if (!roll.trim()) {
      callback(new Error("Roll number is required"));
      return;
    }
    callback(null, "Student verified");
  }, 1000);
}

function loadExamPaper(callback) {
  setTimeout(() => callback("Exam paper loaded"), 1500);
}

function submitAnswers(callback) {
  setTimeout(() => callback("Answers submitted"), 2000);
}

function generateResult(callback) {
  setTimeout(() => callback("Result generated: 82 marks"), 1000);
}

function runNestedWorkflow() {
  workflowLog.replaceChildren();
  logWorkflow("Exam workflow started...");

  // Deeply nested callbacks are called callback hell because the sequence becomes hard to read and maintain.
  verifyStudent("U2025001", (error, verificationMessage) => {
    if (error) {
      logWorkflow(error.message, "error");
      return;
    }
    logWorkflow(verificationMessage);
    loadExamPaper((paperMessage) => {
      logWorkflow(paperMessage);
      submitAnswers((submissionMessage) => {
        logWorkflow(submissionMessage);
        generateResult((resultMessage) => logWorkflow(resultMessage, "success"));
      });
    });
  });
}

function testErrorFirstWorkflow(rollNumber) {
  workflowLog.replaceChildren();
  logWorkflow("Exam workflow started...");
  verifyStudent(rollNumber, (error, verificationMessage) => {
    if (error) {
      logWorkflow(error.message, "error");
      return;
    }
    logWorkflow(verificationMessage);
    loadExamPaper((paperMessage) => {
      logWorkflow(paperMessage);
      submitAnswers((submissionMessage) => {
        logWorkflow(submissionMessage);
        generateResult((resultMessage) => logWorkflow(resultMessage, "success"));
      });
    });
  });
}

document.querySelector("#valid-workflow-button").addEventListener("click", () => testErrorFirstWorkflow("U2025001"));
document.querySelector("#empty-workflow-button").addEventListener("click", () => testErrorFirstWorkflow(""));
runNestedWorkflow();

const students = [
  { name: "Ayesha Khan", rollNumber: "U2025001", department: "Computer Science", semester: 3, assignment: 88, midterm: 79, finalExam: 84 },
  { name: "Bilal Ahmed", rollNumber: "U2025002", department: "Computer Science", semester: 3, assignment: 72, midterm: 68, finalExam: 75 },
  { name: "Sara Malik", rollNumber: "U2025003", department: "Computer Science", semester: 4, assignment: 93, midterm: 89, finalExam: 96 },
  { name: "Hamza Ali", rollNumber: "U2025004", department: "Computer Science", semester: 2, assignment: 48, midterm: 52, finalExam: 45 },
  { name: "Noor Fatima", rollNumber: "U2025005", department: "Computer Science", semester: 4, assignment: 64, midterm: 71, finalExam: 67 }
];

function findStudent(rollNumber) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const foundStudent = students.find((studentRecord) => studentRecord.rollNumber === rollNumber.trim());
      if (foundStudent) resolve(foundStudent);
      else reject("Student not found");
    }, 1000);
  });
}

function calculateResult(studentRecord) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const { assignment, midterm, finalExam } = studentRecord;
      const total = calculateTotal(assignment, midterm, finalExam);
      const average = averageMarks(assignment, midterm, finalExam);
      resolve({
        ...studentRecord,
        total,
        average,
        grade: getGrade(average),
        status: getStatus(average)
      });
    }, 1000);
  });
}

function renderResultCard(result) {
  const { name, rollNumber, department, semester, total, average, grade, status } = result;
  const statusClass = status === "Failed" ? "failed" : "";
  return `
    <article class="card result-card ${statusClass}">
      <h3>${name}</h3>
      <p class="result-meta">${rollNumber} · ${department} · Semester ${semester}</p>
      <dl class="result-stats">
        <div><dt>Total</dt><dd>${total}</dd></div>
        <div><dt>Average</dt><dd>${average.toFixed(1)}</dd></div>
        <div><dt>Grade</dt><dd>${grade}</dd></div>
      </dl>
      <p style="margin-top: 12px"><span class="pill ${statusClass}">${status}</span></p>
    </article>
  `;
}

const promiseSearchForm = document.querySelector("#promise-search-form");
promiseSearchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const rollNumber = document.querySelector("#promise-roll-number").value;
  const message = document.querySelector("#promise-search-message");
  const resultContainer = document.querySelector("#promise-result");
  message.textContent = "Searching...";
  message.className = "message";
  resultContainer.replaceChildren();

  findStudent(rollNumber)
    .then((studentRecord) => calculateResult(studentRecord))
    .then((result) => {
      resultContainer.innerHTML = renderResultCard(result);
      message.textContent = "Result loaded.";
      message.className = "message success";
    })
    .catch((error) => {
      message.textContent = typeof error === "string" ? error : error.message;
      message.className = "message error";
    })
    .finally(() => {
      message.dataset.complete = "true";
    });
});

async function showResult(rollNumber) {
  const message = document.querySelector("#async-search-message");
  const resultContainer = document.querySelector("#async-result");
  message.textContent = "Searching...";
  message.className = "message";
  resultContainer.replaceChildren();

  try {
    const studentRecord = await findStudent(rollNumber);
    const result = await calculateResult(studentRecord);
    resultContainer.innerHTML = renderResultCard(result);
    message.textContent = "Result loaded.";
    message.className = "message success";
  } catch (error) {
    message.textContent = typeof error === "string" ? error : error.message;
    message.className = "message error";
  } finally {
    message.dataset.complete = "true";
  }
}

document.querySelector("#async-search-form").addEventListener("submit", (event) => {
  event.preventDefault();
  showResult(document.querySelector("#async-roll-number").value);
});

async function loadAllResults() {
  const message = document.querySelector("#all-results-message");
  const resultContainer = document.querySelector("#all-results");
  const summary = document.querySelector("#result-summary");
  message.textContent = "Loading all results...";
  message.className = "message";
  resultContainer.replaceChildren();
  summary.replaceChildren();

  try {
    const results = await Promise.all(students.map((studentRecord) => calculateResult(studentRecord)));
    resultContainer.innerHTML = results.map(renderResultCard).join("");
    const passedCount = results.filter((result) => result.status === "Passed").length;
    const failedCount = results.length - passedCount;
    summary.innerHTML = `
      <div class="summary-item"><strong>${results.length}</strong><span>Total Students</span></div>
      <div class="summary-item"><strong>${passedCount}</strong><span>Passed Students</span></div>
      <div class="summary-item"><strong>${failedCount}</strong><span>Failed Students</span></div>
    `;
    message.textContent = "All results loaded.";
    message.className = "message success";
  } catch (error) {
    message.textContent = typeof error === "string" ? error : error.message;
    message.className = "message error";
  } finally {
    message.dataset.complete = "true";
  }
}

document.querySelector("#load-all-button").addEventListener("click", loadAllResults);