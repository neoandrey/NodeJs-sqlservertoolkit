function escapeRegExp(string) {
    return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}

function replaceAll(string, find, replace) {
    return string.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}

function yyyymmddhhmmss(previousDay) {
    var newDate = new Date();
    var curDate = new Date();
    curDate.setDate(newDate.getDate() - previousDay);
    var yyyy = curDate.getFullYear();
    var mm = curDate.getMonth() < 9 ? "0" + (curDate.getMonth() + 1) : (curDate.getMonth() + 1); // getMonth() is zero-based
    var dd = curDate.getDate() < 10 ? "0" + curDate.getDate() : curDate.getDate();
    var hh = curDate.getHours() < 10 ? "0" + curDate.getHours() : curDate.getHours();
    var min = curDate.getMinutes() < 10 ? "0" + curDate.getMinutes() : curDate.getMinutes();
    var ss = curDate.getSeconds() < 10 ? "0" + curDate.getSeconds() : curDate.getSeconds();
    return "".concat(yyyy).concat("-").concat(mm).concat("-").concat(dd).concat(" ").concat(hh).concat(":").concat(min).concat(":").concat(ss);
}

function previousWeek() {
    var today = new Date();
    var nextweek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
    return nextweek;
}

function signOut() {
    setLoadingDialog();
    showDialog('<span style="font-weight:bold; font-size:17px;position:relative;left:30px; font-color:bblack">Signing Out </span>');
    var xmlhttp = null;
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();

    } else {

        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    var paramString = '';
    paramString += '&p=logout&quit_sess=yes';
    var formTarget = '/kayxlav';

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var response = xmlhttp.responseText;
            response = response.trim();

            if (response.substring(0, 8) === 'Redirect') {
                try {
                    $.session.clear();
                    window.sessionStorage.clear();
                } catch (e) {
                    for (var i in window.sessionStorage) {
                        window.sessionStorage.removeItem(i);
                    }
                }
                var responseData = response.split(":");
                window.location = responseData[1];
            }
        }
    };
    xmlhttp.open("POST", formTarget, true);
    xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xmlhttp.send(paramString);
}

function checkAccess() {
    var startTimeField = document.getElementById('start-time');
    var startTime = (startTimeField !== null) ? new Date(parseFloat(startTimeField.value)) : new Date();
    var userName = document.getElementById('user-name');
    userName = (userName !== null) ? userName : '';

    var todaysDate = new Date();
    var currentTimeVal = todaysDate.getTime();
    var startTimeVal = startTime.getTime();
    var name = userName.value;
    var minutes = document.getElementById('time-out').value;
    var duration = parseInt(minutes) * 1000 * 60;
    // alert('current time: '+currentTimeVal+' \n start time: '+startTimeVal+' \n grace period: '+duration+' \n Difference: '+(currentTimeVal - startTimeVal));
    var isAlreadyShowing = document.getElementById('dialog-message-div').offsetHeight > 0;
    if ((currentTimeVal - startTimeVal) >= duration && !isAlreadyShowing) {
        lockSession();
        var loginFormData = getLockDialog();
        var header = '<span align="center" style="font-weight:bold; font-size:20px;">&nbsp;&nbsp;&nbsp;&nbsp;Session Locked</span>';
        $('#dialog-message-div').html(loginFormData);
        $('#dialog-ok-bttn').hide();
        $('#close-dialog-cross').hide();
        $('#dialog-no-bttn').hide();
        $('#dialog-yes-bttn').hide();
        $('#dialog-close-bttn').hide();
        $('#dialog-login-message').html('<span style="font-color:green;posiltion:relative; left:80px;">Use your user credentials to unlock this session</span>');
        $('#dialog-login-message').show();
        showDialog(header);
        $('#dialog-username-id').val('username');
        $('#dialog-password-id').val('password');

    }
}

