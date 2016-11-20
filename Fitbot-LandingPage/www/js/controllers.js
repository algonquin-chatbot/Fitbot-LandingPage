angular.module('starter.controllers', [])

.controller('LandingPageCtrl', function($scope, $ionicScrollDelegate, $http, $ionicModal, $sce){


        // Data to send
        $scope.data = {}

        // Content for chat
        $scope.messages = []
        $scope.modalMessages = []

        $scope.playVideo = 'false'

        $scope.sendMessage = function() {
                var text = $scope.data.message
                var date = new Date()
                date = date.toLocaleTimeString().replace(/:d+ /, ' ')

                var query = text.split(' ').join('%20')

                // TODO: Create a factory class
                $http.get("https://api.api.ai/api/query?v=20150910&query=" + query + "&lang=en&sessionId=2e5f4610-25b7-4df6-a32f-8a7d2c448bee&timezone=America/New_York", {
                        headers: {
                            //This is the id from api.ai
                            'Authorization': 'Bearer 0545cf34c52d4f83bc34d8e737b2662b'
                        }
                })

                .success(function (data) {
                        console.log(data.result.fulfillment.speech);
                        var i = 0;
                        console.log("https://api.api.ai/api/query?v=20150910&query=%20" + query + "&lang=en&sessionId=2e5f4610-25b7-4df6-a32f-8a7d2c448bee&timezone=America/New_York");
                        if (data.result.fulfillment.speech != "") {
                            $scope.rep = data.result.fulfillment.speech;
                        } else {
                            $scope.rep = "I do not know the answer to your question";
                        }

                        // $scope.mess.push({id: 1, reply: data.result.fulfillment.speech});
                        // console.log($scope.mess[i].reply);
                        console.log(data.result.action);
                        if (data.result.action == "getExercise") {

                                console.log(data.result.fulfillment.data);

                                if (typeof data.result.fulfillment.data === "undefined"){
                                        $scope.messages.push({
                                                userId: '12345',
                                                text: "FitBot: " + $scope.rep
                                        })
                                } else {
                                            $scope.messages.push({
                                                userId: '12345',
                                                text: $scope.rep,
                                                action: data.result.action,
                                                exerciseName: data.result.fulfillment.data.exerciseName,
                                                primaryMusclesTargeted: data.result.fulfillment.data.primaryMusclesTargeted,
                                                recommendedEquipment: data.result.fulfillment.data.recommendedEquipment,
                                                video: data.result.fulfillment.data.video,
                                                data: data.result.fulfillment.data
                                            });

                                            console.log(data.result.fulfillment.data);
                                            console.log(data.result.fulfillment.data.exerciseName);
                                }

                        } else {
                            $scope.messages.push({
                                userId: '12345',
                                text: "FitBot: " + $scope.rep,
                                data: "",
                                time: date
                            });
                        }



                })

                .error(function (error) {
                        console.log(error);
                })

                // Push the data chat
                if (validate(text)){
                        $scope.messages.push({
                                text: text,
                                time: date
                        })
                }

                $scope.playVideo = 'false'

                // Clear the message and scroll to the bottom
                delete $scope.data.message;
                $ionicScrollDelegate.scrollBottom(true);

        }

        $scope.trustSrc = function(src) {
             return $sce.trustAsResourceUrl(src);
        }

        $scope.showVideo = function(video) {
                $scope.playVideo = 'true'
                $scope.videoFormatted = video.split('/watch?v=').join('/embed/');
        }

        var validate = function(input){
                return !!input.length
        }
})


.controller('MobileAppCtrl', function(){

})
