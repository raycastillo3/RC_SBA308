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
    for (let i = 0; i < submissions.length; i++){
        console.log(submissions[i].submission.score);
    }
    return result;
  }
  
  function percentDeduction(totalAmount, percent){
    return totalAmount/ percent;
  }

//   function getAvg () {

//   }
  const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
  
  console.log(result);
  

   // const result = [
    //   {
    //     id: 125,
    //     avg: 0.985, // (47 + 150) / (50 + 150)
    //     1: 0.94, // 47 / 50
    //     2: 1.0 // 150 / 150
    //   },
    //   {
    //     id: 132,
    //     avg: 0.82, // (39 + 125) / (50 + 150)
    //     1: 0.78, // 39 / 50
    //     2: 0.833 // late: (140 - 15) / 150
    //   }
    // ];



// COPYRIGHTS @Ray2024: PLEASE DO NOT COPY MY CODE!!!!!!!!!!!!!!!!!!!!!!!!!I am trying to preserve my spot in the program...