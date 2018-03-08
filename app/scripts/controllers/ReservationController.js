angular.module('foodiebuddyApp')
    .controller('ReservationCtrl', ['GlobalService',
        function (ReservationService) {
            'use strict';
            var vm = this;
            var ctrl = 'reservations/'

            vm.IsNewRecord = 1; //The flag for the new record

            // Get all records
            vm.getReservations = function () {
                var reservation = ReservationService.getAll(ctrl);
                reservation.then(function (response) {
                    vm.reservations = response.data;
                },
                    function (error) {
                        console.log('Error: ' + error);
                    });
            };
            vm.getReservations();

            // Save record
            vm.save = function () {
                var Reservation = {
                    reservationId: vm.reservationId,
                    reservationDate: vm.reservationDate,
                    reservationTime: vm.reservationTime,
                    partySize: vm.partySize
                };
                //if IsNewRecord equals to 1, it is a new record
                if (vm.IsNewRecord === 1) {
                    var postRecord = ReservationService.post(Reservation, ctrl);
                    postRecord.then(function (response) {
                        vm.reservationId = response.data.reservationId;
                        vm.getReservations();
                        $('#myModal').modal('hide');
                    }, function (error) {
                        console.log('error: ' + error);
                    });
                } else { //else edit record
                    var putRecord = ReservationService.put(Reservation, ctrl);
                    putRecord.then(function(response){
                        console.log('putrecord here' + response);
                        vm.Message = "Updated Successfully";
                        vm.getReservations();
                        $('#myModal').modal('hide');
                    },function(error){
                        console.log('Error: ' + error);
                    });
                }
            };

            // Delete record
            vm.delete = function(){
                var deleteRecord = ReservationService.delete(vm.reservationId, ctrl);
                deleteRecord.then(function(response){
                    var res = response.data;
                    vm.Message="Deleted Successfully";
                    vm.getReservations();
                }, function(error){
                    console.log('Error: ' + error);
                });
            };

            // Get a specific record based on reservationId
            vm.getData = function(Reservation){
                var getReservation = ReservationService.getRecord(Reservation.reservationId, ctrl);
                getReservation.then(function(response){
                    var res = response.data;
                    vm.reservationId = res[0].reservationId;
                    vm.reservationDate = new Date(res[0].reservationDate);
                    vm.reservationTime = res[0].reservationTime;
                    vm.partySize = res[0].partySize;
                    vm.IsNewRecord = 0;
                    $('#myModal').modal('show');
                }, function(error){
                    console.log('Fail loading reservation: ' + error);
                });
            };

            // Clear the Scope Models
            vm.clearData = function() {
                vm.reservationId = null;
                vm.reservationDate = null;
                vm.reservationTime = null;
                vm.partySize = null;
            };

            vm.addNew = function(){
                vm.IsNewRecord = 1;
            };

        }]);