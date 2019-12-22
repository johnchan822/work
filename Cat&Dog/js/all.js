var selectId = document.querySelector('#selectId');
var areaId = document.querySelector('#areaId');
var colorId = document.querySelector('#colorId')
var sexId = document.querySelector('#sexId');
var ageId = document.querySelector('#ageId');
var list = document.querySelector('.list');
var area = document.querySelector('.area');
var btn = document.querySelector('.btn');
var background = document.querySelector('.background')
var tools = document.querySelector('.tools')
var kid = document.querySelector('.kid')
var char = document.querySelector('.char')

function updateMenu() {

    var str = '';
    var alldata = [];
    var alldata = [];
    var length = data.length;


    if (areaId.value == 'all') {

        alert('麻煩選個地點!!')

        return;
    }


    else {



        for (i = 0; i < length; i++) {

            if (sexId.value == data[i].animal_sex || sexId.value == 'all') {
                if (areaId.value == data[i].shelter_name) {

                    if (selectId.value == data[i].animal_kind || selectId.value == 'all') {

                        if (ageId.value == data[i].animal_age || ageId.value == 'all') {


                            alldata.push(data[i]);

                        }

                    }
                }



            }

        }

        if (alldata.length != 0) {


            for (i = 0; i < alldata.length; i++) {

                str += `

    <div class="card mx-2 my-2 " style="width: 20rem;">
        <img src="${alldata[i].album_file}" class="card-img-top" alt="..." height="250px">
        <div class="card-body ">
                <h5 class="card-header text-center">${alldata[i].animal_kind}</h5>
                <p class="card-text">年紀:${alldata[i].animal_age}</p>
                <p class="card-text">毛色:${alldata[i].animal_colour}</p>
                <p class="card-text">性別:${alldata[i].animal_sex}</p>
                <p class="card-text">連絡電話:${alldata[i].shelter_tel}</p>
                <p class="card-text">機構地點:${alldata[i].shelter_address}</p>
                 <p class="card-text">是否結紮:${alldata[i].animal_sterilization.replace(/F/, '否')} 
                 ${alldata[i].animal_sterilization.replace(/T/, '是')} 
                 </p>
        </div>
    </div>
`;

            }


            list.innerHTML = str;

        }

        else if (alldata.length == 0) {


            list.innerHTML = ` <h3 class="card-header text-center">查詢無結果<h3>`;
        }


    }


}
function updateSelect(e) {


    e.preventDefault();


    if (selectId.value == '狗') {
        char.setAttribute("class", "dog");
    }

    else if (selectId.value == '貓') {
        char.setAttribute("class", "cat");
    }
    else {
        char.classList.remove('cat');
        char.classList.remove('dog');
     
    }
}


function updateAgeSelect(e) {

    e.preventDefault();


    if (selectId.value == '貓')
    
    {
         if
            (ageId.value == 'CHILD') {

            char.setAttribute("class", "kitty");
        }
        else {
            char.setAttribute("class", "cat");
        }
    }




    else if (selectId.value == '狗') 
        
    {

        if
            (ageId.value == 'CHILD') {

            char.setAttribute("class", "puppy");
        }

        else {
            char.setAttribute("class", "dog");
        }
    }



}

function updateSexSelect() {

    if (ageId.value == 'CHILD') {

            if (sexId.value == 'F') {

                tools.setAttribute("class", "girl");
            }

            else if (sexId.value == 'M') {
                tools.setAttribute("class", "boy");
            }

            else{
                tools.classList.remove('girl');
                tools.classList.remove('boy');

            }

    }

    else if (ageId.value == 'ADULT') {
      
        if (sexId.value == 'F') {

            tools.setAttribute("class", "female");
        }


        else if (sexId.value == 'M') {

            tools.setAttribute("class", "male");
        }


        else{
            tools.classList.remove('female');
            tools.classList.remove('male');
        }



    }


 


}

function updateAreaSelect() {


    var item = areaId.value;
    switch (item) {
        case '金門縣動物收容中心':
            background.setAttribute('class', 'Kinmen');
            break;

        case '宜蘭縣流浪動物中途之家':
            background.setAttribute('class', 'I-len');
            break;

        case '臺南市動物之家灣裡站':
            background.setAttribute('class', 'Tainan');
            break;

        case '臺東縣動物收容中心':
            background.setAttribute('class', 'Taitung');
            break;

        case '高雄市壽山動物保護教育園區':
            background.setAttribute('class', 'Kaohsiung');
            break;
        case '臺北市動物之家':
            background.setAttribute('class', 'Taipei');
            break;

    }


}

selectId.addEventListener('change', updateSelect);

sexId.addEventListener('change', updateSexSelect);

ageId.addEventListener('change', updateAgeSelect);

areaId.addEventListener('change', updateAreaSelect);

btn.addEventListener('click', updateMenu);