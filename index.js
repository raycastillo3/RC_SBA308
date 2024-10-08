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
        submitted_at: "2023-02-12",
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
    // try {
    //     if (course.id !== ag.id) {
    //         throw new Error("Course Id not matching")
    //     }
    // } catch (err) {
    //     console.info(err);      
    // }
    // for (let i = 0; i < ag.assignments.length; i++){
    //     try {
    //         if (typeof ag.assignments[i].points_possible !== "number"){
    //             throw new Error (`Points possible: ${ag.assignments[i].points_possible} should be a number`)
    //         } 
    //         if (ag.assignments[i].points_possible <= 0) {
    //             throw new Error (`Points possible: ${ag.assignments[i].points_possible} cannot be less than or equal to 0 `)
    //         }
    //     } catch (err) {
    //         console.info(err);
    //     }
    // }
    
    for (let i = 0; i < ag.assignments.length; i++) {
        if (submissions[i].submission.submitted_at > ag.assignments[i].due_at) {
            let points_possible_to_deduct = ag.assignments[i].points_possible;
            let percent_Amount = 10;
            ag.assignments[i].points_possible -= percentDeduction(points_possible_to_deduct, percent_Amount); 
        }
    }

    // calculate avg
    const uniqueSubmissionsIds = new Set();
    for (let obj of submissions){
       if (!(uniqueSubmissionsIds.has(obj.learner_id))){
        uniqueSubmissionsIds.add(obj.learner_id)
       } else {
        continue;
       }
    }
    let sumsOfSubmissions = [];
    let temp = 0;
    for (let id of uniqueSubmissionsIds) {
        temp = getSumOfSubmissions(submissions, id);      
        sumsOfSubmissions.push(temp)
    }

    const uniqueAssignmentsGroupIds = new Set();
    for (let obj of ag.assignments){
        uniqueAssignmentsGroupIds.add(obj.id);
    }
    let sumsOfAssignmetGroups = [];
    let tempAg = 0;
    for (let id of uniqueAssignmentsGroupIds) {
        tempAg = getSumOfAssignmets(ag.assignments, id); 
        sumsOfAssignmetGroups.push(tempAg);
    }

    let avgs = [], element1 = 0, element2 = 0;
    console.log(sumsOfSubmissions);
    console.log(sumsOfAssignmetGroups);

    // for (let num of sumsOfSubmissions) {
    //     element1 = sumsOfSubmissions.shift();
    //     element2 = sumsOfAssignmetGroups.shift();
    //     avgs.push(element1 / element2); 
    // }
    // console.log(sumsOfAssignmetGroups);
    // console.log(sumsOfSubmissions);
    // console.log(element1, element2);
   
    // console.log(avgs);

    return result;
  }

  function getSumOfSubmissions (submission, id) {
    let sum = 0;
    for (const obj of submission){
       if (obj.learner_id === id){
        sum += obj.submission.score
       }
    }
    return sum;
  }
//   console.log(getSumOfSubmissions(LearnerSubmissions));

  function getSumOfAssignmets (ag, id) {
    let sum = 0;
    for (let i = 0; i < ag.length; i++){
        if (ag[i].id === id) {
            console.log(ag[i].points_possible);
            sum += ag[i].points_possible;
        }
    }
    return sum;
    
  }

// console.log(getSumOfAssignmets(AssignmentGroup));

  function percentDeduction(totalAmount, percent){
    return totalAmount/ percent;
  }

  const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
  
  console.log(result);
  

//    const result = [
//       {
//         id: 125,        V submissions assignment id | V ag.assignments based on id
//         avg: 0.985, // (47 + 150 + 400) / (50 + 150)
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