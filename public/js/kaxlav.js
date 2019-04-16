  function escapeRegExp(string) {
    return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}
 function replaceAll(string, find, replace) {
  return string.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}

$.fn.yyyymmddhhmmss = function(previousDay) {
    var newDate = new Date();
    var curDate = new Date();
    curDate.setDate(newDate.getDate() - previousDay);
    var yyyy = curDate.getFullYear();
    var mm = curDate.getMonth() < 9 ? "0" + (curDate.getMonth() + 1) : (curDate.getMonth() + 1); // getMonth() is zero-based
    var dd  = curDate.getDate() < 10 ? "0" + curDate.getDate() : curDate.getDate();
    var hh = curDate.getHours() < 10 ? "0" + curDate.getHours() : curDate.getHours();
    var min = curDate.getMinutes() < 10 ? "0" + curDate.getMinutes() : curDate.getMinutes();
    var ss = curDate.getSeconds() < 10 ? "0" + curDate.getSeconds() : curDate.getSeconds();
   return "".concat(yyyy).concat("-").concat(mm).concat("-").concat(dd).concat(" ").concat(hh).concat(":").concat(min).concat(":").concat(ss);
  };

$.fn.previousWeek =function (){
    var today = new Date();
    var nextweek = new Date(today.getFullYear(), today.getMonth(), today.getDate()-7);
    return nextweek;
};
  $.fn.signOut = function(){
         $.fn.setLoadingDialog();
        $.fn.showDialog('<span style="font-weight:bold; font-size:17px;position:relative;left:30px; font-color:bblack">Signing Out </span>');      
         var xmlhttp =null;
         if (window.XMLHttpRequest){
                        xmlhttp=new XMLHttpRequest();

            } else  {

                    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
            }
          var paramString ='';
          paramString += '&p=logout&quit_sess=yes';         
          var   formTarget= '/kayxlav';
          
	 xmlhttp.onreadystatechange =     function (){
	 if (xmlhttp.readyState==4 && xmlhttp.status==200){
	 var  response = xmlhttp.responseText;
		response = response.trim();
                
                if(response.substring(0,8)==='Redirect'){
                    try {
                          $.session.clear();
                           window.sessionStorage.clear();
                } catch (e) {
                for (var i in window.sessionStorage) {
                    window.sessionStorage.removeItem(i);
                }
            }
		var responseData =response.split(":");
		window.location=responseData[1];
		}		
	 }
	};
        xmlhttp.open("POST",formTarget,true);  
	xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	xmlhttp.send(paramString);    
               };
     $.fn.checkAccess = function (){     
                   var startTimeField =  document.getElementById('start-time');
                   var startTime = (startTimeField!==null)? new Date (parseFloat(startTimeField.value)):new Date();
		           var userName = document.getElementById('user-name');
                   var userName = (userName!==null)? userName:'';

                   var todaysDate = new Date();
                   var currentTimeVal =todaysDate.getTime();
                   var startTimeVal =startTime.getTime();
                   var name =userName.value;
                   var minutes =   document.getElementById('time-out').value;
                   var duration = parseInt(minutes) *1000 * 60;
                  // alert('current time: '+currentTimeVal+' \n start time: '+startTimeVal+' \n grace period: '+duration+' \n Difference: '+(currentTimeVal - startTimeVal));
                   var isAlreadyShowing = document.getElementById('dialog-message-div').offsetHeight>0;
                  if((currentTimeVal - startTimeVal) >= duration && !isAlreadyShowing){
                                $.fn.lockSession();
                                var loginFormData = $.fn.getLockDialog();
                                var header = '<span align="center" style="font-weight:bold; font-size:20px;">&nbsp;&nbsp;&nbsp;&nbsp;Session Locked</span>';
                                $('#dialog-message-div').html(loginFormData);
                                $('#dialog-ok-bttn').hide();
                                $('#close-dialog-cross').hide();
                                $('#dialog-no-bttn').hide();
                                $('#dialog-yes-bttn').hide();
                                $('#dialog-close-bttn').hide();  
                                $('#dialog-login-message').html('<span style="font-color:green;posiltion:relative; left:80px;">Use your user credentials to unlock this session</span>');
                                $('#dialog-login-message').show();
                                $.fn.showDialog(header);
                                $('#dialog-username-id').val('username');
                                $('#dialog-password-id').val('password');
     
                   }
                };  
   $.fn.getLockDialog = function(){
      
                        var loginFormData = '<div id="dialog-login-div" style="min-width:400px"><div class="alert alert-info" id="dialog-login-message" align="center"></div>'+
                            '<form id="dialog-login-form">'+
                            '<div class="input-prepend" title="Username" data-rel="tooltip" id="dialog-username-div">'+
                            ' <span class="add-on"><i class="icon-user"> </i>&nbsp;&nbsp;&nbsp;</span><input class="form-control span5" id="dialog-username-id" name="dialog_username" type="text"  align="center"/>'+
                            '<span class="help-inline" style="display:none;" id="dialog-user-message">This value is not allowed<br></span>'+
                            '</div><div class="clearfix"></div>'+
                            '<div class="input-prepend" title="password" data-rel="tooltip" id="dialog-password-div">'+
                            ' <span class="add-on"><i class="icon-lock"></i>&nbsp;&nbsp;&nbsp;</span>'+
                            '<input class="form-control span5" id="dialog-password-id" name="dialog_password" value="" type="password" align="center"/>'+
                            '<span class="help-inline" style="display:none;" id="dialog-password-message">This value is not allowed<br></span>'+
                            '</div> <div class="clearfix"></div>'+
                            '<br /><br />'+
                            '<div id="dialog-submit-form-loader" style="display:none;" align="center">'+
                            '<img src="img/ajax-loaders/ajax-loader-7.gif" title="img/ajax-loaders/ajax-loader-7.gif" />'+
                            '</div>'+
                            '<div align="center"><button class="btn btn-large btn-warning" onclick="$.fn.signOut()">Sign Out</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button class="btn btn-large btn-info" id="dialog-login-form-submit-bttn">Unlock</button></div>';
                            '<!--<input type ="hidden" name="p" value ="login" id="p" /><input type ="submit" name="submit" id="dialog-form-submit" />--></form></div>'		
                        ;
                        return loginFormData;
                };
                
               
$('#dialog-login-form-submit-bttn').on( 'click',
        function(e){
             e.preventDefault();
             $('#dialog-login-form').submit();
        }
          );
$.fn.capitalizeFirstLetter = function (string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
};
$.fn.splitnCapitalizeFirstLetter = function ( rawStr, delimeter) {
    var str="";
    var dat = rawStr.split(delimeter);
    for (var info1 in dat ){
        
      str+=dat[info1].charAt(0).toUpperCase() + dat[info1].slice(1)+" "; 
        
        
    }
    str = str.substring (0,str.length-1 );
    return str;
};

