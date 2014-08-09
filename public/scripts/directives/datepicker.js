app.directive('datepicker', function () {
    return {
        restrict: 'A',
        link: function ($scope, $elem, attrs) {
            $elem.datepicker({
                startView: 2,
                autoclose: true,
                startDate: "01/01/1900",
    			endDate: "today",
                language: 'en'
            });
        }
    }
});