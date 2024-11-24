let baseUrl='http://127.0.0.1:8000/'
fetch(`${baseUrl}adminDetail`).then(response=>{
    if(!response.ok){
        throw new Error ('Encountered Some Problem')
    }
    return response.json()
}).then(data=>{
    //all student detail
    let allStudentDetail = data.allStudentData;
    console.log(allStudentDetail.length);
    for (let i = 0;i<allStudentDetail.length;i++){
        allStudentDetail[i].Name = allStudentDetail[i].First_Name+" "+allStudentDetail[i].Last_Name; 
    }
    console.log(allStudentDetail);
    let allStudentTable = document.getElementById('allStudentTable');
    let allStudentDetailNames = ['University ID','Name','Branch','Semester','Year','Section','Phone Number','Email','Department'];
    let givenallStudentDetailNames = ['University_ID','Name','Branch','Semester','Year','Section','Phone_Number','Email','Department_Name'];
    let allStudentTableHeader = allStudentTable.createTHead().insertRow();
    let space = document.getElementById('tableSpace').offsetWidth;
    let size =  allStudentDetailNames.length;
    let Studentwidth = space/size;
    allStudentDetailNames.forEach(header=>{
        let th = document.createElement('th');
        th.textContent = header;
        th.style.border = '2px solid black';
        th.style.width = `${Studentwidth}px`;
        th.style.textAlign = 'center';
        th.style.padding = '5px';
        allStudentTableHeader.appendChild(th);
    })
    let assStudentTableBody = document.createElement('tbody');
    allStudentDetail.forEach(data=>{
        let row = assStudentTableBody.insertRow();
        givenallStudentDetailNames.forEach(head=>{
            let cell = row.insertCell();
            cell.textContent = data[head];
            cell.style.border = '2px solid black';
            cell.style.width = `${Studentwidth}px`;
            cell.style.padding = '5px';
            cell.style.textAlign = 'center';
        })
        row.addEventListener('mouseover',()=>{
            row.style.backgroundColor = 'rgb(48, 96, 120)';
            row.style.color = 'white';
            row.style.cursor = 'pointer';
        })
        row.addEventListener('mouseout',()=>{
            row.style.backgroundColor = '';
            row.style.color = 'black';
        })
        row.addEventListener('click',()=>{
            displayDetail(row);
        })
    })
    allStudentTable.appendChild(assStudentTableBody)

    console.log('hi');
    insertButton.addEventListener('click',()=>{
        console.log(insertButton);
        insertData();
    })

})
.catch(error=>{
    console.log("Error: ",error);
})

function getCSRFToken() {
    const csrfCookie = document.cookie.split(';').find(cookie => cookie.trim().startsWith('csrftoken='));
    if (csrfCookie) {
        return csrfCookie.split('=')[1];
    }
    return null;  // Return null or handle the case where the CSRF token is not found
}

