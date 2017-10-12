'use strict';
AngApp_exercises
    .controller('ExercisesIndexCtrl', ['$scope', '$http', 'exercisesServices',
    function($scope,$http,exercisesServices) {
        exercisesServices.getExercises().then(function(data){
            $scope.exercises = data.data;
            $scope.exercises = $scope.exercises.map(function (exercise) {
                if (exercise.exercise_images) {
                    exercise.exercise_images = exercise.exercise_images.split(';');
                }
                return exercise;
            });
        });
        $scope.deleteExercise = function(exerciseID) {
            if(confirm("Вы уверены, что хотите удалить занятие: " + exerciseID)==true && exerciseID>0){
                exercisesServices.deleteExercise(exerciseID);
            }
        };
    }])
    .controller('ExerciseGetCtrl', ['$scope','$http', 'exercisesServices','$location','exercises',
        function($scope,$http,exercisesServices,$location,exercises) {
            var original = exercises.data;
            $scope.exercise = angular.copy(original.data);
            if($scope.exercise.exercise_images) {
              $scope.exercise.exercise_images = $scope.exercise.exercise_images.split(';');
              //slider
              $scope.myInterval = 5000;
              $scope.noWrapSlides = false;
              $scope.active = 0;
              var slides = $scope.slides = [];
              var currIndex = 0;

              $scope.addSlide = function(i) {
                var newWidth = 600 + slides.length + 1;
                slides.push({
                  image: "./uploads/" + $scope.exercise.exercise_images[i],
                  id: currIndex++
                });
              };

              $scope.randomize = function() {
                var indexes = generateIndexesArray();
                assignNewIndexesToSlides(indexes);
              };

              for (var i = 0; i < $scope.exercise.exercise_images.length; i++) {
                $scope.addSlide(i);
              }

              // Randomize logic below

              function assignNewIndexesToSlides(indexes) {
                for (var i = 0, l = slides.length; i < l; i++) {
                  slides[i].id = indexes.pop();
                }
              }

              function generateIndexesArray() {
                var indexes = [];
                for (var i = 0; i < currIndex; ++i) {
                  indexes[i] = i;
                }
                return shuffle(indexes);
              }

              function shuffle(array) {
                var tmp, current, top = array.length;

                if (top) {
                  while (--top) {
                    current = Math.floor(Math.random() * (top + 1));
                    tmp = array[current];
                    array[current] = array[top];
                    array[top] = tmp;
                  }
                }

                return array;
              }
            }

        }])
    .controller('ExercisesCreateCtrl', ['$scope', '$http', 'exercisesServices','$location','exercises',
        function($scope,$http,exercisesServices,$location,exercises) {
            $scope.createExercise = function(exercise) {
                var data = {
                    file: $scope.file,
                    files: $scope.files,
                    'exercise_name' : exercise.exercise_name,
                    'exercise_description' : exercise.exercise_description
                };
                var results = exercisesServices.createExercise(data);
            }
        }])
    .controller('ExercisesUpdateCtrl', ['$scope', '$http', '$routeParams', 'exercisesServices','$location','exercise',
        function($scope,$http,$routeParams,exercisesServices,$location,exercise) {
            var original = exercise.data;
            $scope.exercise = angular.copy(original.data);

            if ($scope.exercise.exercise_images) {
                $scope.exercise.arr_images =  $scope.exercise.exercise_images.split(';');
            }

            $scope.isClean = function() {
                return angular.equals(original, $scope.exercise);
            };
            $scope.updateExercise = function(exercise) {
                var data = {
                    file: $scope.file || exercise.exercise_video,
                    files: $scope.files || exercise.exercise_images,
                    'id': $scope.exercise.id,
                    'exercise_name' : exercise.exercise_name,
                    'exercise_description' : exercise.exercise_description
                };
                var results = exercisesServices.updateExercise(data);
            }
        }]);
