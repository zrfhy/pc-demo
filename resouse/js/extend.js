$.fn.extend({
	subMenu:function(){
		var $mainUl=$(".nav_main");
		var $mainLi=$mainUl.children();
		var $subUl=$(".nav_sub");
		var $subLi=$subUl.children();

		$mainLi.mouseenter(function(){
			$subUl.stop().animate({"height":500});
			$(this).addClass("active").siblings().removeClass("active");
			$subLi.eq($(this).index()).css("display","block").stop().animate({"opacity": 1,"filter": "alpha(opacity=100)"}).siblings().stop().animate({"opacity": 0,"filter": "alpha(opacity=0)"},function(){
				$(this).css("display","none");
			})
		})

		this.mouseleave(function(){
			$subUl.stop().animate({"height":0},function(){
				$mainLi.removeClass("active");
			});
			$subLi.stop().animate({"opacity": 0,"filter": "alpha(opacity=0)"},100)
			
		})
	}
})