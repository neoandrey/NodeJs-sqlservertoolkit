$(function() {

    $('#side-menu').metisMenu();

});

//Loads the correct sidebar on window load,
//collapses the sidebar on window resize.
// Sets the min-height of #page-wrapper to window size
$(function() {
    $(window).bind("load resize", function() {
        topOffset = 50;
        width = (this.window.innerWidth > 0) ? this.window.innerWidth : this.screen.width;
        if (width < 768) {
            $('div.navbar-collapse').addClass('collapse');
            topOffset = 100; // 2-row-menu
        } else {
            $('div.navbar-collapse').removeClass('collapse');
        }

        height = ((this.window.innerHeight > 0) ? this.window.innerHeight : this.screen.height) - 1;
        height = height - topOffset;
        if (height < 1) height = 1;
        if (height > topOffset) {
            $("#page-wrapper").css("min-height", (height) + "px");
        }
    });

    var url = window.location;
    var element = $('ul.nav a').filter(function() {
        return this.href == url || url.href.indexOf(this.href) == 0;
    }).addClass('active').parent().parent().addClass('in').parent();
    if (element.is('li')) {
        element.addClass('active');
    }
});

$.fn.closeDialog = function () {
    $('#myModal').modal('hide');
};

$.fn.confirmDialog = function (mode) {
    $('#myModal').modal(mode);
    var isConfirmedField = document.getElementById('is-confirmed');
    if (isConfirmedField.value === '1') return true;
    else if (isConfirmedField.value === '0') return false;
};
$('#upload-file').click(function (e) {
    $('#client-upload').click();


});

$.fn.showDialog = function (header) {
    var logo = $('#site-logo').val();
    logo = '<span ><img src="' + logo + '" alt="KayXlav Communications  Logo" /> <span>';
    header = (header !== '' || header !== null) ? ('<table><tr><td align="left">' + logo + '</td><td>' + header + '</td></tr></table>') : '<div align="center">' + logo + ' KayXlav Communications</div>';
    $('#dialog-header-span').html(header);
    $('#dialog-header-span').css('text-align', 'center');
    $('#myModal').modal('show');
};
$.fn.showMessageDialog = function (header, message) {
    var logo = $('#site-logo').val();
    logo = '<img src="' + logo + '" alt="KayXlav Communications  Logo" />';
    header = (header !== '' || header !== null) ? ('<table><tr><td align="left">' + logo + '</td><td>' + header + '</td></tr></table>') : '<div align="center">' + logo + ' KayXlav Communications </div>';
    document.getElementById('dialog-header-span').innerHTML = header;
    document.getElementById('dialog-message-div').innerHTML = message;
    $('#dialog-message-div').css('float', 'center');
    $('#dialog-message-div').css('text-align', 'center');
    $('#myModal').modal('show');
};
$.fn.setLoadingDialog = function () {
    document.getElementById('dialog-message-div').innerHTML = '<div align="center"><img src="/images/ajax-loaders/ajax-loader-7.gif" title="/images/ajax-loaders/ajax-loader-7.gif"></div>';
    $('#dialog-no-bttn').hide();
    $('#dialog-yes-bttn').hide();
    $('#dialog-ok-bttn').hide();
    $('#dialog-close-bttn').hide();
};
            var statusPanel = {
                name:           "",
                type:           "",
                itemCount:      "",
                text:           "",
                icon:           "",
                footerMessage:  "",
                action:      function (){
                            return  alert('Not yet implemented');
                },
                statusHtml: function () {

                return '<div class="col-lg-3 col-md-6">' +
                        '<div class="panel panel-' + this.type + '">' +
                        '<div class="panel-heading">' +
                        '<div class="row">' +
                        '<div class="col-xs-3">' +
                        '<i class="fa fa-' + this.icon + ' fa-5x"></i>' +
                        '</div>' +
                        '<div class="col-xs-9 text-right">' +
                        '<div class="huge">' + this.itemCount + '</div>' +
                        '<div>' + this.text + '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '<a href="#" id="'+this.name+'-id" onclick="'+this.action+'">' +
                        '<div class="panel-footer">' +
                        '<span class="pull-left">View Details</span>' +
                        '<span class="pull-right"><i class="fa fa-arrow-circle-right"></i></span>' +
                        '<div class="clearfix"></div>' +
                        '</div>' +
                        '</a>' +
                        '</div>' +
                        '</div>';
                }
            }

            $('.navbar-brand').html('KayXlav Communications');
            $('.navbar-brand').attr('href', 'dashboard');
            $('#web-url').attr('href', 'home');
             $.fn.testPost = function (e) {
                 event.preventDefault();

                $.post("/kayxlav", { "reqType": 'misc', "dataType": 'purchase'})
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