function displayDetail(row){
    document.getElementById('modalProfile').innerHTML = '';
    document.getElementById('modalDept').innerHTML = '';
    document.getElementById('modalCourses').innerHTML = '';
    document.getElementById('modalMarks').innerHTML = '';
    document.getElementById('modalFee').innerHTML = '';
    let uid = row.cells[0].textContent;
    console.log(uid);
    fetch(`${baseUrl}getStudentDetail`,{
        method: "POST",
        headers: {'Content-Type': 'application/json',
                  'X-CSRFToken': getCSRFToken(),
                },
        body: JSON.stringify({'universityID':uid}),
    }).then(response=>{
        if (!response.ok){
            throw new Error ('Unable to fetch getStudentDetail');
        }
        return response.json()
    }).then(data=>{
        let Studentdata = data.Studentdata;
        for (let i = 0;i<Studentdata.length;i++){
            Studentdata[i].Name = Studentdata[i].First_Name+" "+Studentdata[i].Last_Name; 
        }
        console.log(Studentdata)
        $('#DetailModal').modal('show');
        document.getElementById('DetailodalLabel').textContent = 'Detail';
        let ProfileHead = document.getElementById('ProfileHead');
        ProfileHead.textContent = 'Profile';
        let modalProfile = document.getElementById('modalProfile');
        let modalProfileName = ['University ID','First Name','Last Name','Branch','Semester','Year','Phone Number','Email']
        let givenmodalProfileName = ['University_ID','First_Name','Last_Name','Branch','Semester','Year','Phone_Number','Email']
        modalProfileName.forEach((name,index)=>{
            let attr = givenmodalProfileName[index];
            console.log(Studentdata[0][attr])
            let label = document.createElement('label')
            label.setAttribute('for',`${name}`);
            label.textContent = name + " : ";
            let input = document.createElement('input');
            input.setAttribute('type','text');
            input.setAttribute('id',`${name}`);
            input.setAttribute('name',`${name}`);
            input.setAttribute('readonly','true');
            input.style.borderWidth = '0px';
            input.addEventListener('dblclick',()=>{
                if (input.id!='University ID'){
                    input.readOnly = false;
                }
            })
            let newline = document.createElement('br');
            input.value = Studentdata[0][attr];
            modalProfile.appendChild(label);
            modalProfile.appendChild(input);
            modalProfile.appendChild(newline);
        })

        let DeptHead = document.getElementById('DeptHead');
        DeptHead.textContent = 'Department';
        let modalDept = document.getElementById('modalDept');
        let modalDeptName = ['Department ID','Department Name'];
        let givenmodalDeptName = ['Department_ID','Department_Name'];
        modalDeptName.forEach((name,index)=>{
            let attr = givenmodalDeptName[index];
            console.log(Studentdata[0][attr])
            let label = document.createElement('label')
            label.setAttribute('for',`${name}`);
            label.textContent = name + " : ";
            let input = document.createElement('input');
            input.setAttribute('type','text');
            input.setAttribute('id',`${name}`);
            input.setAttribute('name',`${name}`);
            input.setAttribute('readonly','true');
            input.style.borderWidth = '0px';
            input.addEventListener('dblclick',()=>{
                if (input.id!='Department Name'){
                    input.readOnly = false;
                }
            })
            let newline = document.createElement('br');
            input.value = Studentdata[0][attr];
            modalDept.appendChild(label);
            modalDept.appendChild(input);
            modalDept.appendChild(newline);
        })


        let courseHead = document.getElementById('courseHead');
        courseHead.textContent = 'Courses';
        let modalCourses = document.getElementById('modalCourses');
        let modalCoursesName = ['Course ID','Course Name'];
        let givenmodalCoursesName = ['Course_ID','Course_Name'];
        let modalCoursesHeader = modalCourses.createTHead().insertRow();
        modalCoursesName.forEach((name)=>{
            let th = document.createElement('th');
            th.textContent = name;
            th.style.border = '2px solid black';
            th.style.textAlign = 'center';
            th.style.padding = '5px';
            modalCoursesHeader.appendChild(th);
        })
        let modalCoursesTbody = document.createElement('tbody');
        Studentdata.forEach(data=>{
            let row = modalCoursesTbody.insertRow();
            givenmodalCoursesName.forEach(head=>{
                let cell = row.insertCell();
                cell.textContent = data[head];
                cell.style.border = '2px solid black';
                cell.style.padding = '5px';
                cell.style.textAlign = 'center';
            })
        })
        modalCourses.appendChild(modalCoursesTbody);


        let marksHead = document.getElementById('marksHead');
        marksHead.textContent = 'Exam Result';
        let modalMarks = document.getElementById('modalMarks');
        let modalMarksName = ['Course ID','Course Name','Obtained Marks'];
        let givenmodalMarksName = ['Course_ID','Course_Name','Marks'];
        let modalMarksHeader = modalMarks.createTHead().insertRow();
        modalMarksName.forEach((name)=>{
            let th = document.createElement('th');
            th.textContent = name;
            th.style.border = '2px solid black';
            th.style.textAlign = 'center';
            th.style.padding = '5px';
            modalMarksHeader.appendChild(th);
        })
        let modalMarksTbody = document.createElement('tbody');
        Studentdata.forEach(data=>{
            let row = modalMarksTbody.insertRow();
            givenmodalMarksName.forEach(head=>{
                let cell = row.insertCell();
                cell.textContent = data[head];
                cell.style.border = '2px solid black';
                cell.style.padding = '5px';
                cell.style.textAlign = 'center';
                cell.addEventListener('dblclick',()=>{
                    if (cell.cellIndex===2){
                        cell.contentEditable = true;
                    }
                })
            })
        })
        modalMarks.appendChild(modalMarksTbody);

        let feeHead = document.getElementById('feeHead');
        feeHead.textContent = 'Fee payment'
        let modalFee = document.getElementById('modalFee');
        let modalFeeName = ['Amount','Payment Status'];
        let givenmodalFeeName = ['Amount','Payment_Status'];
        modalFeeName.forEach((name,index)=>{
            let attr = givenmodalFeeName[index];
            console.log(Studentdata[0][attr])
            let label = document.createElement('label')
            label.setAttribute('for',`${name}`);
            label.textContent = name + " : ";
            let input = document.createElement('input');
            input.setAttribute('type','text');
            input.setAttribute('id',`${name}`);
            input.setAttribute('name',`${name}`);
            input.setAttribute('readonly','true');
            input.style.borderWidth = '0px';
            input.addEventListener('dblclick',()=>{
                input.readOnly = false;
            })
            let newline = document.createElement('br');
            input.value = Studentdata[0][attr];
            modalFee.appendChild(label);
            modalFee.appendChild(input);
            modalFee.appendChild(newline);
        })
        let test = new FormData(document.getElementById('modalProfile'));
        console.log(test)
        let testresult = {};
        test.forEach((value,key)=>{
            key = key.replace(/ /g,'_');
            testresult[key]=value;
        })
        console.log(testresult)
        console.log(modalMarks)

        let updateButton = document.getElementById('updateButton');
        updateButton.addEventListener('click',()=>{
            let markstableToJson = tableToJson(modalMarks,givenmodalMarksName)
            let coursesTableToJson = tableToJson(modalCourses,givenmodalCoursesName)
            let profileFormToJson = formToJson(modalProfile)
            let deptFormToJson = formToJson(modalDept)
            let feeFormToJson = formToJson(modalFee)
            let dataToBeSent = {uid:uid,marks:markstableToJson,course:coursesTableToJson,profile:profileFormToJson,dept:deptFormToJson,fee:feeFormToJson}
            update(dataToBeSent);
        })
        let deleteButton = document.getElementById('deleteButton');
        let insertButton = document.getElementById('insertButton');
        deleteButton.addEventListener('click',()=>{
            deleteData(uid);
        })
    })

}

