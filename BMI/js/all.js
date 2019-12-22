 // 指定 dom
  var ans=  document.querySelector('.answer');
  var list = document.querySelector('.list');
  var btn = document.querySelector('.btn');
  var data = JSON.parse(localStorage.getItem('listData')) || [];
  

list.addEventListener('click',deleteData);
btn.addEventListener("click",addData);
updatelist(data); 
  



  //將資料正確判定並收集整理到localstorage裡面
  function addData(e) {
    e.preventDefault();

    var height = document.querySelector('.height').value;
    var weight = document.querySelector('.weight').value; //宣告身高與體重的輸入資料
    var m=height/100;
    var BMI = (weight/(m*m)).toFixed(2);   //BMI
    var today=new Date();
    var Time =(today.getMonth()+1)+'-'+today.getDate()+'-'+today.getFullYear();
    var lightBar = "";//宣告lightBar為空物件
    var status = "";//宣告status為空物件


    //BMI 身高體重 判定  不能為''空值。 並回傳return終止繼續運行
  if(BMI == "NaN") {
        alert('請輸入正確的數值!');
        return;
    }else if (height == '') {
        alert("您尚未輸入身高！");
        return;
    }else if (weight == '') {
        alert ("您尚未輸入體重！");
        return;
    }else if ( height > 300) {
        alert ("請重新輸入身高！");
        return;
    }else if (weight > 300) {
        alert ("請重新輸入體重！");
        return;
    }
    //BMI 判定並將得到的資料存放在變數lightBar，status 並增加btn，ans的html屬性
 if(BMI<18.5) {
        status = '過輕';
        lightBar = 'blue';
        btn.setAttribute("class","blue");
        btn.setAttribute("id","style");
        ans.setAttribute("class","blue_ans ");    
    }else if(18.5<=BMI && BMI<24) {
        status = '理想';
        lightBar = 'green';
         btn.setAttribute("id","style");
        btn.setAttribute("class","green");
        ans.setAttribute("class","green_ans");
    }else if(24<=BMI && BMI<27) {
        status = '過重';
        lightBar = 'orange1';
         btn.setAttribute("id","style");
        btn.setAttribute("class","orange1");
        ans.setAttribute("class","orange1_ans");
    }else if(27<=BMI && BMI<30) {
        status = '輕度肥胖';
        lightBar = 'orange2';
         btn.setAttribute("id","style");
        btn.setAttribute("class","orange2");
       ans.setAttribute("class","orange2_ans");
    }else if(30<=BMI && BMI<35) {
        status = '中度肥胖';
        lightBar = 'orange2';
         btn.setAttribute("id","style");
        btn.setAttribute("class","orange2");
        ans.setAttribute("class","orange2_ans");
    }else if(BMI>=35) {
        status = '重度肥胖';
        lightBar = 'red';
         btn.setAttribute("id","style");
        btn.setAttribute("class","red");
        ans.setAttribute("class","red_ans");
    }

    //將BMI的資料改寫到btn的html標籤裡面內容
   document.querySelector('.value').textContent = BMI;
   document.querySelector('.bmi').textContent = 'BMI';
   document.querySelector('.click').textContent = '';
    ans.textContent=status;
  
    //將資料作統整
    var BMIdata= {
      cm: height,
      kg: weight,
      BMI :BMI,
       lightBar:lightBar,
       status: status,
       today:Time

    };

    //將資料放入localstorage資料庫裡面
    data.push(BMIdata);
    updatelist(data);
    localStorage.setItem('listData', JSON.stringify(data));
    

  }
 




//更新html網頁內容
function updatelist(item){
   var str ='';
   var len =data.length;
    for(var i = 0;i<len;i++){
str +=
`
      
       <li data-num=${i} class='flex'>
<div class="setColor" id='${data[i].lightBar}'> </div>
       <span class="staus">${data[i].status} </>
       <span>BMI </span>${item[i].BMI }
       <span>weight </span>${item[i].kg}kg
       <span>height </span>${item[i].cm } cm
       <span class="time">${item[i].today }</span>
       <a href="#">X</a>


       </li>`
    }


    list.innerHTML = str;
}




//刪除表單資訊
function deleteData(e){
    e.preventDefault();
    if(e.target.nodeName=='A'){

        var num = e.target.parentNode.dataset.num;


      data.splice(num,1)
       updatelist(data);
      localStorage.setItem('listData',JSON.stringify(data));
    
  }
   

}


