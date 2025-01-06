//Task Order:
//1. Determine all inputs in form, all clickable buttons and fields
//2. Create Dom listener for form submission, member changes, etc
//3. Create validation for age & relationship
//4. Create household list
//5. Update list, Remove From List
//6. Reset form
//6. Json parser, update array


var householdArray = [];
var form = document.querySelector("form");
var addBtn = document.getElementsByClassName("add")[0];
var householdList = document.querySelector(".household");
var formDebug = document.querySelector(".debug");

form.addEventListener("submit", function (event) {
    event.preventDefault();
    showDebug();
});

    addBtn.addEventListener("click", function (event) {
    event.preventDefault();
    addMember();
});

    function addMember() {
    var ageInput = document.getElementById('age').value;
    var age = parseInt(ageInput, 10);
    var relationshipSelect = document.getElementById('rel');
    var smokerCheckbox = document.getElementById('smoker');
    var relationship = relationshipSelect.value;
    var relationshipText = relationshipSelect.options[relationshipSelect.selectedIndex].text;
    var smoker = smokerCheckbox.checked;

    if (!validateAge(age)) {
        alert("Age must be greater than 0 and contain only numbers.");
        return;
    }

    if (!validateRelationship(relationship)) {
        alert("Please select a relationship.");
        return;
    }

    var member = {
        age,
        relationship,
        relationshipText,
        smoker,
    };

    householdArray.push(member);
    updateHouseholdList();
    form.reset();
}


function updateHouseholdList() {
    householdList.innerHTML = "";

    householdArray.forEach(function (person, index) {
        var listItem = document.createElement("li");
        listItem.className = "box";

        var container = document.createElement("div");
        container.className = "container";

        var householdDiv = document.createElement("div");
        householdDiv.className = "household-div";

        var ageInfo = document.createElement("p");
        ageInfo.innerHTML = `<h1>Household Member: ${person.relationshipText}</h1>`;

        var householdInfo = document.createElement("p");
        var smokerBool = person.smoker ? "Yes" : "No";
        householdInfo.innerHTML = `<h3>Age:</h3> ${person.age} <h3>Smoker:</h3> ${smokerBool}`;

        var removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.className = "button";

        householdDiv.appendChild(ageInfo);
        householdDiv.appendChild(householdInfo);

        householdDiv.appendChild(removeButton);

        removeButton.addEventListener("click", function () {
            removeMember(index);
        });

        container.appendChild(householdDiv);

        listItem.appendChild(container);

        householdList.appendChild(listItem);
    });
}

function validateAge(age) {
    var ageRegex = /^[1-9][0-9]*$/;
    return ageRegex.test(age);
}

function validateRelationship(relationship) {
    return relationship !== "";
}
function removeMember(index) {
    householdArray.splice(index, 1);
    updateHouseholdList();
}

function showDebug() {
    formDebug.textContent = JSON.stringify(householdArray, null, 2);
    formDebug.style.display = "inline-block";
}
