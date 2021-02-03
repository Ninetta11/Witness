// function to generate markdown for declaration
function generateMarkdown(data) {
  return ` 
  I, ${data.first_name} ${data.last_name} residing at ${data.street_no} ${data.street}, ${data.suburb} ${data.state} ${data.postcode} 
  and having the occupation of ${data.occupation}, make the following statutory declaration under the Oaths and Affirmations Act 2018:

  1. ${data.content}

  I declare that the contents of this statutory declaration are true and correct and I make it knowing that making a statutory declaration that I know to be untrue is an offence.

  Signature: ${data.signature}

  Declared at ${data.location} on ${data.date}.
`;
}

export default generateMarkdown;