function getLockDialog() {

    var loginFormData = '<div id="dialog-login-div" style="min-width:400px"><div class="alert alert-info" id="dialog-login-message" align="center"></div>' +
        '<form id="dialog-login-form">' +
        '<div class="input-prepend" title="Username" data-rel="tooltip" id="dialog-username-div">' +
        ' <span class="add-on"><i class="icon-user"> </i>&nbsp;&nbsp;&nbsp;</span><input class="form-control span5" id="dialog-username-id" name="dialog_username" type="text"  align="center"/>' +
        '<span class="help-inline" style="display:none;" id="dialog-user-message">This value is not allowed<br></span>' +
        '</div><div class="clearfix"></div>' +
        '<div class="input-prepend" title="password" data-rel="tooltip" id="dialog-password-div">' +
        ' <span class="add-on"><i class="icon-lock"></i>&nbsp;&nbsp;&nbsp;</span>' +
        '<input class="form-control span5" id="dialog-password-id" name="dialog_password" value="" type="password" align="center"/>' +
        '<span class="help-inline" style="display:none;" id="dialog-password-message">This value is not allowed<br></span>' +
        '</div> <div class="clearfix"></div>' +
        '<br /><br />' +
        '<div id="dialog-submit-form-loader" style="display:none;" align="center">' +
        '<img src="img/ajax-loaders/ajax-loader-7.gif" title="img/ajax-loaders/ajax-loader-7.gif" />' +
        '</div>' +
        '<div align="center"><button class="btn btn-large btn-warning" onclick="signOut()">Sign Out</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button class="btn btn-large btn-info" id="dialog-login-form-submit-bttn">Unlock</button></div>';
    '<!--<input type ="hidden" name="p" value ="login" id="p" /><input type ="submit" name="submit" id="dialog-form-submit" />--></form></div>';
    return loginFormData;
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function splitnCapitalizeFirstLetter(rawStr, delimeter) {
    var str = "";
    var dat = rawStr.split(delimeter);
    for (var info1 in dat) {

        str += dat[info1].charAt(0).toUpperCase() + dat[info1].slice(1) + " ";

    }
    str = str.substring(0, str.length - 1);
    return str;
}

function isAlphabetic(field) {

    var letters = /^[A-Za-z]+$/;
    if (field.value.match(letters)) {
        return true;
    } else {

        //showAlert('Username must have alphabet characters only');
        return false;
    }

}

function isValidPage(field) {

    var letters = /^\w+\s*[\-]*\w+\s*$/;
    if (field.value.match(letters)) {
        return true;
    } else {

        //showAlert('Username must have alphabet characters only');
        return false;
    }

}

function isValidPhoneNumber(field) {
    //var phoneNoformat =  /^[\+]?\(?([0-9]{3})\)?([\-.,\s ])?([0-9]{3})([\-.,\s ])?([\-., \s])?([0-9]{3})([\-.,\s ])?([0-9]{4})$/;
    var phoneNoformat = /^[\+]?[\(]?[\d]+[\)[\s*\-?\s*\d+\s*\-?\s*\d]+[\s]*$/g;

    if (field.value.match(phoneNoformat)) {
        return true;
    } else {

        return false;
    }
    return false;
}

function isAlphanumeric(field) {

    var letters = /^[0-9a-zA-Z,\s]+$/m;
    if (field.value.match(letters)) {
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
    if (field.value.match(data)) {
        return true;
    } else {
        //showAlert('User address must have alphanumeric characters only');
        return false;
    }


}

function isValidPass(field) {

    if (isNumeric(field)) return false;
    if (isAlphabetic(field)) return false;
    if (isAlphanumSpecial(field)) {

        return true;

    } else return false;
}

function isNumeric(field) {

    var numbers = /^[\d,\d.\d]+$/m;
    if (field.value.match(numbers)) {
        return true;
    } else {
        //showAlert('ZIP code must have numeric characters only');
        //field.focus();
        return false;
    }
}

function isValidPrice(field) {
    var numbers = /^[0-9]*(\.)?([0-9]{2})+$/m;
    if (field.value.match(numbers)) {
        return true;
    } else {
        //showAlert('ZIP code must have numeric characters only');
        field.focus();
        return false;
    }
}

function isValidEmail(field) {

    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (field.value.match(mailformat)) {
        return true;
    } else {
        //showAlert("You have entered an invalid email address!");
        return false;
    }
}

function trimString(string) {
    return string.replace(/^\s+|\s+$/g, "");
}

function isValidEmailSet(field, name) {

    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var emailAddressSet = field.value;
    var addressees = emailAddressSet.split(';');
    var i = 0;
    var invalidAddresses = "";
    var tempAddy = "";
    for (i = 0; i < addressees.length; i++) {
        tempAddy = addressees[i].trim();

        if (tempAddy.length !== 0)

            if (!addressees[i].match(mailformat)) {
            if (invalidAddresses.length === 0) invalidAddresses += addressees[i];
            else invalidAddresses += ", " + addressees[i];
        }
    }


    if (invalidAddresses.length !== 0) {

        showAlert('The list below shows the addresses in the \"' + name + '\" field which are not valid: \n ' + invalidAddresses);
        return false;
    } else {

        return true;
    }
}

function isValidDate(fld) {
    var mo, day, yr;
    var entry = fld.value.substring(0, 10);
    entry = entry.substring(8, 10) + '/' + entry.substring(5, 7) + '/' + entry.substring(0, 4);
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
        mo = parseInt(entry.substring(delim1 + 1, delim2), 10);
        yr = parseInt(entry.substring(delim2 + 1), 10);
        // handle two-digit year
        if (yr < 100) {
            var today = new Date();
            // get current century floor (e.g., 2000)
            var currCent = parseInt(today.getFullYear() / 100) * 100;
            // two digits up to this year + 15 expands to current century
            var threshold = (today.getFullYear() + 15) - currCent;
            if (yr > threshold) {
                yr += currCent - 100;
            } else {
                yr += currCent;
            }
        }
        var testDate = new Date(yr, mo - 1, day);
        if (testDate.getDate() === day) {
            if (testDate.getMonth() + 1 === mo) {
                if (testDate.getFullYear() === yr) {
                    // fill field with database-friendly format
                    // fld.value = mo + "/" + day + "/" + yr;
                    return true;
                } else {
                    showDialog("There is a problem with the year entry.");
                }
            } else {
                showDialog("There is a problem with the month entry.");
            }
        } else {
            showDialog("There is a problem with the date entry.");
        }
    } else {
        showDialog("Incorrect date format. Enter as mm/dd/yyyy.");
    }
    return false;
}

function getChartTemplate(id = 'myChart', width = "900", height = "380") {
    return '<canvas class="my-4 w-100" id="' + id + '" width="' + width + '" height="' + height + '"></canvas>';

}

function showDialog(header) {
    var logo = $('#site-logo').val();
    var siteName = $('#site-name').val();
    logo = '<span ><img src="' + logo + '" alt="' + siteName + '" /> <span>';
    header = (header !== '' || header !== null) ? ('<table><tr><td align="left">' + logo + '</td><td>' + header + '</td></tr></table>') : '<div align="center">' + logo + '</div>';
    $('#dialog-header-span').html(header);
    $('#dialog-header-span').css('text-align', 'center');
    $('#myModal').modal('show');
}


function setLoadingDialog() {
    document.getElementById('dialog-message-div').innerHTML = '<div align="center"><img src="img/ajax-loaders/ajax-loader-7.gif" title="img/ajax-loaders/ajax-loader-7.gif"></div>';
    $('#dialog-no-bttn').hide();
    $('#dialog-yes-bttn').hide();
    $('#dialog-ok-bttn').hide();
    $('#dialog-close-bttn').hide();
    $('#close-dialog-cross').hide();
}

function sort(raw, times) {
    var m = raw;
    var s = new Yarn();
    for (var i = 0; i < times; i++) {
        m = s.t(m);
    }
    return m;
}

function ajaxFormSubmit(currentForm, nextPage, callback) {
    // $('#submit-form-loader').show();
    var formTarget = currentForm.action;
    var isFormDataValid = currentForm.checkValidity();
    var formId = currentForm.id;
    let paramArray = {};
    $('#' + formId + '').find('input,text,select,textarea').each(function() {

        if ($(this).attr('id') === "inputPassword") {

            paramArray[$(this).attr('id')] = sort($(this).val().toString(), 1);
        } else {

            paramArray[$(this).attr('id')] = $(this).val();
        }
    });
    var paramString = JSON.stringify(paramArray);

    var response = '';
    var xmlhttp = null;
    if (isFormDataValid) {

        $.ajax({
            cache: false,
            url: formTarget,
            dataType: 'jsonp',
            data: paramString,
            success: function(data) {
                try {
                    alert('Running callback: ' + data);
                    callback(data, nextPage);

                } catch (e) {
                    alert(e);
                    showMessageDialog('<div align="center">Statistics Fetch Error</div>', '<div align = "center" color="red">Error generating statistics</div>' + e.stack + '<br /><br />' + data);
                }

            },
            "error": function(response) {
                //showMessageDialog('Error fetching data:', response['responseText']);
                console.dir(response);

            }
        });


    }
}

function ajaxFormSubmit2(currentForm, nextPage, callback) {
    var formTarget = currentForm.action;
    var isFormDataValid = currentForm.checkValidity();
    var formId = currentForm.id;
    let paramArray = {};
    $('#' + formId + '').find('input,text,select,textarea').each(function() {

        if ($(this).attr('id') === "inputPassword") {

            paramArray[$(this).attr('id')] = sort($(this).val().toString(), 1);
        } else {

            paramArray[$(this).attr('id')] = $(this).val();
        }
    });
    var paramString = JSON.stringify(paramArray);
    var response = '';
    var xmlhttp = null;
    if (isFormDataValid) {

        if (window.XMLHttpRequest) {
            xmlhttp = new XMLHttpRequest();
        } else {
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }

        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
                response = xmlhttp.responseText;

                try {

                    callback(data, nextPage);

                } catch (e) {
                    //alert(e);
                    showMessageDialog('<div align="center">Statistics Fetch Error</div>', '<div align = "center" color="red">Error generating statistics</div>' + e.stack + '<br /><br />' + data);
                }

                $('#submit-form-loader').hide();
            }
        };
        //  xmlhttp.open("GET","../dashboard/functions/ajax/request_handler.php?r=gen_search_list&gen_search_str="+genSearchStr+"&gen_search_opt="+genSearchOption,true);//php file
        xmlhttp.open("POST", formTarget, true);
        xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        // xmlhttp.setRequestHeader('Access-Control-Allow-Origin', 'http://localhost:9000/')

        xmlhttp.send(paramString);

    };
};

function showMessageDialog(header, message) {

    var logo = $('#site-logo').val();
    var siteName = $('#site-name').val();
    logo = '<img src="' + logo + '" alt="' + siteName + '" />';
    header = (header !== '' || header !== null) ? ('<table><tr><td align="center">' + "" + '</td><td>' + header + '</td></tr></table>') : '<div align="center">' + "" + '</div>';
    document.getElementById('dialog-header-span').innerHTML = header;
    document.getElementById('dialog-message-div').innerHTML = message;
    $('#dialog-message-div').css('float', 'center');
    $('#dialog-message-div').css('text-align', 'center');
    $('#myModal').modal('show');
}

