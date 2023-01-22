const phoneInputField = document.querySelector("#donor-contact-number");
// const phoneInputField = document.querySelector("#donor-Whatsapp-No");
// const phoneInput = window.intlTelInput(phoneInputField, {});

const formBloodType = document.querySelector(".form--blood-type");
const formPveBtn = document.querySelector(".form--button-positive");
const formNveBtn = document.querySelector(".form--button-negative");
console.log(formPveBtn,formNveBtn)

formNveBtn.addEventListener("click", ()=> {
    formBloodType.setAttribute("value","negative");
    formNveBtn.style.backgroundColor = "#FF0000";
    formNveBtn.style.color="#fff";
    formPveBtn.style.backgroundColor = "#fff";
    formPveBtn.style.color="#746868";
});

formPveBtn.addEventListener("click", ()=> {
    formBloodType.setAttribute("value","positive");
    formPveBtn.style.backgroundColor = "#FF0000";
    formPveBtn.style.color="#fff";
    formNveBtn.style.backgroundColor = "#fff";
    formNveBtn.style.color="#746868";
});
let id = (id) => document.getElementById(id);

let classes = (classes) => document.getElementsByClassName(classes);

let AttenderName = id("student-name"),
  Attenderbloodgroup = id("attender-blood-group"),
  AttenderNumber = id("Attender-Number"),
  PatientName = id("Patient-Name"),
  PatientAge = id("Patient-Age"),
  HospitalName = id("Hospital-Name"),
  City = id("City"),
  Zipcode = id("Zipcode"),
  Unitsofblood = id("Units-of-blood"),
  Date = id("Date"),
  Time = id("Time"),
  form = id("form"),
  errorMsg = classes("error"),
  successIcon = classes("success-icon"),
  failureIcon = classes("failure-icon");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  engine(AttenderName, 0, "Student cannot be blank");
  engine(Attenderbloodgroup, 1, "Attenderbloodgroup cannot be blank");
  engine(AttenderNumber, 2, "AttenderNumber cannot be blank");
  engine(PatientName, 3, "PatientName cannot be blank");
  engine(PatientAge, 4, "PatientAge cannot be blank");
  engine(HospitalName, 5, "HospitalName cannot be blank");
  engine(City, 6, "City cannot be blank");
  engine(Zipcode, 7, "Zipcode cannot be blank");
  engine(Unitsofblood, 8, "Unitsofblood cannot be blank");
  engine(Date, 9, "Date cannot be blank");
  engine(Time, 10, "Time cannot be blank");
});

let engine = (id, serial, message) => {
  if (id.value.trim() === "") {
    errorMsg[serial].innerHTML = message;
    id.style.border = "2px solid red";

    // icons
    failureIcon[serial].style.opacity = "1";
    successIcon[serial].style.opacity = "0";
  } else {
    errorMsg[serial].innerHTML = "";
    id.style.border = "2px solid green";

    // icons
    failureIcon[serial].style.opacity = "0";
    successIcon[serial].style.opacity = "1";
  }
};