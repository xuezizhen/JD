$(function(){
	//var tabs=document.getElementsByClassName("page3")[0].getElementsByClassName('left')[0];
	var oUl=document.getElementById("navList");
	var aLi=oUl.getElementsByTagName('li');
	var oTab=document.getElementsByClassName('js-tab')[0];
	var aItem=oTab.getElementsByClassName('tabItem');
	var aA=document.getElementsByClassName('navA');
	var timer;
		 for (var i = 0; i < aLi.length; i++) {
			aLi[i].index=i;
			 aItem[i].index=i;
			 aA[i].index=i;
			aLi[i].onmouseenter=function(){
				for (var j = 0; j < aLi.length; j++) {
					aLi[j].style.backgroundColor="";
					aItem[j].style.display="none";
					aA[j].style.color=""
				}
				aLi[this.index].style.backgroundColor="#fff";
				aItem[this.index].style.display="block";
				aA[this.index].style.color="#c81623"
			};
			aLi[i].onmouseleave=function(){
				var ss=this.index;
				this.style.background="#c81623";
				aA[this.index].style.color="#fff";
				timer=setTimeout(function(){
					aItem[ss].style.display="none";
				},50);
			};
			aItem[i].onmouseenter=function(){
				clearTimeout(timer);
				aA[this.index].style.color="#c81623";
				this.style.display="block";
				aLi[this.index].style.background="#fff";
			};
			aItem[i].onmouseleave=function(){
				this.style.display="none";
				aA[this.index].style.color="#fff";
				aLi[this.index].style.background="#c81623";
			}
		 }
		//banner区图片轮播
		 var li_width=$('.banner_pic li:first').width();
		 var li_num=$('.banner_pic li').length;
		 $('.banner_pic').width(li_width*li_num);
		 for (var i = 0; i < li_num; i++) {
			$('.banner ol').append('<li class="'+(i==0? "ac":"")+'"></li>');
		 }
		 $('.banner ol li').mouseover(function(){
			$(this).addClass('ac').siblings().removeClass('ac');
			var n=$(this).index();
			$('.banner_pic').stop().animate({'left':-li_width*n});
		 });
		 $('.zuo').click(function(){
			var n=$('.ac').index();
			$('.banner ol li').eq(n).removeClass('ac');
			//alert($('.banner ol li')[0].length);
			if(n==0){
				n=$('.banner ol li').length-1
			}else{
				n--;
			}
			$('.banner ol li').eq(n).addClass('ac');
			// alert(n);
			$('.banner_pic').stop().animate({'left':-li_width*n},'slow');
		 });
		 $('.you').click(function(){
			var n=$('.ac').index();
			$('.banner ol li').eq(n).removeClass('ac');
			//alert($('.banner ol li')[0].length);
			if(n==$('.banner ol li').length-1){
				n=0;
			}else{
				n++;
			}
			$('.banner ol li').eq(n).addClass('ac');
			// alert(n);
			$('.banner_pic').stop().animate({'left':-li_width*n},'slow');
		 });
		 //------------------------------
		 $('.floor1-nav ul li').each(function(){
			$(this).mouseover(function(){
				$(this).addClass('ac').siblings().removeClass('ac');
				var n=$(this).index();
				// alert(n)
				$('.floor1 .clothing').eq(n).removeClass('hidden').siblings().not($('.floor1-nav')).addClass('hidden');

			})
		 });
//====================================================================================邊側滑輪
	$(window).scroll(function(){
		if($(window).scrollTop()>1400){
			$('#page9').fadeIn();
		}else{
			$('#page9').fadeOut();
		}
		$('.page7').each(function() {
			var st=$(window).scrollTop()+$(window).height()/2;
			var h=$(this).offset().top;
			if(h<st){
				var index=$(this).index()-7;
				$('#page9 li').eq(index).addClass('p9_ac').siblings().removeClass('p9_ac');
			}
		});
	});
	$('#page9 li').click(function(){
		$(this).addClass('p9_ac').siblings().removeClass('p9_ac');
		var index=$(this).index();
		//找到对应楼层的top值,让滚动条滚动到这个值
		var t=$('.page7').eq(index).offset().top;

		$('body,html').animate({"scrollTop":t});
	});
//====================================================================================樓層tab切換
		$(".page7").each(function(){
			var _this=$(this);         //   聲明變量_this  為傳入的對象$(this)
			var aLi=_this.find(".floor_nav li");    //找對象中的要切換的li
			var tabItem=_this.find(".page7_mid");   //找對象中的要切換的div
			aLi.click(function(){                   //li做點擊事件
				var i=$(this).index();

				//  $(this)---點擊的li,addClass("ac")---添加樣式,siblings()---篩選所有同輩的li,removeClass("ac")---去除樣式
				aLi.eq(i).addClass("ac").siblings().removeClass("ac");
				//  tabItem.eq(index)---找到點擊li對應的div,show()---顯示,siblings()---篩選所有的同輩,hide()---隱藏
				tabItem.eq(i).show().siblings().hide()
			});
		});
//====================================================================================送至:城市
	$('.header .left').each(function(){
		var subM=$(this).children('ul');
		if (subM.length==1) {
			subM.addClass('city_list');
		}
		$('.header .left').hover(
			function(){
				var chooseCity=$('.header .left ul li a');
				chooseCity.each(function(){
					$(this).click(function(){
						for (var i = 0; i < chooseCity.length; i++) {
							chooseCity.css({background:'',color:''})
						}
						$('.header .left p a').html($(this).text());
						$(this).css({background:' #c81623',color:'#fff'})
					});
					subM.show();
					subM.parent().css('background','#f1f1f1')
				})
			},
			function(){
				subM.hide();
				subM.parent().css('background','')
			}
		)
	});
//====================================================================================屏幕右侧固定栏
	$('.page8 .top .show').each(function(){
		$(this).mouseover(function(){
			var n=$(this).index();
			//alert(n);
			$('.page8 .top .show em').eq(n).stop().animate({right:'35px'},"slow");
			$('.page8 .top .show em').eq(n).css('background','#ca1623');

		})
		$(this).mouseout(function(){
			var n=$(this).index();
			//alert(n);
			$('.page8 .top .show em').eq(n).stop().animate({right:'-62px'},"slow");
			$('.page8 .top .show em').eq(n).css('background','#7a6e6e');
		})
	});
	$('.page8 .bot .show').each(function(){
		$(this).mouseover(function(){
			var n=$(this).index();
			// alert(n);
			$('.page8 .bot .show em').eq(n).stop().animate({right:'35px'},"slow");
			$('.page8 .bot .show em').eq(n).css('background','#ca1623');
		});
		$(this).mouseout(function(){
			var n=$(this).index();
			// alert(n);
			$('.page8 .bot .show em').eq(n).stop().animate({right:'-62px'},"slow");
			$('.page8 .bot .show em').eq(n).css('background','#7a6e6e');
		})
	});
//====================================================================================banner右側交互

	var show=true;
	$('.mod_tab_head_item').hover(
		function(){
			if(show){
				$(this).addClass('service_frame_on').siblings().removeClass('service_frame_on');
				$('.service').addClass('service_expand');
			}
		},
		function(){
			show=true;
		}
	);
	$('.closeBtn').click(function(){
		$('.service').removeClass('service_expand');
		$('.service_list li').removeClass('service_frame_on');
		$('.service_list li:last').addClass('service_frame_on');
		show=false;
	});

//===================================================================搜索框提示
	$( "#autocomplete" ).autocomplete({
		source: [ "手機", "電腦", "照相機", "電冰箱", "洗衣機", "電視機", "烤箱" ],
		appendTo: ".autocompleteBox"
	});




});
		