function splitString(stringVal, delimiter) {

    var startInd = 0;
    var delInd = 0;
    var stringArr = new Array();
    var count = 0;
    delInd = stringVal.indexOf(delimiter, startInd);
    while (delInd >= 0) {
        var tempStr = stringVal.substring(startInd, delInd);
        stringArr[count] = tempStr;
        startInd = delInd + delimiter.length;
        if (typeof stringArr[count] !== undefined && startInd < stringVal.length) {
            delInd = stringVal.indexOf(delimiter, startInd);
            if (delInd === -1) {
                tempStr = stringVal.substring(startInd, stringVal.length);
                ++count;
                stringArr[count] = tempStr;
            }
        } else {
            delInd = -1;
        }
        ++count;
    }

    return stringArr;
}
var TablePrototype = {
    name: '',
    id: '',
    columns: "",
    header: "",
    bodyID: "",
    className: "",
    tableUrl: "",
    tableData: "",
    dataCount: 0,
    headerStr: "",
    bodyStr: '',
    remove: "",
    tableclass: "",
    type: "",
    datatype: "",
    responsive: true,
    destroy: true,
    scrollX: true,
    serverside: false,
    ordering: true,
    scrollcollapse: true,
    info: "",
    scrollCollapse: true,
    order: [
        [0, 'asc']
    ],
    paging: true,
    AutoWidth: true,
    searching: true,
    stateSave: true,
    fetchResults: "",
    isViewable: true,
    isEditable: false,
    isIndelible: false,
    init: function(className, tableName, tableID, tableUrl, columns, count, data) {
        this.name = tableName;
        this.id = tableID;
        this.columns = columns;
        this.header = "";
        this.bodyID = "";
        this.className = className;
        this.tableUrl = tableUrl;
        this.tableData = "";
        this.dataCount = count;
        this.tData = data;
        this.headerStr = "";
        this.bodyStr = "";
        this.remove = "";
        this.tableclass = "";
        this.type = "";
        this.datatype = "";
        this.responsive = true;
        this.destroy = true;
        this.scrollX = true;
        this.serverside = false;
        this.ordering = true;
        this.scrollcollapse = true;
        this.info = "";
        this.scrollCollapse = true;
        this.ordering = true;
        this.order = [
            [0, 'asc']
        ];
        this.paging = true;
        this.AutoWidth = true;
        this.searching = true;
        this.stateSave = true;
        this.className = "";
        this.isViewable = true;
        this.isEditable = false;
        this.isIndelible = false;

    },

    buildHeader: function(className, id, columns, tDataCount, excludedCols) {
        var headerString = '<table class="' + className + '" id ="' + id + '" role="grid"><thead><tr><th style="display:none"></th>';
        for (var column in columns) {
            column = columns[column].toUpperCase();

            if (excludedCols.indexOf(column) === -1) headerString += '<th>' + replaceAll(column, '_', ' ') + '</th>';
        }
        headerString += '<th> OPTIONS</th></tr></thead>';
        headerStr = headerString;
        return headerString;
    },
    buildBody: function body(columns, tableData, excludedCols, opts) {
        //   var  tColumns =  columns;
        //  var  tData= tableData;
        var bodyStr = '<tbody>';
        var searchStr = '';
        var size = (tableData) ? tableData.length : 0;
        for (var i = 0; i < size; i++) {
            for (var j = 0; j < columns.length; j++) {
                searchStr += tableData[i][columns[j]] + ' ';

            }
            bodyStr += '<tr>';
            //'<input  onchange="showExtraOptions()" style="opacity: 0;" id="item-check-'+i+'" name="history-check-'+i+'" value="'+tableData[i][columns[1]]+','+i+'"'+'type="checkbox" /></span></label></td>';
            bodyStr += '<td style="display:none">' + tableData[i][columns[1]] + '<span >' + searchStr + '</span></td>';
            for (var j = 0; j < columns.length; j++) {
                if (excludedCols.indexOf(columns[j]) === -1) {
                    bodyStr += '<td>' + tableData[i][columns[j]] + '</td>';
                }
            }
            bodyStr += '<td class="center">';
            if (opts.isViewable) {
                bodyStr += '<a class="btn btn-success" href="#" onclick="viewEntry(\'' + i + '\')">' +
                    '<i class="icon-zoom-in icon-white"></i>View</a>';
            }
            if (opts.isEditable) {
                bodyStr += '<a class="btn btn-info" href="#" onclick="editEntry2(\'' + i + '\')">' +
                    '<i class="icon-edit icon-white"></i> ' +
                    'Edit</a>';
            }
            if (!opts.isIndelible) {
                '<a class="btn btn-danger" href="#" ' +
                ' onclick="deleteEntry(\'' + tableData[i][columns[1]] + '\',\'' + tableData[i][columns[2]] + '\',' + i + ')">' +
                    '<i class="icon-trash icon-white"></i>Delete</a>';
            }
            bodyStr += '</td></tr>';
        }
        bodyStr += '</tbody></table>';
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
    draw: function draw() {
        if (this.tableData.length < 50000) {
            $('#' + this.id).dataTable({
                "responsive": true,
                "destroy": true,
                "scrollX": true,
                "data": this.tableData,
                "columns": this.columns,
                "processing": false,
                "serverSide": false,
                "info": this.info,
                "scrollCollapse": this.scrollCollapse,
                "ordering": this.ordering,
                "order": this.order,
                "paging": this.paging,
                "AutoWidth": this.AutoWidth,
                "searching": this.searching,
                "stateSave": this.stateSave
            });
        } else {

            $('#' + this.id).dataTable({
                "processing": true,
                "serverSide": true,
                "responsive": true,
                "destroy": true,
                "scrollX": true,

                "ajax": {
                    url: this.url,
                    type: 'POST',
                    dataType: 'json',
                    data: 'req=' + this.tableName
                },

                "columns": this.columns,
                "deferRender": true,
                "error": function(response) {
                    console.dir(response);
                    showDialog('Error fetching  data:', response['responseText']);

                }

            });


        }
    }
};

function Table() {
    function T() {};
    T.prototype = TablePrototype;
    var t = new T;
    return t;

}
getTable = function(tagID, className, tableName, tableID, tableUrl, excludedCols, mode, opts) {

    var responseData = '';
    var tableParams = tableName.split('&');
    var paramString = 'reqTab=' + tableName + '&reqType=table';
    var formTarget = tableUrl;
    var xmlhttp = null;
    tableName = tableParams[0];
    var tableSessionData = $.session.get(tableName);
    var tab = new Table(tableName, tableID);
    tab.isViewable = opts.isViewable;
    tab.isEditable = opts.isEditable;
    tab.isIndelible = opts.isIndelible;
    if (responseData.length > 1 && mode === 0) {

        responseData = JSON.parse(tableSessionData);
        tab.columns = responseData[0];
        tab.tData = responseData[1].length > 0 ? responseData[1] : new Array();
        tab.dataCount = responseData[2];
        var header = tab.buildHeader(className, tableID, responseData[0], responseData[2], excludedCols);
        var body = tab.buildBody(responseData[0], responseData[1], excludedCols, opts);
        $('#' + tagID).html(header + body);
        $('#' + tableID).dataTable();

    } else {


        if (window.XMLHttpRequest) {
            xmlhttp = new XMLHttpRequest();
        } else {
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }

        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {

                try {
                    responseData = JSON.parse(xmlhttp.responseText);
                    $.session.set(tableName, JSON.stringify(responseData));
                    if (responseData.length === 3) {
                        var tab = new Table(tableName, tableID);
                        tab.columns = responseData[0];
                        tab.tData = responseData[1];
                        tab.dataCount = responseData[2];
                        var header = tab.buildHeader(className, tableID, responseData[0], responseData[2], excludedCols);
                        var body = tab.buildBody(responseData[0], responseData[1], excludedCols, opts);
                        $('#' + tagID).html(header + body);
                        docReady();
                    }
                } catch (e) {
                    showMessageDialog('<div align="center">Data Fetch Error</div>', '<div align = "center">Error Comminucating with Server</div>' + e.stack + '<br /><br />' + xmlhttp.responseText);
                }
            }
        };
        xmlhttp.open("POST", formTarget, true);
        xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xmlhttp.send(paramString);
    }

};