function tableToJson(table,headersName){
    let headers = headersName;
    console.log(headers)
    let jsonData = Array.from(table.rows).slice(1).map(row=>{
        return Array.from(row.cells).reduce((acc,cell,index)=>{
            acc[headers[index]] = cell.textContent.trim();
            return acc;
        },{})
    });
    return jsonData;
}

function formToJson(form){
    let newFormObject = new FormData(form);
    let jsonData = {};
    newFormObject.forEach((value,key)=>{
        key = key.replace(/ /g,'_');
        jsonData[key] = value;
    })
    return jsonData;
}
function update(dataToBeSent){
    fetch(`${baseUrl}updateStudent`,{
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCSRFToken(),
        },
        body: JSON.stringify(dataToBeSent),
    }).then(response=>{
        if (!response.ok){
            throw new Error ('Some problem in updating') 
        }
        return response.json()
    }).then(data=>{
        alert(data.message);
        setTimeout(() => {
            window.location.reload();
        },2000);
    })
}


function deleteData(uid){
    fetch(`${baseUrl}deleteStudentTuple`,{
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCSRFToken(),
        },
        body: JSON.stringify({universityID:uid}),
    }).then(response=>{
        if (!response.ok){
            throw new Error ('Deletion Problem')
        }
        return response.json()
    }).then(data=>{
        alert(data.message);
        setTimeout(() => {
            window.location.reload();
        },1000);
    })
}

function insertData(){
    document.getElementById('modalProfileInsert').innerHTML = '';
    document.getElementById('modalDeptInsert').innerHTML = '';
    document.getElementById('modalCoursesInsert').innerHTML = '';
    document.getElementById('modalMarksInsert').innerHTML = '';
    document.getElementById('modalFeeInsert').innerHTML = '';
    $('#insertModal').modal('show');
    document.getElementById('ProfileHeadInsert').textContent = 'Profile';
    let insertProfileForm = document.getElementById('modalProfileInsert');
    let Profiledata = ['University ID','First Name','Last Name','Phone Number','Email','Semester','Year','Section','Branch']
    Profiledata.forEach(item=>{
        let label = document.createElement('label')
        label.setAttribute('for',`${item}`);
        label.textContent = item + " : ";
        let input = document.createElement('input');
        input.setAttribute('type','text');
        input.setAttribute('id',`${item}`);
        input.setAttribute('name',`${item}`);
        let br = document.createElement('br');
        insertProfileForm.appendChild(label);
        insertProfileForm.appendChild(input);
        insertProfileForm.appendChild(br);
    })
    document.getElementById('DeptHeadInsert').textContent = 'Department';
    let insertDeptForm = document.getElementById('modalDeptInsert');
    let Deptdata = ['Department ID','Department Name']
    Deptdata.forEach(item=>{
        let label = document.createElement('label')
        label.setAttribute('for',`${item}`);
        label.textContent = item + " : ";
        let input = document.createElement('input');
        input.setAttribute('type','text');
        input.setAttribute('id',`${item}`);
        input.setAttribute('name',`${item}`);
        let br = document.createElement('br');
        insertDeptForm.appendChild(label);
        insertDeptForm.appendChild(input);
        insertDeptForm.appendChild(br);
    })
    let saveButton = document.getElementById('saveButton');
    saveButton.addEventListener('click',()=>{
        let ProfilejsonData = formToJson(insertProfileForm,Profiledata)
        console.log(ProfilejsonData)
        let DeptjsonData = formToJson(insertDeptForm,Deptdata)
        console.log(DeptjsonData)
        ProfilejsonData['Department_ID'] = DeptjsonData['Department_ID']
        console.log(ProfilejsonData);
        insertTuple(ProfilejsonData);
    })
}

function insertTuple(ProfilejsonData){
    fetch(`${baseUrl}insertStudentTuple`,{
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCSRFToken(),
        },
        body: JSON.stringify({data:ProfilejsonData})
    }).then(response=>{
        if(!response.ok){
            throw new Error ('Unable to insert');
        }
        return response.json();
    }).then(data=>{
        alert(data.message);
        setTimeout(()=>{
            window.location.reload();
        },1000)
    })
}