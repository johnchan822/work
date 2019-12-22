var xhr = new XMLHttpRequest();

xhr.open('get', 'https://data.kcg.gov.tw/api/action/datastore_search?resource_id=92290ee5-6e61-456f-80c0-249eae2fcc97', true);

xhr.send(null);

var areaId = document.querySelector('#areaId');
var hotSelect = document.querySelector('.hotSelect')
xhr.onload = function () {

	
	data = JSON.parse(xhr.responseText);  //重點 data=轉為object的responseText(資料從這邊拿到)

	var length = data.result.records.length;  //宣告資料的總數量
	var records = data.result.records;  //塞各各個資料內容

	function updateMenu(e) {

		var allarea = [];
		var selectarea = [];



		for (var i = 0; i < length; i++) {
			allarea.push(records[i].Zone);
		}



		console.log(allarea)
		selectarea = allarea.filter(function (el, i, arr){
		//使用 filter 時，會將元素一個個拿出來檢核，並 return 出一個符合條件的新陣列(重點)


			//依照次序
			//el  = 陣列中的元素值(地區名稱)
			//i   = 元素在陣列中的位置(元素之索引)
			//arr = 呼叫filter的陣列(被迭代的陣列物件=全部資料)


			//資料檢核第一筆0為三民，其餘三民區元素就是0
			//檢核到到第9筆為內門，內門的元素就是9.....以此類推



			return arr.indexOf(el) === i;
			//indexOf 是尋找某元素於陣列中第一個被找到之索引值

			//arr.indexOf(el) 是指全部資料在陣列的第幾個位子被找到

			//檢核三民第一筆為0之後的三民值就不需要繼續
			//因為 indexof的三民地區元素值為0 與i索引0相同

		})


		var str = '';
		var selectFirst = "<option value> --請選擇行政區--</option>"
		for (var a = 0; a < selectarea.length; a++) {


			str += "<option value=" + selectarea[a] + ">" + selectarea[a] + "</option>";


		}

		areaId.innerHTML = selectFirst + str;


			}


	updateMenu();



	function updateContent(e) {
		var area = document.querySelector('.area')
		var title = document.querySelector('.title')
		var page = document.querySelector('.page');
		var searchValue = e.target.value;
		//search vaule = 你所點選的value

		var searchName = e.target.nodeName;
		if (searchName !== 'INPUT' && searchName !== 'SELECT') {
			return;
		}


		var str = '';

		for (var i = 0; i < length; i++) {




			//假如選擇的節點名稱=地區
			if (searchValue == records[i].Zone) {

				title.textContent = records[i].Zone;

				//我才將地區打出來
				str += `<li>
		<div class="viewPicture"style="background-image:url('${records[i].Picture1}')";></div>
		<div class="form"><img src="img/icons_clock.png"><span>${records[i].Opentime}</span></div>
		<div class="form"><img src="img/icons_pin.png"><span>${records[i].Add}</br></span></div>
		<div class="form"><img src="img/icons_phone.png"><span>${records[i].Tel}</span>
		<span class="tag"><img src="img/icons_tag.png">${records[i].Ticketinfo}</span></div>
		</li>`

			}

			area.innerHTML = str


		}

		var show_page = 4; //每頁呈現4個

		var number_of_items = document.querySelector('.area').childElementCount; //全部的資料

		var number_of_pages = Math.ceil(number_of_items / show_page);//呈現幾頁

		console.log(number_of_pages);


		var textnode = '';
		var next = '';
		var prev = '';
		for (var i = 0; i < number_of_pages; i++) {


			textnode += `<li onclick="window.changePage(${i})"><a href="#">${i + 1}</a></li>`;


		}

		next = `<li >next</li>`;
		prev = `<li >prev</li>`;
		page.innerHTML = prev + textnode + next;



		var arr = [];
		for (var i = 0; i < number_of_items; i++) {

			area.children[i].style.display = 'none';
			arr.push(area.children[i]);
		}

		for (var i = 0; i < 4; i++) {


			arr.slice(0, show_page)[i].style.display = 'block';
		}


		window.changePage = function changePage(page_num) {
			e.preventDefault();
			var start = page_num * show_page;

			var end = start + show_page;

			for (var i = 0; i < number_of_items; i++) {


				document.querySelector('.area').children[i].style.display = 'none';

			}

			for (var i = 0; i < 5; i++) {



				arr.slice(start, end)[i].style.display = 'block';
			}


		}



	}








	areaId.addEventListener('change', updateContent);

	hotSelect.addEventListener('click', updateContent);






}