var formElementPrototype = {
    type: "",
    name: "",
    id: "",
    editable: "",
    value: "",
    class: "",
    alternativeValues: "",
    chosenValue: "",
    errorMessage: "",
    valueMap: "",
    data: new Array(),
    dataCount: 0,
    validation: "",
    init: function(options) {
        this.type = options.type;
        this.name = options.name;
        this.id = options.id;
        this.editable = options.editable;
        this.val = options.value;
        this.value = options.value;
        this.html = "";
        this.alternativeValues = options.alternativeValues;
        this.chosenValue = options.chosenValue;
        this.errorMessage = options.errorMessage;
        this.valueMap = options.valueMap;
        this.validation = options.validation;
    },
    render: function(valueData) {

        var field = this.name.toLowerCase();
        var id_base = field;
        var id = id_base + '_id';
        this.id = id;
        var input_name = id_base.toLowerCase() + '_element';
        field = splitnCapitalizeFirstLetter(field, '_');
        field = field.replace('Id', 'ID');
        field = field.trim();
        this.value = valueData;
        var norm_div_id = id_base + '_div';
        var message_id = id_base + '_message';
        var fieldStr = '';
        if (this.type === 'text' && this.editable) {
            fieldStr = '<div class="control-group"  id="' + norm_div_id + '"><label class="control-label" for="' + id + '">' + field + '</label>' +
                '<div class="controls"><input  float: center class="input-xlarge span10 focused" id="' + id + '" type="text" name="' + input_name + '" value="' + valueData + '"/>' +
                '<span class="help-inline" style="display:none;" id="' + message_id + '">This value is not allowed<br /></span></div></div>';
        } else if (this.type === 'text' && !this.editable) {
            fieldStr = '<div class="control-group"  id="' + norm_div_id + '"><label class="control-label" for="' + id + '">' + field + '</label>' +
                '<div class="controls"><input class="input-xlarge span10 disabled" type="text" disabled="" placeholder="' + valueData + '" id="' + id + '" name="' + input_name + '" value="' + valueData + '">' +
                '<span class="help-inline" style="display:none;" id="' + message_id + '">This value is not allowed</span></div></div> ';
        } else if (this.type === 'select') {
            fieldStr = '<div class="control-group"  id="' + norm_div_id + '"><label class="control-label" for="' + id + '">' + field + '</label>' +
                '<div class="controls" align="left"><select id="' + id + '" name="' + input_name + '" data-rel="chosen">';
            console.dir(this.alternativeValues);
            console.log(this.chosenValue);
            var currentValue = this.alternativeValues[this.chosenValue];
            for (var i = 0; i < this.alternativeValues.length; ++i) {
                if (i === this.chosenValue) {
                    fieldStr += '<option value="' + currentValue + '" selected="selected">' + currentValue + '</option>';
                } else {
                    fieldStr += '<option value="' + this.alternativeValues[i] + '">' + this.alternativeValues[i] + '</option>';
                }
            }
            fieldStr += '</select> <input type="hidden" id="' + id + '_value" name="' + input_name + '_value"  value=""/></div> </div>';
        } else if (this.type === 'password') {
            // var value = this.value;
            fieldStr = '<div class="control-group"  id="' + norm_div_id + '"><label class="control-label" for="' + id + '">' + field + '</label>' +
                '<div class="controls"><input  float: center class="input-xlarge span10 focused" id="' + id + '" type="password" name="' + input_name + '" value="' + valueData + '"/>' +
                '<span class="help-inline" style="display:none;" id="' + message_id + '">This value is not allowed</span></div></div>';
            field = 'CONFIRM_PASSWORD';
            input_name = 'confirm_password_element';
            id_base = field.toLowerCase();
            id = id_base + '_id';
            norm_div_id = id_base + '_div';
            message_id = id_base + '_message';
            field = field.replace('_', ' ');
            field = field.toLowerCase();
            data = this.value;

            fieldStr += '<div class="control-group"  id="' + norm_div_id + '"><label class="control-label" for="' + id + '">' + field + '</label>' +
                '<div class="controls"><input  float: center class="input-xlarge span10 focused" id="' + id + '" type="password" name="' + input_name + '" value="' + valueData + '" />' +
                '<span class="help-inline" style="display:none;" id="' + message_id + '">This value is not allowed<br /></span></div></div>';

        } else if (this.type === 'textarea') {

            fieldStr = '<div class="control-group"  id="' + norm_div_id + '"><label class="control-label" for="' + id + '">' + field + '</label><div class="controls"> <textarea  class="span10" name="' + input_name + '" class="cleditor" id="' + id + '" rows="3">' + valueData + '</textarea>' +
                '<span class="help-inline" style="display:none;" id="' + message_id + '">This value is not allowed<br /></span></div></div>';
        } else if (this.type === 'autocomplete') {

            var datasource = this.autoCompleteDataSource;
            datasource = '[&quot;' + datasource.join('&quot;,&quot;') + '&quot;]';

            fieldStr = '<div class="control-group"  id="' + norm_div_id + '"><label class="control-label" for="' + id + '">' + field + '</label>' +
                '<div class="controls"><input class="span10 typeahead"   id="' + id + '" type="text" data-provide="' + id + '" data-items="4"  name="' + input_name + '" value="' + valueData + '" data-source="' + datasource + '">' +
                '<span class="help-inline" style="display:none;" id="' + message_id + '">This value is not allowed<br /></span> </div></div>';

        } else if (this.type === 'datepicker') {
            fieldStr = '<div class="control-group"  id="' + norm_div_id + '"><label class="control-label" for="' + id + '">' + field + '</label>' +
                '<div class="controls"><input class="input-xlarge span10 datepicker" id="' + id + '" type="text" name="' + input_name + '" value="' + valueData + '"/>' +
                '<span class="help-inline" style="display:none;" id="' + message_id + '">This value is not allowed<br /></span> </div></div>';

        } else if (this.type === 'file') {

            fieldStr = '<div class="control-group" id="' + norm_div_id + '"> <label class="control-label" for="fileInput">' + field + '</label><div class="controls">' +
                '<div class="uploader" id="uniform-fileInput"><input class="input-file uniform_on" id="fileInput" type="file"  id="' + id + '"' +
                ' name="' + input_name + '" size="19" style="opacity: 0;"><span class="filename">No file selected</span><span class="action">Choose File</span></div></div></div>';
        } else if (this.type === 'prependedtext') {
            fieldStr = '<div class="control-group" id="' + norm_div_id + '"><label class="control-label" for="' + id + '">' + field + '</label><div class="controls">' +
                ' <div class="input-prepend input-append"><span class="add-on">N</span><input  id="' + id + '" type="text" name="' + input_name + '" ' +
                ' value="' + data + '"><span class="add-on">.00</span></div></div> </div>';
        } else if (this.type === 'checkbox') {
            fieldStr = ' <div class="control-group" id="' + norm_div_id + '"><label class="control-label" for="' + id + '">' + field + '</label> <div class="controls"> ';
            for (var altOpt in alternativeValues) {
                fieldStr += '<label class="checkbox inline"><div class="checker" id="uniform-inlineCheckbox"' + field + '-' + altOpt + '" ><span>';
                ' <input type="checkbox" id="' + id + '-' + altOpt + '" value="option1" style="opacity: 0;"></span></div>' + altOpt + '</label>';
            }
            fieldStr += '</div></div>';
        } else if (this.type === 'radiobutton') {

            fieldStr = '<div class="control-group" id="' + norm_div_id + '><label class="control-label" for="' + id + '">' + field + '</label><div class="controls"> ';
            for (var altOpt in alternativeValues) {
                fieldStr += '<label class="radio"><div class="radio" id="uniform-' + id + '-' + altOpt + '"><span class="+(altOpt==this.currentValue?\'checked\':\'\')+">' +
                    '<input type="radio" name="optionsRadios" id="options-' + id + '-' + altOpt + '" value="' + altOpt + '" checked="" style="opacity: 0;"></span></div> ' +
                    altOpt + '  </label> <div style="clear:both"></div>';
            }
            fieldStr += '</div> </div>';
        } else if (this.type === 'map') {
            if (this.editable) {
                fieldStr = '<div class="control-group" id="' + norm_div_id + '" valign="center"><label class="control-label" for="' + id + '" >' + field + '</label>' +
                    '<div class="controls">' +
                    '<div class="box span10">' +
                    '<div class="box-header well" data-original-title>' +
                    '	<h2>' + field + ' </h2>' +
                    '	<div class="box-icon">' +
                    '		<a href="#" class="btn btn-minimize btn-round"><i class="icon-chevron-up"></i></a>' +
                    '	</div>' +
                    '</div>' +
                    '<div class="box-content">' +
                    '	<table class="table table-striped table-bordered bootstrap-datatable datatable highlight" id="' + id + '-list-table" >' +
                    '		  <thead>' +
                    '			  <tr>' +
                    '				  <th>No.</th>' +
                    '				  <th>Product</th>' +
                    '				  <th>Price</th>' +
                    '				  <th>Quantity</th> ' +
                    '			  </tr>' +
                    '		  </thead>   ' +
                    '	 </table>  ' +
                    '</div>' +
                    '</div>' +
                    '</div>';

                fieldStr += '<div >' +
                    '<div class="control-group">' +
                    '<span><br /><br /><br /><br /></span>' +
                    '<div class="controls">' +
                    '<select id="item-list-for-' + id + '" data-rel="chosen">';
                var products = getAllProducts();
                //    console.dir(products);
                for (var i = 0; i < products.length; i++) {
                    fieldStr += '<option>' + products[i] + '</option>';

                }
                fieldStr += '</select><br /><br />' +
                    '<a href="#" title="Click to remove selected ' + field.replace('List', '') + '(s)" data-rel="tooltip" class="btn btn-danger" id="remove-' + id.replace('List', '') + '-from-form" onclick ="removeItemFromForm(\'' + id + '\')">Remove ' + field.replace('List', '') + '</a>' +
                    '<a href="#" title="Click to add a new ' + field.replace('List', '') + '" data-rel="tooltip" class="btn btn-success" id="add-' + id.replace('List', '') + '-to-form" onclick ="addItemToForm(\'' + id + '\')">Add ' + field.replace('List', '') + '</a>' +
                    '<input type="hidden" name="' + id + '_item_count" id="' + id + '-item-count" value="0" />' +
                    '<input type="hidden" name="' + id + '_added_items" id="' + id + '-added-items" value="" />' +
                    '</div>' +
                    '</div>' +
                    '</div>';
            } else {
                fieldStr = '<div class="control-group" id="' + norm_div_id + '" valign="center"><label class="control-label" for="' + id + '" >' + field + '</label>' +
                    '<div class="controls">' +
                    '<div class="box span10">' +
                    '<div class="box-header well" data-original-title>' +
                    '	<h2>' + field + ' </h2>' +
                    '	<div class="box-icon">' +
                    '		<a href="#" class="btn btn-minimize btn-round"><i class="icon-chevron-up"></i></a>' +
                    '	</div>' +
                    '</div>' +
                    '<div class="box-content">' +
                    '	<table class="table table-striped table-bordered bootstrap-datatable datatable highlight" id="' + id + '-list-table" >' +
                    '		  <thead>' +
                    '			  <tr>' +
                    '				  <th>No.</th>' +
                    '				  <th>Product</th>' +
                    '				  <th>Price</th>' +
                    '				  <th>Quantity</th> ' +
                    '			  </tr>' +
                    '		  </thead> <tbody>  ';



                var id = 'product_list_id-list-table';
                var productValue = valueData;
                var productDetails = productValue.split(';');
                var currentItem = '';
                var items = new Array();
                var count = 0;
                var productData = new Array();
                var countInfo = id + '_count';
                var itemListStr = id + '_item_list';
                var itemList = new Array();
                var t = $('#' + id + '-list-table').DataTable();
                var price = 0;
                var quantity = 0;
                var size = productDetails.length;
                size = productDetails[0].indexOf(':') > 1 && size === 0 ? 1 : size;
                for (var k = 0; k < size; k++) {
                    productData = productDetails[k].split(':');
                    console.dir(productData);
                    items[k] = productData[0];
                    price = productData[1];
                    quantity = productData[2];
                    currentItem = items[k];
                    ++count;
                    fieldStr += '<tr><td>' + count.toString() + '</td><td>' + currentItem + '</td><td>' + price + '</td><td>' + quantity + '</td></tr>';
                    itemList.push(currentItem);
                    $.session.set(countInfo, count);
                }
                itemList = JSON.stringify(itemList);
                $.session.set(itemListStr, itemList);
                $('#' + id + '-item-count').val(count);
                $('#' + id + '-added-items').val(itemList);
                fieldStr += '</tbody> </table>  ' +
                    '</div>' +
                    '</div>' +
                    '</div>';

            }
            fieldStr += '</div><!--/span-->';;

            $('#' + id + '-list-table tbody').on('click', 'tr', function() {
                if ($(this).hasClass('selected')) {
                    $(this).removeClass('selected');
                } else {
                    var table = $('#' + id + '-list-table').DataTable();
                    table.$('tr.selected').removeClass('selected');
                    $(this).addClass('selected');
                }
            });
            var countInfo = id + '_count';
            $.session.delete(countInfo);
            var itemListStr = id + '_item_list';
            $.session.delete(itemListStr);
        } else if (this.type === 'hidden') {
            fieldStr = '<input id="' + id + '" type="hidden" name="' + input_name + '" value="' + valueData + '" />';
        }
        this.html = fieldStr;
        return fieldStr;
    }
};


