const { welcome, goodbye, tell } = require("../utils/fortune-teller");

const question = "Will I ace my job interview?"

function getFortune(question) {
  errorStatement = "There was an error: A question is required...";
  const tellPromise = tell(question);
  return tellPromise //returning here rather than at the bottom is key.
  // .then returns value from promise() function.
  .then((fortune) => {
    return ["Your question was: " + question, "Your fortune is: " + fortune]
  })
  .catch(() => {
    return errorStatement;
  })
} 


function fullSession(question) {
  //create a variable array.
  const returnArray = [];
  
   return welcome()
    // returns resolve value from welcome().
    .then((response) => {
      // pushes resolve value from welcome() to array.
      returnArray.push(response);
    })
    // calls tell() promise resolve value
    .then(() => tell(question)
        // creates a nested .then() 
        .then((response) => {
          returnArray.push(`Your question was: ${question}`);
          returnArray.push(`Your fortune is: ${response}`);
        })
    )
    .catch((response) => {
        returnArray.push("There was an error: " + response);
    })
    .then(() => goodbye()
        .then((response) => {
            returnArray.push(response);
        })
    )
    .then(() => {
        return returnArray;
   })

}
module.exports = { getFortune, fullSession };

