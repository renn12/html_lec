$(function() {
	$.fn.tableSort = function(viewSelector) {
		// 테이블 제목
		var columns = new Object();
		columns.name = new Array();
		columns.type = new Array();
		
		// 테이블 내용
		var datas = new Array();
		
		// 정렬할 테이블 칼럼 번호
		var index = 0;
		
		// 출력할 부분 셀렉터 정의
		var selector = viewSelector;
	
		// 테이블 컬럼 제목 
		for(i = 0; i < $("th").size(); i++) {
			columns.name[i] = $($("th").get(i));

			// 칼럼명 입력
			$(columns.name[i]).click(function(event) {
				selectColumn(event);
			});

			// 칼럼 기본 소트 타입 입력, 내림차순 false, 오름차순 true
			columns.type[i] = true;
		}

		// 테이블 내용, 행 기준.
		$(this).find("tr").each(function(n) {
			if(n > 0) datas[n - 1] = $(this);
		});
		
		// 정렬 칼럼 선택
		var selectColumn = function(event) {
			for(j = 0; j < columns.name.length; j++) {
				if(columns.name[j].text() == $(event.target).text()) {
					sort(j);
					break;
				}
			}
		};
		
		// 정렬 로직
		var sort = function(index) {
			/**/
			for(i = 0; i < datas.length - 1; i++) {
				for(j = 1; j < datas.length; j++) {
					// 오름차순 정렬
					if(columns.type[index]) {
						if(getData(datas[j - 1], index) > getData(datas[j], index)) {
							var tmp = datas[j - 1];
							datas[j - 1] = datas[j];
							datas[j] = tmp;
						}
					// 내림차순 정렬
					} else {
						if(getData(datas[j - 1], index) < getData(datas[j], index)) {
							var tmp = datas[j - 1];
							datas[j - 1] = datas[j];
							datas[j] = tmp;
						}
					}
				}
			}
			/**/

			if(columns.type[index]) columns.type[index] = false;
			else columns.type[index] = true;

		};

		// 비교할 값을 얻어 옴.
		var getData = function(data, index) {
			return $($(data).children().get(index)).text();
		};

		this.view = function(trStyle) {
			var result = "";
				console.log(" datas.length->"+datas.length);
			for(i = 0; i < datas.length; i++) {
				if(trStyle) {
					//result += trStyle + $(datas[i]).html() + "</tr>";
					console.log(" if-> "+datas[i]);
					result += trStyle + $(datas[i]).html() + "</tr>";
				}
				else {
					console.log(" else-> "+datas[i]);
					result += "<tr>" + $(datas[i]).html() + "</tr>";
				}
			}

			$(selector).html(result);
		};

		return this;
	};
});