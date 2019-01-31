
//重置输入框
	function reset(){
		$("#views").val("");         
        $("#limit").html(140);
        var btn = document.getElementById("btn"),
            textarea = document.getElementById("views");
        btn.style="background-color:#DDDDDD";   
        $("#views").focus();    		
	}

//提交评论信息
	function subComment(){
			var comment_content = $("#views").val();
			var comment_time = new Date()
            	// year = date.getFullYear(),
            	// month = date.getMonth()+1,
            	// day = date.getDay(),
            	// hour = date.getHours(),
            	// minute = date.getMinutes(),
            	// second = date.getSeconds();
			if(comment_content == ""){
				alert("内容不能为空");
				return;
			}
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
			    		 reset();
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

//获取焦点、输入字数限制
    $(function(){

    	 $("#views").focus(function(){
        	$(this).parent().addClass( 'focus' );
   			 }).blur(function(){
        	$(this).parent().removeClass( 'focus' );
    	 });


		 $("#views").keydown(function(e)
		 {
        	var code = e.charCode || e.which || e.keyCode;
        	var text = $(this).val(),
               	len = text.length,
            	limit = 140,
            	s = limit-len,
            	$limit = $("#limit");
            var num = document.getElementById("limit");
            var btn = document.getElementById("btn");
            if(s>=140)
            {
            	btn.style="background-color:#DDDDDD";
            }
            else btn.style="background-color:#1890FF";
            if(s>10)
            {
            	num.style.color = "black";
            }
            if(s<=10)
            {
            	num.style.color = "red";
            }
        	if(s<0){
            	alert("警告：内容已超过140字");
        	}
        	s = s<=0 ? 0 : s;
        	$("#limit").html(s);
    	 });
 	 
	})