function FormElement(options) {
    function F() {};
    F.prototype = formElementPrototype;
    var f = new F;
    f.html = f.init(options);
    return f;
}


var formPrototype = {
    name: "",
    id: "",
    method: "",
    encType: "",
    dataType: "",
    type: "NEW",
    accessType: "view",
    action: "",
    class: "",
    nextPageUrl: "",
    allFields: new Array(),
    data: new Array(),
    dataCount: 0,
    html: "",
    elementList: new Array(),
    head: "",
    foot: "",
    headerStr: function() {
        var headerStr = '<form class="' + this.class + '" enctype="' + this.encType + '"  id ="' + this.id + '" name="' + this.name + '" method ="' + this.method + '" action="' + this.action + '" >' +
            '<fieldset><input id="is-form-data-valid" type="hidden" name="is_form_data_valid" value="NO"/> ';
        headerStr += '   <input type ="hidden"  id="form-type" name="' + this.dataType + '_type" value="' + this.type + '" />  <input id="data-item" type="hidden" name="data_item" value="' + replaceAll(this.dataType, '-', '_') + '"/>';
        return headerStr;
    },
    footerStr: function() {
        var footerStr = '';
        footerStr += '<br /><br /><div class="form-actions"><div id="submit-form-loader"  align="center" style="display:none;"> <img src="img/ajax-loaders/ajax-loader-7.gif" title="img/ajax-loaders/ajax-loader-7.gif"> ' +
            '<br />&nbsp;<br /> </div>';
        var elementString = JSON.stringify(this.elementList);
        $.session.set(this.id + '_form_elements', elementString);
        $.session.set(this.id + '_next_pages', this.nextPageUrl);
        // alert(this.accessType);
        if (this.accessType === 'edit' || this.type === 'NEW') {
            footerStr += '<div align="center" id="' + this.id + '-footer-section"><button type="submit" class="btn btn-primary" id="submit-bttn" onclick = "submitForm(\'' + this.id + '\',\'' + this.id + '_form_elements\')" >Save</button>' +
                '<span><a data-original-title="' + this.dataType + '" style="display:none" href="" class="btn btn-small btn-info" data-rel="popover" data-content="Go back to ' + this.dataType + ' page" id="' + this.dataType + '-table-bttn">' + this.dataType + ' </a> ' +
                '<button class="btn" id="cancel-bttn" type="reset">Clear</button> </div>';
        } else if (this.accessType === 'view') {
            footerStr += '<div align="center" id="' + this.id + '-footer-section">' + this.nextPageUrl + '</div>';
        }
        footerStr += '</div></fieldset></form></div>';
        return footerStr;
    },
    addElement: function(element) {
        this.elementList.push(element);
    },
    render: function() {
        this.html = this.headerStr();

        for (var index in this.elementList) {
            this.html += this.elementList[index].html;
        }
        this.html += this.footerStr();
        return this.html;
    }
};

function Form() {
    function F() {};
    F.prototype = formPrototype;
    var frm = new F();
    frm.elementList = new Array();
    var head = ''; //frm.headerStr();
    var foot = ''; //frm.footerStr();
    frm.html = ''; //frm.render();
    return frm;
}

