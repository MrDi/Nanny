jQuery(document).ready(function(){

var ErrorMail = true;

var index = 0;
var click_id=0;

 var jVal = {
               
                'f_mail' : function(index) {
             
                        var ele = jQuery("#form"+index+" .email");
                        ErrorMail = true;
                  
                        
                        if(ele.val() != '') {
                            var pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
                            if(pattern.test(ele.val())){
                                ele.css('border-bottom','1px solid green');
                                ErrorMail = false;
                              
                                
                            } else {
                                ele.css('border-bottom','1px solid red');
                                ErrorMail = true;
                               
                            }
                            } else {
                                ele.css('border-bottom','1px solid red');
                                ErrorMail = true;
                              
                            }
                         
                },
                'sendIt':function() {
                    
                           //jQuery('#jform').submit(); 
                }
 }


jQuery(".phones,.form-control.phone").mask("+7 (999) 999-99 99");
    
jQuery.change_form = function(index){
   /* jQuery("#form"+index+" .name").change(function(){ jVal.f_userName(index); });*/
    jQuery("#form"+index+" .email").change(function(){ jVal.f_mail(index); });
    
}

//Кликаем на красную кнопку, получам её id
jQuery(".my_feed_button").click(function(e){
   
    click_id =e.target.id;
    click_id = click_id.substr(11);
    
    e.preventDefault();
  
    jVal.f_mail(click_id);
    jQuery.change_form(click_id);
    if(!ErrorMail){
       jQuery.ajax({
            url: "templates/lemon/php/form.php",
            type: "POST",
            cache: false,//url-адрес, по которому будет отправлен запрос
            dataType: "html", //“ип данных
            data: jQuery("#form"+click_id).serialize(), 
            success:function(html){
             
             jQuery("#form"+click_id+" .name").val("");
             jQuery("#form"+click_id+" .email").val("");
             jQuery("#form"+click_id+" .phones").val("");
             jQuery("#form"+click_id+" .phone").val("");
             jQuery("textarea").val("");
             
             jQuery('#modal').removeClass('show_modal');
                
            
             jQuery('.ok').css("display","block").delay(900).animate({opacity:0},1000,function(){
             jQuery('.ok').css("display","none");
             jQuery('.ok').css("opacity","1");
             jQuery("#form"+click_id+" .name").css('border-bottom','');
             jQuery("#form"+click_id+" .message").css('border-bottom','');
             jQuery("#form"+click_id+" .email").css('border-bottom','');
             
          
             ErrorMail = true;
                 
             });
             
             
            },
            error:function (xhr, ajaxOptions, thrownError){
                console.log("”пс"); //выводим ошибку
            }
        });
    }
    else {
        return false;
    }
    
});


jQuery.change_form(1);
jQuery.change_form(2);
jQuery.change_form(3);







});