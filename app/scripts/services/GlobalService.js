angular.module('foodiebuddyApp')
    .service('GlobalService', function ($http) {
        'use strict';
        var apiUrl = 'http://localhost:61283/api/';

        // for GET
        this.getAll = function (apiCtrl) {
            return $http.get(apiUrl + apiCtrl);
        };

        // Get single record
        this.getRecord = function(reservationId, apiCtrl){
            return $http.get(apiUrl + apiCtrl + '?id=' + reservationId);
        };

        // Post record
        this.post = function(Reservation, apiCtrl){
            var request = $http({
                method: 'POST',
                url: apiUrl + apiCtrl,
                data: Reservation
            });
            return request;
        };

        // Update record
        this.put = function(Reservation, apiCtrl){
            var request = $http({
                method: 'PUT',
                url: apiUrl + apiCtrl + '?id=' + Reservation.reservationId,
                data: Reservation
            });
            return request;
        };

        // Delete record
        this.delete = function(id, apiCtrl){
            var request = $http({
                method: 'DELETE',
                url: apiUrl + apiCtrl + '?id=' + id
            });
            return request;
        };

    });