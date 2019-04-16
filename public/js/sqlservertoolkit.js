$(document).ready(function() {
    var reportToggleButton = document.querySelector("#toggle-user-list");
    reportToggleButton.addEventListener('click', function(e) {

        e.preventDefault();

        //  $.fn.showMessageDialog('testing', this["data-feather"]);
        var nodeIsOpen = reportToggleButton.innerHTML == '<span data-feather="minus-circle"></span>';
        if (nodeIsOpen) {
            var reportList = document.querySelector("#user-list");
            $("#user-list").toggle();
            $("#user-minus").toggle();
            $("#user-plus").toggle();

        } else {
            $("#user-list").toggle();
            $("#user-minus").toggle();
            $("#user-plus").toggle();
        }
        //  showMessageDialog('testing', reportToggleButton.innerHTML);
        //alert(reportToggleButton["data-feather"]);

    });

    var configToggleButton = document.querySelector("#toggle-config-list");
    configToggleButton.addEventListener('click', function(e) {

        e.preventDefault();

        //  $.fn.showMessageDialog('testing', this["data-feather"]);
        var nodeIsOpen = configToggleButton.innerHTML == '<span data-feather="minus-circle"></span>';
        if (nodeIsOpen) {
            var configList = document.querySelector("#config-list");
            $("#config-list").toggle();
            $("#config-minus").toggle();
            $("#config-plus").toggle();

        } else {
            $("#config-list").toggle();
            $("#config-minus").toggle();
            $("#config-plus").toggle();
        }
        //  showMessageDialog('testing', configToggleButton.innerHTML);
        //alert(configToggleButton["data-feather"]);

    });
    var auditToggleButton = document.querySelector("#toggle-audit-list");
    auditToggleButton.addEventListener('click', function(e) {

        e.preventDefault();


        var nodeIsOpen = auditToggleButton.innerHTML == '<span data-feather="minus-circle"></span>';
        if (nodeIsOpen) {
            var auditList = document.querySelector("#audit-list");
            $("#audit-list").toggle();
            $("#audit-minus").toggle();
            $("#audit-plus").toggle();

        } else {
            $("#audit-list").toggle();
            $("#audit-minus").toggle();
            $("#audit-plus").toggle();
        }

    });

    /***
     * 
     *  Navigation Section
     */

    $(".nav-link").click(function(e) {

        var element = e.target;
        var isDashboardNav = element.id.indexOf("-nav") > 0;

        if (!isDashboardNav) {

            $(".nav-link").each(function() {

                $(this).removeClass("active");



            });
            element.classList.add("active");
            navigateToPage(element.id);

        }


    });
});