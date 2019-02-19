//滚动事件代码(更改标题栏文字)
$(window).scroll(function () {
	 if ($(this).scrollTop() > 0){
	 	var username = $("#username").text();
	 	$("#title_text").html('<div id="title_text" class="titletext">username<img class="guanzhu" src="resource/img/comment/加关注 (1).png" width="55px" height="20px"></div>');
	 }
	 else{
	 	$("#title_text").text("微博正文");
	 }   
})

$(function(){
	//评论窗口
	var flag = 0; //标记评论窗口是否已经调出
	$("#bot_pinglun").click(function() {
		$(".bottom_list").hide();
		$("#comment_area").show();
	    $("#comment_area_top textarea").focus();
	    cover.style.display="block";
	    flag = 1;
	});
	$("#cover").click(function() {
		cover.style.display="none";
		$("#comment_area").hide();
		$(".bottom_list").show();
	});
	$(window).scroll(function() {
		if(flag==1) {
		cover.style.display="none";
		$("#comment_area").hide();
		$(".bottom_list").show();
		flag = 0;
		}
	});

	//窗口扩展

	$("#extend_window").click(function() {
		$(".bg").hide();
		comment_area_extend.style.display="block";
		$("#comment_area_mid_extend textarea").focus();
		$(window).scrollTop(0);
	});
	$("#close").click(function() {
		comment_area_extend.style.display="none";
		$(".bg").show();
		cover.style.display="none";
		$("#comment_area").hide();
		$(".bottom_list").show();
	});

	//点击字体效果（评论、转发、赞）

	$("#zhuanfa_show").click(function() {
		$('#zhuanfa_content').show();
		$('#talking_content,#dianzan_content').hide();
		$('#line_zhuanfa').attr('src', 'resource/img/comment/下划线.png');
		$('#line_zan,#line_pinglun').attr('src', 'resource/img/comment/下划线 (1).png');
		$('#zhuanfa_show span,#zhuanfa_num').css({'color':'black','font-weight':'bold'});
		$('#pinglun_show span,#pinglun_num,#dianzan_show span,#dianzan_num').css({'color':'gray','font-weight':'normal'});
	});
	$("#pinglun_show").click(function() {
		$('#talking_content').show();
		$('#dianzan_content,#zhuanfa_content').hide();
		$('#line_pinglun').attr('src', 'resource/img/comment/下划线.png');
		$('#line_zan,#line_zhuanfa').attr('src', 'resource/img/comment/下划线 (1).png');
		$('#pinglun_show span,#pinglun_num').css({'color':'black','font-weight':'bold'});
		$('#zhuanfa_show span,#zhuanfa_num,#dianzan_show span,#dianzan_num').css({'color':'gray','font-weight':'normal'});
	});
	$("#dianzan_show").click(function() {
		$('#dianzan_content').show();
		$('#talking_content,#zhuanfa_content').hide();
		$('#line_zan').attr('src', 'resource/img/comment/下划线.png');
		$('#line_zhuanfa,#line_pinglun').attr('src', 'resource/img/comment/下划线 (1).png');
		$('#dianzan_show span,#dianzan_num').css({'color':'black','font-weight':'bold'});
		$('#zhuanfa_show span,#zhuanfa_num,#pinglun_show span,#pinglun_num').css({'color':'gray','font-weight':'normal'});
	});

	//点赞效果
	var zan = 0;
    $(".bottom_zan").click(function() {
    	if(zan == 0){
    		$(".bottom_zan img").attr('src', 'resource/img/comment/点赞按.png');
    		zan = 1;
    	}
    	else{
    		$(".bottom_zan img").attr('src', 'resource/img/comment/点赞.png');
    		zan = 0;
    	}
    	
    });


	//监听输入

	//按钮颜色变化
     $("#comment_content_2").keydown(function(e)
		 {
        	var text = $(this).val(),
               	len = text.length-1;
            if(len <= 0)
            {
            	$("#send_btn button").removeClass('send_btn_active');
            	$("#send_btn button").addClass('send_btn_unactive');
            	$("#send_btn button").attr('disabled', 'true');
            }
            else
            {
            	$("#send_btn button").removeClass('send_btn_unactive');
            	$("#send_btn button").addClass('send_btn_active');
            	$("#send_btn button").removeAttr('disabled');  	
            }
     }); 

      $("#comment_content_1").keydown(function(e)
		 {
        	var text = $(this).val(),
               	len = text.length-1;
            if(len>0)
            {
            	$("#send").css({"color":"#EE7621","cursor":"pointer"});
            }
            else
            {
            	$("#send").css({"color":"silver","cursor":"not-allowed"});
            }

     }); 

    //提交按钮

    //小窗口提交
    $("#send").click(function() {
    	var content = $("#comment_content_1").val();
    	if(content != ""){
    		subComment_1();
    	}
    });
    //大窗口提交
    $("#send_btn button").click(function() {
    	var content = $("#comment_content_2").val();
    	if(content != ""){
    		subComment_2();
    	}
    });
	
})
	
	
//提交评论信息函数
//分为小窗口提交(_1)和大窗口提交(_2)

