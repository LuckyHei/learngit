	
	//...loading
	var _loadTime = 30;
	var _loadTiemr;
	var percent = 0;
	var _loading = $(".loading");
	var _loadingText =$("#percent>span");
	var _wrap = $(".wrap");

	//.....封面动画

	var _coverTimer = null;
	var _coverTime = 60;
	var _coverIndex = 0;
	var _coverImg = $(".cover_picture img");
	var _titleTime = 100;
	var _moveFlag = true;


	_loadTiemr=setInterval(_loadingF,_loadTime);

	function _loadingF(){
		percent +=1;
		if(percent >100) {
			clearInterval(_loadTiemr);
			_loading.hide();
			_wrap.show();
			_coverTimer = setInterval(coverAnimation,_coverTime);

		}else {
			_loadingText.eq(0).html(percent);

		}
	}


	//....封面动作
	function coverAnimation() {
		_coverIndex++;
		if(_coverIndex==12) {
			_coverIndex = 0;
		}
		_coverImg.hide();
		_coverImg.eq(_coverIndex).show();

	}


	var _startBtn = $('#startBtn');
	var _wrap1=$('.wrap1');
	
	var _washBeforeImg=$('.washBefore>img');
	var _washBtn=$('#washBtn');

	_startBtn.on("touchstart",washBeforeShow);

	function washBeforeShow() {
		clearInterval(_coverTimer);
		_wrap.hide();
		_wrap1.show();
		_washBefore.hide();
	}

	var _washBefore=$('.washBefore');

	//洗牌
	_washBtn.on('touchstart',wash);



















	//


	var _wrap1 =$(".wrap1");
	var _washBtn =$("#washBtn");
	var _washBefore = $(".washBefore");
	var _washBeforeImg=$('.washBefore>img');
