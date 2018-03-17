$(function() {
	$.fn.tableSort = function(viewSelector) {
		// ���̺� ����
		var columns = new Object();
		columns.name = new Array();
		columns.type = new Array();
		
		// ���̺� ����
		var datas = new Array();
		
		// ������ ���̺� Į�� ��ȣ
		var index = 0;
		
		// ����� �κ� ������ ����
		var selector = viewSelector;
	
		// ���̺� �÷� ���� 
		for(i = 0; i < $("th").size(); i++) {
			columns.name[i] = $($("th").get(i));

			// Į���� �Է�
			$(columns.name[i]).click(function(event) {
				selectColumn(event);
			});

			// Į�� �⺻ ��Ʈ Ÿ�� �Է�, �������� false, �������� true
			columns.type[i] = true;
		}

		// ���̺� ����, �� ����.
		$(this).find("tr").each(function(n) {
			if(n > 0) datas[n - 1] = $(this);
		});
		
		// ���� Į�� ����
		var selectColumn = function(event) {
			for(j = 0; j < columns.name.length; j++) {
				if(columns.name[j].text() == $(event.target).text()) {
					sort(j);
					break;
				}
			}
		};
		
		// ���� ����
		var sort = function(index) {
			/**/
			for(i = 0; i < datas.length - 1; i++) {
				for(j = 1; j < datas.length; j++) {
					// �������� ����
					if(columns.type[index]) {
						if(getData(datas[j - 1], index) > getData(datas[j], index)) {
							var tmp = datas[j - 1];
							datas[j - 1] = datas[j];
							datas[j] = tmp;
						}
					// �������� ����
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

		// ���� ���� ��� ��.
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