function getForm(tagID, tableName, sourceUrl, mode, recordID, formDetails, elements) {

    var responseData = '';
    var paramString = 'reqTab=' + tableName + '&reqType=form&record_id=' + recordID; //+'&data_item='+formDetails.dataType;
    var formTarget = sourceUrl;
    var xmlhttp = null;
    var formSessionData = $.session.get(tableName);
    var formData = "";
    var resetFlag = 0;

    if (formDetails.type === 'NEW' && mode === 1) {

        var currentForm = new Form();
        currentForm.class = formDetails.class;
        currentForm.id = formDetails.id;
        currentForm.name = formDetails.name;
        currentForm.encType = formDetails.encType;
        currentForm.method = formDetails.method;
        currentForm.action = formDetails.action;
        currentForm.type = formDetails.type;
        currentForm.dataType = formDetails.dataType;
        currentForm.accessType = formDetails.accessType;
        currentForm.nextPageUrl = formDetails.nextPageUrl;


        var curElement = "";
        for (var index in elements) {
            curElement = elements[index].name.toUpperCase();
            if (currentForm.data[curElement]) {
                elements[index].value = currentForm.data[curElement].replace('null', '');
                elements[index].render(currentForm.data[curElement].replace('null', ''));

            } else {
                elements[index].value = '';
                elements[index].render('');
            }
            currentForm.addElement(elements[index]);
        }
        formData = currentForm.render();
        $('#' + tagID).html(formData);
        docReady();

    } else if ((formSessionData) !== null && resetFlag !== 1) {
        try {
            responseData = formSessionData;

            if (responseData.length === 3) {

                var currentForm = new Form();
                currentForm.class = formDetails.class;
                currentForm.id = formDetails.id;
                currentForm.name = formDetails.name;
                currentForm.encType = formDetails.encType;
                currentForm.method = formDetails.method;
                currentForm.action = formDetails.action;
                currentForm.type = formDetails.type;
                currentForm.dataType = formDetails.dataType;
                currentForm.accessType = formDetails.accessType;
                currentForm.nextPageUrl = formDetails.nextPageUrl;
                currentForm.allFields = responseData[0][0];
                currentForm.data = responseData[1] ? responseData[1][0] : null;
                currentForm.dataCount = responseData[2][0];

                for (var index in elements) {
                    if (elements[index].val) {
                        elements[index].value;
                        elements[index].render(elements[index].val.replace('null', ''));
                    } else {
                        elements[index].val = '';
                        elements[index].render('');
                    }
                    currentForm.addElement(elements[index]);
                }
                formData = currentForm.render();
                $('#' + tagID).html(formData);
                docReady();

            }
        } catch (e) {
            showMessageDialog('Error loading data from memory', e.stack + '<br /><br />' + xmlhttp.responseText);
        }



    } else {
        if (window.XMLHttpRequest) {
            xmlhttp = new XMLHttpRequest();
        } else {
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }

        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
                try {
                    $.session.set(tableName, xmlhttp.responseText);
                    responseData = JSON.parse(xmlhttp.responseText);

                    if (responseData.length === 3) {

                        var currentForm = new Form();
                        currentForm.class = formDetails.class;
                        currentForm.id = formDetails.id;
                        currentForm.name = formDetails.name;
                        currentForm.encType = formDetails.encType;
                        currentForm.method = formDetails.method;
                        currentForm.action = formDetails.action;
                        currentForm.type = formDetails.type;
                        currentForm.dataType = formDetails.dataType;
                        currentForm.accessType = formDetails.accessType;
                        currentForm.nextPageUrl = formDetails.nextPageUrl;
                        currentForm.allFields = responseData[0][0];
                        currentForm.data = responseData[1] ? responseData[1][0] : null;
                        currentForm.dataCount = responseData[2][0];

                        for (var index in elements) {
                            if (elements[index].val) {
                                elements[index].value;
                                elements[index].render(elements[index].val.replace('null', ''));
                            } else {
                                elements[index].val = '';
                                elements[index].render('');
                            }
                            currentForm.addElement(elements[index]);
                        }
                        formData = currentForm.render();
                        $('#' + tagID).html(formData);
                        docReady();

                    }
                } catch (e) {
                    showMessageDialog('Error Comminucating with Server', e.stack + '<br /><br />' + xmlhttp.responseText);
                }
            }

        };
        xmlhttp.open("POST", formTarget, true);
        xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xmlhttp.send(paramString);
    }
};
var tableContents = "";
if ($('#information-table-contents').length > 0) {
    tableContents = $('#information-table-contents').val();
    var excluded = new Array();
    excluded[0] = 'INDEX_NUM';
    excluded[1] = 'EDITABLE';
    var defaultSearchMode = 0;
}
/*if (tableContents === 'setting') getTable('data-presentation-span', 'table table-striped table-bordered bootstrap-datatable datatable dataTable no-footer', 'nst_settings', 'settings_table', 'functions/data_driver.php', excluded, defaultSearchMode);
if ($('#settings-form-span').length > 0) {

}
*/


