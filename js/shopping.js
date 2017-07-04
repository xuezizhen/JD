/*
大神Ace
 */


$(function(){

	//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@  page3 添加數量&加入購物車
	var number=1;
	$(".addBtn").click(function(){        // ++
		number++;
		if(number>=4) {
			number=3;
			alert("每人限購3個")
		}
		$("input").val(number);
	});
	$(".subBtn").click(function(){       // --
		number--;
		if(number<1)  number=1;
		$("input").val(number);
	});
	$("#okBtn").click(function(){        //加入購物車
		alert("添加成功")
	});
	//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@  page4   AB切換
	$(".choiceA").click(function(){        //推薦配件
		$(".choiceB").removeClass("ac");
		$(".choiceA").addClass("ac");
		$(".subB").removeClass("hide");
		$(".subA").addClass("hide")
	});
	$(".choiceB").click(function(){         //人氣單品
		$(".choiceA").removeClass("ac");
		$(".choiceB").addClass("ac");
		$(".subA").removeClass("hide");
		$(".subB").addClass("hide")
	});
	//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

	var arr=["¥199.00","¥299.00","¥266.00","¥198.00","¥168.00","¥256.00","¥286.00","¥230.00","¥199.00","¥168.00-299.00"];
	var priceList=document.getElementById('priceList');
	var p_aLi=priceList.getElementsByTagName('li');
	var oImg=document.getElementById('goods');
	var imgList=document.getElementById('de_imgList');
	var img_li=imgList.getElementsByTagName('li');
	var price=document.getElementById('price');
	var price_txt=price.getElementsByTagName('em')[0];
	var changeNum=document.getElementById('changeNum');
	var chgBtn=changeNum.getElementsByTagName('button');
	var chgTxt=changeNum.getElementsByTagName('input')[0];

	var okBtn=document.getElementById('okBtn');
	var choice; //选择
	price_txt.innerHTML=arr[arr.length-1];//价格初始值
	function clearAc(){//清除所有选择样式
		for(var j=0; j<p_aLi.length; j++){
			p_aLi[j].className="";
		}
		for(var l=0; l<img_li.length; l++){
			img_li[l].className="";
		}
	}
	//===================================================================選擇尺碼
	for(var i=0; i<p_aLi.length; i++){
		p_aLi[i].index=i;
		p_aLi[i].onclick=function(){
			if(choice!=this.index){//如果编号不是自己的,就进行更改
				clearAc();
				this.className="ac";
				price_txt.innerHTML=arr[this.index];
				okBtn.disabled=false;
				okBtn.style.color="#fff"
			}else{//否则,说明已经选过
				clearAc();
				this.className="";
				choice=null;//-1也可以 不能为空字符串,因为 alert(""!=0) false
				price_txt.innerHTML=arr[arr.length-1];
				okBtn.disabled=true;
				okBtn.style.color="#ccc"

			}
		};
	}
	//===================================================================切換圖片
	$('#de_imgList li').each(function(){
		$(this).mouseover(function(){
			$(this).addClass('img_hover').siblings().removeClass('img_hover');
			// alert($(this).index())
			$('#bigImg img').attr('src','images/'+($(this).index()+1)+'.jpg');
			$('.imgZoom img').attr('src','images/'+($(this).index()+1)+'_zoom.jpg')
		})
	})
	//===================================================================图片放大镜
	$('#bigImg').mousemove(function(ev){
		var l=ev.pageX-$(this).offset().left-$('.zoom').width()/2;
		var t=ev.pageY-$(this).offset().top-$('.zoom').height()/2;
		if (l<0)  l=0;
		if (t<0)  t=0;
		var maxLeft=$(this).width()-$('.zoom').width();
		var maxTop=$(this).height()-$('.zoom').height();
		if (l>maxLeft) l=maxLeft;
		if (t>maxTop)  t=maxTop;
		$('.zoom,.imgZoom').fadeIn();
		$('.zoom').css({'top':t,'left':l});
		$('.imgZoom img').css({'top':-t*3,'left':-l*3})
	});
	$('#bigImg').mouseleave(function(){
		$('.zoom,.imgZoom').fadeOut();
	})

	//===================================================================搜索框提示
	$( "#autocomplete" ).autocomplete({
		source: [ "手機", "電腦", "照相機", "電冰箱", "洗衣機", "電視機", "烤箱" ],
		appendTo: ".autocompleteBox"
	});
	//===================================================================全部商品分类彈出
	var tabs=document.getElementsByClassName('page5');
	var oUl=tabs[0].getElementsByTagName('ul')[0];
	var aLi=oUl.getElementsByTagName('li');
	var oTab=document.getElementsByClassName('js-tab')[0];
	var aItem=oTab.getElementsByClassName('tabItem');
	var aA=document.getElementsByClassName('navA')
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
		}
		aLi[i].onmouseleave=function(){
			var ss=this.index;
			this.style.background="#c81623";
			aA[this.index].style.color="#fff"
			timer=setTimeout(function(){
				aItem[ss].style.display="none";
			},50);
		}
		aItem[i].onmouseenter=function(){
			clearTimeout(timer);
			aA[this.index].style.color="#c81623";
			this.style.display="block";
			aLi[this.index].style.background="#fff";
		}
		aItem[i].onmouseleave=function(){
			this.style.display="none";
			aA[this.index].style.color="#fff";
			aLi[this.index].style.background="#c81623";
		}
	}
	$("#allGood").click(function(){
		$(".page5").show()
	})

	$(".page5").mouseleave(function(){
		$(".page5").hide()
	})
	//====================================商品介紹切換
	var SPJS_li=document.getElementById("SPJS").getElementsByTagName("li");
	for(var i=0;i<SPJS_li.length;i++){
		SPJS_li[i].index=i;
		SPJS_li[i].onclick=function(){
			for(var j=0;j<SPJS_li.length;j++){
				SPJS_li[j].className="";
			}
			this.className="SPJS_ac";
		}
	}




















})