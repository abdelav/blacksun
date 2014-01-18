'use strict';

angular.module('blacksunApp')
  .controller('MainpageadminCtrl', function ($scope, FBURL, $firebase){
  	
  	$scope.imgs = $firebase(new Firebase(FBURL+'/slider'));

  	var imgs = new Firebase(FBURL+'/slider');

  	AWS.config.update({
      accessKeyId     : 'AKIAIWOR3KNGZBKQJ3CA', 
      secretAccessKey : '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'
    });

    var bucket = new AWS.S3({params: {Bucket: 'blaksun'}});

  	$scope.deleteImage = function(image){

  		imgs.once('value', function(nameSnapshot) {
    		var slidePath = _.findKey(nameSnapshot.val(), { 'id': image.id });
    		$scope.imgs.$child(slidePath).$remove();
			});
  		
      var params = {Key: image.name};
  		bucket.deleteObject(params, function(err, data){
  			if(err){
      		console.log('error');
      	}else{
      		console.log('succes');
      	}
  		});
  	}
  });