//小窗口提交
	function subComment_1(){
			var comment_content = $("#comment_content_1").val();
			var comment_time = new Date()
            	// year = date.getFullYear(),
            	// month = date.getMonth()+1,
            	// day = date.getDay(),
            	// hour = date.getHours(),
            	// minute = date.getMinutes(),
            	// second = date.getSeconds();
			$.ajax({
			      url: "comment", // 要请求的地址
			      type:"POST",
			      dataType: "json",// 服务器返回的数据类型，可能是文本 ，音频 视频 script 等浏览 （MIME类型）器会采用不同的方法来解析。
			      data:{ //发送到服务器的数据。将自动转换为请求字符串格式。GET 请求中将附加在 URL 后。查看 processData 选项说明以禁止此自动转换。必须为 Key/Value 格式。如果为数组，jQuery 将自动为不同值对应同一个名称。如 {foo: ["bar1", "bar2"]} 转换为 "&foo=bar1&foo=bar2"。
			        "time":comment_time,
			     	"content":comment_content,
			     	"type":"submit"
			      },
			     success:function(data){
			    	 if(data.status == "success"){
			    		 alert("发送成功");
			    		 $("#send").css({"color":"silver","cursor":"not-allowed"});
			    	  	 $("#comment_content_1").val("");	
			    	     $("#cover").click();	 
			    	 }else{
			    		 alert("发送失败");
			    	 } 	 
			     },
			     error:function(){
			    	 alert("网络错误,请稍后重试");	
			    	 // $("#send").css({"color":"silver","cursor":"not-allowed"});
			    	 // $("#comment_content_1").val("");	
			    	 // $("#cover").click();	
			         //console.log(e)//请求失败是执行这里的函数
			     }
			});			
	}	

//大窗口提交
	function subComment_2(){
			var comment_content = $("#comment_content_2").val();
			var comment_time = new Date()
            	// year = date.getFullYear(),
            	// month = date.getMonth()+1,
            	// day = date.getDay(),
            	// hour = date.getHours(),
            	// minute = date.getMinutes(),
            	// second = date.getSeconds();
			$.ajax({
			      url: "comment", // 要请求的地址
			      type:"POST",
			      dataType: "json",// 服务器返回的数据类型，可能是文本 ，音频 视频 script 等浏览 （MIME类型）器会采用不同的方法来解析。
			      data:{ //发送到服务器的数据。将自动转换为请求字符串格式。GET 请求中将附加在 URL 后。查看 processData 选项说明以禁止此自动转换。必须为 Key/Value 格式。如果为数组，jQuery 将自动为不同值对应同一个名称。如 {foo: ["bar1", "bar2"]} 转换为 "&foo=bar1&foo=bar2"。
			        "time":comment_time,
			     	"content":comment_content,
			     	"type":"submit"
			      },
			     success:function(data){
			    	 if(data.status == "success"){
			    		 alert("发送成功");
			    		 $("#send_btn button").removeClass('send_btn_active');
            			 $("#send_btn button").addClass('send_btn_unactive');
            	    	 $("#send_btn button").attr('disabled', 'true');
            	    	 $("#comment_content_2").val("");	
            	    	 $("#close").click(); 
			    	 }else{
			    		 alert("发送失败");
			    	 } 	 
			     },
			     error:function(){
			    	 alert("网络错误,请稍后重试");
			    	 
			         //console.log(e)//请求失败是执行这里的函数
			     }
			});			
	}	

//表情替换
	function replaceStr(str){
          str = $.trim(str);
          var  start = 0,
               html = "",
               t = str.length,
               i, j;
          for(i=0; i<t-3; i++)
           {
            	if(str[i]=='[' && str[i+3]==']'){
                	j = str.substring(i+1, i+3);
                	html += str.substring(start, i);
                 	if(typeof window.expdata[j] !== 'undefined'){
                    html += '<img src="'+window.expdata[j]+'" alt="exp" />';
                }else{
                    html += str.substring(i, i+4);
                }
                i = i+3;
                start = i+1;
             }        
           }
         html += str.substring(start, t);
         return html;
    }



