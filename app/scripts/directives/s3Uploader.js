'use strict';

angular.module('blacksunApp')
  .directive('s3uploader', function (imagesPath) {
    return {
      restrict: 'E',
      templateUrl: function(tElement, tAttrs){
        return tAttrs.templateUrl;
      },
      
      scope: {
      	accesskey : '@',
      	secretkey : '@',
      	bucket    : '@',
      	imgwidth  : '@',
      	imgheight : '@',
      	imgsize   : '@',
        template  : '@',
        fbpath    : '@'
    	},
      
      link: function(scope, element, attrs){ 

        //console.log(attrs);

        AWS.config.update({
        	accessKeyId     : scope.accesskey, 
        	secretAccessKey : scope.secretkey
        });

        var bucket      = new AWS.S3({params: {Bucket: scope.bucket}});
				var fileChooser = $('#file-chooser');
				var button      = $('#upload-button');

  			scope.imgName = '';
        scope.file    = '';
        scope.thereIs = true;
        scope.bar     = 0 + '%';
        scope.imghref = '';

        //messages variables
        scope.success = false;
        scope.iserror = false;
        scope.nothing = false;

  			fileChooser.change(function(){
          readURL(this);
          scope.file = this.files[0];
          scope.bar  = 0 + '%';
          
          if(scope.file){
            scope.imgName = scope.file.name.substring(0, scope.file.name.length - 4);
          }else{
            scope.imgName = '';
          };
          
          if(scope.file === undefined){
            scope.thereIs = true; 
          }else{
            scope.thereIs = false;
          }
          $('#bar').addClass('active');
          scope.$apply();
        });


  			button.on('click', function(){
          if(scope.file){
    			
    			  var xtension = scope.file.type.substring(6);

    			  if(scope.file.type.match('image.*') && scope.file.size < scope.imgsize){
      			 
						  var params = {Key: scope.imgName+'.'+xtension, ContentType: scope.file.type, Body: scope.file};
      			
      			  bucket.putObject(params, function (err, data){
      				  if(err){
      					 scope.iserror = true;
      				  }else{
                  scope.success = true;
                  scope.iserror = false;
                  $('#bar').removeClass('active');
                  
                  var imgUrl    = 'https://s3.amazonaws.com/blaksun/'+scope.imgName+'.'+xtension;
                  var imageName = scope.imgName+'.'+xtension;
                  imagesPath.saveImge(scope.fbpath, imgUrl, imageName);
      				  }
                scope.$apply();
      			  }).on('httpUploadProgress', function (progress) {

                scope.percent = (progress.loaded / progress.total) * 100;
                scope.bar = scope.percent + '%';
                scope.$apply();
              });
    			
    			  }else{
      			  scope.nothing = true;
    			  }
          }else{
            console.log('nothing');
            scope.nothing = true;
          }
          scope.$apply();
  			});

  			function readURL(input) {
					if(input.files && input.files[0] && input.files[0].type.match('image.*')){
            var reader = new FileReader();
            
            reader.onload = function(e){
            	scope.previewIMG = e.target.result;
              scope.$apply();
            }
          	reader.readAsDataURL(input.files[0]);
        	}else{
        		scope.previewIMG = '';
            scope.$apply();
        	}
        }
      }
    };
  });
