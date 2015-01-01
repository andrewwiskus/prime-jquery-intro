$(document).ready(function() {
    var array = [];
    var employeeArray = [];
    var deletedEmployees = [];
    var yearlyTotalSalary = 0;
    var monthlyTotalSalary = 0;
    var amountDeleted = 0;
    //submit form
    $('#employeeinfo').on('submit', function(event) {
      event.preventDefault();

      // initialize a new variable as an empty object
      var values = {};
      var canSubmit = true;
      // convert the form inputs into an array
      var fields = $('#employeeinfo').serializeArray();

      // iterate over the array and transfer each index into a new property on an object with the value of what was entered.
      fields.forEach(function(element, index, array) {
        // review index notation vs. dot notation on objects
        // here, dot notation wouldn't work
        values[element.name] = element.value;
      });


      //check for empty entry
      if(checkForEmptyEntry(values) === false){
        return false;
      }
      //check for NaN entry
      if (checkForNaN(values) === false) {
        return false;
      }
      // clear out inputs
      $('#employeeinfo').find('input[type=text]').val('');

      // append to DOM
      appendDom(values);
    });

    //deletes salary
    $("#container").on("click","#delete",
        function(){
            $(this).parent().remove();
            yearlyTotalSalary -= $(this).data("salary");
            monthlyTotalSalary = yearlyTotalSalary / 12;
            $('#totalSalary').text(yearlyTotalSalary);
            $('#monthlySalary').text(monthlyTotalSalary);
            deletedEmployees[deletedEmployees.length] = $(this).data("empid");
            console.log(this);
            //TODO:
            //there is a bug where if you enter a deleted employees number it screws everything up
            //am I okay with that? no.
            //its so messy.. i want to clean everything up

            amountDeleted = 0;
            deletedEmployees.forEach(function(id, i){
              employeeArray.forEach(function(emp, i){
                if (id == emp.IDNumber){
                  amountDeleted += emp.yearlySalary;
                  console.log("DELETED:",emp.yearlySalary);
                }
              });

            });

            console.log("TOTAL DELETED:",amountDeleted);
      });

    function recordEmployees(empInfo) {
          employeeArray[employeeArray.length] = empInfo;


          // employeeArray.forEach(function(emp, i){
          //   var str = "";
          //   if (i === 0) { str = str + "Current Employees Recorded: \n"; }
          //   str = str + "ID# " + emp.IDNumber + ": " + emp.employeefirstname + " " + emp.employeelastname + "\nSalary: $" + emp.yearlySalary + ".00";
          //   console.log(str);
          // });

      }

    function updateSalary(empArray){
        var allSalaries = [];
        var totalSalaries = 0.0;
        var amountDeleted = 0;
        empArray.forEach(function(employee,i){
          allSalaries[allSalaries.length] = parseFloat(employee.yearlySalary);
        });
        allSalaries.forEach(function(salary,i){
          totalSalaries += salary;
        });

        //console.log("TOTAL:",totalSalaries);
        yearlyTotalSalary = totalSalaries;
        monthlyTotalSalary = totalSalaries / 12.0;
        yearlyTotalSalary = Math.round(yearlyTotalSalary);
        monthlyTotalSalary = Math.round(monthlyTotalSalary);
      }

      //I cant find a way to clear only one form,
      //seems mean to make them type their name id etc if only one mistake occured.
      //so, I let them keep their info intact.
      //TODO:i could make a dynamic alert message to include allll the errors rather than the first one in the logic that get triggered.

    function checkForNaN(values){
      values.IDNumber = parseInt(values.IDNumber);
      values.yearlySalary = parseInt(values.yearlySalary);
      var dontReturn = true;
      if (isNaN(values.IDNumber)){
        console.log("wrong");
        //$('#employeeinfo').find('input[type=text]').val('');

        alert("You can only enter numbers to enter your Employee ID,\n\nPlease refrain from using #'s and $'s as well.");
        return false;

      } else if (isNaN(values.yearlySalary)){
        console.log("wrong");
        //$('#employeeinfo').find('input[type=text]').val('');

        alert("You can only enter numbers to enter your Salary,\n\nPlease refrain from using #'s and $'s as well.");
        return false;

      }

    }
    function checkForEmptyEntry(values){
      if (values.IDNumber === ""){
        console.log("empty ID");
        alert("Please enter your IDNumber");
        return false;
      } if (values.yearlySalary === ""){
        console.log("empty Salary");
        alert("Please enter your salary");
        return false;
      }
      if (values.employeelastname === ""){
        console.log("empty LastName");
        alert("Please enter your last name");
        return false;
      }
      if (values.employeefirstname === ""){
        console.log("empty FirstName");
        alert("Please enter your first name");
        return false;
      }
    }

    function appendDom(empInfo) {
      recordEmployees(empInfo);
      updateSalary(employeeArray);
      $('#container').append('<div class="person"></div>');
      var $el = $('#container').children().last();
      yearlyTotalSalary -= amountDeleted;
      $('#totalSalary').text(yearlyTotalSalary);
      $('#monthlySalary').text(monthlyTotalSalary);


      empInfo.yearlySalary = Math.round(empInfo.yearlySalary);
      $el.append('<p>' + "Employee: " + empInfo.employeefirstname + ' ' + empInfo.employeelastname + '</p>');
      $el.append('<p>' + "ID#: " + empInfo.IDNumber + "</p></p>" + "Salary:" + " $" + empInfo.yearlySalary + ".00" + '</p>');
      $el.append('<button id="delete" data-empid=' + empInfo.IDNumber + " data-salary=" + empInfo.yearlySalary + ' >REMOVE EMPLOYEE</button>');



    }




});
