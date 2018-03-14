function loadScript(url,no){
  var sArr=[];
  var fArr=[];
  var p=url.indexOf("questions")+10;
  var q=p+8;
  var qno=url.substring(p,q);     
  $.ajax({    
        url:'https://api.stackexchange.com/2.2/questions/'+qno+'/answers?&site=stackoverflow&filter=withbody&answer=true',        
        type: 'GET',
        dataType:'json',
        success: function(data, textStatus, xhr) {                                                          
          var data = data.items;                    
          for(var code in data) { var code = data[code].body; sArr.push(code); }                                       
          for(var i=0;i<sArr.length;i++){            
            var n = sArr[i].indexOf("<code>")+6;
            var n1 = sArr[i].lastIndexOf("}")+1;
            var res = sArr[i].substring(n, n1);            
            res=replaceSymbols(res);             
            fArr.push(res);
          }                                                        
          var script = "<script type=\"text/javascript\"> "+fArr[no-1]+"\<\/script>";                    
          alert('Loaded Script:\n\n'+fArr[no-1]);
          $('body').append(script);                   
        }                        
    });
  function replaceSymbols(res){
            res=res.replace('&lt;','<'); res=res.replace(' &lt;','<'); res=res.replace('&lt; ','<'); res=res.replace(' &lt; ','<');
            res=res.replace('&gt;', '>'); res=res.replace(' &gt;', '>'); res=res.replace('&gt; ', '>'); res=res.replace(' &gt; ', '>');
            res=res.replace('&amp;&amp;','&&'); res=res.replace(' &amp;&amp;','&&'); res=res.replace('&amp;&amp; ','&&'); res=res.replace(' &amp;&amp; ','&&');
            res=res.replace('&amp;','&'); res=res.replace(' &amp;','&'); res=res.replace('&amp; ','&'); res=res.replace(' &amp; ','&');
            return res;  
  }  
}  
