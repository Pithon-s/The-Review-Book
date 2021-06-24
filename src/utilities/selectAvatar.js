export default selectAvatar = () => {
  const avatars = [
    "https://firebasestorage.googleapis.com/v0/b/the-review-book-f2959.appspot.com/o/assets%2Ffruit1.png?alt=media&token=0b532fcf-3224-46b1-ba7e-15568bbf5ce5",
    "https://firebasestorage.googleapis.com/v0/b/the-review-book-f2959.appspot.com/o/assets%2Ffruit2.png?alt=media&token=7c085bd5-40c6-48a2-892c-cc31be8bbb93",
    "https://firebasestorage.googleapis.com/v0/b/the-review-book-f2959.appspot.com/o/assets%2Ffruit3.png?alt=media&token=e2868722-b490-4ab1-a8d8-d602ebb38b09",
    "https://firebasestorage.googleapis.com/v0/b/the-review-book-f2959.appspot.com/o/assets%2Ffruit4.png?alt=media&token=59e17439-a51e-4ec4-8c98-f6b70cf6ee02",
    "https://firebasestorage.googleapis.com/v0/b/the-review-book-f2959.appspot.com/o/assets%2Ffruit5.png?alt=media&token=81a530ae-d77d-47ba-b25e-7e9567ae2e9c",
    "https://firebasestorage.googleapis.com/v0/b/the-review-book-f2959.appspot.com/o/assets%2Ffruit6.png?alt=media&token=d8d3a4c0-772a-4f6a-a13d-61ed007fcdc0",
  ];

  return avatars[Math.floor(Math.random() * avatars.length)];
};
