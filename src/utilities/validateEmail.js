export default validateEmail = (email) => {
  if (
    email.substring(email.lastIndexOf("@")).toLowerCase() ===
    "@cuilahore.edu.pk"
  )
    return true;

  return false;
};
