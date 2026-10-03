export const DEPARTMENT_NAME = "Computer Science";

export function calculateTotal(...marks) {
  return marks.reduce((total, mark) => total + Number(mark), 0);
}

export function calculateAverage(...marks) {
  if (marks.length === 0) return 0;
  return calculateTotal(...marks) / marks.length;
}

export function getGrade(marks) {
  if (marks >= 80) return "A";
  if (marks >= 70) return "B";
  if (marks >= 60) return "C";
  if (marks >= 50) return "D";
  return "F";
}

export const getStatus = (average) => average >= 50 ? "Passed" : "Failed";

export default function formatStudentResult(name, rollNumber, total) {
  return `${name} (${rollNumber}) earned a total of ${total} marks.`;
}