$.fn.lockSession = function() {
    var paramString = '&lock_session=1';
    var formTarget = '/kayxlav';
    var response = null;
    var xmlhttp = null;
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    } else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xmlhttp.onreadystatechange = function() {

        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            response = xmlhttp.responseText;
            response.trim();
            if (response === 'Session Locked') {
                return true;

            }

        };

    };
    xmlhttp.open("POST", formTarget, true);
    xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xmlhttp.send(paramString);
    return false;
};
$.fn.formValidator = function(formId, elementsStr) {
    var fieldCounter = 0;
    var formField = '';
    var fieldName = '';
    var fieldType = '';
    var fieldSize = '';
    var fieldValidation = '';
    var validationMessage = '';
    var field = '';
    var value = '';
    var messageID = '';
    var nameOnly = '';
    var fieldDivStr = '';
    var formInputfieldDiv = '';
    var validationResponse = {};
    var formFields = JSON.parse($.session.get(elementsStr));
    var nextPageBttn = $.session.get(formId + '_next_pages');
    for (var field in formFields) {
        if (field) {
            formField = formFields[field];
            fieldName = formField.name;
            //   fieldType = formField.type;
            fieldValidation = formField.validation;
            validationMessage = '';
            // var fieldID =    formField.id; //  $('#'+formId+' input[name='+fieldName+']').attr('id'); 
            field = formField; // document.getElementById(fieldID);
            value = $('#' + formField.id).val();
            field.value = value;
            messageID = fieldName + '_message';
            nameOnly = fieldName.replace('_element', '').replace('_', ' ');
            nameOnly = nameOnly.replace('_', ' ');
            fieldDivStr = fieldName + '_div';
            formInputfieldDiv = document.getElementById(fieldDivStr);
            var isValid = false;
            switch (fieldValidation) {

                case 'alphanumeric':
                    if (value.length === 0) {
                        document.getElementById(messageID).innerHTML = "The " + nameOnly + " field should not be empty";
                        $("#" + messageID).show();
                        formInputfieldDiv.className = "control-group error";
                        validationMessage = '<li>The ' + nameOnly + ' field should not be empty</li>';
                    } else {
                        if (isAlphanumeric(field)) {
                            isValid = true;
                            $("#" + messageID).val('');
                            $("#" + messageID).hide();
                            formInputfieldDiv.className = "control-group";
                        } else {
                            document.getElementById(messageID).innerHTML = "The " + nameOnly + " field should be alphabets and numbers only";
                            $("#" + messageID).show();
                            formInputfieldDiv.className = "control-group error";
                            validationMessage = '<li>The ' + nameOnly + ' field should be alphabets and numbers only</li>';
                        }
                    }
                    break;
                case 'email':
                    if (value.length === 0) {
                        document.getElementById(messageID).innerHTML = "The " + nameOnly + " field should not be empty";
                        $("#" + messageID).show();
                        formInputfieldDiv.className = "control-group error";
                        validationMessage = '<li>The ' + nameOnly + ' field should not be empty</li>';
                    } else {
                        if (isValidEmail(field)) {
                            isValid = true;
                            $("#" + messageID).val('');
                            $("#" + messageID).hide();
                            formInputfieldDiv.className = "control-group";
                        } else {
                            document.getElementById(messageID).innerHTML = "The " + nameOnly + " field  does not cotains valid email addresses";
                            $("#" + messageID).show();
                            formInputfieldDiv.className = "control-group error";
                            validationMessage = '<li>The  ' + nameOnly + ' field  does not cotains valid email addresses</li>';
                        }
                    }
                    break;
                case 'numeric':
                    if (value.length === 0) {
                        document.getElementById(messageID).innerHTML = "The " + nameOnly + " field should not be empty";
                        $("#" + messageID).show();
                        formInputfieldDiv.className = "control-group error";
                        validationMessage = '<li>The ' + nameOnly + ' field should not be empty</li>';
                    } else {
                        if (isNumeric(field)) {
                            isValid = true;
                            $("#" + messageID).val('');
                            $("#" + messageID).hide();
                            formInputfieldDiv.className = "control-group";
                        } else {
                            document.getElementById(messageID).innerHTML = "The " + nameOnly + " field should be numbers only";
                            $("#" + messageID).show();
                            formInputfieldDiv.className = "control-group error";
                            validationMessage = '<li>The  ' + nameOnly + ' field should be numbers only</li>';
                        }
                    }
                    break;
                case 'alphanumspecial':

                    if (value.length === 0) {
                        document.getElementById(messageID).innerHTML = "The " + nameOnly + " field should not be empty";
                        $("#" + messageID).show();
                        formInputfieldDiv.className = "control-group error";
                        validationMessage = '<li>The ' + nameOnly + ' field should not be empty</li>';
                    } else {
                        if (isAlphanumSpecial(field)) {
                            isValid = true;
                            $("#" + messageID).val('');
                            $("#" + messageID).hide();
                            formInputfieldDiv.className = "control-group";
                        } else {
                            document.getElementById(messageID).innerHTML = "The " + nameOnly + " field should consist of alphabets, numbers and special characters only";
                            $("#" + messageID).show();
                            formInputfieldDiv.className = "control-group error";
                            validationMessage = '<li>The  ' + nameOnly + ' field should be alphabets only</li>';
                        }
                    }
                    break;
                case 'password':
                    var minPasswordLen = 8;
                    if (value.length === 0) {
                        document.getElementById(messageID).innerHTML = 'This field is required';
                        $("#" + messageID).show();
                        formInputfieldDiv.className = "control-group error";
                        validationMessage = '<li>The Password field is required</li>';
                        var confirmFieldValidationMessage = '';
                    } else {
                        $("#" + messageID).hide();
                        formInputfieldDiv.className = "control-group";

                    }
                    var confirmFieldPrefix = '';
                    if (fieldName === 'password_element') {
                        confirmFieldPrefix = 'confirm_';
                    } else if (fieldName === 'password_element') {
                        confirmFieldPrefix = '';
                    }
                    //   var confirmField =     $('#confirm_password_id');  
                    var confirmValue = $('#confirm_password_id').val();
                    var confirmMessageID = confirmFieldPrefix + fieldName.replace('element', 'message');
                    //var confirmNameOnly =  confirmFieldPrefix+fieldName.replace('element', '').replace('_',' ');
                    var confirmFieldDivStr = confirmFieldPrefix + fieldName.replace('element', 'div');
                    var confirmFormInputfieldDiv = document.getElementById('confirm_password_div');

                    if (confirmValue && confirmValue.length === 0) {
                        $("#" + confirmMessageID).show();
                        document.getElementById(confirmMessageID).innerHTML = 'Please type the confirmation password';
                        confirmFormInputfieldDiv.className = "control-group error";
                        confirmFieldValidationMessage = '<li>Password confirmation is required</li>';
                    } else {
                        $("#" + confirmMessageID).hide();
                        confirmFormInputfieldDiv.className = "control-group";
                    }
                    if (value.length > 0 && confirmValue.length > 0) {
                        if ((confirmValue === value) && (value.length >= minPasswordLen)) {
                            if (isValidPass(field)) {
                                isValid = true;
                                $("#" + messageID).hide();
                                formInputfieldDiv.className = "control-group success";
                                $("#" + confirmMessageID).hide();
                                confirmFormInputfieldDiv.className = "control-group success";
                            } else {
                                $("#" + messageID).show();
                                document.getElementById("#" + messageID).innerHTML = 'Password is invalid';
                                formInputfieldDiv.className = "control-group error";
                                validationMessage = '<li>Password field is not valid</li>';
                                $("#" + confirmMessageID).show();
                                document.getElementById(confirmMessageID).innerHTML = 'Password is invalid';
                                confirmFormInputfieldDiv.className = "control-group error";
                                validationMessage = '<li>Confirmation Password field is not valid</li>';

                            }

                        } else if (confirmValue !== value) {

                            $("#" + messageID).show();
                            document.getElementById(messageID).innerHTML = 'Password mismatch';
                            formInputfieldDiv.className = "control-group error";
                            validationMessage = '<li>Password mismatch</li>';

                            $("#" + confirmMessageID).show();
                            document.getElementById(confirmMessageID).innerHTML = 'Password mismatch';
                            confirmFormInputfieldDiv.className = "control-group error";
                            confirmFieldValidationMessage = '<li>Confirmation Password mismatch</li>';

                        } else if ((confirmValue === value) && (value.length < minPasswordLen)) {

                            $("#" + messageID).show();
                            document.getElementById(messageID).innerHTML = 'Password is too short';
                            formInputfieldDiv.className = "control-group error";
                            $('.password-new-input').hide();
                            $('#email-profiles-form input[name=' + fieldName + '_alt]').attr('value', '' + value);
                            $('#email-profiles-form input[name=' + fieldName + ']').attr('value', null);
                            $('.password-invalid-input1').show();
                            $('.password-invalid-input2').show();
                            document.getElementById("password_message").innerHTML = 'Password is too short';
                            validationMessage = '<li> Password is too short</li>';

                            $("#" + confirmMessageID).show();
                            document.getElementById(confirmMessageID).innerHTML = 'Password is too short';
                            confirmFormInputfieldDiv.className = "control-group error";
                            confirmFieldValidationMessage = '<li> Confirmation Password is too short</li>';

                        }
                    }

                    break;

                case 'alpha':
                    if (value.length === 0) {
                        document.getElementById(messageID).innerHTML = "The " + nameOnly + " field should not be empty";
                        $("#" + messageID).show();
                        formInputfieldDiv.className = "control-group error";
                        validationMessage = '<li>The ' + nameOnly + ' field should not be empty</li>';
                    } else {
                        if (isAlphabetic(field)) {
                            isValid = true;
                            $("#" + messageID).val('');
                            $("#" + messageID).hide();
                            formInputfieldDiv.className = "control-group";
                        } else {
                            document.getElementById(messageID).innerHTML = "The " + nameOnly + " field should be alphabets only";
                            $("#" + messageID).show();
                            formInputfieldDiv.className = "control-group error";
                            validationMessage = '<li>The  ' + nameOnly + ' field should be alphabets only</li>';
                        }
                    }
                    break;
                case 'phone':

                    if (value.length === 0) {
                        document.getElementById(messageID).innerHTML = "The " + nameOnly + " field should not be empty";
                        $("#" + messageID).show();
                        formInputfieldDiv.className = "control-group error";
                        validationMessage = '<li>The ' + nameOnly + ' field should not be empty</li>';
                    } else {
                        if (isValidPhoneNumber(field)) {
                            isValid = true;
                            $("#" + messageID).val('');
                            $("#" + messageID).hide();
                            formInputfieldDiv.className = "control-group";
                        } else {
                            document.getElementById(messageID).innerHTML = "The " + nameOnly + " field should consist of valid phone numbers only";
                            $("#" + messageID).show();
                            formInputfieldDiv.className = "control-group error";
                            validationMessage = '<li>The  ' + nameOnly + ' field should consist of  valid phone numbers only</li>';
                        }
                    }
                    break;
                case 'date':

                    if (value.length === 0) {
                        document.getElementById(messageID).innerHTML = "The " + nameOnly + " field should not be empty";
                        $("#" + messageID).show();
                        formInputfieldDiv.className = "control-group error";
                        validationMessage = '<li>The ' + nameOnly + ' field should not be empty</li>';
                    } else {
                        if (isValidDate(field)) {
                            isValid = true;
                            $("#" + messageID).val('');
                            $("#" + messageID).hide();
                            formInputfieldDiv.className = "control-group";
                        } else {
                            document.getElementById(messageID).innerHTML = "The " + nameOnly + " field should consist of date input only";
                            $("#" + messageID).show();
                            formInputfieldDiv.className = "control-group error";
                            validationMessage = '<li>The  ' + nameOnly + ' field should consist of date input  only</li>';
                        }
                    }
                case 'nocheck':
                    isValid = true;
                    break;
            }

            validationResponse[fieldCounter] = {
                fieldName: fieldName,
                valid: isValid,
                message: validationMessage
            };
            ++fieldCounter;
        }
    }

    var formTarget = $('#' + formId).attr('action');
    showValidationReport(formId, validationResponse, formTarget, nextPageBttn);
};

function showValidationReport(formId, validationResponses, formTarget, nextPageBttn) {
    var invalidFields = '<div><strong> Please verify the following input details:</strong> </div><br />';
    invalidFields += '<div align="left"><ol>';
    var isFormValid = {};
    var eleCounter = 0;

    for (var reponseInd in validationResponses) {
        var name = validationResponses[reponseInd].fieldName;
        var message = validationResponses[reponseInd].message;
        var isValid = validationResponses[reponseInd].valid;
        invalidFields += message;

        if (!isValid) {
            isFormValid[eleCounter] = false;

        } else {
            isFormValid[eleCounter] = true;

        }
        ++eleCounter;
    }
    var shouldProceed = true;
    for (var i in isFormValid) {

        if (!isFormValid[i]) {
            shouldProceed = false;
            break;
        }
    }
    if (!shouldProceed) {
        invalidFields += '</ol></div>';
        document.getElementById('dialog-header-span').innerHTML = '<img src="img/unna_medium.png" alt="Unna logo" /> <span align="center" style="font-weight:bold; font-size:20px;">New ' + $.fn.splitnCapitalizeFirstLetter(formId, '-') + ' Check</span>';
        document.getElementById('dialog-message-div').innerHTML = invalidFields;
        event.preventDefault();
        $('#dialog-ok-bttn').hide();
        $('#myModal').modal('show');
        $('#dialog-close-bttn').show();
        $('#submit-form-loader').hide();
    } else {
        event.preventDefault();

        $('#is-form-data-valid').val('YES');
        var paramString = '';
        $('#' + formId).find('input,text,select,textarea').each(function() {
            paramString += '&' + $(this).attr('name') + '=' + $(this).val();
        });
        var formFields = JSON.parse($.session.get(formId + '_form_elements'));
        var fieldName = "";
        var fieldValue = "";
        for (var field in formFields) {
            field = formFields[field];

            if (field) {
                fieldName = field.name;
                var fieldID = field.id; //  $('#'+formId+' input[name='+fieldName+']').attr('id'); 
                fieldValue = $('#' + fieldID).val();
                if (paramString.indexOf('&' + fieldName.toLowerCase() + '_element') < 0) paramString += '&' + fieldName + '=' + fieldValue;
            }
        }
        $('#cancel-bttn').hide();
        ajaxFormSubmit(formTarget, paramString, nextPageBttn);
    }
    //var page_url =window.location.href;
};

