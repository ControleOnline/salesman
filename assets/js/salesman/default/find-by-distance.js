define('salesman-default-find-by-distance', ['jquery', 'core'], function (jQuery, core) {
    var distance = {};
    distance.init = function () {
        var address_search = jQuery('[data-gmaps="gmaps-autocomplete"]');
        if (address_search.length > 0) {
            requirejs(['core', 'GMaps', 'gjsapi'], function (core, GMaps) {
                if (GMaps) {
                    GMaps.init.autocomplete(core.gkey, distance.find_by_distance);
                }
            });
        }
    };
    distance.find_by_distance = function (result) {
        jQuery("*").removeAttr('data-clicked');
        jQuery('[data-gmaps="gmaps-autocomplete"]').attr("data-clicked", true);
        jQuery.ajax({
            url: core.domain + window.location.pathname + '.json',
            data: {
                lat: result.lat(),
                lng: result.lng()
            },
            method: 'POST',
            dataType: 'json'
        });
    };

    return distance;
});