/** Button Click Section **/
                $('#client-table-bttn').click(function(e){                  
                    e.preventDefault();
                     
                });
                 $('#new-client').click(function(e){

                    e.preventDefault();
                        
                });
               $('#new-reservation').click(function(e){
                    e.preventDefault();
                              
                });
                  $('#all-clients').click(function(e){
                    e.preventDefault();
                    
                });
                $('#cancel-bttn').click(function(e){
                    e.preventDefault();
                     $('#client-form').find('input, text').each(function(){
                         $(this).attr('value','');
                    });          
    }); 
    
                
 function isAlphabetic(field) { 

	var letters = /^[A-Za-z]+$/;
	if(field.value.match(letters)) {
		return true;
	} else {
	
	//showAlert('Username must have alphabet characters only');
	return false;
	}

}
function isValidPage(field) { 

	var letters = /^\w+\s*[\-]*\w+\s*$/;
	if(field.value.match(letters)) {
		return true;
	} else {
	
	//showAlert('Username must have alphabet characters only');
	return false;
	}

}
function isValidPhoneNumber(field) {     
	//var phoneNoformat =  /^[\+]?\(?([0-9]{3})\)?([\-.,\s ])?([0-9]{3})([\-.,\s ])?([\-., \s])?([0-9]{3})([\-.,\s ])?([0-9]{4})$/;
	var phoneNoformat = /^[\+]?[\(]?[\d]+[\)[\s*\-?\s*\d+\s*\-?\s*\d]+[\s]*$/g;
        
 if(field.value.match(phoneNoformat)) {
		return true;
	} else{	

		return false;
	}
        return false;
}
function isAlphanumeric(field) {

	var letters = /^[0-9a-zA-Z,\s]+$/m;
	if(field.value.match(letters)) {
	   return true;
	} else {
	
	//showAlert('User address must have alphanumeric characters only');
	return false;
	}
	
	
}
function isAlphanumSpecial(field) {

	//var specialChars = /^[!,\",£,$,%,^,&,(,), [\+],[\-],@,~,#,<,>,|]*/m;
	//var data = /^[0-9a-zA-Z,\s]([\-]?[0-9a-zA-Z,\s])*$/m;
       // showAlert(field.value
        var data = /^[0-9,a-z,A-Z,!,£,$,%,^,&,(,),@,~,#,<,>,|,.,\s,:,/,;,\[,\]]+[\+]*[\-]*[0-9,a-z,A-Z,!,£,$,%,^,&,(,),@,~,_,#,<,>,|,.,\s,:,/,;,\[,\]]*$/m;
	if(field.value.match(data)) {     
	   return true;
	} else {
	//showAlert('User address must have alphanumeric characters only');
	return false;
	}
	
	
}

function isValidPass(field) {

  if(isNumeric(field)) return false;
  if(isAlphabetic(field)) return false;
  if(isAlphanumSpecial(field)){
             
                return true;
                
            }	
            else return false;
}

function isNumeric(field) { 

	var numbers = /^[\d,\d.\d]+$/m;
	if(field.value.match(numbers)) {
		return true;
	} else {
		//showAlert('ZIP code must have numeric characters only');
		//field.focus();
		return false;
	}
}
function isValidPrice(field) { 

	var numbers = /^[0-9]*(\.)?([0-9]{2})+$/m;
	if(field.value.match(numbers)) {
		return true;
	} else {
		//showAlert('ZIP code must have numeric characters only');
		field.focus();
		return false;
	}
}


function isValidEmail(field) {

	var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	if(field.value.match(mailformat))
	{
		return true;
	} else{	
	//showAlert("You have entered an invalid email address!");
		return false;
	}
} 

function   trimString(string) {
  return string.replace(/^\s+|\s+$/g,"");
}
function isValidEmailSet(field, name) {

	var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		var emailAddressSet = field.value;
		var addressees = emailAddressSet.split(';');
		var i=0;
		var invalidAddresses= "";
        var tempAddy="";
		for(i=0; i < addressees.length; i++){
  tempAddy =  addressees[i].trim();
          
          if(tempAddy.length!==0)

				if(!addressees[i].match(mailformat)){
					if(invalidAddresses.length===0)invalidAddresses+=addressees[i];
					else invalidAddresses+=", "+addressees[i];
				}
          }

	
	if(invalidAddresses.length!==0){
	
		showAlert('The list below shows the addresses in the \"'+name+'\" field which are not valid: \n '+invalidAddresses);
		return false;
	}else{
	
		return true;
	}
} 

function isValidDate(fld) {
    var mo, day, yr;
    var entry = fld.value.substring(0,10);
    entry = entry.substring(8,10)+'/'+entry.substring(5,7)+'/'+entry.substring(0,4);
    var reLong = /\b\d{4}[\/-]\d{1,2}[\/-]\d{1,2}\b/;
    var reShort = /\b\d{2}[\/-]\d{1,2}[\/-]\d{1,4}\b/;
    var valid = (reLong.test(entry)) || (reShort.test(entry));
    if (valid) {
        var delimChar = (entry.indexOf("/") !== -1) ? "/" : "-";
        var delim1 = entry.indexOf(delimChar);
        var delim2 = entry.lastIndexOf(delimChar);
//        yr = parseInt(entry.substring(0, delim1), 10);
//        mo = parseInt(entry.substring(delim1+1, delim2), 10);
//        day = parseInt(entry.substring(delim2+1), 10);
        day = parseInt(entry.substring(0, delim1), 10);
        mo = parseInt(entry.substring(delim1+1, delim2), 10);
        yr = parseInt(entry.substring(delim2+1), 10);
        // handle two-digit year
        if (yr < 100) {
            var today = new Date( );
            // get current century floor (e.g., 2000)
            var currCent = parseInt(today.getFullYear( ) / 100) * 100;
            // two digits up to this year + 15 expands to current century
            var threshold = (today.getFullYear( ) + 15) - currCent;
            if (yr > threshold) {
                yr += currCent - 100;
            } else {
                yr += currCent;
            }
        }
        var testDate = new Date(yr, mo-1, day);
        if (testDate.getDate( )===day) {
            if (testDate.getMonth( ) + 1===mo) {
                if (testDate.getFullYear( )===yr) {
                    // fill field with database-friendly format
                   // fld.value = mo + "/" + day + "/" + yr;
                    return true;
                } else {
                    $.fn.showDialog("There is a problem with the year entry.");
                }
            } else {
                $.fn.showDialog("There is a problem with the month entry.");
            }
        } else {
            $.fn.showDialog("There is a problem with the date entry.");
        }
    } else {
        $.fn.showDialog("Incorrect date format. Enter as mm/dd/yyyy.");
    }
    return false;
}

    window.onpopstate = function(e){
    if(e.state){
       
        document.title = e.state.pageTitle.replace('#','');
    }
};//                  $.fn.toggleCheckboxes = function(e)
$(document).ready(function(){ 

     $.fn.ajaxFormSubmit =  function(formTarget,paramString, nextPage){
        $('#submit-form-loader').show();
        var isFormDataValid = document.getElementById('is-form-data-valid').value;
        var response ="";
        var targetComps = formTarget.split('_');
        var tempEntStore = targetComps[0].split('/');
        var entity = tempEntStore[(tempEntStore.length-1)];
        var xmlhttp =null;
       
       if(isFormDataValid==='YES'){
            if (window.XMLHttpRequest){
                       xmlhttp=new XMLHttpRequest();
            } else  {
                    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
            }
            
            xmlhttp.onreadystatechange =     function (){
            if (xmlhttp.readyState===4 && xmlhttp.status===200){
              response = xmlhttp.responseText;
              var respInt = parseInt(response);
               document.getElementById('dialog-header-span').innerHTML='<img src="img/unna_medium.png" alt="UNNA Journals logo" /> <span align="center" style="font-weight:bold; font-size:20px;">New '+entity+' Check</span>';
                document.getElementById('dialog-message-div').innerHTML=response;
                $('#dialog-ok-bttn').hide();
                $('#myModal').modal('show'); 
            if(respInt===1){
                document.getElementById('dialog-header-span').innerHTML='<img src="img/unna_medium.png" alt="UNNA Journals logo" /> <span align="center" style="font-weight:bold; font-size:20px;">New '+entity+' Check</span>';
                document.getElementById('dialog-message-div').innerHTML=nextPage;
                $('#dialog-ok-bttn').hide();
                $('#dialog-close-bttn').hide();
                $('#myModal').modal('show');  
            } else {
                document.getElementById('dialog-header-span').innerHTML='<img src="img/unna_medium.png" alt="UNNA Journals logo" /> <span align="center" style="font-weight:bold; font-size:20px;">New '+entity+' Check</span>';
                document.getElementById('dialog-message-div').innerHTML=response;
                $('#dialog-ok-bttn').hide();
                $('#myModal').modal('show');                                                                                                     
            }
            $('#submit-form-loader').hide();
                    }
            };
              //  xmlhttp.open("GET","../dashboard/functions/ajax/request_handler.php?r=gen_search_list&gen_search_str="+genSearchStr+"&gen_search_opt="+genSearchOption,true);//php file
                xmlhttp.open("POST",formTarget,true);  
                xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
		xmlhttp.send(paramString);

					};
					};

      $.fn.showExtraOptions = function(){
	
		var indexStart = 0;
		var totalItems = $('#total-items').val();
		totalItems = parseInt(totalItems);		
		var isCheckedCounter = 0;
		var isUncheckedCounter = 0;
		var i =0;
		var isChecked =null;
                var checkBoxStr =null;

           //     var isToggleChecked =document.getElementById('is-checked');
              
		for(i =indexStart; i<totalItems; i++){
                   checkBoxStr =  'item-check-'+(parseInt(i));
                  //  alert(checkBoxStr);
			 //isChecked = document.getElementById(checkBoxStr).checked;
                        isChecked = $('#'+checkBoxStr).prop("checked");
			if(isChecked){
				++isCheckedCounter;
                                $('#item-check-'+checkBoxStr).prop("checked",true);
			}else if(!isChecked){
				++isUncheckedCounter;	
                                  $('#item-check-'+checkBoxStr).prop("checked",false);
			}
			
		}
            
          
if(isCheckedCounter >= 1){
                          
                           $('#extra-options').show();
                           
                      }else {
                          
                           $('#extra-options').hide();
                      }
                    };
                    $.fn.setConfirmation = function(){
                       
                       $('is-confirmed').attr('value', 1);  
                   };
                    
                   $.fn.unSetConfirmation = function(){
                       $('is-confirmed').attr('value', 0);  
                       
                   };
 $.fn.deleteEntry =  function(name, id,index){
                    var currentDataType = document.getElementById('upload-data').value;
		    var    header = '<span align="center" style="font-weight:bold; font-size:20px;float: center;">Remove '+currentDataType+'</span>';
	            var tableContentsField = document.getElementById('information-table-contents');
	            var tableContents = tableContentsField.value;
                   
	           if (tableContents==='clients'){  
                      
                    $('#dialog-message-div').html('Are you sure you want to delete <strong><em>'+name+'('+id+')</em></strong>?');
                             $('#dialog-ok-bttn').hide();
                             $('#dialog-close-bttn').hide();
                             $('#submit-form-loader').hide();
                             $('#dialog-bttns').html('<button class="btn btn-large btn-danger" onclick="$.fn.closeDialog()" id="dialog-no-bttn">No</button><button class="btn btn-large btn-success" onclick="$.fn.deleteClient(\''+name+'\',\''+id+'\',\''+index+'\' )" id="dialog-yes-bttn">Yes</button>');
                             $.fn.showDialog(header);
                    }else if(tableContents==='users'){
                            $('#dialog-message-div').html('Are you sure you want to delete <strong><em>'+name+'('+id+')</em></strong>?');
                            $('#dialog-ok-bttn').hide();
                            $('#dialog-close-bttn').hide();
                             $('#submit-form-loader').hide();
                             $('#dialog-bttns').html('<button class="btn btn-large btn-danger" onclick="$.fn.closeDialog()" id="dialog-no-bttn">No</button><button class="btn btn-large btn-success" onclick="$.fn.deleteUser(\''+name+'\',\''+id+'\',\''+index+'\' )" id="dialog-yes-bttn">Yes</button>');
                            $.fn.showDialog(header);
                    }else if(tableContents==='sections'){
                            $('#dialog-message-div').html('Are you sure you want to delete <strong><em>'+name+'('+id+')</em></strong>?');
                            $('#dialog-ok-bttn').hide();
                            $('#dialog-close-bttn').hide();
                             $('#submit-form-loader').hide();
                             $('#dialog-bttns').html('<button class="btn btn-large btn-danger" onclick="$.fn.closeDialog()" id="dialog-no-bttn">No</button><button class="btn btn-large btn-success" onclick="$.fn.deleteSection(\''+name+'\',\''+id+'\',\''+index+'\' )" id="dialog-yes-bttn">Yes</button>');
                            $.fn.showDialog(header);
                    }	else if(tableContents==='setting'){
                            $('#dialog-message-div').html('Are you sure you want to delete <strong><em>'+name+'('+id+')</em></strong>?');
                            $('#dialog-ok-bttn').hide();
                            $('#dialog-close-bttn').hide();
                             $('#submit-form-loader').hide();
                             $('#dialog-bttns').html('<button class="btn btn-large btn-danger" onclick="$.fn.closeDialog()" id="dialog-no-bttn">No</button><button class="btn btn-large btn-success" onclick="$.fn.deleteSetting(\''+name+'\',\''+id+'\',\''+index+'\' )" id="dialog-yes-bttn">Yes</button>');
                            $.fn.showDialog(header);
                    }else if(tableContents=='email_profiles'){
                            $('#dialog-message-div').html('Are you sure you want to delete <strong><em>'+name+'('+id+')</em></strong>?');
                            $('#dialog-ok-bttn').hide();
                            $('#dialog-close-bttn').hide();
                             $('#submit-form-loader').hide();
                             $('#dialog-bttns').html('<button class="btn btn-large btn-danger" onclick="$.fn.closeDialog()" id="dialog-no-bttn">No</button><button class="btn btn-large btn-success" onclick="$.fn.deleteMailProfile(\''+name+'\',\''+id+'\',\''+index+'\' )" id="dialog-yes-bttn">Yes</button>');
                            $.fn.showDialog(header);
                    }
                    
                     $('#dialog-bttns').show();
			   };        
                $.fn.editEntry =  function ( recordID){
	             var tableContentsField = document.getElementById('information-table-contents');
	             var tableContents = tableContentsField.value;
	              if(tableContents === 'clients'){
	                window.location='index.php?p=operations/new_client&mode=edit&type=EXISTING&ind='+recordID;
	            }else if(tableContents === 'users'){
                        window.location='index.php?p=people/new_user&mode=edit&type=EXISTING&ind='+recordID;                       
                    }else if(tableContents === 'sections'){
                        window.location='index.php?p=sections/new_section&mode=edit&type=EXISTING&ind='+recordID;                       
                    }else if(tableContents === 'setting'){
                        window.location='index.php?p=administration/setting_details&mode=edit&type=EXISTING&ind='+recordID;                       
                    }else if(tableContents === 'email_profiles'){
                        window.location='index.php?p=administration/email/email_profile_details&mode=edit&type=EXISTING&ind='+recordID;                       
                    }
        };
              $.fn.viewEntry =  function  (recordInd){
                    recordInd = parseInt(recordInd);
                    
	            var tableContents = $('#information-table-contents').val();
	               if(tableContents === 'Purchase'){
	                  $.fn.getPurchaseForm ('EXISTING',recordInd, false);
                     
	            }else if(tableContents === 'Supply'){
	                  $.fn.getSupplyForm ('EXISTING',recordInd, false);
                     
	            } else if(tableContents === 'Product'){
	                  $.fn.getProductForm ('EXISTING',recordInd, false);
	            }else if(tableContents === 'Role'){
	                  $.fn.getRoleForm ('EXISTING',recordInd, false);
	            }else  if(tableContents === 'Users'){
	                  $.fn.getUserForm('EXISTING', recordInd, false); 
	            }else if(tableContents === 'sections'){
                        window.location='index.php?p=sections/new_section&mode=view&type=EXISTING&ind='+recordInd;                      
                    }else if(tableContents === 'history'){
                        window.location='index.php?p=administration/history_details&mode=view&type=EXISTING&ind='+recordInd;                      
                    }else if(tableContents === 'setting'){
                        window.location='index.php?p=administration/setting_details&mode=view&type=EXISTING&ind='+recordInd;                      
                    }else if(tableContents === 'email_profiles'){
                        window.location='index.php?p=administration/email/email_profile_details&mode=view&type=EXISTING&ind='+recordInd;                      
                    }
        };
             $.fn.deleteClient =  function(clientName, clientID, clientIndex){
                   clientIndex= parseInt(clientIndex);
                   var xmlhttp =null;
              //  document.getElementById('dialog-message-div').innerHTML=  '<div align="center"><img src="img/ajax-loaders/ajax-loader-7.gif" title="img/ajax-loaders/ajax-loader-7.gif"></div>';
                  var tableContents =   $('#client-table-rows').html();
                  $.fn.setLoadingDialog();
       
            if (window.XMLHttpRequest){

                        xmlhttp=new XMLHttpRequest();

            } else  {

                    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
            }
            
            xmlhttp.onreadystatechange =     function (){


                    if (xmlhttp.readyState===4 && xmlhttp.status===200){

                       var  response = xmlhttp.responseText;
				 if(response.toLowerCase().indexOf('success')>=0){
                                         
                                      $.fn.redrawClientTable('%');
                                      document.getElementById('dialog-header-span').innerHTML='<img src="img/unna_medium.png" alt="Unna logo" /> <span align="center" style="font-weight:bold; font-size:20px;float: center;">Successfully removed client: <br /><span align="center" >'+clientName+'</span></span>';
                                      document.getElementById('dialog-message-div').innerHTML='<div align="center">'+response+'</div>';
                                      $('#dialog-close-bttn').show();
                                      $('#myModal').modal('show');
                                      
                                                    // window.location ="index.php?p=operations/clients";
                                                 }
                                                 else {
                                                     
                                      //  $('#myModal').modal('hide');                             
                                     document.getElementById('dialog-header-span').innerHTML='<img src="img/unna_medium.png" alt="Unna logo" /> <span align="center" style="font-weight:bold; font-size:20px;float: center;">Unable to delete client'+clientName+'</span>';
                                    document.getElementById('dialog-message-div').innerHTML=response;
                                      $('#dialog-close-bttn').show();
                                      $('#myModal').modal('show');                                                   
                        }
                        }
   };
                       
          xmlhttp.open("GET","./functions/client_processor.php?del=removal&id="+clientID+"&name="+clientName+"&mode=single&del=removal&ind="+clientIndex);  
     xmlhttp.send();
          		
                };
    $.fn.deleteSetting =  function(settingName, settingID, settingIndex){
                   settingIndex= parseInt(settingIndex);
                   var xmlhttp =null;
             
                  var tableContents =   $('#setting-table-rows').html();
                  $.fn.setLoadingDialog();
       
            if (window.XMLHttpRequest){

                        xmlhttp=new XMLHttpRequest();

            } else  {

                    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
            }
            
            xmlhttp.onreadystatechange =     function (){


                    if (xmlhttp.readyState===4 && xmlhttp.status===200){

                       var  response = xmlhttp.responseText;
				 if(response.toLowerCase().indexOf('success')>=0){
                                         
                                      $.fn.redrawSettingTable('%');
                                      document.getElementById('dialog-header-span').innerHTML='<img src="img/unna_medium.png" alt="Unna logo" /> <span align="center" style="font-weight:bold; font-size:20px;float: center;">Successfully removed Setting: <br /><span align="center">'+settingName+'</span></span>';
                                      document.getElementById('dialog-message-div').innerHTML='<div align="center">'+response+'</div>';
                                      $('#dialog-close-bttn').show();
                                      $('#myModal').modal('show');
                                  }else {
                                                     
                                                         
                                     document.getElementById('dialog-header-span').innerHTML='<img src="img/unna_medium.png" alt="Unna logo" /> <span align="center" style="font-weight:bold; font-size:20px;float: center;">Unable to delete Setting: '+settingName+'</span>';
                                    document.getElementById('dialog-message-div').innerHTML=response;
                                      $('#dialog-close-bttn').show();
                                      $('#myModal').modal('show');                                                   
                        }
                        }

   };
            xmlhttp.open("GET","./functions/setting_processor.php?del=removal&id="+settingID+"&name="+settingName+"&mode=single&ind="+settingIndex);  
            xmlhttp.send();
                 };
                 
 $.fn.deleteMailProfile =  function(profileName, profileId, profileIndex){
                   profileIndex= parseInt(profileIndex);
                   var xmlhttp =null;
             
                  var tableContents =   $('#email-profile-table-rows').html();
                  $.fn.setLoadingDialog();
       
            if (window.XMLHttpRequest){

                        xmlhttp=new XMLHttpRequest();

            } else  {

                    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
            }
            
            xmlhttp.onreadystatechange =     function (){


                    if (xmlhttp.readyState===4 && xmlhttp.status===200){

                       var  response = xmlhttp.responseText;
				 if(response.toLowerCase().indexOf('success')>=0){
                                         
                                      $.fn.redrawSettingTable('%');
                                      document.getElementById('dialog-header-span').innerHTML='<img src="img/unna_medium.png" alt="Unna logo" /> <span align="center" style="font-weight:bold; font-size:20px;float: center;">Successfully removed Email Profile: <br /><span align="center">'+profileName+'</span></span>';
                                      document.getElementById('dialog-message-div').innerHTML='<div align="center">'+response+'</div>';
                                      $('#dialog-close-bttn').show();
                                      $('#myModal').modal('show');
                                       
                                                 }
                                                 else {
                                                     
                                                         
                                     document.getElementById('dialog-header-span').innerHTML='<img src="img/unna_medium.png" alt="Unna logo" /> <span align="center" style="font-weight:bold; font-size:20px;float: center;">Unable to delete Profile: '+profileName+'</span>';
                                    document.getElementById('dialog-message-div').innerHTML=response;
                                      $('#dialog-close-bttn').show();
                                      $('#myModal').modal('show');                                                   
                        }
                        }

   };
            xmlhttp.open("GET","./functions/email_processor.php?data_item=email_profiles&del=removal&id="+profileId+"&name="+profileName+"&mode=single&ind="+profileIndex);  
            xmlhttp.send();
                 };
$.fn.deleteUser =  function(userName, userID, userIndex){
                   userIndex= parseInt(userIndex);
                   var xmlhttp =null;           
                  var tableContents =   $('#user-table-rows').html();
                  $.fn.setLoadingDialog();
       
            if (window.XMLHttpRequest){

                        xmlhttp=new XMLHttpRequest();

            } else  {

                    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
            }
            
            xmlhttp.onreadystatechange =     function (){

                   //  alert("Status: "+xmlhttp.status);
                     // alert("Ready: "+xmlhttp.readyState);
                    if (xmlhttp.readyState===4 && xmlhttp.status===200){                       
                       var  response = xmlhttp.responseText;
                       if(response.toLowerCase().indexOf('success')>=0){
                             $.fn.redrawUserTable('%');
                             document.getElementById('dialog-header-span').innerHTML='<img src="img/unna_medium.png" alt="Unna logo" /> <span align="center" style="font-weight:bold; font-size:20px;float: center;">Successfully removed User: <br /><span align="center">'+userName+'</span></span>';
                             document.getElementById('dialog-message-div').innerHTML='<div align="center">'+response+'</div>';
                             $('#dialog-close-bttn').show();
                             $('#myModal').modal('show');
                              } else {                                                                                                            
                           document.getElementById('dialog-header-span').innerHTML='<img src="img/unna_medium.png" alt="Unna logo" /> <span align="center" style="font-weight:bold; font-size:20px;float: center;">Unable to delete User: '+userName+'</span>';
                           document.getElementById('dialog-message-div').innerHTML=response;
                           $('#dialog-close-bttn').show();
                           $('#myModal').modal('show');                                                   
                        }
                        }
   };
            xmlhttp.open("GET","./functions/user_processor.php?del=removal&id="+userID+"&name="+userName+"&mode=single&ind="+userIndex);  
            xmlhttp.send();
};

               $.fn.closeDialog =  function(){
                      $('#myModal').modal('hide');
                };
                
                $.fn.confirmDialog =  function(mode){               
                      $('#myModal').modal(mode);
                     var isConfirmedField =  document.getElementById('is-confirmed');
			if (isConfirmedField.value==='1') return true;
			else if (isConfirmedField.value==='0') return false;
                };
           $('#upload-file').click(function(e){
            $('#client-upload').click();
            
            
            });
            
             $.fn.showDialog =  function(header){
                 var logo=$('#site-logo').val();
                 logo ='<span ><img src="'+logo+'" alt="Unna Bakery  Logo" /> <span>';
                 header = (header!=='' || header !==null) ? ('<table><tr><td align="left">'+logo+'</td><td>'+header+'</td></tr></table>'):'<div align="center">'+logo+' Unna Bakery Journals</div>';
                $('#dialog-header-span').html(header); 
                $('#dialog-header-span').css('text-align', 'center');
                 $('#myModal').modal('show');
             };
             $.fn.showMessageDialog =  function(header, message){
                 var logo=$('#site-logo').val();
                 logo ='<img src="'+logo+'" alt="Unna Bakery  Logo" />';
                 header = (header!=='' || header !==null) ? ('<table><tr><td align="left">'+logo+'</td><td>'+header+'</td></tr></table>'):'<div align="center">'+logo+' Unna Bakery Journals</div>';
                document.getElementById('dialog-header-span').innerHTML=  header;   
                  document.getElementById('dialog-message-div').innerHTML= message;
                  $('#dialog-message-div').css('float', 'center');
                  $('#dialog-message-div').css('text-align', 'center');
                 $('#myModal').modal('show');
             };
           $.fn.setLoadingDialog = function(){
               document.getElementById('dialog-message-div').innerHTML=  '<div align="center"><img src="img/ajax-loaders/ajax-loader-7.gif" title="img/ajax-loaders/ajax-loader-7.gif"></div>';
                $('#dialog-no-bttn').hide();
                $('#dialog-yes-bttn').hide();
                $('#dialog-ok-bttn').hide();
                $('#dialog-close-bttn').hide();
           };
             $.fn.deleteClientList =function(id_list){
                 var header =  '<div style="font-size:16px; font-weight:bold; color:blue;"> Deleting Clients</div>';                      
               $.fn.setLoadingDialog();
                 var formData = {ids:id_list,del:'removal',mode:'bulk',ind:'empty'}; 
                 
                                        $("#information-table").attr('method','post');
                                        $("#information-table").attr('action','functions/client_processor.php');
                                        var options ={
                                              target: '#dialog-message-div',
                                              data:formData,
                                              success: function(){
                                                 $.fn.redrawClientTable('%');
                                                 $.fn.showDialog(header);
                                                 $('#dialog-no-bttn').hide();
                                                 $('#dialog-yes-bttn').hide();
                                                 $('#dialog-close-bttn').show();
                                              },
                                             error: function(){                                                
                                                 $.fn.showDialog(header); 
                                                 $('#dialog-close-bttn').show();
                                            
                                              }
                                        };
                                        
                                        $("#information-table").ajaxForm(options).submit();
                                         $.fn.setLoadingDialog();
                                        $.fn.showDialog(header);
						  						     
            };
           $("#client-upload").change(function(e) {
                    if( this.disabled ){
                           var header =  '<div style="font-size:16px; font-weight:bold; color:blue; align=center"> Unsupported Browser Version</div>';   
                        $('#dialog-message-div').html('Your browser does not support file upload.');
                         $.fn.showDialog(header);
                    }else{
  
					  if(e.target.files!==undefined){
//	
                                          var uploadData = $('#upload-data').val();
                                          if(uploadData==="client"){
                                              
                                              uploadData ="Client";
                                              
                                          }
                                          var header=  '<div  align="center"  style="font-size:16px; font-weight:bold;color:blue;position:relative;top:-50px;">'+uploadData+' Upload Details</div>';
                                          $.fn.setLoadingDialog();        
                                        $("#upload-client-data").attr('method','post');
                                        $("#upload-client-data").attr('action','functions/upload_manager.php');
                                        var options ={
                                              target: '#dialog-message-div',
                                              success: function(){
                                                  $.fn.redrawClientTable('%');
                                                  $('#dialog-close-bttn').show();
                                              }
                                        };                                     
                                        $("#upload-client-data").ajaxForm(options).submit();
                                        $.fn.showDialog(header);
                                        $.fn.setLoadingDialog();
                                       }
                                      }  
                                   });                      
                 $.fn.deleteEntryList =  function(e){
			   
//	                var tableContentsField = document.getElementById('information-table-contents');
//	                var tableContents = tableContentsField.value;
                        var currentDataType = document.getElementById('upload-data').value;
			var checkboxes = new Array();
//			e.preventDefault();
			var indexStart = 0;			
			var counter =indexStart;
			var checkCount =0;
			var checkboxItem = document.getElementById('item-check-'+counter);

			var id_list ="";
			
			while ( checkboxItem.name!==""){

			  if(checkboxItem.checked){

				checkboxes[counter] =  checkboxItem.value;					            					              					
				var checkboxStr = ""+checkboxes[counter];
				var checkboxData = checkboxStr.split(',');
				var checkboxId = checkboxData[2];
				id_list+= checkboxId+",";
				++checkCount;					               
                             }
                             				  ++counter;
				  checkboxItem = document.getElementById('item-check-'+counter);
				  if(checkboxItem===undefined)break;
			}
                        id_list = id_list.substring(0, (id_list.length-1));
                        var header="";
	           if (currentDataType==='client'){
                       var clientNumStr =checkCount>1?'clients':'client';
                       
	               header = '<span align="center" style="font-weight:bold; font-size:20px;float: center;">Remove '+currentDataType+'</span>';
			       $('#dialog-message-div').html('Are you sure you want to remove <strong><em>'+checkCount+'</em></strong> '+clientNumStr+' from the system?');
                               $('#dialog-ok-bttn').hide();
                               $('#dialog-close-bttn').hide();
                               $('#submit-form-loader').hide();
                               $('#dialog-bttns').html('<button class="btn btn-large btn-danger" onclick="$.fn.closeDialog()" id="dialog-no-bttn">No</button><button class="btn btn-large btn-success" onclick="$.fn.deleteClientList(\''+id_list+'\')" id="dialog-yes-bttn">Yes</button>');
                               $.fn.showDialog(header);
			};        
           };
           
                  $.fn.RemoveAllItems =  function(e){
			   
	             
                        var currentDataType = document.getElementById('upload-data').value;
		
                var header="";
	           if (currentDataType==='client'){
                       
	               header = '<span align="center" style="font-weight:bold; font-size:20px;float: center;">Remove  All '+currentDataType+'s</span>';
			       $('#dialog-message-div').html('Are you sure you want to remove <strong><em>All</em></strong> clients from the system?');
				   $('#dialog-ok-bttn').hide();
				   $('#dialog-close-bttn').hide();
				   $('#submit-form-loader').hide();
				   $('#dialog-bttns').html('<button class="btn btn-large btn-danger" onclick="$.fn.closeDialog()" id="dialog-no-bttn">No</button><button class="btn btn-large btn-success" onclick="$.fn.deleteAllItems(\''+currentDataType+'\')" id="dialog-yes-bttn">Yes</button>');
				   $.fn.showDialog (header);
			};
           };
              $.fn.downloadEntryList =  function(e){			   
	                var tableContentsField = document.getElementById('information-table-contents');
                        var currentDataType = document.getElementById('upload-data').value;
			var checkboxes = new Array();
			var indexStart = 0;			
			var counter =indexStart;
			var checkCount =0;
			var checkboxItem = document.getElementById('item-check-'+counter);

			var id_list ="";
			
			while ( checkboxItem.name!==""){

			  if(checkboxItem.checked){

				checkboxes[counter] =  checkboxItem.value;					            					              					
				var checkboxStr = ""+checkboxes[counter];
				var checkboxData = checkboxStr.split(',');
				var checkboxId = checkboxData[2];
				id_list+= checkboxId+",";
				++checkCount;					               
                             }
                             				  ++counter;
				  checkboxItem = document.getElementById('item-check-'+counter);
				  if(checkboxItem===undefined)break;
			}
                        id_list = id_list.substring(0, (id_list.length-1));
                        
	           if (currentDataType==='client'){
                       window.location ="functions/download_manager.php?req=selected_clients&ids="+id_list;
			}   else if(currentDataType==='user'){
                             window.location ="functions/download_manager.php?req=selected_users&ids="+id_list;
                            
                        }        
           };
           
           $.fn.deleteAllItems = function(dataType){
           var  header = '<span align="center" style="font-weight:bold; font-size:20px;float: center;">Deleting '+dataType+'s</span>';
       if(dataType==='client'){
       
	 var formData = {ids:'',del:'removal',mode:'bulk',ind:'all'}; 
		$("#information-table").attr('method','post');
		$("#information-table").attr('action','functions/client_processor.php');
		
		var options ={
		
		      target: '#dialog-message-div',
		      data:formData,
		      success: function(){
			 $.fn.redrawClientTable('%');
			 $.fn.showDialog(header);
                        $('#dialog-no-bttn').hide();
                        $('#dialog-yes-bttn').hide();
                        $('#dialog-close-bttn').show();
		      },
		     error: function(){                                                
			 $.fn.showDialog(header); 
			 $('#dialog-close-bttn').show();
		      }
		};

		$("#information-table").ajaxForm(options).submit();		 
                $.fn.setLoadingDialog();
                $.fn.showDialog(header);  
       }
           };
         $('#username,#password').keyup(function(e){
            if(e.keyCode ===13){
             $.fn.submitDialogForm(e);
            }
      
         });
                
    $('#login').on('click',function(e){
                  
             $.fn.submitDialogForm(e);
            
        }
        );
    $('#sign-out').click(function(e){
        e.preventDefault();
        var header = '<span align="center" style="font-color:darkgray; font-weight:bold; font-size:20px;float: center;">&nbsp;&nbsp;&nbsp;Confirm Sign Out</span>';
           $('#dialog-message-div').html('<span>Are you sure you want to sign out</span>?');
          $('#dialog-message-div').css('text-align','center');
        $('#dialog-ok-bttn').hide();
         $('#dialog-close-bttn').hide();          
           $('#dialog-bttns').html('<button class="btn btn-large btn-danger" onclick="$.fn.closeDialog()" id="dialog-no-bttn">No</button><button class="btn btn-large btn-success" onclick="$.fn.signOut()" id="dialog-yes-bttn">Yes</button>');
          $('#dialog-bttns').show();
          $.fn.showDialog(header);     
    });
    
   $.fn.submitDialogForm= function(e){
             
               $('#submit-form-loader').show();
                e.preventDefault();
                $('#login').attr('disabled','disabled');
                document.getElementById('submit-form-loader').visible=true;
                var username = $('#username').val();
                var password = $('#password').val();
                username = username.trim();
                password = password.trim();  
                var paramString='';
                var response ='Verifying details. Please wait...';
                var formTarget ='/kayxlav'; 
               $('#site-gateway').find('input,hidden').each(function(){
                  paramString += '&' + $(this).attr('name') + '=' + $(this).val();
                });
		var xmlhttp =null;
		if (window.XMLHttpRequest){
			xmlhttp=new XMLHttpRequest();
		} else  {
			xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
		}
                 if((username!=="" && password!== "") && (username!==null && password!== null) ){
                $('#login').removeAttr('disabled');
		xmlhttp.onreadystatechange =  function (){
                        
			if (xmlhttp.readyState===4 && xmlhttp.status===200){
				response = xmlhttp.responseText;
				response = response.trim();
                                //alert(response);
				var responseInstr = response.substring(0,8);
				if(response ==="Password or username is invalid."||response ==="Access Denied: Insufficient access rights."){
                                    $('#submit-form-loader').hide();
					$('#login-message').attr('class','alert alert-danger');
				}else if(responseInstr==='Redirect'){
                                    var temp  = response.split(";");
                                    var userID = temp[1];
                                    $.session.set('login_username', username);
                                    $.session.set('current_user_id', userID);
                                    var responseData = temp[0].split(":");
                                    if(responseData[1].indexOf('summary')<=0){
                                        window.location=responseData[1]+'?p=summary';
                                    }else{
                                        window.location=responseData[1];   
                                    }
                                    response='';
			
			} else if (response.substring(0,53)=== 'Warning: mysqli_connect(): MySQL server has gone away'){
                                // alert(response);
                                 
                                 var temp  = response.split(";");
                                    var userID = temp[1];
                                    $.session.set('login_username', username);
                                    $.session.set('current_user_id', userID);
                                    var responseData = temp[0].split(":");
                                 //   alert(responseData);
                                    var  newResponse = responseData[(responseData.length - 1)];
                                     if(newResponse.indexOf('summary')<=0){
                                        window.location=newResponse+'?p=summary';
                                    }else{
                                        window.location=newResponse;   
                                    }response='';
			
				}else{
                            $('#login').removeAttr('disabled');
				$('#login-message').attr('class','alert alert-warning');
			}
			if(responseInstr!=='Redirect'){
                            $('#login').removeAttr('disabled');
				$('#login-message').html(response);
                                $('#submit-form-loader').hide();
			}
		  }else{
                      $('#login').removeAttr('disabled');
		                        $('#login-message').attr('class','alert alert-warning');
                                        $('#login-message').html(response);
		  
		  }
		};
                    xmlhttp.open("POST",formTarget,true);  
                    xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
                    xmlhttp.send(paramString);
                } else  if(username===""  || username === null){
                     $('#login').removeAttr('disabled');
                    $('#submit-form-loader').hide();
                        var header='<div style="font-weight: bold; font-size: 16px; position:relative:top -20px;" align="center">Invalid User Details</div>';
                        $('#dialog-ok-bttn').hide();
                        e.preventDefault();
                        $('#dialog-no-bttn').hide();
                        $('#dialog-yes-bttn').hide();
                        $('#dialog-close-bttn').show();
                         $('#dialog-message-div').html('<div align="center" style="color:red;"> A vaild username is required.</div>');
                        $.fn.showDialog(header);
                  
                   }else if(password==="" ||  password=== null){  
                    $('#login').removeAttr('disabled');    
                        $('#submit-form-loader').hide();
                         var header='<div style="font-weight: bold; font-size:16px;position:relative:top -20px;" align="center">Invalid User Details</div>';
                          $('#dialog-ok-bttn').hide();
                          $('#dialog-no-bttn').hide();
                          $('#dialog-yes-bttn').hide();
                          $('#dialog-close-bttn').show();
                         e.preventDefault();
                         $('#dialog-message-div').html('<div align="center" style="color:red;"> A valid password is required.</div>');
                        $.fn.showDialog(header);
                   }         
		}
            
    $.fn.initTimerFields =  function (){
          var startTimeField = document.getElementById('start-time');
          var todaysDate = new Date();
          var todayTime =todaysDate.getTime();
          startTimeField.value =  todayTime;
//          var timeOutField =  document.getElementById('time-out');
//          var tempTime = todayTime+ (timeOutField*1000*60) ;
//          document.getElementById('end-time').value = tempTime;
     };
$('#dialog-username-id').on('change',function(){
           var  username =$('#dialog-username-id').val();
           var loginUser =  $.session.get('login_username');
           if(username !==loginUser){

$('#dialog-password-id').val('');
$('#dialog-password-id').attr('disabled','""');
}else{

    $('#dialog-password-id').removeAttr('disabled');
     $('#dialog-password-id').prop('class', 'form-control span5');
      $('#dialog-password-div').html('<div class="input-prepend" title="password" data-rel="tooltip" id="dialog-password-div"> <span class="add-on"><i class="icon-lock"></i>&nbsp;&nbsp;&nbsp;</span><input class="input-xlarge focused span5" id="dialog-password-id" name="dialog_password" value="" type="password" onload="this.value="";" ><span class="help-inline" style="display:none;" id="dialog-password-message">This value is not allowed<br></span></div>');
                           }			   
     });
  
$('#dialog-password-id').on('keyup', function(e){
    if(($('#dialog-password-id').val().length===0 ||$('#dialog-username-id').val().length===0) && e.keyCode ===13) {
        e.preventDefault();
    } 
    else if(($('#dialog-password-id').val().length>0  && $('#dialog-username-id').val().length>0) && e.keyCode ===13){
        
       $('#dialog-login-form').submit();
    }
});
$('#dialog-username-id').on('keyup', function(e){
  if(($('#dialog-password-id').val().length===0 ||$('#dialog-username-id').val().length===0) && e.keyCode ===13) e.preventDefault();   
   else if (e.keyCode ===13){
        $.fn.submitDialogForm(); 
   }
});

$('#dialog-login-form').on('keyup', function(e){
   // alert('Key pressed: '+e.keyCode );
        if(($('#dialog-password-id').val().length===0 ||$('#dialog-username-id').val().length===0) && e.keyCode ===13) e.preventDefault();  
        else if(e.keyCode ===13){
         $.fn.submitDialogForm();  
       }   
});
$('#dialog-login-form').on('submit',function(e){
   
        e.preventDefault();
        $('#dialog-login-message').hide();
        $('#dialog-submit-form-loader').show();
        var username =$('#dialog-username-id').val();
	var password =$('#dialog-password-id').val();
        username = username.trim();
        password = password.trim(); 
	if((username === null || username==='') || (password === null || password==='')){
	
			if(username === null || username===''){
                                var usernameDiv = document.getElementById("dialog-username-div");
                                usernameDiv.className = "control-group error";
				$("#dialog-user-message").html('Please type the user name');
				$("#dialog-user-message").show();
		}else{
			$("#dialog-user-message").hide();
		}
		 if(password === null || password===''){
                                var passwordDiv = document.getElementById("dialog-password-div");
                                passwordDiv.className = "control-group error";
				$("#dialog-password-message").html('Please type the password');
				$("#dialog-password-message").show();

		}else{
			$("#dialog-password-message").hide();
		}
                 $('#dialog-submit-form-loader').hide();
                   $('#dialog-login-message').show();
	}else{
            $("#dialog-user-message").hide();
            $("#dialog-password-message").hide();
            $('#dialog-login-message').hide();
           $('#dialog-submit-form-loader').show();
                var paramString='p=login&username='+username+'&password='+password+'&locked=yes';
                var response ='Verifying details. Please wait...';
                var formTarget ='/kayxlav'; 

		var xmlhttp =null;
		if (window.XMLHttpRequest){
			xmlhttp=new XMLHttpRequest();
		} else  {
			xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
		}
                 if((username!=="" && password!== "") && (username!==null && password!== null) ){
              
		xmlhttp.onreadystatechange =  function (){		
			if (xmlhttp.readyState===4 && xmlhttp.status===200){
				response = xmlhttp.responseText;
                              //  alert(response);
				response = response.trim();
				var responseInstr = response.substring(0,8);
				if(response ==="Password or username is invalid."||response ==="Access Denied: Insufficient access rights."){
                                    $('#dialog-submit-form-loader').hide();
					$('#dialog-login-message').attr('class','alert alert-danger');
				}else if(responseInstr==='Redirect'){
                                       $.fn.closeDialog();
                                       $.fn.initTimerFields();
				       response='';
			
			}else{
				$('#dialog-login-message').attr('class','alert alert-block');
                                 $('#dialog-login-message').html(response);
                                  $('#dialog-submit-form-loader').hide();
			}
			if(responseInstr!=='Redirect'){
				$('#dialog-login-message').html(response);
                                $('#dialog-submit-form-loader').hide();
			}
		  }else{
		        $('#dialog-login-message').attr('class','alert alert-warning');
                        $('#dialog-login-message').show();
                        $('#dialog-login-message').html(response);
		  
		  }
		};
                    xmlhttp.open("POST",formTarget,true);  
                    xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
                    xmlhttp.send(paramString);
                } 
	}
});

$.fn.lockSession  = function(){      	  
	  var paramString='&lock_session=1';
        var formTarget ='/kayxlav'; 
        var response =null;
		var xmlhttp =null;
		if (window.XMLHttpRequest){
			xmlhttp=new XMLHttpRequest();
		} else  {
			xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
		}
              
		xmlhttp.onreadystatechange =  function (){	
		
			if (xmlhttp.readyState===4 && xmlhttp.status===200){
				response = xmlhttp.responseText;
				response.trim();
				if(response ==='Session Locked'){
				return true;
				
				}
	
		};
		
		 };
                    xmlhttp.open("POST",formTarget,true);  
                    xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
                    xmlhttp.send(paramString);
                    return false;
			   };
$.fn.formValidator = function (formId, elementsStr){
        var fieldCounter = 0;
        var formField = '';
        var fieldName = '';
        var fieldType = '';
        var fieldSize =  '';
        var fieldValidation =  '';
        var validationMessage ='';
        var field = '';  
        var value =  '';
        var messageID= '';
        var nameOnly ='';
        var fieldDivStr ='';
        var formInputfieldDiv ='';
        var validationResponse ={};
        var formFields = JSON.parse($.session.get(elementsStr));
        var nextPageBttn =  $.session.get(formId+'_next_pages');
    for(var field in formFields){ 
   if(field){
      formField = formFields[field];
      fieldName = formField.name;
   //   fieldType = formField.type;
    fieldValidation = formField.validation;
    validationMessage ='';
   // var fieldID =    formField.id; //  $('#'+formId+' input[name='+fieldName+']').attr('id'); 
    field = formField; // document.getElementById(fieldID);
    value =  $('#'+formField.id).val(); 
    field.value = value;
    messageID=  fieldName+'_message';
    nameOnly = fieldName.replace('_element', '').replace('_', ' ');
    nameOnly = nameOnly.replace('_', ' ');
    fieldDivStr = fieldName+'_div';
    formInputfieldDiv = document.getElementById(fieldDivStr);
    var isValid = false;
    switch(fieldValidation){
      
      case 'alphanumeric':
            if(value.length===0){
                  document.getElementById(messageID).innerHTML="The "+nameOnly+" field should not be empty";
                  $("#"+messageID).show();
                  formInputfieldDiv.className = "control-group error"; 
                  validationMessage='<li>The '+nameOnly+' field should not be empty</li>';
            }else{
            if(isAlphanumeric(field)){
                  isValid = true;
                 $("#"+messageID).val('');    
                 $("#"+messageID).hide();
                  formInputfieldDiv.className = "control-group";
            }else{
                   document.getElementById(messageID).innerHTML="The "+nameOnly+" field should be alphabets and numbers only";
                   $("#"+messageID).show();
                   formInputfieldDiv.className = "control-group error";
                   validationMessage='<li>The '+nameOnly+' field should be alphabets and numbers only</li>';		
                  }
              }
        break;
        case 'email':          
                    if(value.length===0){
                          document.getElementById(messageID).innerHTML="The "+nameOnly+" field should not be empty";
                          $("#"+messageID).show();
                          formInputfieldDiv.className = "control-group error"; 
                          validationMessage='<li>The '+nameOnly+' field should not be empty</li>';
                    }else{
                    if(isValidEmail(field)){
                          isValid = true;
                         $("#"+messageID).val('');    
                         $("#"+messageID).hide();
                          formInputfieldDiv.className = "control-group";
                    }else{
                          document.getElementById(messageID).innerHTML="The "+nameOnly+" field  does not cotains valid email addresses";
                           $("#"+messageID).show();
                          formInputfieldDiv.className = "control-group error";
                          validationMessage='<li>The  '+nameOnly+' field  does not cotains valid email addresses</li>';			
                           }
                      }
        break;
        case 'numeric':          
                    if(value.length===0){
                          document.getElementById(messageID).innerHTML="The "+nameOnly+" field should not be empty";
                          $("#"+messageID).show();
                          formInputfieldDiv.className = "control-group error"; 
                          validationMessage='<li>The '+nameOnly+' field should not be empty</li>';
                    }else{
                    if(isNumeric(field)){
                          isValid = true;
                         $("#"+messageID).val('');    
                         $("#"+messageID).hide();
                          formInputfieldDiv.className = "control-group";
                    }else{
                          document.getElementById(messageID).innerHTML="The "+nameOnly+" field should be numbers only";
                           $("#"+messageID).show();
                          formInputfieldDiv.className = "control-group error";
                          validationMessage='<li>The  '+nameOnly+' field should be numbers only</li>';			
                           }
                      }
        break;
        case 'alphanumspecial':
           
              if(value.length===0){
                  document.getElementById(messageID).innerHTML="The "+nameOnly+" field should not be empty";
                  $("#"+messageID).show();
                  formInputfieldDiv.className = "control-group error"; 
                  validationMessage='<li>The '+nameOnly+' field should not be empty</li>';
            }else{
            if(isAlphanumSpecial(field)){
                  isValid = true;
                 $("#"+messageID).val('');    
                 $("#"+messageID).hide();
                  formInputfieldDiv.className = "control-group";
            }else{
                  document.getElementById(messageID).innerHTML="The "+nameOnly+" field should consist of alphabets, numbers and special characters only";
                   $("#"+messageID).show();
                  formInputfieldDiv.className = "control-group error";
                  validationMessage='<li>The  '+nameOnly+' field should be alphabets only</li>';			
                   }
              }
        break;
    case 'password':
        var minPasswordLen =8;
               	if(value.length===0){
                document.getElementById(messageID).innerHTML='This field is required';
		$("#"+messageID).show();
		formInputfieldDiv.className = "control-group error";
		validationMessage='<li>The Password field is required</li>';
               var  confirmFieldValidationMessage ='';
	} else{
		$("#"+messageID).hide();
		formInputfieldDiv.className = "control-group";

	} 
    var confirmFieldPrefix = '';
    if(fieldName==='password_element') {
        confirmFieldPrefix = 'confirm_' ;
    } else if (fieldName==='password_element'){
        confirmFieldPrefix = '' ;
    }
 //   var confirmField =     $('#confirm_password_id');  
    var confirmValue =  $('#confirm_password_id').val();
    var confirmMessageID=  confirmFieldPrefix+fieldName.replace('element', 'message');
    //var confirmNameOnly =  confirmFieldPrefix+fieldName.replace('element', '').replace('_',' ');
    var confirmFieldDivStr =  confirmFieldPrefix+fieldName.replace('element', 'div');
    var confirmFormInputfieldDiv = document.getElementById('confirm_password_div');
    
	if(confirmValue && confirmValue.length===0){
		$("#"+confirmMessageID).show();
		document.getElementById(confirmMessageID).innerHTML='Please type the confirmation password';
		confirmFormInputfieldDiv.className = "control-group error";
                 confirmFieldValidationMessage='<li>Password confirmation is required</li>';
	} else{
		$("#"+confirmMessageID).hide();
		confirmFormInputfieldDiv.className = "control-group";
	}
        if( value.length>0 && confirmValue.length>0){
        if( (confirmValue===value) &&  (value.length >= minPasswordLen) ){
                        if(isValidPass(field)){
                            isValid = true;
                                $("#"+messageID).hide();
                                formInputfieldDiv.className = "control-group success";
                                $("#"+confirmMessageID).hide();
                                confirmFormInputfieldDiv.className = "control-group success";
                            } else {
                                $("#"+messageID).show();							
                                document.getElementById("#"+messageID).innerHTML='Password is invalid';
                                formInputfieldDiv.className = "control-group error";
                                validationMessage='<li>Password field is not valid</li>';
				$("#"+confirmMessageID).show();
				document.getElementById(confirmMessageID).innerHTML='Password is invalid';
				confirmFormInputfieldDiv.className = "control-group error";
                                validationMessage='<li>Confirmation Password field is not valid</li>';

						}							
				
				}else if ( confirmValue!==value){

					$("#"+messageID).show();
					document.getElementById(messageID).innerHTML='Password mismatch';
					formInputfieldDiv.className = "control-group error";
					validationMessage='<li>Password mismatch</li>';

					$("#"+confirmMessageID).show();
					document.getElementById(confirmMessageID).innerHTML='Password mismatch';
					confirmFormInputfieldDiv.className = "control-group error";
					confirmFieldValidationMessage='<li>Confirmation Password mismatch</li>';
						
				}else if ((confirmValue===value) &&  (value.length < minPasswordLen)){
				
					$("#"+messageID).show();
					document.getElementById(messageID).innerHTML='Password is too short';
					formInputfieldDiv.className = "control-group error";
					$('.password-new-input').hide();
                                        $('#email-profiles-form input[name='+fieldName+'_alt]').attr('value', ''+value);
					$('#email-profiles-form input[name='+fieldName+']').attr('value', null);
					$('.password-invalid-input1').show();
					$('.password-invalid-input2').show();
					document.getElementById("password_message").innerHTML='Password is too short';
                                        validationMessage='<li> Password is too short</li>';
					
					$("#"+confirmMessageID).show();
					document.getElementById(confirmMessageID).innerHTML='Password is too short';
					confirmFormInputfieldDiv.className = "control-group error";
                                        confirmFieldValidationMessage='<li> Confirmation Password is too short</li>';
						
				}
                }
        
        break;
        
         case 'alpha':          
                    if(value.length===0){
                          document.getElementById(messageID).innerHTML="The "+nameOnly+" field should not be empty";
                          $("#"+messageID).show();
                          formInputfieldDiv.className = "control-group error"; 
                          validationMessage='<li>The '+nameOnly+' field should not be empty</li>';
                    }else{
                    if(isAlphabetic(field)){
                          isValid = true;
                         $("#"+messageID).val('');    
                         $("#"+messageID).hide();
                          formInputfieldDiv.className = "control-group";
                    }else{
                          document.getElementById(messageID).innerHTML="The "+nameOnly+" field should be alphabets only";
                           $("#"+messageID).show();
                          formInputfieldDiv.className = "control-group error";
                          validationMessage='<li>The  '+nameOnly+' field should be alphabets only</li>';			
                           }
                      }
        break;
         case 'phone':
           
              if(value.length===0){
                  document.getElementById(messageID).innerHTML="The "+nameOnly+" field should not be empty";
                  $("#"+messageID).show();
                  formInputfieldDiv.className = "control-group error"; 
                  validationMessage='<li>The '+nameOnly+' field should not be empty</li>';
            }else{
            if(isValidPhoneNumber(field)){
                  isValid = true;
                 $("#"+messageID).val('');    
                 $("#"+messageID).hide();
                  formInputfieldDiv.className = "control-group";
            }else{
                  document.getElementById(messageID).innerHTML="The "+nameOnly+" field should consist of valid phone numbers only";
                   $("#"+messageID).show();
                  formInputfieldDiv.className = "control-group error";
                  validationMessage='<li>The  '+nameOnly+' field should consist of  valid phone numbers only</li>';			
                   }
              }
        break;
        case 'date':
           
              if(value.length===0){
                  document.getElementById(messageID).innerHTML="The "+nameOnly+" field should not be empty";
                  $("#"+messageID).show();
                  formInputfieldDiv.className = "control-group error"; 
                  validationMessage='<li>The '+nameOnly+' field should not be empty</li>';
            }else{
            if(isValidDate(field)){
                  isValid = true;
                 $("#"+messageID).val('');    
                 $("#"+messageID).hide();
                  formInputfieldDiv.className = "control-group";
            }else{
                  document.getElementById(messageID).innerHTML="The "+nameOnly+" field should consist of date input only";
                   $("#"+messageID).show();
                  formInputfieldDiv.className = "control-group error";
                  validationMessage='<li>The  '+nameOnly+' field should consist of date input  only</li>';			
                   }
              }
          case 'nocheck':
               isValid = true;
              break
        break;
  }
  
  validationResponse[fieldCounter]={
      fieldName:fieldName,
      valid:isValid,
      message:validationMessage  
  };
  ++fieldCounter;
  }
  }

      var formTarget= $('#'+formId).attr('action');               
     $.fn.showValidationReport(formId,validationResponse, formTarget, nextPageBttn);
};   
$.fn.showValidationReport =  function (formId, validationResponses,formTarget, nextPageBttn){
                               var invalidFields ='<div><strong> Please verify the following input details:</strong> </div><br />';
				invalidFields+='<div align="left"><ol>';  
                                  var isFormValid ={};
                                    var eleCounter = 0;
                         
                               for (var reponseInd in validationResponses){
                                   var name =  validationResponses[reponseInd].fieldName;
                                   var message =  validationResponses[reponseInd].message;
                                   var isValid =  validationResponses[reponseInd].valid;
                                   invalidFields+= message;
                                 
                                   if(!isValid){
                                       isFormValid[eleCounter] = false;
          
                                   }else {
                                       isFormValid[eleCounter] = true;
                                       
                                   }
                                   ++eleCounter;
                               }
                               var shouldProceed = true;
                               for(var i in isFormValid){
             
                                   if(!isFormValid[i]){
                                       shouldProceed = false;
                                       break;
                                   }
                               }
                if(!shouldProceed){
                        invalidFields+='</ol></div>';
                        document.getElementById('dialog-header-span').innerHTML='<img src="img/unna_medium.png" alt="Unna logo" /> <span align="center" style="font-weight:bold; font-size:20px;">New '+$.fn.splitnCapitalizeFirstLetter(formId , '-')+' Check</span>';
                        document.getElementById('dialog-message-div').innerHTML=invalidFields;
                          event.preventDefault();
                          $('#dialog-ok-bttn').hide();
                          $('#myModal').modal('show');
                          $('#dialog-close-bttn').show();
                          $('#submit-form-loader').hide();
                     } else {
                         event.preventDefault();
                       
                         $('#is-form-data-valid').val('YES');
                         var paramString ='';                                        
                        $('#'+formId).find('input,text,select,textarea').each(function(){
                           paramString += '&' + $(this).attr('name') + '=' + $(this).val();
                        });
                         var formFields = JSON.parse($.session.get(formId+'_form_elements'));
                         var fieldName ="";
                         var fieldValue = "";
                            for(var field in formFields){
                                 field = formFields[field];
                              
                            if(field){
                              fieldName = field.name;
                              var fieldID =    field.id; //  $('#'+formId+' input[name='+fieldName+']').attr('id'); 
                              fieldValue =  $('#'+fieldID).val(); 
                             if(paramString.indexOf('&'+fieldName.toLowerCase()+'_element')<0) paramString += '&' + fieldName+ '=' + fieldValue;
                             }
                           }
                    $('#cancel-bttn').hide();
                    $.fn.ajaxFormSubmit(formTarget,paramString, nextPageBttn);  
                   }     
                    //var page_url =window.location.href;
                };
                function header (className, id, columns, tableData,tDataCount ){ 
			 				var headerString = '<table class="'+className+'" id ="'+id+'"><thead> <tr> <th><label class="checkbox inline"><input type="hidden" name="is_checked" id="is-checked" value="unchecked" />'+
			 				'<input type="hidden" name="change_index" id="change-index" value="0" /><input type="hidden" name="total_items" id="total-items"'+
			 				'value="'+tDataCount+'" /></label></th>';
							for( var  column in this.columns){
								column =  column.toUpperCase();
								column= column.replace('_', ' ' );
								headerString += '<th>'+column+'</th>';
							}
						    headerString += '<th style="min-width:100px;" align="center"> Actions</th></thead> </tr>'
						    return headerString;
			};
                        
                         function body(columns, tableData){
				 var  tColumns =  columns;
				 var  tData= tableData;
			var bodyStr ='<tbody>';
			var searchStr = '';
			 for(var i=0; i< tData.length; i++){
			 	   searchStr = tData[i].join(' ');
				   bodyStr+='<tr><td><label class="checkbox inline"> <div id="uniform-inlineCheckbox'+i+'" class="checker"><span id="checkbox-span-'+i+'">'+
			 		  '<input  onchange="$.fn.showExtraOptions()" style="opacity: 0;" id="item-check-'+i+'" name="history-check-'+i+'" value="'+tData[i][0]+','+i+'"'+
			 		  'type="checkbox" /></span></div></label></td>';
			          bodyStr+='<td>'+tData[i][0]+'<span style="display:none">'+searchStr+'</span></td>';
			          for(var  column in tColumns){
			          	 bodyStr+='<td>'+tData[i][column]+'</td>';
						}
						bodyStr+=' <td class="center" > <div align="center"><a class="btn btn-success" href="#" onclick="$.fn.viewEntry(\''+tData.length+'\')">'
									+'<i class="icon-zoom-in icon-white"></i> View</a></div></td><a class="btn btn-danger" href="#" '+
									' onclick="$.fn.deleteEntry(\''+tData[i][1]+'\',\''+tData[i][1]+'\','+i+')"><i class="icon-trash icon-white"></i>Delete</a></tr>';
					  }
                                          bodyStr+='</tbody></table>';
					   return bodyStr;
				};
                                
                                function fetch(tableName, tableUrl){
                                    var responseData = "";
                                    $.ajax({
                                            type: "POST",
                                            url: tableUrl,
                                            data:  'req='+tableName  ,
                                            async : true,
                                            dataType: 'json' , 
                                            success: function(data) {

                                                    if(data.length ===3){
                                                            this.columns   = data[0];
                                                            this.dataCount = data[1];
                                                            this.tableData = data[2];
                                                            responseData  =  {0:data[0],1:data[1],2:data[2]};
                                                            var tableSessionData   = JSON.stringify(responseData);

                                                            $.session.set(tableName, tableSessionData);
                                                            setTableData(JSON.parse(tableSessionData));


                                                            }

                                            },
								"error": function(response){
                                                                   $.fn.showMessageDialog('Error fetching data:',response['responseText']);
                                                                    console.dir(response);
								
								}
                                                               
								});
                                     
                                   // $.fn.showMessageDialog('Test', responseData);                            
			};
                        
                 function drawTable(){
            	    if(this.tableData.length< 50000){
                       
                $('#'+this.id).dataTable({
"responsive": true,
"destroy":true,
"scrollX": true,
"data":this.tableData,
"columns":this.columns,
"processing":false,
"serverSide":false,
"info": this.info,
"scrollCollapse": this.scrollCollapse,
"ordering": this.ordering,
"order": this.order,
"paging": this.paging,
"AutoWidth":this.AutoWidth,
"searching": this.searching,
"stateSave": this.stateSave,
  "language": {
      "emptyTable": "No data available in table"
    }
                        });
                         
            } else{
                    
   $('#'+this.id).dataTable({
 	"processing":true,
 	"serverSide":true,
        "responsive": true,
        "destroy":true,
        "scrollX": true,
          "language": {
      "emptyTable": "No data available in table"
    },
 	"ajax": { url:this.url
 	         , type:'POST'
             , dataType: 'json'  
 	         ,data: 'req='+this.tableName       
 	         },
                 
 	"columns":this.columns,
 	     "deferRender": true ,
        "error": function(response){
                     console.dir(response);
                     $.fn.showDialog('Error fetching  data:',response.responseText);
                     
                 }
            
  });;               
                
	
	        }			};
				
   
   

      $.fn.deserializeDataForAjax  = function(arrayStr){

	var  fieldDelimiterLv1 = '%^%';    
	var  valueDelimiterLv1 = '%#%';
	var  recordDelimiterLv1 = '%~%';
	
	var  fieldDelimiterLv2 = '-^-';    
	var  valueDelimiterLv2 = '-#-';
	var  recordDelimiterLv2 = '-~-';
	
	var  fieldDelimiterLv3 = '`^`';    
	var  valueDelimiterLv3 = '`#';
	var  recordDelimiterLv3 = '`~`';

	
	var fieldValPairs =new Array();
	var fieldValTmp =new Array();
    var tempValues =new Array();
	var field ='';
	var value = '';
	var record = '';
	var tempArr1 =new Array();
	var tempArr2 =new Array();
	var tempArr3 =new Array();
    var h= 0;
	
	var  tempArr = splitString(arrayStr, recordDelimiterLv3);
	var  count = tempArr.length;
	
	if(count>0){
	   for(var i =0;  i<count; i++){
	      fieldValPairs =  splitString(tempArr[i],fieldDelimiterLv3);
		  for(var j=0; j<fieldValPairs.length; j++ ){
		  fieldValTmp = splitString(fieldValPairs[j],valueDelimiterLv3);
		  field = fieldValTmp[0];
		  value = fieldValTmp[1];
		  tempArr3[field]=value;
		  }
	   }
	  arrayStr = tempArr3; 
	}
   
	if(tempArr3.length<= 1 )tempArr3 =	arrayStr; 

	tempArr = splitString(tempArr3,recordDelimiterLv2);
	count = tempArr.length;
       
       	 if(count>0 ){
	   if (count ===1){
	          fieldValPairs =  splitString(tempArr[0],fieldDelimiterLv2);
		      for(var j=0; j<fieldValPairs.length; j++ ){
    		  fieldValTmp = splitString(fieldValPairs[j],valueDelimiterLv2);
    		  field = fieldValTmp[0];
    		  value = fieldValTmp[1];
    		  tempArr2[field]=value;
              }
	   }else{
	 	  for(var i =0;  i<count; i++){
	          fieldValPairs =  splitString(tempArr[i],fieldDelimiterLv2);
		      for(var j=0; j<fieldValPairs.length; j++ ){
    		  fieldValTmp = splitString(fieldValPairs[j],valueDelimiterLv2);
    		  field = fieldValTmp[0];
    		  value = fieldValTmp[1];
              tempArr2[h]=new Array();
              tempArr2[h][field] =  value;
              ++h; 
            
		  } 
                 	                    
	}
    }
    
     arrayStr = tempArr2; 
    }
		
    if(tempArr2.length<= 1 )tempArr2 =	arrayStr; 
  
	 tempArr = splitString(tempArr2 ,recordDelimiterLv1);
	 count = tempArr.length;
       	 if(count>0 ){
	   if (count ===1){
	          fieldValPairs =  splitString(tempArr[0],fieldDelimiterLv1);
		      for(var j=0; j<fieldValPairs.length; j++ ){
    		  fieldValTmp = splitString(fieldValPairs[j],valueDelimiterLv1);
    		  field = fieldValTmp[0];
    		  value = fieldValTmp[1];
    		  tempArr1[field]=value;
              }
	   }else{
	 	  for(var i =0;  i<count; i++){
	          fieldValPairs =  splitString(tempArr[i],fieldDelimiterLv1);
		      for(var j=0; j<fieldValPairs.length; j++ ){
    		  fieldValTmp = splitString(fieldValPairs[j],valueDelimiterLv1);
    		  field = fieldValTmp[0];
    		  value = fieldValTmp[1];
              tempArr1[h]=new Array();
              tempArr1[h][field] =  value;
              ++h; 
            
		  } 
           
          	                    
	}
    }
    
     arrayStr = tempArr1; 
    }
   
	return arrayStr;
	
	};
    function splitString(stringVal, delimiter){
        
        var startInd =0;
        var delInd = 0;
        var  stringArr =new Array();
        var count = 0;
        delInd= stringVal.indexOf(delimiter,startInd);
        while (delInd>=0 ){
            var tempStr = stringVal.substring(startInd,delInd);
            stringArr[count]=tempStr;
            startInd = delInd+delimiter.length;
            if(typeof  stringArr[count] !== undefined &&  startInd < stringVal.length){
                delInd= stringVal.indexOf(delimiter,startInd);
                if(delInd=== -1 ){
                     tempStr = stringVal.substring(startInd,stringVal.length);
                      ++count; 
                      stringArr[count]=tempStr;
                }
            }else{
                delInd =-1;            
            }
            ++count;  
        }
          
        return stringArr;
    }           
var TablePrototype = {
        name  :'',
        id :  '',
        columns : "",
        header : "", 
        bodyID : "",
        className : "",
        tableUrl : "",
        tableData:"",
        dataCount : 0,
        headerStr : "",
        bodyStr :'',
        remove :"",
        tableclass :"",
        type :"",
        datatype :"",
        responsive : true,
        destroy  : true,
        scrollX : true,
        serverside : false,
        ordering  : true,
        scrollcollapse : true,
        info :"",
        scrollCollapse :  true,
        order :  [[0, 'asc']],
        paging :  true,
        AutoWidth  : true,
        searching : true,
        stateSave :  true,
        fetchResults:"",
        isViewable : true,
        isEditable: false,
        isIndelible : false,
    init: function(className,tableName, tableID,tableUrl, columns, count, data) {
        this.name = tableName;
        this.id = tableID;
        this.columns = columns;
        this.header = ""; 
        this.bodyID = "";
        this.className = className;
        this.tableUrl = tableUrl;
        this.tableData="";
        this.dataCount = count;
        this.tData = data;
        this.headerStr = "";
        this.bodyStr ="";
        this.remove ="";
        this.tableclass ="";
        this.type ="";
        this.datatype ="";
        this.responsive = true;
        this.destroy  = true;
        this.scrollX = true;
        this.serverside = false;
        this.ordering  = true;
        this.scrollcollapse = true;
        this.info ="";
        this.scrollCollapse =  true;
        this.ordering = true;
        this.order =  [[0, 'asc']];
        this.paging =  true;
        this.AutoWidth  = true;
        this.searching = true;
        this.stateSave =  true;
        this.className = "";
        this.isViewable = true;
        this.isEditable = false;
        this.isIndelible = false;
            
    },

    buildHeader: function  (className, id, columns,tDataCount, excludedCols ){ 
                        var headerString = '<table class="'+className+'" id ="'+id+'" role="grid"><thead><tr><th style="display:none"></th>';
                           for( var  column in columns){
                            column =  columns[column].toUpperCase();

                            if(excludedCols.indexOf(column)===-1)headerString += '<th>'+replaceAll(column, '_', ' ' )+'</th>';
                    }
		 headerString += '<th> OPTIONS</th></tr></thead>';
		headerStr=headerString;	
        return headerString;
			},
    buildBody: function body(columns, tableData,excludedCols,opts){ 
                     //   var  tColumns =  columns;
                      //  var  tData= tableData;
			var bodyStr ='<tbody>';
			var searchStr = '';
                        var size =  (tableData)? tableData.length:0;
			 for(var i=0; i< size; i++){
                                   for(var j=0; j< columns.length;j++){
                                        searchStr +=  tableData[i][columns[j]]+' ';
                                 
                                   }
				 bodyStr+='<tr>';
			 		 //'<input  onchange="$.fn.showExtraOptions()" style="opacity: 0;" id="item-check-'+i+'" name="history-check-'+i+'" value="'+tableData[i][columns[1]]+','+i+'"'+'type="checkbox" /></span></label></td>';
			         bodyStr+='<td style="display:none">'+tableData[i][columns[1]]+'<span >'+searchStr+'</span></td>';
			          for(var j=0; j< columns.length;j++){
                                        if(excludedCols.indexOf(columns[j])===-1)	{ 
                                            bodyStr+='<td>'+tableData[i][columns[j]]+'</td>';
                                        }
				}
			        bodyStr+='<td class="center">';
                                 if(opts.isViewable){
                                     bodyStr+='<a class="btn btn-success" href="#" onclick="$.fn.viewEntry(\''+i+'\')">'
                                     +'<i class="icon-zoom-in icon-white"></i>View</a>';
                             }
                             if(opts.isEditable) {
                                 bodyStr+=  '<a class="btn btn-info" href="#" onclick="$.fn.editEntry2(\''+i+'\')">'+
                                                            '<i class="icon-edit icon-white"></i> '+
									'Edit</a>';
                                                            }
                                               if(!opts.isIndelible) {                 '<a class="btn btn-danger" href="#" '+
									' onclick="$.fn.deleteEntry(\''+tableData[i][columns[1]]+'\',\''+tableData[i][columns[2]]+'\','+i+')">'+
                                                                        '<i class="icon-trash icon-white"></i>Delete</a>';
                                                            }
                                                      bodyStr+='</td></tr>';
					  }
                                          bodyStr+='</tbody></table>';
                                       /*   '<div class="pagination pagination-centered">'+
						 ' <ul>'+
							'<li><a href="#">Prev</a></li>'+
							'<li class="active">'+
							'<a href="#">1</a>'+
							'</li>'+
							'<li><a href="#">2</a></li>'+
							'<li><a href="#">3</a></li>'+
							'<li><a href="#">4</a></li>'+
							'<li><a href="#">Next</a></li>'+
						  '</ul>'+
						'</div>  '; */
                                          this.bodyStr = bodyStr;
					   return bodyStr;
 },
 draw: function  draw(){
            if(this.tableData.length< 50000){
             $('#'+this.id).dataTable({
                "responsive": true,
                "destroy":true,
                "scrollX": true,
                "data":this.tableData,
                "columns":this.columns,
                "processing":false,
                "serverSide":false,
                "info": this.info,
                "scrollCollapse": this.scrollCollapse,
                "ordering": this.ordering,
                "order": this.order,
                "paging": this.paging,
                "AutoWidth":this.AutoWidth,
                "searching": this.searching,
                "stateSave": this.stateSave
                });
            } else{
                    
   $('#'+this.id).dataTable({
 	"processing":true,
 	"serverSide":true,
        "responsive": true,
        "destroy":true,
        "scrollX": true,
    
 	"ajax": { url:this.url
 	         , type:'POST'
             , dataType: 'json'  
 	         ,data: 'req='+this.tableName       
 	         },
                 
 	"columns":this.columns,
 	     "deferRender": true ,
        "error": function(response){
                     console.dir(response);
                     $.fn.showDialog('Error fetching  data:',response['responseText']);
                     
                 }
            
  });               
                
	
	        }
			}
};

function Table() {
    function T() {};
    T.prototype = TablePrototype;
    var t= new T;
    return t;

  }
      $.fn.getTable =  function (tagID,className, tableName, tableID,tableUrl, excludedCols,mode, opts){

           var responseData='';  
           var tableParams = tableName.split('&');
           var paramString= 'reqTab='+tableName+'&reqType=table';
           var formTarget =tableUrl;
           var xmlhttp =null;
           tableName =tableParams[0]; 
            var tableSessionData    =  $.session.get(tableName);
                var tab =  new Table(tableName, tableID);
                tab.isViewable = opts.isViewable;
                tab.isEditable = opts.isEditable;
                tab.isIndelible = opts.isIndelible;
               if(responseData.length > 1 && mode === 0){
  
                    responseData =   JSON.parse(tableSessionData);
                    tab.columns = responseData[0];
                    tab.tData  =responseData[1].length>0?responseData[1]:new Array();
                    tab.dataCount =responseData[2];                    
                    var header =  tab.buildHeader (className, tableID,  responseData[0],responseData[2], excludedCols );
                    var body = tab.buildBody(responseData[0], responseData[1], excludedCols, opts);  
                    $('#'+tagID).html(header+body);
                    $('#'+tableID).dataTable();
               
           }else{
          
       
            if (window.XMLHttpRequest){
                        xmlhttp=new XMLHttpRequest();
            } else  {
                    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
            }
            
            xmlhttp.onreadystatechange =     function (){
               if (xmlhttp.readyState===4 && xmlhttp.status===200){ 
                   
                       try{
                       responseData =JSON.parse(xmlhttp.responseText);
                      $.session.set(tableName, JSON.stringify(responseData));
                      if(responseData.length ===3){
                        var tab =  new Table(tableName, tableID);
                        tab.columns = responseData[0];
                        tab.tData  =responseData[1];
                        tab.dataCount =responseData[2];
                        var header =  tab.buildHeader (className, tableID,  responseData[0],responseData[2], excludedCols );
                        var body = tab.buildBody(responseData[0], responseData[1], excludedCols, opts); 
                        $('#'+tagID).html(header+body);
                         docReady();
                         }                   
                        }catch(e ){
                             $.fn.showMessageDialog('<div align="center">Data Fetch Error</div>', '<div align = "center">Error Comminucating with Server</div>'+ e.stack+'<br /><br />'+xmlhttp.responseText);
                        }
                            }
                    };
        xmlhttp.open("POST",formTarget,true);
        xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xmlhttp.send(paramString);   
    }
        
         };
         
         
         
      var    formElementPrototype = {
	  type: "", 
	  name: "", 
	  id:  "", 
	  editable:  "", 
	  value:"", 
          class:"",
	  alternativeValues: "", 
	  chosenValue: "", 
	  errorMessage: "", 
	  valueMap:  "", 
          data: new Array(),
          dataCount: 0,
          validation:"",
          init: function(options){
                this.type = options.type;
		this.name = options.name;
		this.id = options.id;
		this.editable = options.editable;
		this.val = options.value;
                this.value = options.value;
	        this.html ="";
                this.alternativeValues = options.alternativeValues;
                this.chosenValue = options.chosenValue;
                this.errorMessage = options.errorMessage;
                this.valueMap = options.valueMap;
                this.validation  = options.validation;
          },
	  render:function(valueData){
	  		
		var field  = this.name.toLowerCase();
		var id_base = field;
		var id = id_base+'_id';
		this.id = id;
                var input_name = id_base.toLowerCase()+'_element';       
		field = $.fn.splitnCapitalizeFirstLetter(field,'_');
		field = field.replace('Id', 'ID');
                field = field.trim();
		this.value = valueData;
		var norm_div_id = id_base+'_div';   
		var message_id =  id_base+'_message';
		var fieldStr='';
		if(this.type ==='text' && this.editable ){
			  fieldStr ='<div class="control-group"  id="'+norm_div_id+'"><label class="control-label" for="'+id+'">'+field+'</label>'+
					'<div class="controls"><input  float: center class="input-xlarge span10 focused" id="'+id+'" type="text" name="'+input_name+'" value="'+valueData+'"/>'+
					'<span class="help-inline" style="display:none;" id="'+message_id+'">This value is not allowed<br /></span></div></div>';
		 }else if(this.type ==='text' && !this.editable){
			  fieldStr ='<div class="control-group"  id="'+norm_div_id+'"><label class="control-label" for="'+id+'">'+field+'</label>'+
				    '<div class="controls"><input class="input-xlarge span10 disabled" type="text" disabled="" placeholder="'+valueData+'" id="'+id+'" name="'+input_name+'" value="'+valueData+'">'+
				    '<span class="help-inline" style="display:none;" id="'+message_id+'">This value is not allowed</span></div></div> ';
		 }else if(this.type === 'select'){
				fieldStr ='<div class="control-group"  id="'+norm_div_id+'"><label class="control-label" for="'+id+'">'+field+'</label>'+
				'<div class="controls" align="left"><select id="'+id+'" name="'+input_name+'" data-rel="chosen">';			
			        console.dir(this.alternativeValues);
                                console.log(this.chosenValue);
                                var currentValue= this.alternativeValues[this.chosenValue];
                                for(var i=0; i <this.alternativeValues.length; ++i)
                                {
				if( i ===this.chosenValue){
				fieldStr +='<option value="'+currentValue +'" selected="selected">'+currentValue +'</option>';
				}else{
				    fieldStr +='<option value="'+this.alternativeValues[i]+'">'+this.alternativeValues[i]+'</option>';
				}
				}
                                fieldStr +='</select> <input type="hidden" id="'+id+'_value" name="'+input_name+'_value"  value=""/></div> </div>';
		 }else if(this.type === 'password'){
					// var value = this.value;
                                fieldStr = 	'<div class="control-group"  id="'+norm_div_id+'"><label class="control-label" for="'+id+'">'+field+'</label>'+
                                                '<div class="controls"><input  float: center class="input-xlarge span10 focused" id="'+id+'" type="password" name="'+input_name+'" value="'+valueData+'"/>'+
                                                '<span class="help-inline" style="display:none;" id="'+message_id+'">This value is not allowed</span></div></div>';
				       field = 'CONFIRM_PASSWORD';
					input_name = 'confirm_password_element';
                                        id_base = field.toLowerCase();
					id = id_base+'_id';
					norm_div_id = id_base+'_div';   
					 message_id = id_base+'_message';
					field =  field.replace('_', ' ');
					field=  field.toLowerCase();
					data =  this.value;

					fieldStr += '<div class="control-group"  id="'+norm_div_id+'"><label class="control-label" for="'+id+'">'+field+'</label>'+
						    '<div class="controls"><input  float: center class="input-xlarge span10 focused" id="'+id+'" type="password" name="'+input_name+'" value="'+valueData+'" />'+
						    '<span class="help-inline" style="display:none;" id="'+message_id+'">This value is not allowed<br /></span></div></div>';
		 	
		 }else if (this.type==='textarea'){
		 
		 	 fieldStr = '<div class="control-group"  id="'+norm_div_id+'"><label class="control-label" for="'+id+'">'+field+'</label><div class="controls"> <textarea  class="span10" name="'+input_name+'" class="cleditor" id="'+id+'" rows="3">'+valueData+'</textarea>'+
	                             '<span class="help-inline" style="display:none;" id="'+message_id+'">This value is not allowed<br /></span></div></div>';
		 }else if (this.type === 'autocomplete'){
		 
		 var datasource=this.autoCompleteDataSource;
		 datasource = '[&quot;'+datasource.join('&quot;,&quot;')+'&quot;]';
		 
		  fieldStr ='<div class="control-group"  id="'+norm_div_id+'"><label class="control-label" for="'+id+'">'+field+'</label>'+
		 	    '<div class="controls"><input class="span10 typeahead"   id="'+id+'" type="text" data-provide="'+id+'" data-items="4"  name="'+input_name+'" value="'+valueData+'" data-source="'+datasource+'">'+
			   '<span class="help-inline" style="display:none;" id="'+message_id+'">This value is not allowed<br /></span> </div></div>';
		 
		 }else if(this.type === 'datepicker'){
		fieldStr ='<div class="control-group"  id="'+norm_div_id+'"><label class="control-label" for="'+id+'">'+field+'</label>'+
			'<div class="controls"><input class="input-xlarge span10 datepicker" id="'+id+'" type="text" name="'+input_name+'" value="'+valueData+'"/>'+
			 '<span class="help-inline" style="display:none;" id="'+message_id+'">This value is not allowed<br /></span> </div></div>';
		     
		 }else if(this.type === 'file'){

				fieldStr ='<div class="control-group" id="'+norm_div_id+'"> <label class="control-label" for="fileInput">'+field+'</label><div class="controls">'+
				'<div class="uploader" id="uniform-fileInput"><input class="input-file uniform_on" id="fileInput" type="file"  id="'+id+'"'+
				' name="'+input_name+'" size="19" style="opacity: 0;"><span class="filename">No file selected</span><span class="action">Choose File</span></div></div></div>';
		 }else if(this.type === 'prependedtext'){
				fieldStr ='<div class="control-group" id="'+norm_div_id+'"><label class="control-label" for="'+id+'">'+field+'</label><div class="controls">'+
				' <div class="input-prepend input-append"><span class="add-on">N</span><input  id="'+id+'" type="text" name="'+input_name+'" '+
				' value="'+data+'"><span class="add-on">.00</span></div></div> </div>';
		 }else if(this.type === 'checkbox'){
				fieldStr =' <div class="control-group" id="'+norm_div_id+'"><label class="control-label" for="'+id+'">'+field+'</label> <div class="controls"> ';
				for(var altOpt in alternativeValues){
				fieldStr+='<label class="checkbox inline"><div class="checker" id="uniform-inlineCheckbox"'+field+'-'+altOpt+'" ><span>';
				' <input type="checkbox" id="'+id+'-'+altOpt+'" value="option1" style="opacity: 0;"></span></div>'+altOpt+'</label>';
				}
				fieldStr+='</div></div>';
		 }else if(this.type ==='radiobutton'){
		 	
                                    fieldStr = '<div class="control-group" id="'+norm_div_id+'><label class="control-label" for="'+id+'">'+field+'</label><div class="controls"> ';
                                    for(var altOpt in alternativeValues){
                                            fieldStr +='<label class="radio"><div class="radio" id="uniform-'+id+'-'+altOpt+'"><span class="+(altOpt==this.currentValue?\'checked\':\'\')+">'+
                                            '<input type="radio" name="optionsRadios" id="options-'+id+'-'+altOpt+'" value="'+altOpt+'" checked="" style="opacity: 0;"></span></div> '+
                                            altOpt+'  </label> <div style="clear:both"></div>';
                                            }
                                    fieldStr +='</div> </div>';
                     }else if(this.type === 'map'){
                                               if( this.editable)  {   
                                        fieldStr =  '<div class="control-group" id="'+norm_div_id+'" valign="center"><label class="control-label" for="'+id+'" >'+field+'</label>'+
                                                '<div class="controls">'+
                                                    '<div class="box span10">'+
                                                            '<div class="box-header well" data-original-title>'+
                                                            '	<h2>'+field+' </h2>'+
                                                            '	<div class="box-icon">'+
                                                            '		<a href="#" class="btn btn-minimize btn-round"><i class="icon-chevron-up"></i></a>'+
                                                            '	</div>'+
                                                            '</div>'+
                                                            '<div class="box-content">'+
                                                            '	<table class="table table-striped table-bordered bootstrap-datatable datatable highlight" id="'+id+'-list-table" >'+
                                                            '		  <thead>'+
                                                            '			  <tr>'+
                                                            '				  <th>No.</th>'+
                                                            '				  <th>Product</th>'+
                                                            '				  <th>Price</th>'+
                                                            '				  <th>Quantity</th> '+                                         
                                                            '			  </tr>'+
                                                            '		  </thead>   '+
                                                            '	 </table>  '+    
                                                            '</div>'+    
                                                            '</div>'+    
                                                            '</div>';
                                                              
                                                                  fieldStr +=    '<div >'+
                                                                    '<div class="control-group">'+
                                                                    '<span><br /><br /><br /><br /></span>'+
                                                                    '<div class="controls">'+
                                                                    '<select id="item-list-for-'+id+'" data-rel="chosen">';
                                                                     var products = $.fn.getAllProducts();
                                                              //    console.dir(products);
                                                                  for (var  i = 0;  i< products.length; i++){
                                                                          fieldStr += '<option>'+products[i]+'</option>';

                                                                  }
                                                                     fieldStr += '</select><br /><br />'+
                                                                         '<a href="#" title="Click to remove selected '+field.replace('List','')+'(s)" data-rel="tooltip" class="btn btn-danger" id="remove-'+id.replace('List','')+'-from-form" onclick ="$.fn.removeItemFromForm(\''+id+'\')">Remove '+field.replace('List','')+'</a>'+ 
                                                                         '<a href="#" title="Click to add a new '+field.replace('List','')+'" data-rel="tooltip" class="btn btn-success" id="add-'+id.replace('List','')+'-to-form" onclick ="$.fn.addItemToForm(\''+id+'\')">Add '+field.replace('List','')+'</a>'+
                                                              '<input type="hidden" name="'+id+'_item_count" id="'+id+'-item-count" value="0" />'+	
                                                              '<input type="hidden" name="'+id+'_added_items" id="'+id+'-added-items" value="" />'+	
                                                              '</div>'+
                                                              '</div>'+
                                                              '</div>';
                                                              }else{
                                                                      fieldStr =  '<div class="control-group" id="'+norm_div_id+'" valign="center"><label class="control-label" for="'+id+'" >'+field+'</label>'+
                                             '<div class="controls">'+
                                                '<div class="box span10">'+
                                                        '<div class="box-header well" data-original-title>'+
                                                        '	<h2>'+field+' </h2>'+
                                                        '	<div class="box-icon">'+
                                                        '		<a href="#" class="btn btn-minimize btn-round"><i class="icon-chevron-up"></i></a>'+
                                                        '	</div>'+
                                                        '</div>'+
                                                        '<div class="box-content">'+
                                                        '	<table class="table table-striped table-bordered bootstrap-datatable datatable highlight" id="'+id+'-list-table" >'+
                                                        '		  <thead>'+
                                                        '			  <tr>'+
                                                        '				  <th>No.</th>'+
                                                        '				  <th>Product</th>'+
                                                        '				  <th>Price</th>'+
                                                        '				  <th>Quantity</th> '+                                         
                                                        '			  </tr>'+
                                                        '		  </thead> <tbody>  ';
                                                        

                                                         
                                                                var id =  'product_list_id-list-table';
                                                                var productValue=valueData;
                                                                var productDetails = productValue.split(';');
                                                                var  currentItem = '';  
                                                                var items = new Array();
                                                                var count = 0;
                                                                var productData =  new Array();
                                                                var countInfo =id+'_count';
                                                                var itemListStr = id+'_item_list';
                                                                var itemList= new Array();
                                                                var t = $('#'+id+'-list-table').DataTable(); 
                                                                var price= 0;
                                                                var quantity =0;
                                                                var size =productDetails.length;
                                                                size =   productDetails[0].indexOf(':')>1 && size===0?1:size;
                                                                for(var  k =0; k< size; k++) { 
                                                                    productData = productDetails[k].split(':');
                                                                    console.dir(productData);
                                                                    items[k] = productData[0];
                                                                    price = productData[1];
                                                                    quantity = productData[2];
                                                                    currentItem = items[k]; 
                                                                    ++count;     
                                                                    fieldStr +='<tr><td>'+count.toString()+'</td><td>'+currentItem+'</td><td>'+ price+'</td><td>'+quantity+'</td></tr>';
                                                                    itemList.push(currentItem);
                                                                    $.session.set(countInfo, count);
                                                                }
                                                                itemList =  JSON.stringify(itemList);
                                                                $.session.set(itemListStr, itemList);
                                                                $('#'+id+'-item-count').val(count);
                                                                $('#'+id+'-added-items').val(itemList);
                                                                 fieldStr+=  '</tbody> </table>  '+    
                                                        '</div>'+    
                                                        '</div>'+    
                                                        '</div>';
                                                                  
                                                              }
                                                fieldStr +=  '</div><!--/span-->'; 
                                        ;

                                    $('#'+id+'-list-table tbody').on( 'click', 'tr', function () {
                                    if ( $(this).hasClass('selected') ) {
                                    $(this).removeClass('selected');
                                    }
                                    else {
                                    var table =$('#'+id+'-list-table').DataTable();
                                    table.$('tr.selected').removeClass('selected');
                                    $(this).addClass('selected');
                                    }
                                    } );
                                    var countInfo =id+'_count';
                                    $.session.delete(countInfo);
                                    var itemListStr = id+'_item_list';
                                    $.session.delete(itemListStr);
                                }else if(this.type ==='hidden' ){
                                         fieldStr ='<input id="'+id+'" type="hidden" name="'+input_name+'" value="'+valueData+'" />';
                                }
             this.html = fieldStr;
   return  fieldStr;
	  }
};


   function FormElement(options) {
    function F() {};
    F.prototype = formElementPrototype;
    var f= new F;
    f.html= f.init(options);
    return f;
  }
  
  
  var  formPrototype = {
      name:"",
      id:"",
      method:"",
      encType:"",
      dataType:"",
      type: "NEW",
      accessType: "view",
      action:"",
      class: "",
      nextPageUrl:"",
      allFields: new Array(),
      data: new Array(),
      dataCount: 0,
      html:"",
      elementList: new Array(),
      head:"",
      foot:"",
      headerStr: function(){
                var headerStr = '<form class="'+this.class+'" enctype="'+this.encType+'"  id ="'+this.id+'" name="'+this.name+'" method ="'+this.method+'" action="'+this.action+'" >'+
                '<fieldset><input id="is-form-data-valid" type="hidden" name="is_form_data_valid" value="NO"/> ';               
                headerStr +='   <input type ="hidden"  id="form-type" name="'+this.dataType+'_type" value="'+this.type+'" />  <input id="data-item" type="hidden" name="data_item" value="'+replaceAll(this.dataType,'-','_')+'"/>';
                 return headerStr;
		 },
      footerStr: function(){
            var footerStr ='';
            footerStr +='<br /><br /><div class="form-actions"><div id="submit-form-loader"  align="center" style="display:none;"> <img src="img/ajax-loaders/ajax-loader-7.gif" title="img/ajax-loaders/ajax-loader-7.gif"> '+
            '<br />&nbsp;<br /> </div>';
            var elementString =  JSON.stringify(this.elementList);
            $.session.set(this.id+'_form_elements', elementString);
            $.session.set(this.id+'_next_pages', this.nextPageUrl);
           // alert(this.accessType);
            if(this.accessType==='edit' || this.type==='NEW'){
                footerStr += '<div align="center" id="'+this.id+'-footer-section"><button type="submit" class="btn btn-primary" id="submit-bttn" onclick = "$.fn.submitForm(\''+this.id+'\',\''+this.id+'_form_elements\')" >Save</button>'+
                    '<span><a data-original-title="'+this.dataType+'" style="display:none" href="" class="btn btn-small btn-info" data-rel="popover" data-content="Go back to '+this.dataType+' page" id="'+this.dataType+'-table-bttn">'+this.dataType+' </a> '+
                    '<button class="btn" id="cancel-bttn" type="reset">Clear</button> </div>';    
            } else if (this.accessType==='view'){
               footerStr += '<div align="center" id="'+this.id+'-footer-section">'+this.nextPageUrl+'</div>';
            }
            footerStr += '</div></fieldset></form></div>';					  
            return footerStr;   
      },
      addElement: function(element){
          this.elementList.push(element);
      },
      render: function (){
           this.html = this.headerStr();
//           console.dir(this.elementList);
           for(var index in this.elementList ){
                 this.html+= this.elementList[index].html;
           }
           this.html += this.footerStr();
          return this.html;
      }
  };
  
   function Form() {
    function  F(){};
    F.prototype = formPrototype;
    var frm  =  new F();
    frm.elementList  =  new Array();
    var head  = '';//frm.headerStr();
    var foot =  '';//frm.footerStr();
    frm.html =  ''; //frm.render();
    return frm;
    }
$.fn.getForm =  function (tagID, tableName,sourceUrl ,mode, recordID, formDetails,elements){

             var responseData  ='';               
             var paramString   = 'reqTab='+tableName+'&reqType=form&record_id='+recordID;//+'&data_item='+formDetails.dataType;
             var formTarget    =sourceUrl;
             var xmlhttp =null;
             var formSessionData  =  $.session.get(tableName);
             var formData ="";
             var resetFlag = 0;

             if(formDetails.type === 'NEW'  && mode=== 1){
                 
                    var currentForm          =  new Form();
                    currentForm.class        = formDetails.class;
                    currentForm.id           = formDetails.id;
                    currentForm.name         = formDetails.name;
                    currentForm.encType      = formDetails.encType;
                    currentForm.method       = formDetails.method;
                    currentForm.action       = formDetails.action;
                    currentForm.type         = formDetails.type;
                    currentForm.dataType     = formDetails.dataType;
                    currentForm.accessType   = formDetails.accessType;
                    currentForm.nextPageUrl  = formDetails.nextPageUrl;     
                    
                 /*   $.post( "functions/data_driver.php", {"reqType":'table', "reqTab":tableName, 'dataType':formDetails.dataType})
                    .done(function( data ) {
                    try{
                       alert(data);
                       responseData             = JSON.parse(data);
                    }catch(e){
                         $.fn.showMessageDialog('<div align="center">Data Fetch Error</div>', '<div align = "center" color="red">Error fetching data</div>'+ e.stack+'<br /><br />'+data); 
                    }

                    });
        */
                   // alert( currentForm.allFields );
                    //currentForm.allFields    = responseData[0][recordID];
                  //  console.dir(responseData);
                 /**   if( null!==responseData[1]){
                        console.log('Record ID: '+recordID);
                       console.dir(responseData);
                            currentForm.data      =responseData[1][recordID];
                            currentForm.dataCount =responseData[2][recordID];
                            var curElement ="";
                            for (var index in elements){
  
                                curElement = elements[index].name.toUpperCase();
                                 if(elements[index].name !== 'reqTab' && elements[index].name !== 'reqType'&&  elements[index].name !== 'reqMode'){
                          
                                        if(currentForm.data[curElement]){
                                           elements[index].value =  currentForm.data[curElement].replace('null','');
                                           elements[index].render(currentForm.data[curElement].replace('null',''));  
                                        }else{
                                          elements[index].value ='';
                                          elements[index].render('');
                                                    }
                                       }else{
                                           elements[index].render(elements[index].value);
                                       }
                                       
                                currentForm.addElement(elements[index]);                    
                             }
                            formData = currentForm.render();
                            $('#'+tagID).html(formData);
                             docReady();
                } else{
                    
                */
                      var curElement ="";
                            for (var index in elements){
                                curElement = elements[index].name.toUpperCase();
                                if(currentForm.data[curElement]){
                                    elements[index].value =  currentForm.data[curElement].replace('null','');
                                    elements[index].render(currentForm.data[curElement].replace('null',''));
                                   
                            }else{
                                  elements[index].value ='';
                                  elements[index].render('');
                            }                          
                                currentForm.addElement(elements[index]);                    
                            }
                            formData = currentForm.render();                          
                            $('#'+tagID).html(formData); 
                             docReady();
             //   }
              }else if ((formSessionData)!==null &&  resetFlag !==1){
                    try{
                            responseData =formSessionData;
                          //  $.session.set(tableName, JSON.stringify(responseData)); //new data should not overwrite existing data.
                           if(responseData.length ===3){
                         //   console.dir(responseData);
                            var currentForm =  new Form();
                            currentForm.class = formDetails.class;
                            currentForm.id  =formDetails.id;
                            currentForm.name =  formDetails.name;
                            currentForm.encType = formDetails.encType;
                            currentForm.method = formDetails.method;
                            currentForm.action  = formDetails.action;
                            currentForm.type = formDetails.type;
                            currentForm.dataType = formDetails.dataType;
                            currentForm.accessType = formDetails.accessType;
                            currentForm.nextPageUrl  = formDetails.nextPageUrl;
                            currentForm.allFields = responseData[0][0];
                            currentForm.data   =responseData[1]?responseData[1][0]:null;
                            currentForm.dataCount =responseData[2][0];
//                            console.dir(responseData);
                            for (var index in elements){
                                if(elements[index].val){
                                    elements[index].value;
                                    elements[index].render( elements[index].val.replace('null',''));
                             }else{
                                     elements[index].val ='';
                                    elements[index].render('');
                            }
                            currentForm.addElement(elements[index]);                    
                            }
                        formData = currentForm.render();
                    $('#'+tagID).html(formData);
                    docReady();
                    
    }
        }catch(e){
          $.fn.showMessageDialog('Error loading data from memory', e.stack+'<br /><br />'+xmlhttp.responseText);
     }
                  
                  
                  
              }else {    
                   if (window.XMLHttpRequest){
                                        xmlhttp=new XMLHttpRequest();
                            } else  {
                                    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
                            }
            
                       xmlhttp.onreadystatechange =     function (){
                      if (xmlhttp.readyState===4 && xmlhttp.status===200){
                       try{
                              $.session.set(tableName,xmlhttp.responseText);
                            responseData =JSON.parse(xmlhttp.responseText);
                          //  $.session.set(tableName, JSON.stringify(responseData)); //new data should not overwrite existing data.
                           if(responseData.length ===3){
                         //   console.dir(responseData);
                            var currentForm =  new Form();
                            currentForm.class = formDetails.class;
                            currentForm.id  =formDetails.id;
                            currentForm.name =  formDetails.name;
                            currentForm.encType = formDetails.encType;
                            currentForm.method = formDetails.method;
                            currentForm.action  = formDetails.action;
                            currentForm.type = formDetails.type;
                            currentForm.dataType = formDetails.dataType;
                            currentForm.accessType = formDetails.accessType;
                            currentForm.nextPageUrl  = formDetails.nextPageUrl;
                            currentForm.allFields = responseData[0][0];
                            currentForm.data   =responseData[1]?responseData[1][0]:null;
                            currentForm.dataCount =responseData[2][0];
//                            console.dir(responseData);
                            for (var index in elements){
                                if(elements[index].val){
                                    elements[index].value;
                                    elements[index].render( elements[index].val.replace('null',''));
                             }else{
                                     elements[index].val ='';
                                    elements[index].render('');
                            }
                            currentForm.addElement(elements[index]);                    
                            }
                        formData = currentForm.render();
                    $('#'+tagID).html(formData);
                    docReady();
                    
    }
        }catch(e){
          $.fn.showMessageDialog('Error Comminucating with Server', e.stack+'<br /><br />'+xmlhttp.responseText);
     }
         }
     
     };
                xmlhttp.open("POST",formTarget,true);
                xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
                 xmlhttp.send(paramString);  
 }
};
    var tableContents ="";
         if( $('#information-table-contents').length > 0) {
              tableContents = $('#information-table-contents').val();
             var excluded = new Array();
             excluded[0] = 'INDEX_NUM';
             excluded[1] = 'EDITABLE';
             var defaultSearchMode = 0;
             }
              if(tableContents==='setting')$.fn.getTable('data-presentation-span','table table-striped table-bordered bootstrap-datatable datatable dataTable no-footer','nst_settings','settings_table','functions/data_driver.php',excluded, defaultSearchMode);
      if($('#settings-form-span').length > 0 )  {

      }

$.fn.editEntry2 =  function ( recordID){
$('#data-presentation-span').html('');
var tableContentsField  = document.getElementById('information-table-contents');
 var tableContents = tableContentsField.value;
   if(tableContents === 'Purchase'){
	                  $.fn.getPurchaseForm ('EXISTING',recordID, true);
                     
	            }else if(tableContents === 'Supply'){
	                  $.fn.getSupplyForm ('EXISTING',recordID, true);
                     
	            } else if(tableContents === 'Product'){
	                  $.fn.getProductForm ('EXISTING',recordID, true);
	            }else if(tableContents === 'Role'){
	                  $.fn.getRoleForm ('EXISTING',recordID, true);
	            }else  if(tableContents === 'Users'){
	                  $.fn.getUserForm('EXISTING', recordID, true); 
	            }
 /**
 if(tableContents === 'setting'){
                //window.location='index.php?p=administration/setting_details&mode=edit&type=EXISTING&ind='+recordID; 
                var formDetails = {
                class:'form-horizontal'
                ,encType:'multipart/form-data'
                ,id:'setting-form'
                ,name:'setting_mode'
                ,method:'post'
                ,action:'functions/setting_processor.php'
                ,type:'EXISTING'
                ,dataType:'setting'
                ,accessType:'edit'
                ,nextPageUrl:'index.php?p=administration/settings'
  
        };
                var settingsID =  new FormElement({
                name: 'setting_id',
                type: 'text',
                validation: 'alphanumeric',
                id: "setting-form", 
                editable:  false, 
                value:  "", 
                class:"input-xlarge disabled", // input-xlarge focused",
                alternativeValues: "", 
                chosenValue: "", 
                errorMessage: "", 
                valueMap:  "", 
                data: new Array(),
                dataCount: 0,
                size: 0
	});
	var settingsName =  new FormElement( {
	name: 'setting_name',
	type: 'text',
	validation: 'alphanumeric',
	size: 0,
        editable:  true
	});
	var settingsValue =  new FormElement({
                    name: 'setting_value',
                    type: 'text',
                    validation: 'numeric', 
                     id: "", 
                    editable:  true, 
                    value:  "", 
                    class:"input-xlarge focused",
                    alternativeValues: "", 
                    chosenValue: "", 
                    errorMessage: "", 
                    valueMap:  "", 
                    data: new Array(),
                    dataCount: 0,
                    size: 0
	});
	var settingsValueHistory =  new FormElement( {
	name: 'setting_value_history',
	type: 'textarea',
	validation: 'alphanumspecial',
        id: "", 
        editable:  true, 
        value:  "", 
        class:"input-xlarge focused",
        alternativeValues: "", 
        chosenValue: "", 
        errorMessage: "", 
        valueMap:  "", 
        data: new Array(),
        dataCount: 0,
        size: 10000
	});
	var description =  new FormElement( {
	name: 'description',
	type: 'textarea',
	validation: 'alphanumeric',
	 id: "", 
        editable:  true, 
        value:  "", 
        class:"input-xlarge focused",
        alternativeValues: "", 
        chosenValue: "", 
        errorMessage: "", 
        valueMap:  "", 
        data: new Array(),
        dataCount: 0,
        size: 10000
	});
	var datetimeOfCreation =  new FormElement( {
	name: 'date_of_creation',
	type: 'text',
	validation: 'date',
	 id: "", 
        editable:  true, 
        value:  "", 
        class:"input-xlarge focused",
        alternativeValues: "", 
        chosenValue: "", 
        errorMessage: "", 
        valueMap:  "", 
        data: new Array(),
        dataCount: 0,
        size: 255
	});
        
     	var formElements = {
	0: settingsID,
	1: settingsName,
	2: settingsValue,
	3:settingsValueHistory,
	4:description,
	5:datetimeOfCreation
	};
        
        var  tagID  = 'data-presentation-span';
        var tableName = 'nst_settings';
        var sourceUrl  ='functions/data_driver.php';
        var mode  = 0;
        $('#'+tagID).html('');                
        $.fn.getForm (tagID, tableName,sourceUrl ,mode, recordID, formDetails,formElements);
        }
        */
      };
      
      $.fn.submitForm = function(id, elementsStr){
          try{
            $.fn.formValidator (id,elementsStr,$.fn.showValidationReport);
          }catch(e){
          $.fn.showMessageDialog('Error Comminucating with Server', 'Data from form: '+id+' could not be submitted. Reason: '+ e.stack);
     }
      };
    $.fn.lockScreen =function(){
                                           
                                        var loginFormData =$.fn.getLockDialog();
                                        var header = '<span align="center" style="font-weight:bold; font-size:20px;color:black">Session Locked</span>';
                                        $('#dialog-message-div').html(loginFormData);
                          
                                                $('#dialog-ok-bttn').hide();
                                                $('#close-dialog-cross').hide();
                                                $('#dialog-no-bttn').hide();
                                                $('#dialog-yes-bttn').hide(); 
                                                $('#dialog-close-bttn').hide(); 
                                               //    $('#dialog-username-id').val('username');
                                                //$('#dialog-password-id').val('password');  
                                                $('#dialog-username-id').val('');
                                                $('#dialog-password-id').val('');    
                                                $.fn.showDialog(header);
                                                $('#dialog-login-message').html('<span align="center" style="font-color:blue;">Use your  credentials to unlock this session</span>');
                                                $('#dialog-login-message').show();
                                    
                                 };
                                 
                                  //establish history variables
    var $log = $('#log');
    var defaultTheme = 'cerulean';
    var currentTheme = $.cookie('currentTheme') === null ? defaultTheme : $.cookie('currentTheme');
    var msie = navigator.userAgent.match(/msie/i);

    $.fn.drawContents = function (currentItem,parentPage,currentPage){
        parentPage = parentPage!==''?parentPage:'Main';
    
        var contentStr = '<div id="content" >'+
           ' <!-- content starts -->'+
    '<div>'+
    '     <form name="upload_setting_data" id="upload-setting-data" method="post" enctype="multipart/form-data" >'+
        '<input type="hidden" name ="information_table_contents" id="information-table-contents" value="'+currentItem+'"/>'+
        '<input type="hidden" name="is_checked" id="is-checked" value="unchecked" />'+
        '<input type="hidden" name="change_index" id="change-index" value="0" />'+
        '<input type="hidden" name="total_items" id="total-items" value="" />'+
        '<input type="hidden" name="upload_data" id="upload-data" value="'+currentItem+'" />'+
'  </form>'+
    '<ul class="breadcrumb">'+
        '<li>'+
            '<a href="#" id ="parent-page-link">'+parentPage+'</a>'+
        '</li><span class="divider">/</span>'+
        '<li>'+
            '<a href="#" id ="current-page-link">'+currentPage+'</a>'+
        '</li>'+
    '</ul>'+
'</div>'+
'<div  id="content-header" class="row-fluid">'+
'<div  style="float:left;">'+
'<a id = "new-'+currentItem.toLowerCase()+'" data-original-title="New '+currentItem+'" href="#" class="btn btn-large btn-success" data-rel="popover" data-content="Click here to add a new '+currentItem+'" onClick="$.fn.addNewItem(this)"> New '+currentItem+'</a>'+
'</div>'+
'<div  class="row" style="float:right">'+
        '<div class="btn-group">'+
        
                        '<button class="btn btn-large">Upload</button>'+
                        '<button class="btn btn-large dropdown-toggle" data-toggle="dropdown"><span class="caret"></span></button>'+
                        '<ul class="dropdown-menu">'+
' <li ><a href="#" id="upload-file"><i class="icon-star"></i>Upload File</a><span id="upload-span" style="display: none"><input id="'+currentItem+'-upload" name="'+currentItem+'_upload" style="opacity: 0;" size="8" type="file"></span></li>'+
                                '<li id ="get-template"><a href="./functions/download_manager.php?req='+currentItem+'_template"><i class="icon-download-alt"></i> Get Template</a></li>'+
                        '</ul>'+
        '</div>'+
'</div>'+
'</div>'+
                    '<div class="row-fluid sortable">'+
		    '<div class="box span12">'+
                    '<div class="box-header well" data-original-title="'+currentItem+'">'+
                    '<h2> <i class="icon-edit"></i> '+currentItem+'</h2>'+
                    '<div class="box-icon">'+
                          //  '<a href="#" class="btn btn-setting btn-round"><i class="icon-cog"></i></a>'+
                            '<a href="#" class="btn btn-minimize btn-round"><i class="icon-chevron-up"></i></a>'+
                         //   '<a href="#" class="btn btn-close btn-round"><i class="icon-remove"></i></a>'+						
                    '</div>'+
                   ' </div>'+
    '<div class="box-content">'+
    '<div class="alert alert-info" id="'+currentItem+'-alert" style="display:none"></div>'+
    '<div  id="data-presentation-span" class="row-fluid sortable" > <div>'+     
    '</div>'+
        '</div>'+
    '</div>'+
        '</div>'+
           '</div>'+
    '<!--/span-->'+
    '<div class="row">'+
                    ' <span style="display:none; float: left;" id="extra-options">            <div class="btn-group">'+
							'<button class="btn btn-large">ACTIONS</button>'+
							'<button class="btn btn-large dropdown-toggle" data-toggle="dropdown"><span class="caret"></span></button>'+
							'<ul class="dropdown-menu">'+
								'<li id="remove"><a href="#" onclick="$.fn.deleteEntryList()"><i class="icon-star"></i>Remove</a></li>'+
								'<li id="download"><a href="#" onclick="$.fn.downloadEntryList()"><i class="icon-download-alt"></i>Download</a></li>'+
                                                                '<li id="remove-all"><a href="#" onclick="$.fn.RemoveAllItems()"><i class="icon-star"></i>Remove All</a></li>'+
                                                               ' <li id="download-all"><a href="./functions/download_manager.php?req=all_settings"><i class="icon-download-alt"></i>Download All</a></li>'+						      
							'</ul>'+
						'</div>'+
                          '</span>'+
  
'</div><!--/row-->'+

    '<!-- content ends -->'+
   ' </div>';
   
        return contentStr;
        
        
    };
                 //ajaxify menus
    $('a.ajax-link').click(function (e) {
        if (msie) e.which = 1;
        if (e.which !== 1 || $(this).parent().hasClass('active')) return;
        e.preventDefault();
        $('.sidebar-nav').removeClass('active');
        $('.navbar-toggle').removeClass('active');
        $('#loading').remove();
        $('#content').fadeOut().parent().append('<div id="loading" class="center">Loading...<div class="center"></div></div>');
        var $clink = $(this);
        History.pushState(null, null, $clink.attr('href'));
        $('ul.main-menu li.active').removeClass('active');
        $clink.parent('li').addClass('active');
        var id = $clink.attr('id');
        switch(id){
                   case 'reports-side-link':
                        var currentItem = 'Reports';
                        var parentPage= 'Dashboard';
                        var currentPage = 'Reports';
                        var contents = $.fn.drawContents(currentItem,parentPage,currentPage);
                        $('#content').html('');
                        $('#loading').hide();
                        $('#content').fadeIn().append(contents);
                        docReady();
                break;
                   case 'charts-side-link':
                
                break;
                   case 'bakery-side-link':
                
                break;
                   case 'purchase-side-link':
                        $.fn.showAllPurchases();
                break;
                   case 'supply-side-link':
                     $.fn.showAllSupplies();
                break;
                   case 'bake-side-link':
                
                break;
                   case 'users-side-link':
                    
                       $.fn.showAllUsers();
                break;
                   case 'roles-side-link':
                     $.fn.showAllRoles();
                break;
                   case 'suppliers-side-link':
                
                break;
                 case 'bakers-side-link':
                
                break;
                     case 'customers-side-link':
                
                break;
                     case 'products-side-link':
                     
                       $.fn.showAllProducts();
                break;
                     case 'raw-items-side-link':
                
                break;
                     case 'raw-purchase-side-link':
                
                break;
                case 'batch-side-link':
                
                break;
                 case 'bake-requests-side-link':
                
                break;
                  
                
        }
    });

$.fn.addNewItem = function(event){
     var source = event.id;
    switch (source){
        case 'new-purchase':
            $.fn.getPurchaseForm ('NEW',0, true);
       break;
          case 'new-supply':
            
            $.fn.getSupplyForm ('NEW',0, true);
 
         break;
          case 'new-product':
            
            $.fn.getProductForm ('NEW',0, true);
 
         break;
         case 'new-role':
            
            $.fn.getRoleForm ('NEW',0, true);
 
         break;
         case 'new-users':
            
            $.fn.getUserForm ('NEW',0, true);
 
         break;
       
       
    }
     
};
 /** initialize when ready **/
// $("a").load(function(e){
//     if($(this).attr('class')!=='btn btn-minimize btn-round' ){
//        $(this).attr('href', '');
//     }
// });
//   $("a").click(function(e){
//       if($(this).attr('class')!=='btn btn-minimize btn-round' ){
//            e.preventDefault();
//         }
// });
$('#footer-id').css('position','relative');
$('#footer-id').css('position',($(document).height()-7));

$.fn.addItemToForm = function( id){

     var  currentItem = $('#item-list-for-'+id).val();  
     var  countCheck =$('#'+id+'-item-count').val();
     var items = new Array();
     var count = 0;
     
     if(parseInt(countCheck) >0){
         
         var itemListStr = id+'_item_list';
          items = $.session.get(itemListStr);
         // items = JSON.parse(items);
          count  = countCheck;
          
     }else{
        var countInfo =id+'_count';
        var count = $.session.get(countInfo);
        count = count?count:0;
        var itemListStr = id+'_item_list';
        items = $.session.get(itemListStr);
     }
     
    var itemList = items?JSON.parse(items):new Array();
    if(itemList.indexOf(currentItem)<0){
        ++count;
      var t = $('#'+id+'-list-table').DataTable(); 
          t.row.add([count.toString(), currentItem,'<input type="text" name="'+id+'_price_'+count+'"  class="span10 column2"  id="'+id+'-price-'+count+'"  onchange="$.fn.checkValidity(\''+id+'-price-'+count+'\')"  value/>',
         '<input type="text" name="'+id+'_count_'+count+'"  class="column3"  id="'+id+'-count-'+count+'"  onchange="$.fn.checkValidity(\''+id+'-count-'+count+'\')"  value/>'
         ]).draw();
        itemList.push(currentItem);
        $.session.set(countInfo, count);
        itemList =  JSON.stringify(itemList);
        $.session.set(itemListStr, itemList);
        $('#'+id+'-item-count').val(count);
        $('#'+id+'-added-items').val(itemList);
    }else
    {
        
             var header =  '<div style="font-size:16px; font-weight:bold; color:red; align=center"> Item Already added to List</div>';   
            $('#dialog-message-div').html('<span align="center">'+currentItem+ ' has already been added to the list!</center>');
            $(this).val('');
            $.fn.showDialog(header);   
        
    }
};

$.fn.removeItemFromForm = function( id){
var t = $('#'+id+'-list-table').DataTable();
var  currentItem = $('#item-list-for-'+id).val();
var  countCheck =  parseInt( $('#'+id+'-item-count').val());
var items = new Array();
     if(countCheck >0){
          var itemListStr = id+'_item_list';
          items =$.session.get(itemListStr);
          count  = countCheck;
     }else{
        var countInfo =id+'_count';
        var count = $.session.get(countInfo);
        
        count = count?count:0;
        var itemListStr = id+'_item_list';
        items = $.session.get(itemListStr);
     }
   var itemList = items?JSON.parse(items):new Array();
   var currentVal = itemList.indexOf(currentItem);

    if(currentVal>=0){
            t.row(currentVal).remove().draw( false );
            --count;
            itemList.splice($.inArray(currentItem,itemList),1);
            $.session.set(countInfo, count);
            itemList =  JSON.stringify(itemList);
            $.session.set(itemListStr, itemList);
            $('#'+id+'-item-count').val(count);
            $('#'+id+'-added-items').val(itemList);
            var currentValue =  $('#'+id+'-price-'+currentVal).val();
            currentValue =  $('#'+id+'-price-'+currentVal).val()?$('#'+id+'-price-'+currentVal).val():0;
            var currentCount =  $('#'+id+'-count-'+currentVal).val()?$('#'+id+'-count-'+currentVal).val():0;
            var amount =  $("#total_amount_id").val()?$("#total_amount_id").val():0;
            console.log(amount);
            amount = amount - currentValue;
           amount = !isNaN(amount)?  amount:0;
            $("#total_amount_id").val( amount);
            var paid =  $('#amount_paid_id').val()?$('#amount_paid_id').val():0;
            paid = paid - currentValue;
           paid =  !isNaN(paid)?  paid:0;
            $('#amount_paid_id').val(paid);
            var quantity  =  $("#total_quantity_id").val()?$("#total_quantity_id").val():0;
              quantity  = quantity -currentCount; 
           quantity =  !isNaN(quantity)?  quantity:0;
             $("#total_quantity_id").val(quantity);
    }else{
             var  currentItem = $('#item-list-for-'+id).val();
             var header =  '<div style="font-size:16px; font-weight:bold; color:red; align=center"> Item Already added to List</div>';   
            $('#dialog-message-div').html('<span align="center">'+currentItem+ ' is not on the list!</span>');
            $(this).val('');
            $.fn.showDialog(header);   
    }
};

$.fn.checkValidity  = function(id){
	var numbers = /^[\d,\d.\d]+$/m;
        var value = $('#'+id).val();
        var totQuantity = 0;
        var totAmount = 0;
 
	if(!value.match(numbers)) {
            var header =  '<div style="font-size:16px; font-weight:bold; color:red; align=center"> Not A Number!</div>';   
            $('#dialog-message-div').html(' Value should contain numbers only.');
            $('#'+id).val('');
            $.fn.showDialog(header);
    }else{
       var type =   $('#form-type').val();
       if(type==='NEW'){
            var quantities = $(".column3");
            var prices = $(".column2");
            var quantity =0;
            var price = 0;
            for(var i = 0; i < quantities.length; i++){
                quantity = $(quantities[i]).val();
                quantity =      !quantity?0:parseInt(quantity);
                price    = $(prices[i]).val();
                price    =     !price?0:parseInt(price);
                totQuantity+=(quantity);
                totAmount+=price*quantity;
            }
            totQuantity =  typeof totQuantity==="number" &&  !isNaN(totQuantity)?  totQuantity:0;
            totAmount =  typeof totAmount==="number" && !isNaN(totAmount)? totAmount:0;
            $("#total_quantity_id").val(totQuantity);
            $("#total_amount_id").val(totAmount);
     }
        
    }
    
    
};

$('#amount_paid_id').on('change', function(e){
   $.fn.checkValidity($(this).attr('id'));
   var amount =  $("#total_amount_id").val();
   amount  = amount!==null     ?amount:0;
   var paid =  $('#amount_paid_id').val()?$('#amount_paid_id').val():0;
  amount =  !isNaN(amount)?  amount:0;
  paid =  !isNaN(paid)?  paid:0;
   var debt = amount-paid;
   $('#amount_outstanding_id').val(debt);
   console.dir( $('#status_id'));
    if(debt===0){   
        $('#status_id').val("COMPLETE");
    }else if((debt===amount)){
        $('#status_id').val("UNPAID");       
    }else if(debt<amount){
         $('#status_id').val("PARTLY PAID");
    }
    if (paid > amount){
        var header = 'Invalid Amount Paid';
        var message= 'Amount paid : '+paid+' should not exceed Total Amount: '+amount;
        $.fn.showMessageDialog(header,message);
         $('#amount_paid_id').val(0);
    }   
});
$('form').on('submit', function (e){
    e.preventDefault();
});

//$('.autoselect').on('change', function(e){
//    var id = $(this).attr('id');
//    var selectID = id.replace("_value");
//    var value  = $('#'+selectID).val();
//    $(this).val(value);  
//});

 $.fn.drawPurchaseTable = function (tableInfo,  excluded, defaultSearchMode, opts){
     
  $.fn.getTable('data-presentation-span','table table-striped table-bordered bootstrap-datatable datatable responsive datatable',tableInfo,'purchase_table','functions/data_driver.php',excluded, defaultSearchMode, opts);

     
 };
 $.fn.drawRoleTable = function (tableInfo, excluded, defaultSearchMode, opts){
     
      $.fn.getTable('data-presentation-span','table table-striped table-bordered bootstrap-datatable datatable responsive datatable',tableInfo,'role_table','functions/data_driver.php',excluded, defaultSearchMode, opts); 
 };
  $.fn.drawSupplyTable = function (tableInfo,  excluded, defaultSearchMode, opts){
     
  $.fn.getTable('data-presentation-span','table table-striped table-bordered bootstrap-datatable datatable responsive datatable',tableInfo,'supply_table','functions/data_driver.php',excluded, defaultSearchMode, opts);

     
 };
 $.fn.drawProductTable = function (tableInfo,  excluded, defaultSearchMode, opts){
     
  $.fn.getTable('data-presentation-span','table table-striped table-bordered bootstrap-datatable datatable responsive datatable',tableInfo,'product_table','functions/data_driver.php',excluded, defaultSearchMode, opts);

 };
 
  $.fn.drawUserTable = function (tableInfo,  excluded, defaultSearchMode, opts){
     
  $.fn.getTable('data-presentation-span','table table-striped table-bordered bootstrap-datatable datatable responsive datatable',tableInfo,'user_table','functions/data_driver.php',excluded, defaultSearchMode, opts);

 };
 
  $('#purchase-date-filter').on('click', function(e){
        var dateSearch = $('#purchase-date-field').val();
        var startDate  = $('#purchase-start-date').val();
        var endDate    = $('#purchase-end-date').val(); 	 
        var defaultSearchMode = 1;
        var tableInfo  ='unna_purchases&f='+dateSearch+'&s='+startDate+'&e='+endDate; 
        var opts = {isViewable:true,isEditable:false,isIndelible:true};
        var excluded = new Array();
        excluded[0] = 'INDEX_NUM';
        excluded[1] = 'LAST_MODIFIED_DATE';
        excluded[2] = 'AMOUNT_OUTSTANDING';
        excluded[3] = 'STATUS';
        excluded[4] = 'USER_ID';
        excluded[6] = 'PRODUCT_LIST';
     $.fn.getPurchaseStats(dateSearch,startDate,endDate);
     $.when($.fn.drawPurchaseTable  (tableInfo, excluded, defaultSearchMode, opts)).then(function() {
     $.fn.showMessageDialog('<div align="center"> Data Filter Succeeded </div>','<div align="center"> Now showing purchases between  '+startDate+' and  '+endDate+' of  the '+replaceAll(dateSearch, '_',' ')+' field. </div>');
  }, function() {
     $.fn.showMessageDialog('<div align="center"> Data Filter Failed </div>','<div align="center"> Error loading purchases between  '+startDate+' and  '+endDate+' of  the '+dateSearch+' field. </div>');
 
  });
	 
 });
   $('#supply-date-filter').on('click', function(e){
        var dateSearch = $('#supply-date-field').val();
        var startDate  = $('#supply-start-date').val();
        var endDate    = $('#supply-end-date').val(); 	 
        var defaultSearchMode = 1;
        var tableInfo  ='unna_supplies&f='+dateSearch+'&s='+startDate+'&e='+endDate; 
        var opts = {isViewable:true,isEditable:false,isIndelible:true};
        var excluded = new Array();
        excluded[0] = 'INDEX_NUM';
        excluded[1] = 'LAST_MODIFIED_DATE';
        excluded[2] = 'AMOUNT_OUTSTANDING';
        excluded[3] = 'STATUS';
        excluded[4] = 'USER_ID';
        excluded[6] = 'PRODUCT_LIST';
     $.fn.getSupplyStats(dateSearch,startDate,endDate);
     $.when($.fn.drawSupplyTable  (tableInfo, excluded, defaultSearchMode, opts)).then(function() {
     $.fn.showMessageDialog('<div align="center"> Data Filter Succeeded </div>','<div align="center"> Now showing supplies between  '+startDate+' and  '+endDate+' of  the '+replaceAll(dateSearch, '_',' ')+' field. </div>');
  }, function() {
     $.fn.showMessageDialog('<div align="center"> Data Filter Failed </div>','<div align="center"> Error loading supplies between  '+startDate+' and  '+endDate+' of  the '+dateSearch+' field. </div>');
 
  });
	 
 });
 
  $.fn.getPurchaseStats = function (dateField, startDate,endDate ){
	 	 
	 $.post( "functions/data_driver.php", { "reqType":'misc', "dataType":'purchase', "f": dateField,  "s": startDate, "e":endDate })
      .done(function( data ) {
         try{
          data = JSON.parse(data);
          var  unpaidCount1 = 0;
          var  unpaidAmount1 =0.0;
          var  partlyPaidCount1 = 0;
          var  partlyPaidAmount1 =0.0;
          var  paidCount1 = 0;
          var  paidAmount1 =0.0;
          var  unpaidCount2 = 0;
          var  unpaidAmount2 =0.0;
          var  partlyPaidCount2 = 0;
          var  partlyPaidAmount2 =0.0;
          var  paidCount2 = 0;
          var  paidAmount2 =0.0;
         
          for (var index in data){
              
             if(data[index].status!==null && data[index].stat_type ==='today' ){
               alert(data[index].status);
               alert(data[index].stat_type);
              if(data[index].status==='UNPAID' ){
                  unpaidCount1 = data[index].rec_count;
                  unpaidAmount1 = data[index].total_amount;
                  
              }else if(data[index].status==='PARTLY PAID' ){
                   partlyPaidCount1 = data[index].rec_count;
                   partlyPaidAmount1 =data[index].total_amount;
                  
              }else if(data[index].status==='COMPLETE' ){
                   paidCount1 = data[index].rec_count;
                   paidAmount1 = data[index].total_amount;
                  
              }
          }else if(data[index].status !==null && data[index].stat_type==='history' ){
               
              if(data[index].status==='UNPAID' ){
                  unpaidCount2 = data[index].rec_count;
                  unpaidAmount2 = data[index].total_amount;
                  
              }else if(data[index].status==='PARTLY PAID'){
                   partlyPaidCount2 = data[index].rec_count;
                   partlyPaidAmount2 = data[index].total_amount;
                  
              }else if(data[index].status==='COMPLETE' ){
                   paidCount2 = data[index].rec_count;
                   paidAmount2 = data[index].total_amount;              
              }
          }
              
              
          }
          
          
          $('#unpaid-title-anchor').attr('title',unpaidCount1+ ' new records');
          $('#history-unpaid-amount').html(unpaidAmount2);
          $('#history-unpaid-count').html(unpaidCount2);
          $('#today-unpaid-amount').html(unpaidAmount1);
          
          $('#incomplete-title-anchor').attr('title',partlyPaidCount1+ ' new records');
          $('#history-incomplete-amount').html(partlyPaidAmount2);
          $('#history-incomplete-count').html(partlyPaidCount2);
          $('#today-incomplete-amount').html(partlyPaidAmount1);
          
          $('#complete-title-anchor').attr('title',paidCount1+ ' new records');
          $('#history-complete-amount').html(paidAmount2);
          $('#history-complete-count').html(paidCount2);
          $('#today-complete-amount').html(paidAmount1);
          
      }catch(e){
             $.fn.showMessageDialog('<div align="center">Statistics Fetch Error</div>', '<div align = "center" color="red">Error generating statistics</div>'+ e.stack+'<br /><br />'+data); 
      }
          
  });
  };
  
   $.fn.getSupplyForm = function (type,recordID, isEditable){    
     var formDetails = {
        class:'form-horizontal'
        ,encType:'multipart/form-data'
        ,id:'supply-form'
        ,name:'supply_mode'
        ,method:'post'
        ,action:'functions/data_driver.php'
        ,type:type
        ,dataType:'supply'
        ,accessType:'view'
        ,nextPageUrl:'<div align="center"><a style="margin-left:0.8em;padding-right:0.5em;" id = "back-bttn" data-original-title="Back" href="javascript:;" class="btn btn-large btn-warning" data-rel="popover" data-content="Click here to go to previous page" onClick="$.fn.loadPreviousPage();"> Back</a>'+
                     '<a  style="margin-left:0.8em;padding-right:0.5em;"  id = "new-supply" data-original-title="New Supply" href="javascript:;" class="btn btn-large btn-success" data-rel="popover" data-content="Click here to add new supply information" onClick=" $.fn.getsupplyForm (\'NEW\',0, true);"> New supply</a>'+
                    '<a style="margin-left:0.8em;padding-right:0.5em;" id = "all-supplies" data-original-title="All Supplies" href="javascript:;" class="btn btn-large btn-danger" data-rel="popover" data-content="Click here to view all supplies" onClick="$.fn.showAllSupplies(this)"> All Supplies</a>'+
                     '</div>'
        };
        var supplyID =  new FormElement({
        name: 'supply_id',
        type: 'text',
        validation: 'nocheck',
        editable:  false, 
        value:  "", 
        class:"input-xlarge disabled", // input-xlarge focused",
        alternativeValues: "", 
        chosenValue: "", 
        errorMessage: "", 
        valueMap:  "", 
        data: "",
        dataCount: 0,
        size: 120
});
  var supplierID =  new FormElement({
        name: 'supplier_id',
        type: 'text',
        validation: 'alphanumspecial',
        editable:  false, 
        value:  $.session.get('current_user_id'), 
        class:"input-xlarge disabled", // input-xlarge focused",
        alternativeValues: "", 
        chosenValue: "", 
        errorMessage: "", 
        valueMap:  "", 
        data: "",
        dataCount: 0,
        size: 0
});
	var productList =  new FormElement( {
	name: 'product_list',
	type: 'map',
	validation: 'nocheck',
	size: 0,
        editable:  isEditable
	});
	var totalAmount =  new FormElement({
                    name: 'total_amount',
                    type: 'text',
                    validation: 'numeric', 
                    editable:  false, 
                    value:  "", 
                    class:"input-xlarge focused",
                    alternativeValues: "", 
                    chosenValue: "", 
                    errorMessage: "", 
                    valueMap:  "", 
                    data: new Array(),
                    dataCount: 0,
                    size: 0
	});

	var dateOfOrder =  new FormElement( {
	name: 'date_of_order',
	type: 'datepicker',
	validation: 'date',
	id: "", 
        editable:  isEditable, 
        value:  "", 
        class:"input-xlarge focused",
        alternativeValues: "", 
        chosenValue: "", 
        errorMessage: "", 
        valueMap:  "", 
        data: "",
        dataCount: 0,
        size: 0
	});
	var dateOfPayment =  new FormElement( {
	name: 'date_of_payment',
	type: 'datepicker',
	validation: 'date',
	 id: "", 
        editable:  isEditable, 
        value:  "", 
        class:"input-xlarge focused",
        alternativeValues: "", 
        chosenValue: "", 
        errorMessage: "", 
        valueMap:  "", 
        data: "",
        dataCount: 0,
        size: 0
	});
        
     var amountPaid =  new FormElement( {
	name: 'amount_paid',
	type: 'text',
	validation: 'numeric',
        editable:  isEditable, 
        value:  "", 
        class:"input-xlarge focused",
        alternativeValues: "", 
        chosenValue: "", 
        errorMessage: "", 
        valueMap:  "", 
        dataCount: 0
	});
        var paymentMethod =  new FormElement( {
	name: 'payment_method',
	type: 'select',
	validation: 'nocheck',
        editable:  isEditable, 
        value:  "", 
        class:"input-xlarge focused",
        alternativeValues:  ['CASH','TRANSFER','DEPOSIT'], 
        chosenValue: 1, 
        errorMessage: "", 
        valueMap:   {0:'CASH',1:'TRANSFER',2:'DEPOSIT'}, 
        dataCount: 0
	});
        
        var amountOutstanding =  new FormElement( {
	name: 'amount_outstanding',
	type: 'text',
	validation: 'numeric',
        editable:  false, 
        value:  "", 
        class:"input-xlarge focused",
        alternativeValues: "", 
        chosenValue: "", 
        errorMessage: "", 
        valueMap:  "", 
        dataCount: 0
	});
   
        
        var status =  new FormElement( {
	name: 'status',
	type: 'text',
	validation: 'alphanumeric',
        editable:  false, 
        value:  "", 
        class:"input-xlarge focused",
        alternativeValues:  "", 
        chosenValue:  0, 
        errorMessage: "", 
        valueMap: "", 
        dataCount: 0
	});
     
         var totalQuantity =  new FormElement( {
	name: 'total_quantity',
	type: 'text',
	validation: 'numeric',
        editable:  false, 
        value:  "", 
        class:"input-xlarge focused",
        alternativeValues: "", 
        chosenValue: "", 
        errorMessage: "", 
        valueMap:  "", 
        dataCount: 0
	});
         var requestData =  new FormElement( {
            name: 'reqTab',
            type: 'hidden',
            validation: 'nocheck',
            editable:  false, 
            value:  "unna_supplies", 
            class:"input-xlarge focused",
            alternativeValues: "", 
            chosenValue: "", 
            errorMessage: "", 
            valueMap:  "", 
            dataCount: 0
	});
      var requestType =  new FormElement( {
	name: 'reqType',
	type: 'hidden',
	validation: 'nocheck',
        editable:  false, 
        value:  "form", 
        class:"input-xlarge focused",
        alternativeValues: "", 
        chosenValue: "", 
        errorMessage: "", 
        valueMap:  "", 
        dataCount: 0
	});
        var requestMode=  new FormElement( {
	name: 'reqMode',
	type: 'hidden',
	validation: 'nocheck',
        editable:  false, 
        value:  type.toLowerCase(), 
        class:"input-xlarge focused",
        alternativeValues: "", 
        chosenValue: "", 
        errorMessage: "", 
        valueMap:  "", 
        dataCount: 0
	});
        
        var clientName =  new FormElement( {
	name: 'client_name',
	type: 'text',
	validation: 'alphanumeric',
        editable:  isEditable, 
        value:  "", 
        class:"input-xlarge focused",
        alternativeValues: "", 
        chosenValue: "", 
        errorMessage: "", 
        valueMap:  "", 
        dataCount: 0
	});
        
        var clientPhone =  new FormElement( {
	name: 'client_phone',
	type: 'text',
	validation: 'phone',
        editable:  isEditable, 
        value:  "", 
        class:"input-xlarge focused",
        alternativeValues: "", 
        chosenValue: "", 
        errorMessage: "", 
        valueMap:  "", 
        dataCount: 0
	});
        
      var lastModifiedBy =  new FormElement( {
	name: 'last_modified_by',
	type: 'text',
	validation: 'nocheck',
        editable:  false, 
        value: $.session.get('current_user_id'), 
        class:"input-xlarge focused",
        alternativeValues: "", 
        chosenValue: "", 
        errorMessage: "", 
        valueMap:  "", 
        dataCount: 0
	});
        
         var  supplyLocation =  new FormElement( {
	name: 'supply_location',
	type: 'textarea',
	validation: 'nocheck',
        editable:  false, 
        value: "", 
        class:"input-xlarge focused",
        alternativeValues: "", 
        chosenValue: "", 
        errorMessage: "", 
        valueMap:  "", 
        dataCount: 0
	});
        
	var formElements = {
	0: supplyID,
        1: supplierID,
	2: productList,
	3: totalAmount,
	4: totalQuantity,
	5: dateOfOrder,
	6: dateOfPayment,
	7: amountPaid,
	8: paymentMethod,
	9: amountOutstanding,
	10: status,
	11: requestData,
	12: requestType,
	13: requestMode,
	14: clientName,
	15: clientPhone,
        16: lastModifiedBy,
        17: supplyLocation
	};
        
        var tagID  = 'data-presentation-span';
        var tableName = 'unna_supplies';
        var sourceUrl  ='functions/data_driver.php';
        $.session.set('previous_page',$('#content').html());
        var mode  =  type==='NEW'?1:0;  
        $.fn.getForm (tagID, tableName,sourceUrl ,mode, recordID, formDetails,formElements);
           
         if(type!=='NEW'){
                    var  priceStr = $('#total_amount_id').val();
                    var  paidStr  = $('#amount_paid_id').val();
                    var price = parseFloat(priceStr);
                    var  paid = parseFloat(paidStr);
                            if(paid!==price){
                                $('#amount_paid_id').removeClass ('disabled');
                                 $('#amount_paid_id').addClass( 'focused');
                                 $('#amount_paid_id').removeAttr ('disabled');
                                 $('#supply-form-footer-section').html('<span><a data-original-title="supply" href="#" class="btn btn-small btn-info" data-rel="popover" data-content="Go back to supply page" id="supply-table-bttn" onClick="$.fn.loadPreviousPage();">Back </a></span><span><button type="submit" class="btn btn-primary" id="submit-bttn" onclick="$.fn.submitForm(\'supply-form\',\'supply-form_form_elements\')">Save</button></span>');
                                  $('#is-form-data-valid').val('NO');
                                  }
                            else if (paid===price){
                                $('#amount_paid_id').removeClass( 'focused');
                                 $('#amount_paid_id').addClass ('class', 'disabled');
                                 $('#amount_paid_id').attr( 'disabled', '');
                                 
                            }
                        }
                        
        }; 
        $.fn.getProductForm = function (type,recordID, isEditable){    
         var formDetails = {
        class:'form-horizontal'
        ,encType:'multipart/form-data'
        ,id:'product-form'
        ,name:'product_mode'
        ,method:'post'
        ,action:'functions/data_driver.php'
        ,type:type
        ,dataType:'product'
        ,accessType:'view'
        ,nextPageUrl:'<div align="center"><a style="margin-left:0.8em;padding-right:0.5em;" id = "back-bttn" data-original-title="Back" href="javascript:;" class="btn btn-large btn-warning" data-rel="popover" data-content="Click here to go to previous page" onClick="$.fn.loadPreviousPage();"> Back</a>'+
                     '<a  style="margin-left:0.8em;padding-right:0.5em;"  id = "new-product" data-original-title="New Product" href="javascript:;" class="btn btn-large btn-success" data-rel="popover" data-content="Click here to add new product information" onClick=" $.fn.getproductForm (\'NEW\',0, true);"> New Product</a>'+
                    '<a style="margin-left:0.8em;padding-right:0.5em;"    id = "all-products" data-original-title="All Products" href="javascript:;" class="btn btn-large btn-info" data-rel="popover" data-content="Click here to view all product" onClick="$.fn.showAllProducts(this)"> All Products</a>'+
                     '</div>'
        };
        var productID =  new FormElement({
        name: 'product_id',
        type: 'text',
        validation: 'nocheck',
        editable:  false, 
        value:  "", 
        class:"input-xlarge disabled", // input-xlarge focused",
        alternativeValues: "", 
        chosenValue: "", 
        errorMessage: "", 
        valueMap:  "", 
        data: "",
        dataCount: 0,
        size: 120
});

	var productName =  new FormElement( {
	name: 'product_name',
	type: 'text',
	validation: 'alphanumeric',
	id: "", 
        editable:  isEditable, 
        value:  "", 
        class:"input-xlarge focused",
        alternativeValues: "", 
        chosenValue: "", 
        errorMessage: "", 
        valueMap:  "", 
        data: "",
        dataCount: 0,
        size: 0
	});
	var productPrice =  new FormElement( {
	name: 'product_price',
	type: 'text',
	validation: 'numeric',
	id: "", 
	editable:  isEditable, 
	value:  "", 
	class:"input-xlarge focused",
	alternativeValues: "", 
	chosenValue: "", 
	errorMessage: "", 
	valueMap:  "", 
	data: "",
	dataCount: 0,
	size: 0
	});
        
    var productCreationDate =  new FormElement( {
		name: 'product_creation_date',
		type: 'text',
		validation: 'nocheck',
		editable:  false, 
		value:  "", 
		class:"input-xlarge focused",
		alternativeValues: "", 
		chosenValue: "", 
		errorMessage: "", 
		valueMap:  "", 
		dataCount: 0
	});
       
	   var lastModifiedDate =  new FormElement( {
		name: 'last_modified_date',
		type: 'text',
		validation: 'nocheck',
		editable:  false, 
		value:  "", 
		class:"input-xlarge focused",
		alternativeValues: "", 
		chosenValue: "", 
		errorMessage: "", 
		valueMap:  "", 
		dataCount: 0
	});
        
        var lastModifiedBy =  new FormElement( {
		name: 'last_modified_by',
		type: 'text',
		validation: 'nocheck',
		editable:  false, 
		value:   $.session.get('current_user_id'), 
		class:"input-xlarge focused",
		alternativeValues: "", 
		chosenValue: "", 
		errorMessage: "", 
		valueMap:  "", 
		dataCount: 0
	});
        
	var productCount =  new FormElement( {
		name: 'product_count',
		type: 'text',
		validation: 'numeric',
		id: "", 
		editable:  isEditable, 
		value:  "", 
		class:"input-xlarge focused",
		alternativeValues: "", 
		chosenValue: "", 
		errorMessage: "", 
		valueMap:  "", 
		data: "",
		dataCount: 0,
		size: 0
	});
         var requestType =  new FormElement( {
	name: 'reqType',
	type: 'hidden',
	validation: 'nocheck',
        editable:  false, 
        value:  "form", 
        class:"input-xlarge focused",
        alternativeValues: "", 
        chosenValue: "", 
        errorMessage: "", 
        valueMap:  "", 
        dataCount: 0
	});
        var requestMode=  new FormElement( {
	name: 'reqMode',
	type: 'hidden',
	validation: 'nocheck',
        editable:  false, 
        value:  type.toLowerCase(), 
        class:"input-xlarge focused",
        alternativeValues: "", 
        chosenValue: "", 
        errorMessage: "", 
        valueMap:  "", 
        dataCount: 0
	});
        
         var requestData =  new FormElement( {
            name: 'reqTab',
            type: 'hidden',
            validation: 'nocheck',
            editable:  false, 
            value:  "unna_products", 
            class:"input-xlarge focused",
            alternativeValues: "", 
            chosenValue: "", 
            errorMessage: "", 
            valueMap:  "", 
            dataCount: 0
	});
        
	var formElements = {
	0: productID,
	1: productName,
	2: productPrice,
	3: productCreationDate,
	4: lastModifiedDate,
	5: productCount,
        6: lastModifiedBy,
        7: requestType,
        8: requestMode,
        9: requestData
	};
        
        var tagID  = 'data-presentation-span';
        var tableName = 'unna_products';
        var sourceUrl  ='functions/data_driver.php';
        $.session.set('previous_page',$('#content').html());
        var mode  =  type==='NEW'?1:0;  
        $.fn.getForm (tagID, tableName,sourceUrl ,mode, recordID, formDetails,formElements);
           
     
                        
        }; 
         $.fn.getRoleForm = function (type,recordID, isEditable){    
         var formDetails = {
        class:'form-horizontal'
        ,encType:'multipart/form-data'
        ,id:'role-form'
        ,name:'role_mode'
        ,method:'post'
        ,action:'functions/data_driver.php'
        ,type:type
        ,dataType:'role'
        ,accessType:'view'
        ,nextPageUrl:'<div align="center"><a style="margin-left:0.8em;padding-right:0.5em;" id = "back-bttn" data-original-title="Back" href="javascript:;" class="btn btn-large btn-warning" data-rel="popover" data-content="Click here to go to previous page" onClick="$.fn.loadPreviousPage();"> Back</a>'+
                     '<a  style="margin-left:0.8em;padding-right:0.5em;"  id = "new-role" data-original-title="New Role" href="javascript:;" class="btn btn-large btn-success" data-rel="popover" data-content="Click here to add new role information" onClick=" $.fn.getroleForm (\'NEW\',0, true);"> New Role</a>'+
                     '<a style="margin-left:0.8em;padding-right:0.5em;"    id = "all-roles" data-original-title="All Roles" href="javascript:;" class="btn btn-large btn-info" data-rel="popover" data-content="Click here to view all role" onClick="$.fn.showAllRoles(this)"> All Roles</a>'+
                     '</div>'
        };
        var roleID =  new FormElement({
        name: 'role_id',
        type: 'text',
        validation: 'nocheck',
        editable:  false, 
        value:  "", 
        class:"input-xlarge disabled", // input-xlarge focused",
        alternativeValues: "", 
        chosenValue: "", 
        errorMessage: "", 
        valueMap:  "", 
        data: "",
        dataCount: 0,
        size: 120
});

	var role =  new FormElement( {
		name: 'role',
		type: 'text',
		validation: 'alphanumeric',
		id: "", 
		editable:  isEditable, 
		value:  "", 
		class:"input-xlarge focused",
		alternativeValues: "", 
		chosenValue: "", 
		errorMessage: "", 
		valueMap:  "", 
		data: "",
		dataCount: 0,
		size: 0
	});

    var dateOfCreation =  new FormElement( {
		name: 'date_of_creation',
		type: 'text',
		validation: 'nocheck',
		editable:  false, 
		value:  "", 
		class:"input-xlarge focused",
		alternativeValues: "", 
		chosenValue: "", 
		errorMessage: "", 
		valueMap:  "", 
		dataCount: 0
	});
       
	   var lastModifiedDate =  new FormElement( {
		name: 'last_modified_date',
		type: 'text',
		validation: 'nocheck',
		editable:  false, 
		value:  "", 
		class:"input-xlarge focused",
		alternativeValues: "", 
		chosenValue: "", 
		errorMessage: "", 
		valueMap:  "", 
		dataCount: 0
	});
        
        var lastModifiedBy =  new FormElement( {
		name: 'last_modified_by',
		type: 'text',
		validation: 'nocheck',
		editable:  false, 
		value:   $.session.get('current_user_id'), 
		class:"input-xlarge focused",
		alternativeValues: "", 
		chosenValue: "", 
		errorMessage: "", 
		valueMap:  "", 
		dataCount: 0
	});
        
	
         var requestType =  new FormElement( {
	name: 'reqType',
	type: 'hidden',
	validation: 'nocheck',
        editable:  false, 
        value:  "form", 
        class:"input-xlarge focused",
        alternativeValues: "", 
        chosenValue: "", 
        errorMessage: "", 
        valueMap:  "", 
        dataCount: 0
	});
        var requestMode=  new FormElement( {
	name: 'reqMode',
	type: 'hidden',
	validation: 'nocheck',
        editable:  false, 
        value:  type.toLowerCase(), 
        class:"input-xlarge focused",
        alternativeValues: "", 
        chosenValue: "", 
        errorMessage: "", 
        valueMap:  "", 
        dataCount: 0
	});
        
         var requestData =  new FormElement( {
            name: 'reqTab',
            type: 'hidden',
            validation: 'nocheck',
            editable:  false, 
            value:  "unna_roles", 
            class:"input-xlarge focused",
            alternativeValues: "", 
            chosenValue: "", 
            errorMessage: "", 
            valueMap:  "", 
            dataCount: 0
	});
        
	var formElements = {
	0: roleID,
	1: role,
	2: dateOfCreation,
	3: lastModifiedDate,
        4: lastModifiedBy,
        5: requestType,
        6: requestMode,
        7: requestData
	};
        
        var tagID     = 'data-presentation-span';
        var tableName = 'unna_roles';
        var sourceUrl ='functions/data_driver.php';
        $.session.set('previous_page',$('#content').html());
        var mode      =  type==='NEW'?1:0;  
        $.fn.getForm (tagID, tableName,sourceUrl ,mode, recordID, formDetails,formElements);
              
        };
   $.fn.getPurchaseForm = function (type,recordID, isEditable){    
       
      var tableName     = 'unna_purchases';
      var paymentMethod = '';
      var tableData     = '';

      recordID  = recordID?recordID:0;
      if(type==='EXISTING'){
        tableData = JSON.parse($.session.get(tableName));
        paymentMethod  = tableData[1][recordID]["PAYMENT_METHOD"];
     }
     
     var formDetails = {
        class:'form-horizontal'
        ,encType:'multipart/form-data'
        ,id:'purchase-form'
        ,name:'purchase_mode'
        ,method:'post'
        ,action:'functions/data_driver.php'
        ,type:type
        ,dataType:'purchase'
        ,accessType:'view'
        ,nextPageUrl:'<div align="center"><a style="margin-left:0.8em;padding-right:0.5em;" id = "back-bttn" data-original-title="Back" href="javascript:;" class="btn btn-large btn-warning" data-rel="popover" data-content="Click here to go to previous page" onClick="$.fn.loadPreviousPage();"> Back</a>'+
                     '<a  style="margin-left:0.8em;padding-right:0.5em;"  id = "new-purchase" data-original-title="New Purchase" href="javascript:;" class="btn btn-large btn-success" data-rel="popover" data-content="Click here to add new purchase information" onClick=" $.fn.getPurchaseForm (\'NEW\',0, true);"> New Purchase</a>'+
                    '<a style="margin-left:0.8em;padding-right:0.5em;" id = "all-purchases" data-original-title="All Purchases" href="javascript:;" class="btn btn-large btn-info" data-rel="popover" data-content="Click here to view all purchases" onClick="$.fn.showAllPurchases(this)"> All Purchases</a>'+
                     '</div>'
        };
        var purchaseID =  new FormElement({
        name: 'purchase_id',
        type: 'text',
        validation: 'nocheck',
        editable:  false, 
        value:  "", 
        class:"input-xlarge disabled", // input-xlarge focused",
        alternativeValues: "", 
        chosenValue: "", 
        errorMessage: "", 
        valueMap:  "", 
        data: "",
        dataCount: 0,
        size: 120
});
  var userID =  new FormElement({
        name: 'user_id',
        type: 'text',
        validation: 'alphanumspecial',
        editable:  false, 
        value:  $.session.get('current_user_id'), 
        class:"input-xlarge disabled", // input-xlarge focused",
        alternativeValues: "", 
        chosenValue: "", 
        errorMessage: "", 
        valueMap:  "", 
        data: "",
        dataCount: 0,
        size: 0
});
	var productList =  new FormElement( {
	name: 'product_list',
	type: 'map',
	validation: 'nocheck',
	size: 0,
        editable:  isEditable
	});
	var totalAmount =  new FormElement({
                    name: 'total_amount',
                    type: 'text',
                    validation: 'numeric', 
                    editable:  false, 
                    value:  "", 
                    class:"input-xlarge focused",
                    alternativeValues: "", 
                    chosenValue: "", 
                    errorMessage: "", 
                    valueMap:  "", 
                    data: new Array(),
                    dataCount: 0,
                    size: 0
	});

	var dateOfOrder =  new FormElement( {
	name: 'date_of_order',
	type: 'datepicker',
	validation: 'date',
	id: "", 
        editable:  isEditable, 
        value:  "", 
        class:"input-xlarge focused",
        alternativeValues: "", 
        chosenValue: "", 
        errorMessage: "", 
        valueMap:  "", 
        data: "",
        dataCount: 0,
        size: 0
	});
	var dateOfPayment =  new FormElement( {
	name: 'date_of_payment',
	type: 'datepicker',
	validation: 'date',
	 id: "", 
        editable:  isEditable, 
        value:  "", 
        class:"input-xlarge focused",
        alternativeValues: "", 
        chosenValue: "", 
        errorMessage: "", 
        valueMap:  "", 
        data: "",
        dataCount: 0,
        size: 0
	});
        
     var amountPaid =  new FormElement( {
	name: 'amount_paid',
	type: 'text',
	validation: 'numeric',
        editable:  isEditable, 
        value:  "", 
        class:"input-xlarge focused",
        alternativeValues: "", 
        chosenValue: "", 
        errorMessage: "", 
        valueMap:  "", 
        dataCount: 0
	});
        var  paymentMethods = ['CASH','TRANSFER','DEPOSIT'];
        var methodIndex = paymentMethods.indexOf(paymentMethod);
        var paymentMethod =  new FormElement( {
	name: 'payment_method',
	type: 'select',
	validation: 'nocheck',
        editable:  isEditable, 
        value:  "", 
        class:"input-xlarge focused",
        alternativeValues: paymentMethods , 
        chosenValue: methodIndex, 
        errorMessage: "", 
        valueMap:   {0:'CASH',1:'TRANSFER',2:'DEPOSIT'}, 
        dataCount: 0
	});
        
        var amountOutstanding =  new FormElement( {
	name: 'amount_outstanding',
	type: 'text',
	validation: 'numeric',
        editable:  false, 
        value:  "", 
        class:"input-xlarge focused",
        alternativeValues: "", 
        chosenValue: "", 
        errorMessage: "", 
        valueMap:  "", 
        dataCount: 0
	});
   
        
        var status =  new FormElement( {
	name: 'status',
	type: 'text',
	validation: 'alphanumeric',
        editable:  false, 
        value:  "", 
        class:"input-xlarge focused",
        alternativeValues:  "", 
        chosenValue:  0, 
        errorMessage: "", 
        valueMap: "", 
        dataCount: 0
	});
     
         var totalQuantity =  new FormElement( {
	name: 'total_quantity',
	type: 'text',
	validation: 'numeric',
        editable:  false, 
        value:  "", 
        class:"input-xlarge focused",
        alternativeValues: "", 
        chosenValue: "", 
        errorMessage: "", 
        valueMap:  "", 
        dataCount: 0
	});
         var requestData =  new FormElement( {
            name: 'reqTab',
            type: 'hidden',
            validation: 'nocheck',
            editable:  false, 
            value:  "unna_purchases", 
            class:"input-xlarge focused",
            alternativeValues: "", 
            chosenValue: "", 
            errorMessage: "", 
            valueMap:  "", 
            dataCount: 0
	});
      var requestType =  new FormElement( {
	name: 'reqType',
	type: 'hidden',
	validation: 'nocheck',
        editable:  false, 
        value:  "form", 
        class:"input-xlarge focused",
        alternativeValues: "", 
        chosenValue: "", 
        errorMessage: "", 
        valueMap:  "", 
        dataCount: 0
	});
        var requestMode=  new FormElement( {
	name: 'reqMode',
	type: 'hidden',
	validation: 'nocheck',
        editable:  false, 
        value:  type.toLowerCase(), 
        class:"input-xlarge focused",
        alternativeValues: "", 
        chosenValue: "", 
        errorMessage: "", 
        valueMap:  "", 
        dataCount: 0
	});
        
        var clientName =  new FormElement( {
	name: 'client_name',
	type: 'text',
	validation: 'alphanumeric',
        editable:  isEditable, 
        value:  "", 
        class:"input-xlarge focused",
        alternativeValues: "", 
        chosenValue: "", 
        errorMessage: "", 
        valueMap:  "", 
        dataCount: 0
	});
        
        var clientPhone =  new FormElement( {
	name: 'client_phone',
	type: 'text',
	validation: 'phone',
        editable:  isEditable, 
        value:  "", 
        class:"input-xlarge focused",
        alternativeValues: "", 
        chosenValue: "", 
        errorMessage: "", 
        valueMap:  "", 
        dataCount: 0
	});
        
      var lastModifiedBy =  new FormElement( {
	name: 'last_modified_by',
	type: 'text',
	validation: 'nocheck',
        editable:  false, 
        value: $.session.get('current_user_id'), 
        class:"input-xlarge focused",
        alternativeValues: "", 
        chosenValue: "", 
        errorMessage: "", 
        valueMap:  "", 
        dataCount: 0
	});

	var formElements = {
                0: purchaseID,
                1: userID,
                2: productList,
                3: totalAmount,
                4: totalQuantity,
                5: dateOfOrder,
                6: dateOfPayment,
                7: amountPaid,
                8: paymentMethod,
                9: amountOutstanding,
                10: status,
                11: requestData,
                12: requestType,
                13: requestMode,
                14: clientName,
                15: clientPhone,
                16: lastModifiedBy
	};
        
        var tagID  = 'data-presentation-span';
        var tableName = 'unna_purchases';
        var sourceUrl  ='functions/data_driver.php';
        $.session.set('previous_page',$('#content').html());
        var mode  =  type==='NEW'?1:0;  
        $.fn.getForm (tagID, tableName,sourceUrl ,mode, recordID, formDetails,formElements);
           
         if(type!=='NEW'){
              var  priceStr = $('#total_amount_id').val();
                            var  paidStr  = $('#amount_paid_id').val();
                            var price = parseFloat(priceStr);
                            var  paid = parseFloat(paidStr);
                            if(paid!==price){
                                $('#amount_paid_id').removeClass ('disabled');
                                 $('#amount_paid_id').addClass( 'focused');
                                 $('#amount_paid_id').removeAttr ('disabled');
                                 $('#purchase-form-footer-section').html('<span><a data-original-title="purchase" href="#" class="btn btn-small btn-info" data-rel="popover" data-content="Go back to purchase page" id="purchase-table-bttn" onClick="$.fn.loadPreviousPage();">Back </a></span><span><button type="submit" class="btn btn-primary" id="submit-bttn" onclick="$.fn.submitForm(\'purchase-form\',\'purchase-form_form_elements\')">Save</button></span>');
                                  $('#is-form-data-valid').val('NO');
                                  }
                            else if (paid===price){
                                $('#amount_paid_id').removeClass( 'focused');
                                 $('#amount_paid_id').addClass ('class', 'disabled');
                                 $('#amount_paid_id').attr( 'disabled', '');
                                 
                            }
                        }
                        
        }; 
          $.fn.getRoleForm = function (type,recordID, isEditable){    
         var formDetails = {
         class:'form-horizontal'
			,encType:'multipart/form-data'
			,id:'role-form'
			,name:'role_mode'
			,method:'post'
			,action:'functions/data_driver.php'
			,type:type
			,dataType:'role'
			,accessType:'view'
			,nextPageUrl:'<div align="center"><a style="margin-left:0.8em;padding-right:0.5em;" id = "back-bttn" data-original-title="Back" href="javascript:;" class="btn btn-large btn-warning" data-rel="popover" data-content="Click here to go to previous page" onClick="$.fn.loadPreviousPage();"> Back</a>'+
						 '<a  style="margin-left:0.8em;padding-right:0.5em;"  id = "new-role" data-original-title="New Role" href="javascript:;" class="btn btn-large btn-success" data-rel="popover" data-content="Click here to add new role information" onClick=" $.fn.getRoleForm (\'NEW\',0, true);"> New Role</a>'+
						'<a style="margin-left:0.8em;padding-right:0.5em;"    id = "all-roles" data-original-title="All Roles" href="javascript:;" class="btn btn-large btn-info" data-rel="popover" data-content="Click here to view all role" onClick="$.fn.showAllRoles(this)"> All roles</a>'+
						'</div>'
        };
        var roleID =  new FormElement({
        name: 'role_id',
        type: 'text',
        validation: 'nocheck',
        editable:  false, 
        value:  "", 
        class:"input-xlarge disabled", // input-xlarge focused",
        alternativeValues: "", 
        chosenValue: "", 
        errorMessage: "", 
        valueMap:  "", 
        data: "",
        dataCount: 0,
        size: 120
});

	var roleName =  new FormElement( {
		name: 'role',
		type: 'text',
		validation: 'alphanumeric',
		id: "", 
        editable:  isEditable, 
        value:  "", 
        class:"input-xlarge focused",
        alternativeValues: "", 
        chosenValue: "", 
        errorMessage: "", 
        valueMap:  "", 
        data: "",
        dataCount: 0,
        size: 0
	});
	
    var roleCreationDate =  new FormElement( {
		name: 'date_of_creation',
		type: 'text',
		validation: 'nocheck',
		editable:  false, 
		value:  "", 
		class:"input-xlarge focused",
		alternativeValues: "", 
		chosenValue: "", 
		errorMessage: "", 
		valueMap:  "", 
		dataCount: 0
	});
       
	   var lastModifiedDate =  new FormElement( {
		name: 'last_modified_date',
		type: 'text',
		validation: 'nocheck',
		editable:  false, 
		value:  "", 
		class:"input-xlarge focused",
		alternativeValues: "", 
		chosenValue: "", 
		errorMessage: "", 
		valueMap:  "", 
		dataCount: 0
	});
        
        var lastModifiedBy =  new FormElement( {
		name: 'last_modified_by',
		type: 'text',
		validation: 'nocheck',
		editable:  false, 
		value:   $.session.get('current_user_id'), 
		class:"input-xlarge focused",
		alternativeValues: "", 
		chosenValue: "", 
		errorMessage: "", 
		valueMap:  "", 
		dataCount: 0
	});
        
	
    var requestType =  new FormElement( {
	name: 'reqType',
	type: 'hidden',
	validation: 'nocheck',
        editable:  false, 
        value:  "form", 
        class:"input-xlarge focused",
        alternativeValues: "", 
        chosenValue: "", 
        errorMessage: "", 
        valueMap:  "", 
        dataCount: 0
	});
        var requestMode=  new FormElement( {
	name: 'reqMode',
	type: 'hidden',
	validation: 'nocheck',
        editable:  false, 
        value:  type.toLowerCase(), 
        class:"input-xlarge focused",
        alternativeValues: "", 
        chosenValue: "", 
        errorMessage: "", 
        valueMap:  "", 
        dataCount: 0
	});
        
         var requestData =  new FormElement( {
            name: 'reqTab',
            type: 'hidden',
            validation: 'nocheck',
            editable:  false, 
            value:  "unna_roles", 
            class:"input-xlarge focused",
            alternativeValues: "", 
            chosenValue: "", 
            errorMessage: "", 
            valueMap:  "", 
            dataCount: 0
	});
        
	var formElements = {
	0: roleID,
	1: roleName,
	2: roleCreationDate,
	3: lastModifiedDate,
	4: lastModifiedBy,
	5: requestType,
	6: requestMode,
	7: requestData
	};
        
        var tagID  = 'data-presentation-span';
        var tableName = 'unna_roles';
        var sourceUrl  ='functions/data_driver.php';
        $.session.set('previous_page',$('#content').html());
        var mode  =  type==='NEW'?1:0;
 
        $.fn.getForm (tagID, tableName,sourceUrl ,mode, recordID, formDetails,formElements);
                        
        }; 
        
 $.fn.getUserForm = function (type,recordID, isEditable){
    var tableName = 'unna_users';
    var recordStatus ='';
    var userRole='';
    var  tableData ='';
    recordID  = recordID?recordID:0;
      if(type==='EXISTING'){
        tableData = JSON.parse($.session.get(tableName));
        recordStatus  = tableData[1][recordID]["STATUS"];
        userRole  = tableData[1][recordID]["ROLE"];

     }
     
      var  access  = !isEditable?'view':'edit';
         var formDetails = {
        class:'form-horizontal'
        ,encType:'multipart/form-data'
        ,id:'user-form'
        ,name:'user_mode'
        ,method:'post'
        ,action:'functions/data_driver.php'
        ,type:type
        ,dataType:'user'
        ,accessType:access
        ,nextPageUrl:'<div align="center"><a style="margin-left:0.8em;padding-right:0.5em;" id = "back-bttn" data-original-title="Back" href="javascript:;" class="btn btn-large btn-warning" data-rel="popover" data-content="Click here to go to previous page" onClick="$.fn.loadPreviousPage();"> Back</a>'+
                     '<a  style="margin-left:0.8em;padding-right:0.5em;"  id = "new-user" data-original-title="New User" href="javascript:;" class="btn btn-large btn-success" data-rel="popover" data-content="Click here to add new user " onClick=" $.fn.getuserForm (\'NEW\',0, true);"> New User</a>'+
                     '<a style="margin-left:0.8em;padding-right:0.5em;"    id = "all-users" data-original-title="All Users" href="javascript:;" class="btn btn-large btn-info" data-rel="popover" data-content="Click here to view all users" onClick="$.fn.showAllUsers(this)"> All Users</a>'+
                     '</div>'
        };
        var userID =  new FormElement({
        name: 'user_id',
        type: 'text',
        validation: 'nocheck',
        editable:  false, 
        value:  "", 
        class:"input-xlarge disabled", // input-xlarge focused",
        alternativeValues: "", 
        chosenValue: "", 
        errorMessage: "", 
        valueMap:  "", 
        data: "",
        dataCount: 0,
        size: 120
});

	var firstName =  new FormElement( {
		name: 'first_name',
		type: 'text',
		validation: 'alphanumeric',
		id: "", 
		editable:  isEditable, 
		value:  "", 
		class:"input-xlarge focused",
		alternativeValues: "", 
		chosenValue: "", 
		errorMessage: "", 
		valueMap:  "", 
		data: "",
		dataCount: 0,
		size: 0
	});

    var middleName =  new FormElement( {
		name: 'middle_name',
		type: 'text',
		validation: 'alphanumeric',
		editable:  isEditable, 
		value:  "", 
		class:"input-xlarge focused",
		alternativeValues: "", 
		chosenValue: "", 
		errorMessage: "", 
		valueMap:  "", 
		dataCount: 0
	});
       
	   var lastName =  new FormElement( {
		name: 'last_name',
		type: 'text',
		validation: 'alphanumeric',
		editable:  false, 
		value:  "", 
		class:"input-xlarge focused",
		alternativeValues: "", 
		chosenValue: "", 
		errorMessage: "", 
		valueMap:  "", 
		dataCount: 0
	});
        
        var password =  new FormElement( {
		name: 'password',
		type: 'password',
		validation: 'password',
		editable:  isEditable, 
		value:  "", 
		class:"input-xlarge focused",
		alternativeValues: "", 
		chosenValue: "", 
		errorMessage: "", 
		valueMap:  "", 
		dataCount: 0
	});
	
	 var dateOfCreation =  new FormElement( {
		name: 'date_of_creation',
		type: 'text',
		validation: 'nocheck',
		editable:  false, 
		value:  "", 
		class:"input-xlarge focused",
		alternativeValues: "", 
		chosenValue: "", 
		errorMessage: "", 
		valueMap:  "", 
		dataCount: 0
	});
        
		var lastAccessTime =  new FormElement( {
		name: 'last_access_time',
		type: 'text',
		validation: 'nocheck',
		editable:  false, 
		value:  "", 
		class:"input-xlarge focused",
		alternativeValues: "", 
		chosenValue: "", 
		errorMessage: "", 
		valueMap:  "", 
		dataCount: 0
	});
        
   var address =  new FormElement( {
		name: 'address',
		type: 'textarea',
		validation: 'alphanumspecial',
        id: "", 
        editable:  true, 
        value:  "", 
        class:"input-xlarge focused",
        alternativeValues: "", 
        chosenValue: "", 
        errorMessage: "", 
        valueMap:  "", 
        data: new Array(),
        dataCount: 0,
        size: 10000
	});
        
        
	var rights =  new FormElement( {
		name: 'rights',
		type: 'text',
		validation: 'nocheck',
		editable:  false, 
		value:  "", 
		class:"input-xlarge focused",
		alternativeValues: "", 
		chosenValue: "", 
		errorMessage: "", 
		valueMap:  "", 
		dataCount: 0
	});

        
		var email =  new FormElement( {
		name: 'email',
		type: 'text',
		validation: 'email',
		editable:  false, 
		value:  "", 
		class:"input-xlarge focused",
		alternativeValues: "", 
		chosenValue: "", 
		errorMessage: "", 
		valueMap:  "", 
		dataCount: 0
	});
       var  statuses  = ['DISCONNECTED','CONNECTED'];
        var chosenIndex = statuses.indexOf(recordStatus);
	var status =  new FormElement( {
			name: 'status',
			type: 'select',
			validation: 'nocheck',
			editable:  isEditable, 
			value:  recordStatus, 
			class:"input-xlarge focused",
			alternativeValues:statuses  , 
			chosenValue: chosenIndex, 
			errorMessage: "", 
			valueMap:   {0:'DISCONNECTED',1:'CONNECTED'}, 
			dataCount: 0
	});
	
	var userName =  new FormElement( {
		name: 'user_name',
		type: 'text',
		validation: 'alphanumeric',
		id: "", 
		editable:  false, 
		value:  "", 
		class:"input-xlarge focused",
		alternativeValues: "", 
		chosenValue: "", 
		errorMessage: "", 
		valueMap:  "", 
		data: "",
		dataCount: 0,
		size: 0
	});

	var userCode =  new FormElement( {
		name: 'user_code',
		type: 'text',
		validation: 'nocheck',
		id: "", 
		editable:  false, 
		value:  "", 
		class:"input-xlarge focused",
		alternativeValues: "", 
		chosenValue: "", 
		errorMessage: "", 
		valueMap:  "", 
		data: "",
		dataCount: 0,
		size: 0
	});
         var allRoles = $.fn.getAllRoles();
         var roleIndex =  allRoles.indexOf(userRole);
	 var role =  new FormElement( {
            name: 'role',
            type: 'select',
            validation: 'nocheck',
            editable:  isEditable, 
            value:  "", 
            class:"input-xlarge focused",
            alternativeValues: allRoles, 
            chosenValue: roleIndex, 
            errorMessage: "", 
            valueMap:  allRoles, 
            dataCount: 0
	});
	
        
        var phoneNumber =  new FormElement( {
			name: 'phone_number',
			type: 'text',
			validation: 'phone',
			editable:  isEditable, 
			value:  "", 
			class:"input-xlarge focused",
			alternativeValues: "", 
			chosenValue: "", 
			errorMessage: "", 
			valueMap:  "", 
			dataCount: 0
	});
	
	var imageID =  new FormElement( {
		name: 'image_id',
		type: 'text',
		validation: 'nocheck',
		id: "", 
		editable:  false, 
		value:  "", 
		class:"input-xlarge focused",
		alternativeValues: "", 
		chosenValue: "", 
		errorMessage: "", 
		valueMap:  "", 
		data: "",
		dataCount: 0,
		size: 0
	});
	
		var loginCount =  new FormElement( {
		name: 'login_count',
		type: 'text',
		validation: 'nocheck',
		id: "", 
		editable:  false, 
		value:  "", 
		class:"input-xlarge focused",
		alternativeValues: "", 
		chosenValue: "", 
		errorMessage: "", 
		valueMap:  "", 
		data: "",
		dataCount: 0,
		size: 0
	});
        
        
        
       var lastModifiedTime =  new FormElement( {
            name: 'last_modified_time',
            type: 'hidden',
            validation: 'nocheck',
            editable:  false, 
            value:  "unna_users", 
            class:"input-xlarge focused",
            alternativeValues: "", 
            chosenValue: "", 
            errorMessage: "", 
            valueMap:  "", 
            dataCount: 0
	});
	
	var passwordResetFlag =  new FormElement( {
			name: 'password_reset_flag',
			type: 'select',
			validation: 'nocheck',
			editable:  isEditable, 
			value:  "", 
			class:"input-xlarge focused",
			alternativeValues:  ['SET','RESET'], 
			chosenValue: 1, 
			errorMessage: "", 
			valueMap:   {0:'SET',1:'RESET'}, 
			dataCount: 0
	});
	  var requestData =  new FormElement( {
            name: 'reqTab',
            type: 'hidden',
            validation: 'nocheck',
            editable:  false, 
            value:  "unna_users", 
            class:"input-xlarge focused",
            alternativeValues: "", 
            chosenValue: "", 
            errorMessage: "", 
            valueMap:  "", 
            dataCount: 0
	});
         var requestType =  new FormElement( {
            name: 'reqType',
            type: 'hidden',
            validation: 'nocheck',
            editable:  false, 
            value:  "form", 
            class:"input-xlarge focused",
            alternativeValues: "", 
            chosenValue: "", 
            errorMessage: "", 
            valueMap:  "", 
            dataCount: 0
	});
        var requestMode=  new FormElement( {
	name: 'reqMode',
	type: 'hidden',
	validation: 'nocheck',
        editable:  false, 
        value:  type.toLowerCase(), 
        class:"input-xlarge focused",
        alternativeValues: "", 
        chosenValue: "", 
        errorMessage: "", 
        valueMap:  "", 
        dataCount: 0
	});
        
	var formElements = {
	0: userID,
	1: firstName,
	2: middleName,
	3: lastName,
        4: password,
        5: dateOfCreation,
        6: lastAccessTime,
        7: address,
	8: rights,
	9: email,
	10: status,
	11: userName,
	12: userCode,
	13: role,
	14: phoneNumber,
	15: imageID,
	16: loginCount,
	17: passwordResetFlag,
	18: lastModifiedTime,
        19: requestData,
        20: requestType,
        21: requestMode

	
	};
        
        var tagID  = 'data-presentation-span';
        var sourceUrl  ='functions/data_driver.php';
        $.session.set('previous_page',$('#content').html());
        var mode  =  type==='NEW'?1:0;  
        $.fn.getForm (tagID, tableName,sourceUrl ,mode, recordID, formDetails,formElements);
                         
        };
        $.fn.showAllPurchases = function (){
            
            var parentPage= 'Requests';
                        var currentPage = 'Purchase';
                        var currentItem = currentPage;
                        var contents = $.fn.drawContents(currentItem,parentPage,currentPage);
                        $('#content').html('');
                        $('#loading').hide();
                        $('#content').fadeIn().append(contents);
       
                        tableContents = $('#information-table-contents').val();
                        var excluded = new Array();
                        excluded[0] = 'INDEX_NUM';
                        excluded[1] = 'AMOUNT_PAID';
                        excluded[2] = 'AMOUNT_OUTSTANDING';
                        excluded[3] = 'STATUS';
                        excluded[4] = 'USER_ID';
                        excluded[6] = 'PRODUCT_LIST';
                        excluded[6] = 'LAST_MODIFIED_BY';

                        var defaultSearchMode = 0;
                        var opts = {
                           isViewable:true,
                           isEditable:false,
                           isIndelible:true
                        };

    var lastWeek =$.fn.yyyymmddhhmmss(7);
    var todaysDate = $.fn.yyyymmddhhmmss(0);
    var tableInfo  ='unna_purchases&f=date_of_order&s='+lastWeek+'&e='+todaysDate; 
    $.fn.getPurchaseStats('date_of_order',lastWeek,todaysDate);
    $.fn.drawPurchaseTable  (tableInfo, excluded, defaultSearchMode, opts);
    $('#content-header').html('<div class="sortable row-fluid">'+
    '<div class="span3">'+
    '<a id = "new-'+currentItem.toLowerCase()+'" data-original-title="New '+currentItem+'" href="javascript:;" class="btn btn-large btn-success" data-rel="popover" data-content="Click here to add a new '+currentItem+'" onClick="$.fn.addNewItem(this)"> New '+currentItem+'</a><br /><br />'+
    '<a id = "all-'+currentItem.toLowerCase()+'" data-original-title="All '+currentItem+'s" href="javascript:;" class="btn btn-large btn-info" data-rel="popover" data-content="Click here to view all '+currentItem+'s" onClick="$.fn.showAllPurchases()"> All '+currentItem+'s</a>'+
    '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
    +'</div>'+
    '<div justify:right> </div><a id="unpaid-title-anchor" data-rel="tooltip" title="" class="well span3 top-block" href="#">'+
    '					<span style="font-color:green;text-decoration:underline">Not Paid</span>'+
    '					 <div><span> Amount: </span><span id="history-unpaid-amount">0.00</span> </div>'+
    '					 <div><span> Count : </span><span id="history-unpaid-count">0</span> </div>'+
    '					<span class="notification red" id="today-unpaid-amount" >0</span>'+
    '				</a> '+
    '			<a id="incomplete-title-anchor" data-rel="tooltip" title="" class="well span3 top-block" href="#">'+
    '					<span style="font-color:yellow;text-decoration:underline">Partly Paid</span>'+
    '                                  <div> <span> Amount: </span><span id="history-incomplete-amount">0.00</span></div>'+
    '					<div><span> Count : </span><span id="history-incomplete-count">0</span></div>'+
    '					<span class="notification yellow" id="today-incomplete-amount" >0</span>'+
    '				</a>'+
    '			  <a id="paid-title-anchor" data-rel="tooltip" title="" class="well span3 top-block" href="#">'+
    '					<span style="font-color:green;text-decoration:underline">Completely Paid</span>'+
    '                                   <div><span> Amount: </span><span id="history-complete-amount">0.00</span></div>'+
    '					<div><span> Count : </span><span id="history-complete-count">0</span></div>'+
    '					<span class="notification green" id="today-complete-amount">0</span>'+
    '				</a> '+
    '			</div>'+
    '<div class="controls">'+
    '<span  class="span3" align="center" style="text-align:left"> <br /><select class="span2" name="purchase_date_field" id="purchase-date-field" data-rel="chosen" style="display: none;"><option value="DATE_OF_ORDER">Date of Order</option><option value="DATE_OF_PAYMENT">Date of Payment</option><option value="LAST_MODIFIED_DATE">Last Modified Date</option></select></span>'+
    '<span  class="span3" align="center" style="text-align:left">Start Date &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input class="input-medium  datepicker" id="purchase-start-date" type="text" name="purchase_start_date" value="'+lastWeek+'"/></span>'+
    '<span  class="span3" align="center" style="text-align:left">End Date  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input class="input-medium datepicker" id="purchase-end-date" type="text" name="purchase_end_date" value="'+todaysDate+'"/></span>'+
    '<span  class="span3" align="center" style="text-align:left"><br /><a id = "purchase-date-filter" data-original-title="Purchase Date search" href="javascript:;" class="btn btn-large btn-info" data-rel="popover" data-content="Click here to filter the data by the selected date field">Filter</a></span>'+
    '</div>'); 
    $.fn.closeDialog();
        };
          $.fn.showAllSupplies = function (){
            
            var parentPage= 'Requests';
                        var currentPage = 'Supply';
                        var currentItem = currentPage;
                        var contents = $.fn.drawContents(currentItem,parentPage,currentPage);
                        $('#content').html('');
                        $('#loading').hide();
                        $('#content').fadeIn().append(contents);
       
                        tableContents = $('#information-table-contents').val();
                        var excluded = new Array();
                        excluded[0] = 'INDEX_NUM';
                        excluded[1] = 'AMOUNT_PAID';
                        excluded[2] = 'AMOUNT_OUTSTANDING';
                        excluded[3] = 'STATUS';
                        excluded[4] = 'SUPPLIER_ID';
                        excluded[6] = 'PRODUCT_LIST';
                        excluded[6] = 'LAST_MODIFIED_BY';

                        var defaultSearchMode = 0;
                        var opts = {
                           isViewable:true,
                           isEditable:false,
                           isIndelible:true
                        };

    var lastWeek =$.fn.yyyymmddhhmmss(7);
    var todaysDate = $.fn.yyyymmddhhmmss(0);
    var tableInfo  ='unna_Supplies&f=date_of_order&s='+lastWeek+'&e='+todaysDate; 
    $.fn.getSupplyStats('date_of_order',lastWeek,todaysDate);
    $.fn.drawSupplyTable  (tableInfo, excluded, defaultSearchMode, opts);
    $('#content-header').html('<div class="sortable row-fluid">'+
    '<div class="span3">'+
    '<a id = "new-'+currentItem.toLowerCase()+'" data-original-title="New '+currentItem+'" href="#" class="btn btn-large btn-important" data-rel="popover" data-content="Click here to add a new '+currentItem+'" onClick="$.fn.addNewItem(this)"> New '+currentItem+'</a><br /><br />'+
    '<a id = "all-'+currentItem.toLowerCase()+'" data-original-title="All  Supplies" href="#" class="btn btn-large btn-info" data-rel="popover" data-content="Click here to view all '+currentItem+'s" onClick="$.fn.showAllSupplies()"> All Supplies</a>'+
    '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
    +'</div>'+
    '<div justify:right> </div><a id="unpaid-title-anchor" data-rel="tooltip" title="" class="well span3 top-block" href="#">'+
    '					<span style="font-color:green;text-decoration:underline">Not Paid</span>'+
    '					 <div><span> Amount: </span><span id="history-unpaid-amount">0.00</span> </div>'+
    '					 <div><span> Count : </span><span id="history-unpaid-count">0</span> </div>'+
    '					<span class="notification red" id="today-unpaid-amount" >0</span>'+
    '				</a> '+
    '			<a id="incomplete-title-anchor" data-rel="tooltip" title="" class="well span3 top-block" href="#">'+
    '					<span style="font-color:yellow;text-decoration:underline">Partly Paid</span>'+
    '                                  <div> <span> Amount: </span><span id="history-incomplete-amount">0.00</span></div>'+
    '					<div><span> Count : </span><span id="history-incomplete-count">0</span></div>'+
    '					<span class="notification yellow" id="today-incomplete-amount" >0</span>'+
    '				</a>'+
    '			  <a id="paid-title-anchor" data-rel="tooltip" title="" class="well span3 top-block" href="#">'+
    '					<span style="font-color:green;text-decoration:underline">Completely Paid</span>'+
    '                                   <div><span> Amount: </span><span id="history-complete-amount">0.00</span></div>'+
    '					<div><span> Count : </span><span id="history-complete-count">0</span></div>'+
    '					<span class="notification green" id="today-complete-amount">0</span>'+
    '				</a> '+
    '			</div>'+
    '<div class="controls">'+
    '<span  class="span3" align="center" style="text-align:left"> <br /><select class="span2" name="purchase_date_field" id="supply-date-field" data-rel="chosen" style="display: none;"><option value="DATE_OF_ORDER">Date of Order</option><option value="DATE_OF_PAYMENT">Date of Payment</option><option value="LAST_MODIFIED_DATE">Last Modified Date</option></select></span>'+
    '<span  class="span3" align="center" style="text-align:left">Start Date &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input class="input-medium  datepicker" id="supply-start-date" type="text" name="supply_start_date" value="'+lastWeek+'"/></span>'+
    '<span  class="span3" align="center" style="text-align:left">End Date  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input class="input-medium datepicker" id="supply-end-date" type="text" name="supply_end_date" value="'+todaysDate+'"/></span>'+
    '<span  class="span3" align="center" style="text-align:left"><br /><a id = "supply-date-filter" data-original-title="Supply Date search" href="javascript:;" class="btn btn-large btn-info" data-rel="popover" data-content="Click here to filter the data by the selected date field">Filter</a></span>'+
    '</div>'); 
    $.fn.closeDialog();
        };
        
        $.fn.showAllProducts = function (){
            
            var parentPage= 'Products';
                        var currentPage = 'Product';
                        var currentItem = currentPage;
                        var contents = $.fn.drawContents(currentItem,parentPage,currentPage);
                        $('#content').html('');
                        $('#loading').hide();
                        $('#content').fadeIn().append(contents);
       
                        tableContents = $('#information-table-contents').val();
                        var excluded = new Array();
                        excluded[0] = 'INDEX_NUM';
                        excluded[1] = 'PRODUCT_CREATION_DATE';
                        excluded[2] = 'LAST_MODIFIED_BY';

                        var defaultSearchMode = 0;
                        var opts = {
                           isViewable:true,
                           isEditable:false,
                           isIndelible:true
                        };

    var lastWeek =$.fn.yyyymmddhhmmss(7);
    var todaysDate = $.fn.yyyymmddhhmmss(0);
    var tableInfo  ='unna_products'; //&f=last_modified_date&s='+lastWeek+'&e='+todaysDate; 
   // $.fn.getProductStats('last_modified_date',lastWeek,todaysDate);
    $.fn.drawProductTable  (tableInfo, excluded, defaultSearchMode, opts);
    $('#content-header').html('<div class="sortable row-fluid">'+
    '<div class="span10" style="display: block">'+
    '<a align="left" id = "new-'+currentItem.toLowerCase()+'" data-original-title="New '+currentItem+'" href="javascript:;" class="btn btn-large btn-warning" data-rel="popover" data-content="Click here to add a new '+currentItem+'" onClick="$.fn.addNewItem(this)"> New '+currentItem+'</a>'+
    '<a  style="margin-left:2.0em;" id = "all-'+currentItem.toLowerCase()+'" data-original-title="All  Products" href="javascript:;" class="btn btn-large btn-info" data-rel="popover" data-content="Click here to view all '+currentItem+'s" onClick="$.fn.showAllProducts()"> All Products</a>'+
    '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
    +'</div>'); 
    $.fn.closeDialog();
        };
        
           $.fn.showAllUsers = function (){
            
                       var parentPage   = 'People';
                        var currentPage = 'Users';
                        var currentItem = currentPage;
                        var contents = $.fn.drawContents(currentItem,parentPage,currentPage);
                        $('#content').html('');
                        $('#loading').hide();
                        $('#content').fadeIn().append(contents);
       
                        tableContents = $('#information-table-contents').val();
                        var excluded = new Array();
                        excluded[0] = 'INDEX_NUM';
                        excluded[1] = 'LAST_MODIFIED_TIME';
                        excluded[2] = 'PASSWORD';
                        excluded[3] = 'DATE_OF_CREATION';
                        excluded[4] = 'LAST_ACCESS_TIME';
                        excluded[5] = 'ADDRESS';
                        excluded[6] = 'USER_CODE';
                        excluded[7] = 'IMAGE_ID';
                        excluded[8] = 'IMAGE_HISTORY';
                        excluded[9] = 'PASSWORD_RESET_FLAG';
                        excluded[10] = 'PASSWORD_HISTORY'
						
                        var defaultSearchMode = 0;
                        var opts = {
                           isViewable:true,
                           isEditable:true,
                           isIndelible:true
                        };

    var lastWeek =$.fn.yyyymmddhhmmss(7);
    var todaysDate = $.fn.yyyymmddhhmmss(0);
    var tableInfo  ='unna_users'; //&f=last_modified_time&s='+lastWeek+'&e='+todaysDate; 
   // $.fn.getProductStats('last_modified_date',lastWeek,todaysDate);
    $.fn.drawUserTable  (tableInfo, excluded, defaultSearchMode, opts);
    $('#content-header').html('<div class="sortable row-fluid">'+
    '<div class="span10" style="display: block">'+
    '<a align="left" id = "new-'+currentItem.toLowerCase()+'" data-original-title="New '+currentItem+'" href="javascript:;" class="btn btn-large btn-warning" data-rel="popover" data-content="Click here to add a new '+currentItem+'" onClick="$.fn.addNewItem(this)"> New '+currentItem+'</a>'+
    '<a  style="margin-left:2.0em;" id = "all-'+currentItem.toLowerCase()+'" data-original-title="All  Users" href="javascript:;" class="btn btn-large btn-info" data-rel="popover" data-content="Click here to view all '+currentItem+'s" onClick="$.fn.showAllUsers()"> All Users</a></div>'); 
    $.fn.closeDialog();
        };
        
                  $.fn.showAllRoles = function (){
            
			var parentPage	= 'Requests';
                        var currentPage = 'Role';
                        var currentItem = currentPage;
                        var contents = $.fn.drawContents(currentItem,parentPage,currentPage);
                        $('#content').html('');
                        $('#loading').hide();
                        $('#content').fadeIn().append(contents);
       
                        tableContents = $('#information-table-contents').val();
                        var excluded = new Array();
                        excluded[0] = 'INDEX_NUM';
                        var defaultSearchMode = 0;
                        var opts = {
                           isViewable:true,
                           isEditable:false,
                           isIndelible:true
                        };

    var tableInfo  ='unna_roles';
    $.fn.drawRoleTable  (tableInfo, excluded, defaultSearchMode, opts);
    $('#content-header').html('<div class="sortable row-fluid">'+
    '<div class="span3">'+
    '<a id = "new-'+currentItem.toLowerCase()+'" data-original-title="New '+currentItem+'" href="javascript:;" class="btn btn-large btn-important" data-rel="popover" data-content="Click here to add a new '+currentItem+'" onClick="$.fn.addNewItem(this)"> New '+currentItem+'</a><br /><br />'+
    '<a id = "all-'+currentItem.toLowerCase()+'" data-original-title="All  Roles" href="javascript:;" class="btn btn-large btn-info" data-rel="popover" data-content="Click here to view all '+currentItem+'s" onClick="$.fn.showAllRoles()"> All Roles</a>'+
   '</div>'); 
    $.fn.closeDialog();
        };
        
    $.fn.getSupplyStats = function (dateField, startDate,endDate ){
	 	 
	 $.post( "functions/data_driver.php", { "reqType":'misc', "dataType":'supply', "f": dateField,  "s": startDate, "e":endDate })
      .done(function( data ) {
         try{
          data = JSON.parse(data);
          var  unpaidCount1 = 0;
          var  unpaidAmount1 =0.0;
          var  partlyPaidCount1 = 0;
          var  partlyPaidAmount1 =0.0;
          var  paidCount1 = 0;
          var  paidAmount1 =0.0;
          var  unpaidCount2 = 0;
          var  unpaidAmount2 =0.0;
          var  partlyPaidCount2 = 0;
          var  partlyPaidAmount2 =0.0;
          var  paidCount2 = 0;
          var  paidAmount2 =0.0;
         
          for (var index in data){
              
             if(data[index].status!==null && data[index].stat_type ==='today' ){
               alert(data[index].status);
               alert(data[index].stat_type);
              if(data[index].status==='UNPAID' ){
                  unpaidCount1 = data[index].rec_count;
                  unpaidAmount1 = data[index].total_amount;
                  
              }else if(data[index].status==='PARTLY PAID' ){
                   partlyPaidCount1 = data[index].rec_count;
                   partlyPaidAmount1 =data[index].total_amount;
                  
              }else if(data[index].status==='COMPLETE' ){
                   paidCount1 = data[index].rec_count;
                   paidAmount1 = data[index].total_amount;
                  
              }
          }else if(data[index].status !==null && data[index].stat_type==='history' ){
               
              if(data[index].status==='UNPAID' ){
                  unpaidCount2 = data[index].rec_count;
                  unpaidAmount2 = data[index].total_amount;
                  
              }else if(data[index].status==='PARTLY PAID'){
                   partlyPaidCount2 = data[index].rec_count;
                   partlyPaidAmount2 = data[index].total_amount;
                  
              }else if(data[index].status==='COMPLETE' ){
                   paidCount2 = data[index].rec_count;
                   paidAmount2 = data[index].total_amount;              
              }
          }
              
              
          }
          
          
          $('#unpaid-title-anchor').attr('title',unpaidCount1+ ' new records');
          $('#history-unpaid-amount').html(unpaidAmount2);
          $('#history-unpaid-count').html(unpaidCount2);
          $('#today-unpaid-amount').html(unpaidAmount1);
          
          $('#incomplete-title-anchor').attr('title',partlyPaidCount1+ ' new records');
          $('#history-incomplete-amount').html(partlyPaidAmount2);
          $('#history-incomplete-count').html(partlyPaidCount2);
          $('#today-incomplete-amount').html(partlyPaidAmount1);
          
          $('#complete-title-anchor').attr('title',paidCount1+ ' new records');
          $('#history-complete-amount').html(paidAmount2);
          $('#history-complete-count').html(paidCount2);
          $('#today-complete-amount').html(paidAmount1);
          
      }catch(e){
             $.fn.showMessageDialog('<div align="center">Statistics Fetch Error</div>', '<div align = "center" color="red">Error generating statistics</div>'+ e.stack+'<br /><br />'+data); 
      }
          
  });
  };
        $.fn.getAllProducts= function(){
              var productStr = $.session.get('products');
         
              //  if (!productStr || productStr==='' ){
                
                var products =  new Array();
                $.post( "functions/data_driver.php", { "reqType":'misc', "dataType":'products'})
                .done(function( data ) {
                     var products = new Array();
                try{
                if (data.length && data!==null && data!==""){
                   data = JSON.parse(data);
                   if (data){
                    for(var i =0; i<data.length; i++ ){
                        products[i] = data[i]['PRODUCT_NAME']; 
                    }
                    $.session.set('products', JSON.stringify(products) );
                }else {
                    products = ['Product 1','Product 2','Product 3','Product 4','Product 5'];
                    $.session.set('products', JSON.stringify(products) );
                }
                }else {
                    products = ['Product 1','Product 2','Product 3','Product 4','Product 5'];
                    $.session.set('products', JSON.stringify(products) );
                }
                }catch(e){
                    $.fn.showMessageDialog('<div align="center">Product Fetch Error</div>', '<div align = "center" color="red">Error generating statistics</div>'+ e.stack+'<br /><br />'+data); 
                }
              
              });
               
              //  }
                var prodStr = $.session.get('products' );
                
                if(prodStr){
                    
                products  = JSON.parse(prodStr);
            }else{
                 products = ['Product 1','Product 2','Product 3','Product 4','Product 5'];
                    $.session.set('products', JSON.stringify(products) );
               
                
            }
                
             return products;
        };
           $.fn.getAllRoles= function(){
              var roleStr = $.session.get('roles');
         
              //  if (!roleStr || roleStr==='' ){
                
                var roles =  new Array();
                $.post( "functions/data_driver.php", { "reqType":'misc', "dataType":'roles'})
                .done(function( data ) {
                     var roles = new Array();
                try{
                if (data.length && data!==null && data!==""){
                   data = JSON.parse(data);
                   if (data){
                    for(var i =0; i<data.length; i++ ){
                        roles[i] = data[i]['PRODUCT_NAME']; 
                    }
                    $.session.set('roles', JSON.stringify(roles) );
                }else {
                    roles = ['Role 1','Role 2','Role 3','Role 4','Role 5'];
                    $.session.set('roles', JSON.stringify(roles) );
                }
                }else {
                    roles = ['Role 1','Role 2','Role 3','Role 4','Role 5'];
                    $.session.set('roles', JSON.stringify(roles) );
                }
                }catch(e){
                    $.fn.showMessageDialog('<div align="center">Role Fetch Error</div>', '<div align = "center" color="red">Error generating statistics</div>'+ e.stack+'<br /><br />'+data); 
                }
              
              });
               
              //  }
                var prodStr = $.session.get('roles' );
                
                if(prodStr){
                    
                roles  = JSON.parse(prodStr);
            }else{
                 roles = ['Role 1','Role 2','Role 3','Role 4','Role 5'];
                    $.session.set('roles', JSON.stringify(roles) );
               
                
            }
                
             return roles;
        };
        $('a').click(function(e){
            
            e.preventDefault();
        });
        
        $.fn.loadPreviousPage  = function (){
            
            var previousPageHtml = $.session.get('previous_page');
           $('#content').html(previousPageHtml);
           $.fn.closeDialog();
            
        };
        
        
  });
  
$(document).on("keypress", "form", function(event) { 
    return event.keyCode !== 13;
});

$.fn.testPost = function (e) {
    event.preventDefault();

    $.post("/kayxlav", { "reqType": 'misc', "dataType": 'purchase' })
        .done(function (rawData) {
            try {
                data = JSON.parse(rawData);
                // alert(data);
                $.fn.showMessageDialog('<div align="center">Statistics Fetch Error</div>', '<div align = "center" color="red">Error generating statistics</div>' + rawData + '<br /><br />');
            } catch (e) {
                $.fn.showMessageDialog('<div align="center">Statistics Fetch Error</div>', '<div align = "center" color="red">Error generating statistics</div>' + e.stack + '<br /><br />' + data);
            }

        });

}