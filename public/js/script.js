(() => {
  "use strict";

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll(".needs-validation");

  // Loop over them and prevent submission
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false
    );
  });
})();

// ratings script

// To access the stars
let stars = document.getElementsByClassName("star");
let output = document.getElementById("output");
let ratingInp = document.getElementById("ratingInp");

// Funtion to update rating
// function rating(n) {
//   remove();
//   n = Number(n); // Convert to a number
//   if (n === NaN) {
//     n = 1; // Set to 0 if it's not a number
//     ratingInp.value = n;
//   } else {
//     for (let i = 0; i < n; i++) {
//       if (n == 1) cls = "one";
//       else if (n == 2) cls = "two";
//       else if (n == 3) cls = "three";
//       else if (n == 4) cls = "four";
//       else if (n == 5) cls = "five";
//       stars[i].className = "star " + cls;

//       ratingInp.value = n;
//     }
//   }

//   // n is the rating in number
// }
function rating(n) {
  remove();
  for (let i = 0; i < n; i++) {
    if (n == 1) cls = "one";
    else if (n == 2) cls = "two";
    else if (n == 3) cls = "three";
    else if (n == 4) cls = "four";
    else if (n == 5) cls = "five";
    stars[i].className = "star " + cls;
  }
  ratingInp.value = n;
}

// To remove the pre-applied styling
function remove() {
  let i = 0;
  while (i < 5) {
    stars[i].className = "star";
    i++;
  }
}
