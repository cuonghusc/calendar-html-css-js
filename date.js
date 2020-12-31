var d = new Date();
var month = d.getMonth()+1;
var year = d.getFullYear();

function getDaysInMonthUTC(month, year) {
    month--;
    var date = new Date(Date.UTC(year, month, 1));
    var days = [];
    while (date.getUTCMonth() === month) {
        days.push(new Date(date));
        date.setUTCDate(date.getUTCDate() + 1);
    }
    return days;
}

function monthArray(days){
    var pos = [];
    var k = 0;
    var countDay = days.length;
    for(var i=0;i<5;i++){
        var temp = [];
        for(var j=0;j<7;j++){
            if(k<countDay){
                if(days[k].getDay()==j){
                    temp.push(days[k]);
                    k++;
                }else{
                    temp.push(0);
                }
            }else if(temp.length<7){
                temp.push(0);
            }
        }
        pos[i] = temp;
    }

    return pos;
}

function displayDay(pos){
    var html = '';
    for(var i=0;i<5;i++){
        html+=`<tr>`;
        for(var j=0;j<7;j++){
            if(pos[i][j]==0){
                html+=`<td></td>`;
            }
            else{
                if(checkToday(pos[i][j])){
                    html += `<td class="today">${pos[i][j].getDate()}</td>`;
                }
                else{
                    html += `<td>${pos[i][j].getDate()}</td>`;
                }
                
            }
        }
        html+=`</tr>`;
    }
    document.getElementById("displayDay").innerHTML= html;
}
displayDay(monthArray(getDaysInMonthUTC(month,year)));
function displayTitle(){
    document.getElementById("currentMonth").innerHTML = `<h4>Tháng ${month} năm ${year}</h4>`;
}
displayTitle();
$('#prev').on('click',function(){
    if(month==1){
        month = 12;
        year--;
    }else{
        month--;
    }
    displayTitle();
    displayDay(monthArray(getDaysInMonthUTC(month,year)));
});
$('#next').on('click',function(){
    if(month==12){
        month = 1;
        year++;
    }else{
        month++;
    }
    displayTitle();
    displayDay(monthArray(getDaysInMonthUTC(month,year)));
});
function checkToday(checkday){
    var today = new Date();
    var checkday = new Date(checkday);
    if(checkday.getFullYear() == today.getFullYear() && checkday.getMonth() == today.getMonth() && checkday.getDate() == today.getDate()){
        return true;
    }
    return false;
}
