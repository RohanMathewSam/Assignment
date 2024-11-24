let baseUrl='http://127.0.0.1:8000/'
fetch(`${baseUrl}professorDetail`).then(response=>{
    if(!response.ok){
        throw new Error ('Not Done')
    }
    return response.json();
    }).then(message=>{
        let data = message.message;
        console.log(data)
        let detail = ['ID','Name','Department ID','Department Name','Phone Number','Email ID']
        data.forEach(item=>{
            item.name = item.First_Name +" "+item.Last_Name
        })
        let Datadetails = ['Professor_ID','name','Department_ID','Department_Name','Phone_Number','Email'];
        let courseDetail = ['ID','Name'];
        let Datacourse = ['Course_ID','Course_Name'];
        let detailSection = document.getElementById('detail');
        data.forEach((info)=>{
            console.log(info)
            Datadetails.forEach((item,index)=>{
                let child = document.createElement('h1');
                child.classList.add('dataContainer')
                child.innerHTML = `<span id=item${index+1} class="detailData"><b>${detail[index]}:</b></span><span id=value${index+1} class="detailValue">${info[item]}</span>`
                detailSection.appendChild(child);})
        })
        let courseTable = document.getElementById('courseTable');
        courseTable.createTHead().insertRow();
        let divWidth = document.getElementById('course').offsetWidth;
        console.log(divWidth);
        console.log('hi');
        courseDetail.forEach(head=>{
            let th = document.createElement('th');
            th.textContent = head;
            th.style.border = '2px solid black';
            th.style.width = `${divWidth/2}px`;
            th.style.textAlign = 'center';
            courseTable.appendChild(th);
        })
        let courseTableRow = document.createElement('tbody');
        data.forEach((info)=>{
            console.log(info)
            let row = courseTableRow.insertRow();
            Datacourse.forEach(item=>{
                console.log(info['Course_Name']);
                let cell = row.insertCell();
                cell.textContent = info[item]
                cell.style.border = '2px solid black';
                cell.style.width = `${divWidth/2}px`;
                cell.style.textAlign = 'center';
            })
        })
        courseTable.appendChild(courseTableRow);
    })
.catch(error=>{'error: ',error})