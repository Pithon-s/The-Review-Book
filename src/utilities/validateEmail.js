export default validateEmail = (email) => {
  // var re =
  //   /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  // if (re.test(email)) {
  //   if (
  //     email.indexOf(
  //       "@cuilahore.edu.pk",
  //       email.length - "@cuilahore.edu.pk".length
  //     ) !== -1
  //   ) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  if (
    email.substring(email.lastIndexOf("@")).toLowerCase() == "@cuilahore.edu.pk"
  )
    return true;

  return false;
};
