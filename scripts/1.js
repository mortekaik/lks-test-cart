$(document).ready(function() {
    var h_hght = 120; // высота шапки
    var h_mrg = 0; // отступ когда шапка уже не видна

    $(window).scroll(function() { // скроллинг горизонтального меню
    	var top = $(this).scrollTop();
    	var elem = $('#top_nav');
    	if (top + h_mrg < h_hght) {
    		elem.css('top', (h_hght - top));
    		$("#top-link").css("display", "none");
    	} else {
    		elem.css('top', h_mrg);
    		$("#top-link").css("display", "block");
    	}
    }); // конец скроллинга горизонтального меню

    $("a[href='#top-link']").click(function() { // ссылка возврата на верх страницы
    	$("html, body").animate({
    		scrollTop: 0
    	}, "slow");
    	return false;
    });

    /*-------- форма загрузки файлов на сервер ----------*/

    //feature detection for drag&drop upload
    var isAdvancedUpload = function() {
    	var div = document.createElement('div');
    	return (('draggable' in div) || ('ondragstart' in div && 'ondrop' in div)) && 'FormData' in window && 'FileReader' in window;
    }();

        // applying the effect for every form

        $('.uploadform').each(function() {
        	var $form        = $(this),
        	$uploadUrl   = $form.attr('action'),
        	$input       = $form.find('input[type="file"]'),
        	$label       = $form.find('label'),
        	$errorMsg    = $form.find('.uploadform_error span'),
        	$restart     = $form.find('.uploadform_restart'),
        	droppedFiles = false,
        	showFiles    = function(files) {
        		$label.text( files.length > 1 ? ( $input.attr('data-multiple-caption') || '' ).replace('{count}', files.length ) : files[0].name);
        	};

        // letting the server side to know we are going to make an Ajax request
        $form.append('<input type="hidden" name="ajax" value="1" />');

        // automatically submit the form on file select
        $input.on('change', function(e) {
        	$form.trigger('submit');
        	showFiles(e.target.files);
        });

        // drag&drop files if the feature is available
        if (isAdvancedUpload) {
            $form.addClass('has-advanced-upload') // letting the CSS part to know drag&drop is supported by the browser
            .on('drag dragstart dragend dragover dragenter dragleave drop', function(e) {
                // preventing the unwanted behaviours
                e.preventDefault();
                e.stopPropagation();
            })
            .on('dragover dragenter', function() {
            	$form.addClass('is-dragover');
            })
            .on('dragleave dragend drop', function() {
            	$form.removeClass('is-dragover');
            })
            .on('drop', function(e) {
                droppedFiles = e.originalEvent.dataTransfer.files; // the files that were dropped
                console.log(droppedFiles);
                showFiles(droppedFiles);
                $form.trigger('submit'); // automatically submit the form on file drop
            });
        }

        // if the form was submitted

        $form.on('submit', function(e) {
            // preventing the duplicate submissions if the current one is in progress
            if ($form.hasClass('is-uploading')) return false;
            
            $form.addClass('is-uploading').removeClass('is-error');

            if (isAdvancedUpload) { // ajax file upload for modern browsers
            	e.preventDefault();
                // gathering the form data
                var ajaxData = new FormData($form.get(0));
                
                if (droppedFiles) {
                	$.each(droppedFiles, function(i, file) {
                		ajaxData.append($input.attr('name'), file);
                		console.log(file);
                	});
                }
                // ajax request
                $.ajax({
                	url:            $uploadUrl,
                	type:           'post',
                	data:           ajaxData,
                	dataType:       'json',
                	cache:          false,
                	contentType:    false,
                	processData:    false,
                	complete: function() {
                		$form.removeClass('is-uploading');
                	},
                	success: function(data) {
                        // $form.addClass(data.success == true ? 'is-success' : 'is-error');
                        console.log(data);
                        // if (!data.success) {
                        //     $errorMsg.text(data.error);
                        // }
                    },
                    error: function(data) {
                    	console.log(data);
                    	alert('Uploading Error! Something wrong!');
                    }
                });
            }
            // fallback Ajax solution upload for older browsers
            else {
            	var iframeName  = 'uploadiframe' + new Date().getTime(),
            	$iframe     = $('<iframe name="' + iframeName + '" style="display: none;"></iframe>');

            	$('body').append($iframe);
            	$form.attr('target', iframeName);

            	$iframe.one('load', function() {
            		var data = $.parseJSON($iframe.contents().find('body').text());
            		$form.removeClass('is-uploading').addClass((data == true && data.error === 0) ? 'is-success' : 'is-error')
            		.removeAttr('target');
            		if (!data) {
            			$errorMsg.text(data.error);
            		}
            		$iframe.remove();
            	});
            }
        });

        //restart the form if has a state of error/success
        $restart.on('click', function(e) {
        	e.preventDefault();
        	$form.removeClass('is-error is-success');
        	$input.trigger('click');
        });

        // Firefox focus bug fix for file input
        $input.on('focus', function() {
        	$input.addClass('has-focus');
        })
        .on('blur', function() {
        	$input.removeClass('has-focus');
        });
    });


/*-------- End of формы загрузки файлов---------*/

/*-------- Форма отправки данных из textarea/text ---------*/

	var $checkField = $('#description'),
	$editUrl = $('.editForm').attr('action');
	btnState = $('#send-desc').prop('disabled', true),
	startState = $checkField.val();

	$checkField.on('input', function() {
		var emptyField = $(this).filter(function() {
			var fieldValue = $(this).val();
			return fieldValue == '' || fieldValue == startState;
		}).length;
		console.log(emptyField);
		btnState.prop('disabled', emptyField);
	});

	$('.editForm').on('click', '#send-desc', function() {
		var $this = $(this);
		var $desc = $checkField.val();
		console.log($desc);

		$.ajax({
			type: 'post',
			url: $editUrl,
			cache: false,
			data: {
				post: 'edit-desc',
				desc: $desc
			},
			dataType: 'json',
			beforeSend: function (data) {
				$('#loading_box').show();
			},
			success: function(response) {
				console.log(response);
				$('#resp').html($desc);
				console.log($desc);
				if (response) {
					$checkField.val($desc);
					btnState.prop('disabled', true);
				}
			},
			error: function(error) {
				alert('Something wrong: ' + error.statusText);
				console.log(error);
			},
			complete: function() {
				$('#loading_box').hide();
			}
		});
		return false;
	});

/*-------- End of формы отправки данных из textarea/text ---------*/

}); // End of Ready function