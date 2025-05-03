module.exports = async function (context, req) {
  context.log('JavaScript HTTP trigger function processed a request.');
  
  // Example logic: return a static message or handle database requests
  const responseMessage = "Hello from getTasks function!";
  
  context.res = {
    status: 200,
    body: responseMessage
  };
};
