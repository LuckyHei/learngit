
	//............loading
	var _loadingTimer;
	var _loadingTime=20;
	var _loadingText=$('#percent>span');
	var _loading=$('.loading');
	var _wrap=$('.wrap');
	var _startBtn=$('#startBtn');
	var _washBtn=$('#washBtn');
	var _title=$('.title');
	var percent=0;


	var _coverTimer=null;
	var _coverTime=60;
	var _coverIndex=0;
	var _coverImg=$('.cover_picture img');
	var _titleTime=1000;
	var _moveFlag=true;


	var _wrap1=$('.wrap1');
	var _washBefore=$('.washBefore');

	var _washBtn=$('#washBtn');
	var _washBeforeImg=$('.washBefore>img');
	var _handShow=$('.handShow');
	var _hand=$('#hand');
	var _wrap2=$('.wrap2');
	var _sign=$('.sign');
	var _showSign=$('.showSign');
	var _signImg=$('.sign>img');
	var _showSignDiv=$('.showSign div');
	var _begin=[1,1,1,1,1,1,1,1,1,1];
	var _rotate=[10,20,30,40,50,60,70,80,90,100];
	var _defaultFlag=[0,0,0,0,0,0,0,0];
	var num;
	var _afterCss=[
		{l:61,t:471,r:660},
		{l:109,t:422,r:680},
		{l:164,t:395,r:700},
		{l:236,t:380,r:715},
		{l:292,t:386,r:735},
		{l:344,t:407,r:750},
		{l:394,t:442,r:765},
		{l:430,t:493,r:780},
	];
	var _touchCss=[
		{l:48,t:456},
		{l:94,t:407},
		{l:149,t:383},
		{l:236,t:365},
		{l:307,t:376},
		{l:360,t:385},
		{l:409,t:428},
		{l:445,t:475},
	];
	var _timeMove=[1200,1100,1000,900,800,500,300,100];
	_loadingTimer=setInterval(_loadingFn,_loadingTime);
	function _loadingFn(){
		percent+=1;
		if(percent>100){
			clearInterval(_loadingTimer);
			_loading.hide();
			_wrap.show();
			_coverTimer=setInterval(coverAnimation,_coverTime);
			// titleMove();
		}else{	
			_loadingText.eq(0).html(percent);
		}
	}
	// $('img').load(function(e){
	// 	console.log(e);
	// 	_loading.hide();
	// 	_wrap.show();
	// });
	//...............点击开始抽牌
	_startBtn.on('touchstart',washBeforeShow);
	//....................开始洗牌
	_washBtn.on('touchstart',wash);
 	

	//...............封面动画
	// function titleMove(){
	// 	_title.animate({
	// 		"margin-top":110,
	// 	},_titleTime,function(){
	// 		_title.animate({
	// 			"margin-top":140,
	// 		},_titleTime);
	// 		if(_moveFlag){	
	// 			titleMove();
	// 		}
	// 	});
	// }

	function coverAnimation(){
		// console.log(1);
		_coverIndex++;
		if(_coverIndex==12){
			_coverIndex=0;
		}
		_coverImg.hide();
		_coverImg.eq(_coverIndex).show();
	}


	function washBeforeShow(){
		clearInterval(_coverTimer);
		_moveFlag=false;
		_wrap.hide();
		_wrap1.show();
		_washBefore.hide();
	}


	function wash(){
		$('.beginCards').animate({
			marginLeft: -90,
    		marginTop: -188,
			width: 155,
		},500);
		$('.beginCards').fadeOut(500);
		_washBtn.hide();
		_washBefore.fadeIn(600);
		setTimeout(function(){
			$.each(_washBeforeImg,function(index,value){
				var _img=$(this);
				// console.log(index);
				// $(this).addClass('cardAnimation');
				setTimeout(function(){
					washCard(_img,index,5);
				},_timeMove[index]);
				// console.log(_l);
			});
		},620);
		setTimeout(function(){
			$.each(_washBeforeImg,function(index,value){
				var _img=$(this);
				if(index<8){
					washAfterMove(_img,index);
				}
				else{
					_img.hide();
				}
			});
			setTimeout(function(){
				_handShow.fadeIn(500,function(){
					_hand.animate({
						marginTop:-110,
					},1500,function(){
						_hand.fadeOut(500).fadeIn(500).fadeOut(500).fadeIn(500).fadeOut(500,function(){
							$.each(_washBeforeImg,function(index,value){
								if(index<8){
									var _img=$(this);
									_img.on('touchstart',function(e){
										var _touch = e.originalEvent.targetTouches[0];
										var _startTop=_touch.pageY;
										_img.on('touchend',function(e){
											var _touch = e.originalEvent.changedTouches[0];
											var _endTop=_touch.pageY;
											if(_endTop<_startTop){
												_img.css({
													'-webkit-transition': '-webkit-transform 0.5s',
													'-webkit-transform':'rotate(720deg)',
												});
												_img.animate({
													left:240,
													top:300,
												},500,function(){
													_img.css({
														'-webkit-transition': '-webkit-transform 1s',
														'-webkit-transform':'rotateY(180deg)',
													});
													_img.addClass('cardRotate');
													_img.siblings().fadeOut(300);
													_handShow.fadeOut(300);
													setTimeout(function(){
														_img.fadeOut(300);
														_wrap2.fadeIn(300);
														$('.wrap5').show();
														$.each($('.wrap5 div'),function(){
															var _img=$(this).children('img').eq(0);
															_img.animate({
																top:0
															},700,function(){
																_img.fadeOut(500,function(){
																	$('.wrap5').hide();
																});
															});
														});
														num=GetRandomNum(0,7);
														_signImg.eq(num).siblings().hide();
														_signImg.eq(num).show();
														$('#showBtn').on('touchstart',function(){
															_wrap2.fadeOut(300);
															$('.wrap3').fadeIn(300);
															$.each(_showSignDiv,function(){
																$(this).hide();
															})
															_showSignDiv.eq(num).show();
															var _content=_showSignDiv.eq(num).children('img');
															_content.eq(1).animate({
																left:0,
															},500);
															$('#shareBtn').on('touchstart',function(){
																$('.wrap3').fadeOut(500);
																$('.wrap4').fadeIn(500);
															});
															$('#againBtn').on('touchstart',function(){
																_restart();
															})
														});
													},1000);
												});
											}
										});
									});
								}
							});
						});
					});
				});
			},1600);
		},6500);
	}

	//..............重新开始，重置
	function _restart(){
		_rotate=[10,20,30,40,50,60,70,80,90,100];
		_defaultFlag=[0,0,0,0,0,0,0,0];
		_begin=[1,1,1,1,1,1,1,1,1,1];
		$('.wrap3').hide();
		_wrap1.show();
		_wrap1.children().show();
		$('.beginCards').css({
			marginLeft: -210,
			marginTop: -307,
			width:414,
		});
		_washBefore.children().show();
		_washBefore.hide();
		$.each(_washBeforeImg,function(){
			$(this).css({
				left:230,
				top:380,
				width:155,
				'-webkit-transform':'rotate(0deg)',
			});
			$(this).off('touchstart');
			$(this).off('touchend');
			$(this).removeClass('cardRotate');
		});
		$('#showBtn').off('touchstart');
		$('#shareBtn').off('touchstart');
		_hand.css({
			marginLeft: -40,
   			marginTop: 358,
   			display:'block'
		});
		$('.wrap5').find('img').show();
		$('.wrap5 div img').eq(0).css({
			top:-280
		});
		$('.wrap5 div img').eq(1).css({
			top:-381
		});
	}



	function washAfterMove(obj,index){
		obj.css({
			'-webkit-transform':'rotate('+_afterCss[index].r+'deg)',	
		});
		obj.animate({
			left: _afterCss[index].l,
			top: _afterCss[index].t
		},500,function(){
			switch(_defaultFlag[index]){
				case 0:{
					_defaultFlag[index]=1;
					washAfteDefault(obj,index);
				};break;
				case 1:{
					_defaultFlag[index]=2;
					washAfterMove(obj,index);
				}
			}
		});
	}

	function washAfteDefault(obj,index){
		obj.css({
			'-webkit-transform':'rotate('+_afterCss[3].r+'deg)',
		});
		obj.animate({
			left: _afterCss[3].l,
			top: _afterCss[3].t,
		},500,function(){
			washAfterMove(obj,index);
		});
	}


	function washCard(obj,index,times){
		if(_begin[index]<times){
			_begin[index]++;
			var _lMin=19;
			var _lMax=_lMin+_washBefore.width()-obj.height();
			var _tMin=240;
			var _tMax=_tMin+_washBefore.height()-obj.height();
			_rotate[index]+=GetRandomNum(150,300);
			var _time=800;
			var _l=GetRandomNum(_lMin,_lMax);
			var _t=GetRandomNum(_tMin,_tMax);
			obj.css({
				'-webkit-transition': '-webkit-transform '+_time/1000+'s',
				'-webkit-transform':"rotate("+_rotate[index]+"deg)",
			});
			obj.animate({
				left:_l,
				top:_t
			},_time,function(){
				setTimeout(function(){
					washCard(obj,index,times);
				},200);	
			});
		}
		else{
			obj.css({
				'-webkit-transition': '-webkit-transform 0.5s',
				'-webkit-transform':"rotate(720deg)",
			});
			obj.animate({
				left:230,
				top:380,
				width:155
			},500,function(){
				
			});
		}

	}

	function GetRandomNum(Min,Max){
		var _range=Max-Min;
		var _rand=Math.random();
		return(Min+Math.round(_range*_rand));
	}

	