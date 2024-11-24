let baseUrl = 'http://127.0.0.1:8000/'
fetch(`${baseUrl}studentDetail`).then(response=>{
    if(!response.ok){
        return new Error('Not Done')
    }
    return response.json()
}).then(data=>{
    // profile
    profileData = data.profile;
    console.log(profileData);
    profileData.forEach(profile=>{
        profile.Name = profile.First_Name +" " +profile.Last_Name;
    })
    console.log(profileData);
    profileDataNames = ['ID','Name','Section','Semester','Year','Phone Number','Email'];
    givenProfileDataNames = ['University_ID','Name','Section','Semester','Year','Phone_Number','Email'];
    let profile = document.getElementById('profile');
    console.log(profile);
    profileData.forEach(data=>{
        givenProfileDataNames.forEach((item,index)=>{
            let child = document.createElement('h1');
            child.classList.add('DataContainer');
            child.innerHTML=`<span id=item${index} class="Data"><b>${profileDataNames[index]}: </b></span><span id=value${index} class="Value">${data[item]}</span>`
            profile.appendChild(child);
        })
    })

    // Department
    departmentData = data.department;
    console.log(departmentData);
    departmentDataNames = ['Branch','Department ID','Department Name']
    givenDepartmentDataName = ['Branch','Department_ID','Department_Name']
    let dept = document.getElementById('dept');
    departmentData.forEach(data=>{
        givenDepartmentDataName.forEach((item,index)=>{
            let child = document.createElement('h1');
            child.classList.add('DataContainer');
            child.innerHTML = `<span id=item${index} class="Data"><b>${departmentDataNames[index]}: </b></span><span id=value${index} class="Value">${data[item]}</span>`
            dept.appendChild(child);
        })
    })

    //course
    courseData = data.course;
    let course_headers = Object.keys(courseData[0])
    console.log(courseData);
    courseDataName = ['Course ID','Course Name'];
    let courseTable = document.getElementById('courseTable');
    let headerRow = courseTable.createTHead().insertRow();
    let divWidth = document.getElementById('course').offsetWidth;
    courseDataName.forEach((name)=>{
        let th = document.createElement('th');
        th.textContent = name;
        th.style.border = '2px solid black';
        th.style.width = `${divWidth/2}px`;
        th.style.textAlign = 'center';
        headerRow.appendChild(th);
    })
    let tbody = document.createElement('tbody');
    courseData.forEach(data=>{
        let row = tbody.insertRow();
        course_headers.forEach(head=>{
            let cell = row.insertCell()
            cell.style.border = '2px solid black';
            cell.style.width = `${divWidth/2}px`;
            cell.style.textAlign = 'center';
            cell.style.color = 'black';
            cell.textContent = data[head]
        })
    })
    courseTable.appendChild(tbody);

    //exam
    examData = data.exam;
    let exam_headers = Object.keys(examData[0]);
    examDataName = ['Course ID','Course Name','Obtained Marks'];
    let examTable = document.getElementById('examTable');
    let ExamheaderRow = examTable.createTHead().insertRow();
    let examDivWidth = document.getElementById('exam').offsetWidth;
    examDataName.forEach(name=>{
        let th = document.createElement('th');
        th.textContent = name;
        th.style.border = '2px solid black';
        th.style.width = `${examDivWidth/2}px`;
        th.style.textAlign = 'center';
        ExamheaderRow.appendChild(th);
    }) 
    let examtbody = document.createElement('tbody');
    examData.forEach(data=>{
        let row = examtbody.insertRow();
        exam_headers.forEach(head=>{
            let cell = row.insertCell();
            cell.textContent = data[head];
            cell.style.border = '2px solid black';
            cell.style.width = `${examDivWidth/2}px`;
            cell.style.textAlign = 'center';
            cell.style.color = 'black';
        })
    })
    examTable.appendChild(examtbody);


    //fee
    let feeData = data.fee;
    console.log(feeData);
    let fee = document.getElementById('fee');
    fee.textContent = `${feeData[0]['Payment_Status']}(${feeData[0]['Amount']})`
})
.catch(error=>{
    console.log('ERROR: ',error);
})