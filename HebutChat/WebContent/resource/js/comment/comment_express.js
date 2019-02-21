//表情
	(function($){
	var expdata = {
		'拜拜':'resource/img/comment/express/88_org.gif',
		'鄙视':'resource/img/comment/express/bs2_thumb.gif',
		'闭嘴':'resource/img/comment/express/bz_thumb.gif',
		'刺激':'resource/img/comment/express/cj_thumb.gif',
		'疯了':'resource/img/comment/express/crazya_org.gif',
		'真棒':'resource/img/comment/express/good_org.gif',
		'讨厌':'resource/img/comment/express/hatea_org.gif',
		'抠鼻':'resource/img/comment/express/kbsa_org.gif',
		'哭了':'resource/img/comment/express/kl_thumb.gif',
		'大笑':'resource/img/comment/express/laugh.gif',
		'爱情':'resource/img/comment/express/lovea_org.gif',
		'悲剧':'resource/img/comment/express/sada_thumb.gif',
		'害羞':'resource/img/comment/express/shamea_thumb.gif',
		'微笑':'resource/img/comment/express/smilea_thumb.gif',
		'露牙':'resource/img/comment/express/tootha_org.gif',
		'笑哭':'resource/img/comment/express/xiaoku_org.gif',
		'调皮':'resource/img/comment/express/zy_thumb.gif',
		'小狗':'resource/img/comment/express/doge_org.gif'
	};

	var $exp_list = $('.exp_list'),
		html = "";

	for(var key in expdata){
		html += '<li title="'+key+'"><img src="'+expdata[key]+'" alt=""></li>';
	}

    $exp_list.find('ul').html(html);
   
    $exp_list.delegate("li", "click", function(e){
    	var title = '['+$(this).attr("title")+']';
    	$("#views").val($("#views").val()+title);

    	e.stopPropagation();
    });
    
    $(' .close').click(function(){
    	$exp_list.fadeOut();
    })

    window.expdata = expdata;
})(jQuery);
