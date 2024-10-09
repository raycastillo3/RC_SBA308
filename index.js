// The provided course information.
const CourseInfo = {
    id: 451,
    name: "Introduction to JavaScript"
  };
  
  // The provided assignment group.
  const AssignmentGroup = {
    id: 12345,
    name: "Fundamentals of JavaScript",
    course_id: 451,
    group_weight: 25,
    assignments: [
      {
        id: 1,
        name: "Declare a Variable",
        due_at: "2023-01-25",
        points_possible: 50
      },
      {
        id: 2,
        name: "Write a Function",
        due_at: "2023-02-27",
        points_possible: 150
      },
      {
        id: 3,
        name: "Code the World",
        due_at: "3156-11-15",
        points_possible: 500
      }
    ]
  };
  
  // The provided learner submission data.
  //YYYY-MM-DD
  const LearnerSubmissions = [
    {
      learner_id: 125,
      assignment_id: 1,
      submission: {
        submitted_at: "2023-01-25",
        score: 47
      }
    },
    {
      learner_id: 125,
      assignment_id: 2,
      submission: {
        submitted_at: "2023-02-27",
        score: 150
      }
    },
    {
      learner_id: 125,
      assignment_id: 3,
      submission: {
        submitted_at: "2023-01-25",
        score: 400
      }
    },
    {
      learner_id: 132,
      assignment_id: 1,
      submission: {
        submitted_at: "2023-01-24",
        score: 39
      }
    },
    {
      learner_id: 132,
      assignment_id: 2,
      submission: {
        submitted_at: "2023-03-07",
        score: 140
      }
    }
  ];
  
  function getLearnerData(course, ag, submissions) {
    const result = [];
    validateLearnerData(course, ag);
    //deducts 10 from late assignments: Since obj are passed by reference in JS. 
    //I can deduct using a helper function and it will change the object in this function
    latePenaltyDeduction(ag, submissions);

    let avgsOfAssignment = submittedAssignments(ag, submissions);
    // //average for assignments that have been submitted within the deadline:
    avgsOfAssignment.pop(); 
    // console.log(avgsOfAssignment);
    let avg = getAverage(avgsOfAssignment);
    // console.log(avg);
    const [assignment1, assignment2] = avgsOfAssignment;
    
    result.push({id:submissions[0].learner_id , avg: avg, 1: assignment1, 2:assignment2 })

    //just returning the assignments with the dates that has passed. Just like the assignment says
    return result;
  }
  function getAverage(arr){
    return arr.reduce((a, b) => a + b) / arr.length
  }
  function submittedAssignments(ag, submissions) {
    const result = [];

    for (let i = 0; i < submissions.length; i++) {
        const submission = submissions[i];
        let assignment; 

        for (let j = 0; j < ag.assignments.length; j++) {
            if (ag.assignments[j].id === submission.assignment_id) {
                assignment = ag.assignments[j];
                break;
            }
        }
        // console.log(submission);
        if (assignment && assignment.due_at) {
            let submittedDate = new Date(submission.submission.submitted_at);
            let dueDate = new Date(assignment.due_at);

            if (submittedDate >= dueDate) {
                let submissionScore = submission.submission.score;
                let pointsPossible = assignment.points_possible;
                let tempAvgOfAssignment = averageOfAssignment(submissionScore, pointsPossible); 
                result.push(tempAvgOfAssignment)
            }
        }
    }
    //commented this out because this code assumes that both ag.assignments and submissions have the same length and therefore the same indexes
    // let i = 0;
    // while (i < submissions.length && i < ag.assignments.length) {
    //     let submittedDate = new Date(submissions[i].submission.submitted_at);
    //     let dueDate = new Date(ag.assignments[i].due_at);
    //     if (submittedDate >= dueDate) {
    //         // calculate average for each assignment
    //         let submissionScore = submissions[i].submission.score;
    //         let pointsPossible = ag.assignments[i].points_possible;
    //         let tempAvgOfAssignment = averageOfAssignment(submissionScore, pointsPossible);
    //         result.push(tempAvgOfAssignment);
    //     } 
    //     i++;
    // }
    return result; 
}


function averageOfAssignment (subScore, pPossible) {
    return subScore / pPossible;
}

  function latePenaltyDeduction (ag, submissions) {
      for (let i = 0; i < ag.assignments.length; i++) {
        let submittedDate = new Date(submissions[i].submission.submitted_at); 
        let dueDate = new Date(ag.assignments[i].due_at)
        if (submittedDate > dueDate) {
            let pointsToDeduct = ag.assignments[i].points_possible;
            let percentAmount = 10;
            ag.assignments[i].points_possible -= percentDeduction(pointsToDeduct, percentAmount); 
        }
    }
}

  function validateLearnerData (course, ag) {
    try {
        if (course.id !== ag.id) {
            throw new Error(`course ID: ${course.id} not matching Assignment Group ID: ${ag.id}`)
        }
    } catch (err) {
        console.info(err);      
    }
    for (let i = 0; i < ag.assignments.length; i++){
        try {
            if (typeof ag.assignments[i].points_possible !== "number"){
                throw new Error (`Points possible: ${ag.assignments[i].points_possible} should be a number`)
            } 
            if (ag.assignments[i].points_possible <= 0) {
                throw new Error (`Points possible: ${ag.assignments[i].points_possible} cannot be less than or equal to 0 `)
            }
        } catch (err) {
            console.info(err);
        }
    }
}
//commented these out because these just create new objects that pair assignment id and score
//   function getAssignmentIdAndScore(sub) {
//     let result = {};
//     for (let i =0; i < sub.length; i++){
//         if (!(result[sub[i].assignment_id])) {
//             result[sub[i].assignment_id] = [sub[i].submission.score];
//         } else {
//             result[sub[i].assignment_id].push(sub[i].submission.score);
//         }
//     }
//     return result;
//   }

//   function getAssignmentIdAndPoints(ag){
//     const result = {}; 
//     for (let i = 0; i < ag.assignments.length; i++){
//         let assignment = ag.assignments[i];
//         if (!(result[assignment.id])) {
//             result[assignment.id] = [assignment.points_possible];
//         } else {
//             result[assignment.id].push(assignment.points_possible);
//         }
//     }
//     return result;
//   }


  function percentDeduction(totalAmount, percent) {
    return totalAmount/ percent;
  }

  const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
  console.log(result);
  



//    const result = [
//       {
//         id: 125,        
//         avg: 0.985, // (47 + 150) / (50 + 150)
//         1: 0.94, // 47 / 50
//         2: 1.0 // 150 / 150
//       },
//       {
//         id: 132,
//         avg: 0.82, // (39 + 140) / (50 + 150)
//         1: 0.78, // 39 / 50
//         2: 0.833 // late: (140 - 15) / 150
//       }
//     ];

// COPYRIGHTS @Ray2024: PLEASE DO NOT COPY MY CODE!!!!!!!!!!!!!!!!!!!!!!!!!I am trying to preserve my spot in the program...