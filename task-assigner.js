'use strict';

const assert = chai.assert;

/**
 * assigns a list of tasks to a list of students
 * it returns an object where each key is a student name
 *  and each value is an array of task strings
 * when possible, it assigns each student the same number of tasks
 * @param {string[]} tasks - an array of strings describing each task
 * @param {string[]} students - an array of student names
 * @returns {Object} the student/task assignments
 */
const taskAssigner = (students, tasks) => {
  let temp = [...tasks];
  let taskBoard = {};
  students.forEach(student => taskBoard[student] = []);
  while (temp.length > 0) {
    for (let student in taskBoard) {
      let random = Math.floor(Math.random() * (temp.length))
      taskBoard[student].push(`${temp.splice(random, 1)}`);
      if (temp.length === 0) { break; }
    }
  }
  console.log(temp);
  console.log(taskBoard);
  return taskBoard;
}

describe('taskAssigner: randomly assigns tasks to team members', () => {
  describe('it assigns all tasks', () => {
    it('returns an empty object for empty arrays', () => {
      const actual = taskAssigner([], []);
      assert.deepStrictEqual(actual, {});
    });
    it('returns an object with the same number of keys as students', () => {
      const result = taskAssigner(['a', 'b', 'c'], []);
      const actualNumberOfKeys = Object.keys(result).length;
      assert.strictEqual(actualNumberOfKeys, 3);
    });
    it('each key stores an array', () => {
      const result = taskAssigner(['a', 'b', 'c'], []);
      const allValuesAreArrays = Object.values(result)
        .reduce((allAreArrays, nextValue) => {
          return allAreArrays && Array.isArray(nextValue);
        }, true);
      assert.strictEqual(allValuesAreArrays, true);
    });
    it('it assigns all tasks', () => {
      const result = taskAssigner(['a', 'b', 'c'], ['v', 'w', 'x', 'y', 'z']);
      const actualNumberOfTasks = Object.values(result)
        .reduce((totalCount, nextValue) => {
          return totalCount + nextValue.length;
        }, 0);
      assert.strictEqual(actualNumberOfTasks, 5);
    });
  });

  describe('taskAssigner uses the argument object correctly', () => {
    it('does not modify the first argument', () => {
      const studentsArray = ['a', 'b', 'c', 'd'];
      taskAssigner(studentsArray, []);
      assert.deepStrictEqual(studentsArray, ['a', 'b', 'c', 'd']);
    });
    it('does not modify the second argument', () => {
      const tasksArray = ['a', 'b', 'c', 'd'];
      taskAssigner([], tasksArray);
      assert.deepStrictEqual(tasksArray, ['a', 'b', 'c', 'd']);
    });
  });
});
