//testimonial

var testSubmitBtn = document.getElementById("testSubmitBtn");
var testFrm = document.getElementById("testFrm");
var testLoadingDiv = document.getElementById("testLoadingDiv");

testSubmitBtn.addEventListener("click", async function () {
  // Make the loader div visible
  testLoadingDiv.classList.remove("loader-removed");
  // Hide the form from the user
  testFrm.classList.add("loader-removed");
  await ontestsubmit();
  testFrm.reset();
  testLoadingDiv.classList.add("loader-removed");
  testFrm.classList.remove("loader-removed");
  await ontestload()

});

async function ontestload() {
  var response = await fetch("http://localhost:3000/testimonials");
  var result = await response.json();

  var testList = document.getElementById("test-list")
  testList.innerHTML = "";

  for (var i = 0; i < result.length; i++) {
    var lielement = document.createElement("li");
    lielement.className = "list-group-item";
    lielement.innerHTML =
    "<span class='text-dark'>" +  result[i].test + "<br><span class='badge badge-success'>" + result[i].name + ", Age - " + result[i].age + ", " + result[i].time + "</br>";
    testList.appendChild(lielement);
  }

}
ontestload();

async function ontestsubmit() {
  
  await fetch("http://localhost:3000/testimonials", {
    method: "post",
    body: JSON.stringify({
      name: document.getElementById("username").value,
      age: document.getElementById("age").value,
      test: document.getElementById("usertesti").value
    }),
    headers: {
      "content-type": "application/json"
    }
  });
}