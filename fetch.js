const API_URL = "http://localhost:3001/student";

//show the  student form
function showForm() {
    resetForm(); 
    document.getElementById("studentForm").classList.remove("d-none");
}

// function to save the student data
function saveStudent() {
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let age = document.getElementById("age").value;
    let gender = document.getElementById("gender").value;
    let mobile = document.getElementById("mobile").value;
    let location = document.getElementById("location").value;
    let bgp = document.getElementById("bgp").value;
    let studentId = document.getElementById("studentId").value;

    // check if all fields are filled
    if (!name || !email || !age || !mobile || !location || !gender || !bgp ) {
        alert("Please fill all fields");
        return;
    }
    //creat student objest 
    let student = { name, email, age, mobile, location, gender, bgp};

    // creating new student
    if (!studentId) {
        fetch("http://localhost:3001/student",{
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(student)
        })
        .then(response => response.json())
        .then(() => {
            resetForm();
            loadStudents();
        })
        .catch(error => console.error("Error adding student:", error));
    } else {
        fetch(`${"http://localhost:3001/student"}/${studentId}`,{
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(student) 
        })
        .then(response => response.json())
        .then(() => {
            resetForm();
            loadStudents();
        })
        .catch(error => console.error("Error updating student:", error));
    }
}

// function to load all students displaying in the table 
function loadStudents() {
    fetch("http://localhost:3001/student")
        .then(res => res.json())
        .then(data => {
            let tableBody = document.getElementById("table-body");
            tableBody.innerHTML = "";
            data.forEach(student => {
                tableBody.innerHTML += `
                    <tr id="row-${student.id}">
                        <td>${student.name}</td>
                        <td>${student.email}</td>
                        <td>${student.age}</td>
                        <td>${student.gender}</td>
                        <td>${student.mobile}</td>
                        <td>${student.location}</td>
                        <td>${student.bgp}</td>
                        <td>
                            <button class="btn btn-info btn-sm" onclick="editStudent('${student.id}')">Edit<ion-icon name="pencil-outline"></ion-icon> </button>
                            <button class="btn btn-danger btn-sm" onclick="deleteStudent('${student.id}')">Del<ion-icon name="trash-outline"></ion-icon> </button>
                        </td>
                    </tr>
                `;
            });
        })
        .catch(error => console.error("Error loading students:", error));
}

// function to edit the student data
function editStudent(id) {
    fetch(`http://localhost:3001/student/${id}`)
        .then(response => response.json())
        .then(student => {
            document.getElementById("name").value = student.name;
            document.getElementById("email").value = student.email;
            document.getElementById("age").value = student.age;
            document.getElementById("gender").value = student.gender;
            document.getElementById("mobile").value = student.mobile;
            document.getElementById("location").value = student.location;
            document.getElementById("bgp").value = student.bgp;
            document.getElementById("studentId").value = student.id;
            document.getElementById("studentForm").classList.remove("d-none");
        })
        .catch(error => console.error("Error fetching student data:", error));
}

// function to delete the student data
function deleteStudent(id) {
    if (!confirm("Are you sure you want to delete this student?")) return; // confirm message before deleting
    fetch(`${API_URL}/${id}`, { method: "DELETE" })
        .then(() => {
            const row = document.getElementById(`row-${id}`);
           if (row) row.remove(); // deleteing the student row in the table 
        })
        .catch(error => console.error("Error deleting student:", error));
}

// function to reset the form
function resetForm() {
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("age").value = "";
    document.getElementById("gender").value = "";
    document.getElementById("mobile").value = "";
    document.getElementById("location").value = "";
    document.getElementById("bgp").value = "";
    document.getElementById("studentId").value = "";
    document.getElementById("studentForm").classList.add("d-none");
}