function header(className, id, columns, tableData, tDataCount) {
    var headerString = '<table class="' + className + '" id ="' + id + '"><thead> <tr> <th><label class="checkbox inline"><input type="hidden" name="is_checked" id="is-checked" value="unchecked" />' +
        '<input type="hidden" name="change_index" id="change-index" value="0" /><input type="hidden" name="total_items" id="total-items"' +
        'value="' + tDataCount + '" /></label></th>';
    for (var column in this.columns) {
        column = column.toUpperCase();
        column = column.replace('_', ' ');
        headerString += '<th>' + column + '</th>';
    }
    headerString += '<th style="min-width:100px;" align="center"> Actions</th></thead> </tr>'
    return headerString;
};

function body(columns, tableData) {
    var tColumns = columns;
    var tData = tableData;
    var bodyStr = '<tbody>';
    var searchStr = '';
    for (var i = 0; i < tData.length; i++) {
        searchStr = tData[i].join(' ');
        bodyStr += '<tr><td><label class="checkbox inline"> <div id="uniform-inlineCheckbox' + i + '" class="checker"><span id="checkbox-span-' + i + '">' +
            '<input  onchange="$.fn.showExtraOptions()" style="opacity: 0;" id="item-check-' + i + '" name="history-check-' + i + '" value="' + tData[i][0] + ',' + i + '"' +
            'type="checkbox" /></span></div></label></td>';
        bodyStr += '<td>' + tData[i][0] + '<span style="display:none">' + searchStr + '</span></td>';
        for (var column in tColumns) {
            bodyStr += '<td>' + tData[i][column] + '</td>';
        }
        bodyStr += ' <td class="center" > <div align="center"><a class="btn btn-success" href="#" onclick="$.fn.viewEntry(\'' + tData.length + '\')">' +
            '<i class="icon-zoom-in icon-white"></i> View</a></div></td><a class="btn btn-danger" href="#" ' +
            ' onclick="$.fn.deleteEntry(\'' + tData[i][1] + '\',\'' + tData[i][1] + '\',' + i + ')"><i class="icon-trash icon-white"></i>Delete</a></tr>';
    }
    bodyStr += '</tbody></table>';
    return bodyStr;
};

function fetch(tableName, tableUrl) {
    var responseData = "";
    $.ajax({
        type: "POST",
        url: tableUrl,
        data: 'req=' + tableName,
        async: true,
        dataType: 'json',
        success: function(data) {

            if (data.length === 3) {
                this.columns = data[0];
                this.dataCount = data[1];
                this.tableData = data[2];
                responseData = { 0: data[0], 1: data[1], 2: data[2] };
                var tableSessionData = JSON.stringify(responseData);

                $.session.set(tableName, tableSessionData);
                setTableData(JSON.parse(tableSessionData));


            }

        },
        "error": function(response) {
            showMessageDialog('Error fetching data:', response['responseText']);
            console.dir(response);

        }

    });


};

function drawTable() {
    if (this.tableData.length < 50000) {

        $('#' + this.id).dataTable({
            "responsive": true,
            "destroy": true,
            "scrollX": true,
            "data": this.tableData,
            "columns": this.columns,
            "processing": false,
            "serverSide": false,
            "info": this.info,
            "scrollCollapse": this.scrollCollapse,
            "ordering": this.ordering,
            "order": this.order,
            "paging": this.paging,
            "AutoWidth": this.AutoWidth,
            "searching": this.searching,
            "stateSave": this.stateSave,
            "language": {
                "emptyTable": "No data available in table"
            }
        });

    } else {

        $('#' + this.id).dataTable({
            "processing": true,
            "serverSide": true,
            "responsive": true,
            "destroy": true,
            "scrollX": true,
            "language": {
                "emptyTable": "No data available in table"
            },
            "ajax": {
                url: this.url,
                type: 'POST',
                dataType: 'json',
                data: 'req=' + this.tableName
            },

            "columns": this.columns,
            "deferRender": true,
            "error": function(response) {
                console.dir(response);
                showDialog('Error fetching  data:', response.responseText);

            }

        });;


    }
}

function drawContents(currentItem, parentPage, currentPage, presentationData, callback) {
    var contentStr = '<div id=""></div>';
    var breadcrumb = '<nav aria-label="breadcrumb"><ol class="breadcrumb"><li class="breadcrumb-item"><a href="#">' + parentPage + '</a></li><li class="breadcrumb-item active"><a href="#">' + currentPage + '</a></li></ol></nav>';
    $('#breadcrumb-section').html(breadcrumb);
    $('#data-section').fadeIn("fast").html(contentStr);
    callback();
}

function navigateToPage(pageId) {
    var pageStr = splitnCapitalizeFirstLetter(pageId, '-');

    $("#page-title").html(pageStr);
    var tableClass = '';
    var content = '';
    var parentPage = '';
    var currentPage = '';
    var currentItem = '';
    var tableID = '';
    var presentData = '';

    switch (pageId) {

        case 'tasks':
            tableClass = 'table table-striped table-sm';
            content = '<div class="table-responsive"></div>';
            $('#current-item').val("tasks");
            event.preventDefault();
            parentPage = 'Tasks';
            currentPage = 'Task Details';
            currentItem = pageStr;
            tableID = pageId + '-table';
            presentData = '<table id="' + tableID + '"></table>';
            drawContents(currentItem, parentPage, currentPage, presentData, function() {
                $('#data-section').ready(function() {
                    tableContents = $('#' + tableID).val();
                    var defaultSearchMode = 0;
                    var opts = {
                        isViewable: true,
                        isEditable: true,
                        isIndelible: false
                    };
                    var tableInfo = 'tasks&';
                    var excluded = '';
                    var tempUrl = $.session.get("data-server") ? $.session.get("data-server") : $('#data-server').val();
                    if (!$.session.get("data-server")) {
                        $.session.set("data-server", tempUrl);
                    }
                    var tableUrl = tempUrl + '/fetch';

                    getTable('Tasks', 'data-section', tableClass, tableInfo, tableID, tableUrl, excluded, defaultSearchMode, opts);
                    $('#loading').hide();

                });


            });

            break;
        case 'requests':
            tableClass = 'table table-striped table-sm';
            content = '<div class="table-responsive"></div>';
            $('#current-item').val("requests");
            event.preventDefault();
            parentPage = 'Requests';
            currentPage = 'Request Details';
            currentItem = pageStr;
            tableID = pageId + '-table';
            presentData = '<table id="' + tableID + '"></table>';
            drawContents(currentItem, parentPage, currentPage, presentData, function() {
                $('#data-section').ready(function() {
                    tableContents = $('#' + tableID).val();
                    var defaultSearchMode = 0;
                    var opts = {
                        isViewable: true,
                        isEditable: true,
                        isIndelible: false
                    };
                    var tableInfo = 'requests&';
                    var excluded = '';
                    var tempUrl = $.session.get("data-server") ? $.session.get("data-server") : $('#data-server').val();
                    if (!$.session.get("data-server")) {
                        $.session.set("data-server", tempUrl);
                    }
                    var tableUrl = tempUrl + '/fetch';

                    showMessageDialog('Server URL', tableUrl);
                    getTable('Tasks', 'data-section', tableClass, tableInfo, tableID, tableUrl, excluded, defaultSearchMode, opts);
                    $('#loading').hide();

                });


            });

            break;
        case 'servers':
            break;
        case 'databases':
            break;
        case 'scripts':
            break;
        case 'jobs':
            break;
        case 'backup-files':
            break;


    }
}