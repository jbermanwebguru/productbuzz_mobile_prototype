var siteMapArray = [
	{"name": "answer-landing", "url": "answer-landing.html", "children": [
		{"name":"answer", "url":"answer.php", "children": []}
	]},
	{"name": "ask", "url": "ask.html", "children": []},
	{"name": "offers", "url": "offers.html", "children": []},
	{"name": "read", "url": "read.html", "children": []},
	{"name": "surveys", "url": "surveys.html", "children": []},
	{"name": "profile", "url": "profile.html", "children": []}
];

var curPageId,myScroll,contentSlider,imagePinchZoom;

var maxPollQuestions = 10;

var clickEventType=((document.ontouchstart!==null)?'click':'touchstart');

// Detect file input support
var isFileInputSupported = (function () {
 // Handle devices which falsely report support
 if (navigator.userAgent.match(/(Android (1.0|1.1|1.5|1.6|2.0|2.1))|(Windows Phone (OS 7|8.0))|(XBLWP)|(ZuneWP)|(w(eb)?OSBrowser)|(webOS)|(Kindle\/(1.0|2.0|2.5|3.0))/)) {
   return false;
 }
 // Create test element
 var el = document.createElement("input");
 el.type = "file";
 return !el.disabled;
})();

function isChildPage(child, parent) {
	for(var i=0; i<siteMapArray.length; i++) {
		if(parent == siteMapArray[i].name || parent == siteMapArray[i].url) {
			for(h=0; h<siteMapArray[i].children.length; h++) {
				if(child == siteMapArray[i].children[h].name || child == siteMapArray[i].children[h].url)
					return true;
			}
		}
	}
	return false;
}

function trimPageName(page) {
	if(page.lastIndexOf('/') != -1)
		page = page.substring(page.lastIndexOf('/')+1);
	if(page.lastIndexOf('.') != -1)
		page = page.substring(0, page.lastIndexOf('.'));
	return page;
}

function pageLoaded(id) {

	if(curPageId == id)
		return;

	curPageId = id;

	if($(window).height() > 480)
		$("#page").addClass("tall");

	setTimeout(function() {
		setUpCarousels(id);
	}, 10);

	document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

	$(".crumb .search #search-text").val($("#search-panel").data("search-text"));

	var type="", topic_whole="", parent="", topic="";

	if(id.indexOf("-") != -1) {
	    type = id.substring(0, id.indexOf("-"));
	    topic_whole = id.substring(id.indexOf("-")+1);
	}
	if(topic_whole.indexOf("-") != -1) {
		parent = topic_whole.substring(0, topic_whole.indexOf("-"));
		topic = topic_whole.substring(topic_whole.indexOf("-")+1);
	} else {
		parent = topic_whole;
		topic = "";
	}

	console.log("pageLoaded. id="+id+" type="+type+" parent="+parent+" topic="+topic+" $('body').data('auto_select')="+$('body').data('auto_select'));

	// hide bottom nav (tabbar) unless top section (type found)
	if(type=="problems" || type=="solutions" || type=="offers") {
		$("#tabbar").addClass("show");
	} else {
		$("#tabbar").removeClass("show");
	}

	// select the correct item in the topics nav
	$('#topics ul li').removeClass('selected');
	$.each(topicsArray, function(i, item) {
		if(item.id == parent) {
			$('#topics ul li[data-topic-id="'+item.id+'"]').addClass('selected');
		}
		if(item.children && item.children.length > 0) {
			$.each(item.children, function(j, child_item) {
				if(child_item.id == topic) {
					$('#topics ul li ul li[data-topic-id="'+child_item.id+'"]').addClass('selected');
				}
			});
		}
	});

	if($('body').data('auto_select')) { // automatically focus/select this field, won't work in iOS for some reason
		console.log("auto_select: $('#" + id + " " + $('body').data('auto_select')+"').length="+$('#' + id + ' ' + $('body').data('auto_select')).length);
		setTimeout(function() {
			if($('#' + id + ' ' + $('body').data('auto_select')).length > 0) {
				var selectField = $('#' + id + ' ' + $('body').data('auto_select')).attr('autofocus',true).focus().select();
				console.log("selectField="+selectField+" selectField.length="+selectField.length);
				//selectField.on("mouseup",function(e){console.log("mouseup")});
				selectField[0].selectionStart = 0;
				selectField[0].selectionEnd = 999;
				//selectField[0].setSelectionRange(0, 9999);
				console.log("focusing: $('#" + id + " " + $('body').data('auto_select')+"') length="+$('#' + id + ' ' + $('body').data('auto_select')).length+" focused="+$('#' + id + ' ' + $('body').data('auto_select')).is(':focus'));
				$('body').data('auto_select', null);
			}
		}, 500);
	}

	$("textarea[data-href!='']:[data-href]").one(clickEventType+", focus", function(e) {
		var _href = $(this).attr("data-href");
		$(this).blur();
		console.log("textarea tapped. data-href="+_href+" contentSlider.dragSuccess="+contentSlider.dragSuccess);
		if(contentSlider)
			if(contentSlider.dragSuccess)
				return;

		$('body').data('auto_select', '#answer-text');
		$(this).parent().addClass("selected");
		setTimeout(function() {
			jQT.goTo(_href, "slideleft");
		}, 250);
		e.preventDefault();
		return false;
	});

	if(id && id!="") {

		if($('div#' + id + ' #wrapper').length != 0) {
			selectTabBarItem(type);
			changeTabBarTopic(topic_whole)
		
			if ($('div#' + id + ' #wrapper').get(0)) {
				setTimeout(function() {
					if (myScroll) {
						myScroll.destroy();
						myScroll = null;
						//alert('destroy iscroll')
					}
					myScroll = new iScroll($('div#' + id + ' #wrapper').get(0), {
				        onBeforeScrollStart: function (e) {
				            var target = e.target;
				            while (target.nodeType != 1) target = target.parentNode;

				            if (target.tagName != 'SELECT' && target.tagName != 'INPUT' && target.tagName != 'TEXTAREA') {
				                e.preventDefault();
				            } else {
				                $(target).bind('blur', function(){
				                    window.scrollTo(0,0);
				                    myScroll.refresh();
				                });
				            }
				        },
				        onScrollMove: function () {
				        	if(myScroll.getScrollY() > 20) {
					        	$("#page").addClass("showAddressBar");
				        	} else if(myScroll.getScrollY() < -20) {
					        	$("#page").removeClass("showAddressBar");
							}
							document.body.scrollTop=0;
				        	// TBA, can be used to set attach/detach fixed UI elements based on scrolling position
				        },
				        onScrollEnd: function () {
				        	// TBA, can be used for infinite scrolling callbacks when bottom of page is reached
				        }
					});
					console.log("setting up iScroll for div#" + id + " #wrapper. height="+$('div#' + id + ' #wrapper').height());
				}, 0);
			}
		}
		if(id.indexOf("profile") == -1) {
			// not profile section
			$("#page > .toolbar .btn-home").removeClass("show")
			$("#page > .toolbar .btn-menu").addClass("show");
			$("#page > .toolbar .profile-pic").addClass("show");
			$("#page > .toolbar .btn-controls").removeClass("show")
		} else {
			// profile section
			$("#page > .toolbar .btn-home").addClass("show");
			$("#page > .toolbar .btn-menu").removeClass("show")
			$("#page > .toolbar .profile-pic").removeClass("show")
			$("#page > .toolbar .btn-controls").addClass("show");
		}
	}

	// START PROFILE PAGE
	$(".profile-nav a").unbind(clickEventType);
	$(".profile-nav a").bind(clickEventType, function(e) {
		$(".profile-nav a").addClass("current").not(this).removeClass("current");
		var _href = $(this).attr('href');
		var _class = $("div#" + id + " .articles").attr('class');
		console.log("_class="+_class);
		$(".articles").animate({'opacity':0},function() {
			$.ajax({
			    url: _href,
			    dataType: 'html',
			    success: function(html) {
			        var div = $('.articles', $(html));
			        $(".articles").replaceWith(div);
			        $(".articles").attr('class',_class).css('opacity',0).animate({'opacity':1});
					setTimeout(function () { if(myScroll) {myScroll.refresh();} }, 0);
			    }
			});
		});
		e.preventDefault();
		return false;
	});
	// END PROFILE PAGE

	// show / hide search bar
	$(".crumb .search").css({
		"left":$("#page").width()-55,
		"-webkit-transition":" all 0.5s ease-out",
		"transition":"all 0.5s ease-out"
	});
	$(".crumb .search #search-text").unbind(clickEventType+", focus");
	$(".crumb .search #search-text").bind(clickEventType+", focus", function(e) {
		showSearch()
	});
	$(".crumb .search #search-text").unbind("keyup");
	$(".crumb .search #search-text").bind("keyup", function(e) {
		var val = $(this).val();
		$("#search-panel").data("search-text", val);
		$("#search-panel").html("\
                <h2>Problems</h2>\
                <ul>\
                    <li>\
                        <h3>DIY</h3>\
                        <p><a href=\"answer.php\">How to install <strong>"+val+"</strong> &#9656;</a>\
                    </li>\
                    <li>\
                        <h3>Crafts</h3>\
                        <p><a href=\"answer.php\">What to do with leftover <strong>"+val+"</strong> &#9656;</a>\
                    </li>\
                </ul>\
                <h2>Solutions</h2>\
                <ul>\
                    <li>\
                        <p>0 search results</a>\
                    </li>\
                </ul>\
                <h2>Offers</h2>\
                <ul>\
                    <li>\
                        <h3>DIY</h3>\
                        <p><a href=\"answer.php\">How to install <strong>"+val+"</strong> &#9656;</a>\
                    </li>\
                </ul>\
                ");
		$("#search-panel a").bind(clickEventType, function(e) {
			hideSearch();
			var _href = $(this).attr("href");
			setTimeout(function() {
				jQT.goTo(_href, "slideleft");
			},500);
			e.preventDefault();
			return false;
		});
		//$("#tabbar div").addClass("current").not(this).removeClass("current");
	});
	$(".crumb .search .search-icon").bind(clickEventType, function(e) {
		toggleSearch()
		e.preventDefault();
		return false;
	});
	$(".crumb .search .close-icon").bind(clickEventType, function(e) {
		hideSearch();
		e.preventDefault();
		return false;
	});

	// topic chooser on the page, trigger navigation but set data-catch-topic which changes its behavior
	$('.show-select-topic').unbind(clickEventType);
	$('.show-select-topic').bind(clickEventType, function(e) {
		$(".show-select-topic").attr("data-catch-topic","true"); // this will tell the nav to update this field rather than navigate to a new page
		$("#topics li[data-topic-id='popular']").hide();
		$("#topics").addClass("show").height($("#page").height() - 43);
		$(".show-select-topic a").removeClass("active");
		e.preventDefault();
		return false;
	});

	// disable main "Submit" button, enable it if any text entered
	$('div#' + id + ' #submit-button').addClass('disabled');
	$('div#' + id + ' #submit-button').unbind(clickEventType);
	$('div#' + id + ' #submit-button').bind(clickEventType, function(e) {
		if(!$(this).hasClass('disabled'))
			$('.main-form').submit();
		e.preventDefault();
		return false;
	});

    $('div#' + id + ' textarea').unbind("keyup keydown change");
    $('div#' + id + ' textarea').bind("keyup keydown change", function() {
        $(this).height($(this)[0].scrollHeight);
        console.log("empty textarea val="+isEmpty($(this).val()));
        if(isEmpty($(this).val())) {
        	$('div#' + id + ' #submit-button').addClass('disabled');
        } else {
        	$('div#' + id + ' #submit-button').removeClass('disabled');
        }
    });
	
	// filters dropdown
	$(".filters > ul > li > a").unbind(clickEventType);
	$(".filters > ul > li > a").bind(clickEventType, function(e) {
		$(".filters > ul > li").not($(this).closest("li")).removeClass("active");
		$(this).closest("li").toggleClass("active");
		e.preventDefault();
		return false;
	});
	// filter option click
	$(".filters > ul > li > ul > li > a").unbind(clickEventType);
	$(".filters > ul > li > ul > li > a").bind(clickEventType, function(e) {
		$(this).parents("li").parents("li").removeClass("active").children("a:first").text($(this).text());
		e.preventDefault();
		return false;
	});

	// change between grid and listing view (profile page)dropdown
	$(".filters-right a.list").unbind(clickEventType);
	$(".filters-right a.list").bind(clickEventType, function(e) {
		$(".filters-right a").addClass("current").not(this).removeClass("current");
		$(".articles").removeClass("grid");
		$(".articles").addClass("list");
		setTimeout(function () { if(myScroll) {myScroll.refresh();} }, 600);
		e.preventDefault();
		return false;
	});
	$(".filters-right a.grid").unbind(clickEventType);
	$(".filters-right a.grid").bind(clickEventType, function(e) {
		$(".filters-right a").addClass("current").not(this).removeClass("current");
		$(".articles").removeClass("list");
		$(".articles").addClass("grid");
		setTimeout(function () { if(myScroll) {myScroll.refresh();} }, 600);
		e.preventDefault();
		return false;
	});

    /* POLLS */

    // set up sorting
	var sortable_dragging = false;
	var sortable_handle_down = false;
    $("ul.sortable li .handle").unbind("touchstart");
    $("ul.sortable li .handle").bind("touchstart", function(e) { 
    	sortable_handle_down = true;
    });
    $("ul.sortable li .handle").unbind("touchend");
    $("ul.sortable li .handle").bind("touchend", function(e) { 
    	sortable_handle_down = false;
    });
	if($("ul.sortable").length > 0) {
		// Enable sort
		$("body").css("overflow","hidden");
		$("ul.sortable").sortable({ 
			disabled: false,
			handle: '.handle',
            axis : 'y',
            helper: function(event, element) {
		        return element.clone().css({'width':element.width(),'height':element.height(),'left':element.offset().left}).addClass("answers-entry-dragging").appendTo("body");
		    },
    		cancel: "textarea",
    		containment: ".main-form.poll",
    		scroll: false,
		    start: function(event, ui) {
		    	console.log("drag start. sortable_handle_down="+sortable_handle_down);
		        if(myScroll) {
		        	myScroll.disable();
      			}
		        console.log("sortable start");
		    },
			drag: function(event,ui){
		    	sortable_dragging = true;
			},
		    stop: function(event, ui) {
		        window.scrollTo(0,0);
		    	sortable_dragging = false;
		        if(myScroll)myScroll.enable();
		    }
		});
		$("ul.sortable").addTouch();
		$("ul.sortable").disableSelection();
        $("ul.sortable li").unbind("touchstart");
        $("ul.sortable li").bind("touchstart", function(e) { 
        	var _target = null;
        	if (event.target) {
        		_target = event.target;
		    }
        	if (event.touches[0]) {
        		_target = event.touches[0].target;
		    }
		    if(_target && myScroll) {
		        console.log("touchstart. target tag="+_target.tagName+" myScroll.getScrollY()="+myScroll.getScrollY());
		        if(!sortable_dragging && _target.tagName.toLowerCase() == "textarea") {
		        	$(this).find("textarea").attr('data-tapped-y', myScroll.getScrollY());
		        	$(this).find("textarea").attr('data-tapped', 'true');
	        	}
		    }
        });
        $("ul.sortable li").unbind("thouchmove");
        $("ul.sortable li").bind("thouchmove", function(e) { 
        	var _target = null;
        	if (event.target) {
        		_target = event.target;
		    }
        	if (event.touches[0]) {
        		_target = event.touches[0].target;
		    }
		    if(_target && myScroll) {
		        console.log("thouchmove. target tag="+_target.tagName+" myScroll.getScrollY()="+myScroll.getScrollY());
		        if(!sortable_dragging && _target.tagName.toLowerCase() == "textarea") {
		        	var tap_y = parseFloat($(this).find("textarea").attr('data-tapped-y'));
		        	var end_y = myScroll.getScrollY();
		        	if(Math.abs(end_y - tap_y) > 10) {
		        		// user scrolled more than 10 pixels while dragging on the textarea, so don't focus it
		        		$(this).find("textarea").attr('data-tapped', 'false');
		        	}
	        	}
		    }
        });
        $("ul.sortable li").unbind("touchend");
        $("ul.sortable li").bind("touchend", function(e) { 
        	var _target = null;
        	if (event.target) {
        		_target = event.target;
		    }
        	if (event.touches[0]) {
        		_target = event.touches[0].target;
		    }
		    if(_target) {
		        if(!sortable_dragging && _target.tagName.toLowerCase() == "textarea" && $(this).find("textarea").attr('data-tapped')) {
		        	var _tapped = $(this).find("textarea").attr('data-tapped');
		        	var tap_y = parseFloat($(this).find("textarea").attr('data-tapped-y'));
		        	var end_y = myScroll.getScrollY();
		        	console.log("touchend. target tag="+_target.tagName+" tapped="+_tapped);
		        	if(_tapped == "true" && Math.abs(end_y - tap_y) < 10) {
				        console.log("focusing textarea");
		        		$(this).find("textarea").focus().bind('blur', function(){
		                    window.scrollTo(0,0);
		                    myScroll.refresh();
		                });
		        	}
		        	$(this).find("textarea").removeAttr('data-tapped-y');
		        	$(this).find("textarea").removeAttr('data-tapped');
	        	}
		    }
        });

	}
    // show clear icon when entering poll answers
    $('ul.answers-entry li textarea').unbind(clickEventType + " keyup keydown change blur");
    $('ul.answers-entry li textarea').bind(clickEventType + " keyup keydown change blur",function() {
        if(isEmpty($(this).val())) {
        	$(this).closest('li').find('.ui-icon-delete').hide();
        } else {
        	$(this).closest('li').find('.ui-icon-delete').show();
        }
    });
    // clear icon action when entering poll answers
    $('ul.answers-entry li .ui-icon-delete').unbind();
    $('ul.answers-entry li .ui-icon-delete').bind(clickEventType,function(e) {
    	$(this).closest('li').slideUp(function() {
    		$(this).remove();
	    	$('form.poll .button-add').show();
    		if(myScroll) myScroll.refresh();
    	});
		e.preventDefault();
		return false;
    });
    // add poll answer
    $('form.poll .button-add').unbind(clickEventType);
    $('form.poll .button-add').bind(clickEventType,function(e) {
    	$('ul.answers-entry li:first').clone().insertAfter('ul.answers-entry li.answer-entry:last').hide().slideDown(function() {
	    		if(myScroll) {
	    			myScroll.refresh();
	    			myScroll.scrollToElement($(this)[0]);
	    		}
	    	}).find('textarea').val('').bind(clickEventType + " keyup keydown change blur",function() {
	        if(isEmpty($(this).val())) {
	        	$(this).closest('li').find('.ui-icon-delete').hide();
	        } else {
	        	$(this).closest('li').find('.ui-icon-delete').show();
	        }
	        $("ul.sortable li").unbind("touchstart");
	        $("ul.sortable li").bind("touchstart", function(e) { 
	        	var _target = null;
	        	if (event.target) {
	        		_target = event.target;
			    }
	        	if (event.touches[0]) {
	        		_target = event.touches[0].target;
			    }
			    if(_target && myScroll) {
			        console.log("touchstart. target tag="+_target.tagName+" myScroll.getScrollY()="+myScroll.getScrollY());
			        if(!sortable_dragging && _target.tagName.toLowerCase() == "textarea") {
			        	$(this).find("textarea").attr('data-tapped-y', myScroll.getScrollY());
			        	$(this).find("textarea").attr('data-tapped', 'true');
		        	}
			    }
	        });
	        $("ul.sortable li").unbind("thouchmove");
	        $("ul.sortable li").bind("thouchmove", function(e) { 
	        	var _target = null;
	        	if (event.target) {
	        		_target = event.target;
			    }
	        	if (event.touches[0]) {
	        		_target = event.touches[0].target;
			    }
			    if(_target && myScroll) {
			        console.log("thouchmove. target tag="+_target.tagName+" myScroll.getScrollY()="+myScroll.getScrollY());
			        if(!sortable_dragging && _target.tagName.toLowerCase() == "textarea") {
			        	var tap_y = parseFloat($(this).find("textarea").attr('data-tapped-y'));
			        	var end_y = myScroll.getScrollY();
			        	if(Math.abs(end_y - tap_y) > 10) {
			        		// user scrolled more than 10 pixels while dragging on the textarea, so don't focus it
			        		$(this).find("textarea").attr('data-tapped', 'false');
			        	}
		        	}
			    }
	        });
	        $("ul.sortable li").unbind("touchend");
	        $("ul.sortable li").bind("touchend", function(e) { 
	        	var _target = null;
	        	if (event.target) {
	        		_target = event.target;
			    }
	        	if (event.touches[0]) {
	        		_target = event.touches[0].target;
			    }
			    if(_target) {
			        if(!sortable_dragging && _target.tagName.toLowerCase() == "textarea" && $(this).find("textarea").attr('data-tapped')) {
			        	var _tapped = $(this).find("textarea").attr('data-tapped');
			        	var tap_y = parseFloat($(this).find("textarea").attr('data-tapped-y'));
			        	var end_y = myScroll.getScrollY();
			        	console.log("touchend. target tag="+_target.tagName+" tapped="+_tapped);
			        	if(_tapped == "true" && Math.abs(end_y - tap_y) < 10) {
					        console.log("focusing textarea");
			        		$(this).find("textarea").focus().bind('blur', function(){
			                    window.scrollTo(0,0);
			                    myScroll.refresh();
			                });
			        	}
			        	$(this).find("textarea").removeAttr('data-tapped-y');
			        	$(this).find("textarea").removeAttr('data-tapped');
		        	}
			    }
	        });
	    });
	    $('ul.answers-entry li .ui-icon-delete').unbind();
	    $('ul.answers-entry li .ui-icon-delete').bind(clickEventType,function(e) {
	    	$(this).closest('li').slideUp(function() {
	    		$(this).remove();
    			if(myScroll) myScroll.refresh();
	    		$('form.poll .button-add').show();
	    	});
			e.preventDefault();
			return false;
	    });
	    $("ul.sortable li .handle").unbind("touchstart");
	    $("ul.sortable li .handle").bind("touchstart", function(e) { 
	    	sortable_handle_down = true;
	    });
	    $("ul.sortable li .handle").unbind("touchend");
	    $("ul.sortable li .handle").bind("touchend", function(e) { 
	    	sortable_handle_down = false;
	    });
	    // maximum questions reached?
		if($("ul.sortable li").length >= maxPollQuestions) {
			$(this).hide();
		}
		e.preventDefault();
		return false;
    });
    /* END POLLS */

	// upload file handling with resize/crop
	$('input[type="file"]').unbind("change");
	$('input[type="file"]').change(function() {
		if(this.files != undefined) {
			var file = this.files[0];
			var file_ext;
			if(file.name.lastIndexOf(".") != -1)
				file_ext = file.name.substring(file.name.lastIndexOf(".")+1);
			else if(file.type)
				file_ext = file.type.substring(file.type.lastIndexOf("/")+1);
			
			var isPhoto = file_ext == "jpg" || file_ext == "jpeg" || file_ext == "gif" || file_ext == "png";
			var isVideo = file_ext == "avi" || file_ext == "mov" || file_ext == "mpg" || file_ext == "mpeg" || file_ext == "mp4" || file_ext == "3gp" || file_ext == "3g2" || file_ext == "wmv";

			if(!isPhoto && !isVideo) {
				alert("We're sorry. We could not identify the file you uploaded.");
				return;
			}
			
			$("upload-preview").remove();

			var template = '<div class="upload-preview">'+
			'<span id="uploaded-image" class="image-holder">'+
			'<img />'+
			'<a href="#" class="ui-icon-delete"></a>'+
			'</span></span>'+
			'</div>'; 

			var preview = $(template), 
			image = $('img', preview);

			if(isPhoto) {
				var reader;
				try
				{
					reader = new FileReader();
					var max_file_size = 1048576 * 2;
					if (file.size > max_file_size) {
						alert('File size is too big, limit under 2MB');
						return;
					}
					if($('.upload-preview', $(this).parent()) != []) {
						$('.upload-preview').remove();
					}
				} catch (err) {
					return;
				}

				reader.onload = function(e){
					image.attr('src', e.target.result);
					image.attr('width','auto');
			        var imgObj = new Image();
			        imgObj.onload = function(f) {
			        	/*
			            var srcWidth = this.width;
			            var srcHeight = this.height;
					    var ratio = [$(window).width()-20 / srcWidth, 600 / srcHeight ];
					    ratio = Math.min(ratio[0], ratio[1]);
			            $('.upload-edit-holder').css({width:"100%",height:srcHeight*ratio+"px"})
			            */
						if (imagePinchZoom) {
							imagePinchZoom.destroy();
							imagePinchZoom = null;
							//alert('destroy iscroll')
						}
						imagePinchZoom = new iScroll(
							'uploaded-image',
							{
								zoom: true,
								bounce: false,
								vScrollbar: false,
								hScrollbar: false,
								lockDirection: false
							}
						);
						console.log("setting up pinch/zoom iScroll for uploaded-image");

						// turn off main scrolling
						if(myScroll) {
							myScroll.refresh();
							myScroll.disable();
						}

			            /*
			            var maxWidth = 50;
			            var maxHeight = 50;
					    image.attr('width', srcWidth*ratio);
					    image.attr('height', srcHeight*ratio);
					    */

			        };
			        imgObj.src = e.target.result; 
				};
			
				reader.readAsDataURL(file);
			}
			
			$.data(file,preview);

			$('.main-form').hide();
			$('.image-editor').show();
			$('.upload-edit-holder').show().append(preview).css({height:($('.upload-edit-holder').width()*2/3)+"px"});

			$('.ui-icon-delete', preview).one(clickEventType, function(e) {
				e.preventDefault();
				preview.remove();
				$('.upload-preview-holder').hide();
			});
			
			$('#edit-image-next').one(clickEventType, function(e) {
				e.preventDefault();
				var image_style = $('#uploaded-image img').attr('style');

				$('.upload-preview-holder').show().append(preview.detach());
				$('.main-form').show();
				$('.image-editor').hide();

				var offset_x = 0, offset_y = 0, offset_scale = 0;
				if (imagePinchZoom) {
					offset_x = imagePinchZoom.getScrollX();
					offset_y = imagePinchZoom.getScrollY();
					offset_scale = imagePinchZoom.getScrollScale();

					$('.main-form input[name=offset_x]').val(offset_x);
					$('.main-form input[name=offset_y]').val(offset_y);
					$('.main-form input[name=offset_scale]').val(offset_scale);

					imagePinchZoom.destroy();
					imagePinchZoom = null;
					//alert('destroy iscroll')
				}

				console.log("offset_x="+offset_x+" offset_y="+offset_y+" offset_scale="+offset_scale+" image_style="+image_style);

				$('#uploaded-image img').attr('style', image_style);
				
				// turn on main scrolling
				setTimeout(function () { if(myScroll) {myScroll.enable();myScroll.refresh();} }, 0);

			});
			$('#edit-image-back').one(clickEventType, function(e) {
				e.preventDefault();
				preview.remove();
				$('.main-form').show();
				$('.image-editor').hide();

				// turn on main scrolling
				if(myScroll) {
					myScroll.enable();
					myScroll.refresh();
				}

			});
		}
	});
	$('#page').imagesLoaded( function() {
		console.log("imagesLoaded");
		myScroll.refresh();
	});
}

function toggleSearch() {
	if($(".crumb .search").hasClass("show"))
		hideSearch();
	else
		showSearch();
}
function showSearch() {
	$(".crumb .search").addClass("show");
	$("#search-panel").addClass("show");
}
function hideSearch() {
	$(".crumb .search").removeClass("show");
	$("#search-panel").removeClass("show");
	$(".crumb .search #search-text").blur();
}
//window.addEventListener('load', loaded, false);

/* Use this for high compatibility (iDevice + Android)*/
document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
/*
function loaded() {
	setTimeout(function () {
		myScroll = new iScroll('wrapper');
	}, 100);
}
document.addEventListener('DOMContentLoaded', setTimeout(function () { loaded(); }, 200), false);
*/

var jQT;
var mydata = '';
var emptyHash = false;
if(location.hash === '' || location.hash.length < 1 || location.hash=="#home")
	emptyHash = true;

console.log("229: location.hash="+location.hash);
if((navigator.userAgent.match(/iPhone/i))||(navigator.userAgent.match(/iPod/i))||(navigator.userAgent.match(/iPad/i))){
	jQT = new $.jQTouch({
		//cacheGetRequests: false,
		icon: 'images/vp-mobile-icon.png',
		icon4: 'images/vp-mobile-icon.png',
		addGlossToIcon: false,
		themeSelectionSelector: '#jqt #themes ul',
		useFastTouch: true,
		statusBar: 'default',
		backSelector: '.cancel, .goback',
		preloadImages: [
			'images/loading.gif',
			'images/vp-mobile-icon.png'
		]
	});
} else {    
	jQT = new $.jQTouch({
		//statusBar: 'black-translucent',
		themeSelectionSelector: '#jqt #themes ul',
		useFastTouch: false,
		statusBar: 'default',
		backSelector: '.cancel, .goback',
		preloadImages: [
			'images/loading.gif',
			'images/vp-mobile-icon.png'
		]
	});
	//alert('is not iPhone');
} 
console.log("257: location.hash="+location.hash);


// Main functions:
$(function() {

console.log("263: location.hash="+location.hash);
	/*
	$("body").bind("pageAnimationEnd", function (e, info) {
		console.log("body pageAnimationEnd. id="+e.target.id+" current id="+$("#jqt > div.current").attr("id")+" info.direction="+info.direction);
		pageLoaded(e.target.id);
		if (info.direction == 'out'){
			pageLoaded(e.target.id);
		}
		//$('body').height($('div.current').height());
	});
*/
    $(window).bind('hashchange', function() {
    	console.log("$(window).bind('hashchange')");
		pageLoaded($("#jqt > div.current").attr("id"));
    });
	$('#jqt > div').bind('pageAnimationEnd', function(e, info) {
		console.log("div pageAnimationEnd. id="+e.target.id+" current id="+$("#jqt > div.current").attr("id")+" info.direction="+info.direction);
		if($(this).data('referrer'))
			console.log("div pageAnimationEnd. referrer data-url="+$($(this).data('referrer')[0]).attr("data-url"));
		/*
		if (info.direction == 'in'){
			pageLoaded(e.target.id);
		}*/
		pageLoaded($("#jqt > div.current").attr("id"));
		
	}); //pageAnimationEnd

	
	// generate topics nav
	var topic_ul_items = [];
	$.each(topicsArray, function(i, item) {
		var item_html = '<li data-topic-id="' + item.id + '"><a href="' + item.id + '.html">' + item.name + '</a>';
		if(item.children && item.children.length > 0) {
			item_html += '<ul>';
			$.each(item.children, function(j, child_item) {
				item_html += '<li data-topic-id="' + child_item.id + '"><a href="' + item.id + '-' + child_item.id + '.html">' + child_item.name + '</a></li>';
			});
			item_html += '</ul>';
		}
		item_html += '</li>';
		topic_ul_items.push(item_html);
	});

	$("<ul>").appendTo("#topics").append( topic_ul_items.join('') );

	// show/hide location bar when logo tapped
	$(".toolbar .logo").bind(clickEventType, function(e) {
		console.log("logo tapped");
		setTimeout(function() {
			$("#page").toggleClass("showAddressBar");
			document.body.scrollTop=0;
		}, 100);
		e.preventDefault();
		return false;
	});

	// show / hide topics nav
	$(".btn-menu").bind(clickEventType, function(e) {
		console.log("$(window).height()="+$(window).height())
		$("#topics").toggleClass("show");
		$("#topics li[data-topic-id='popular']").show();
		if($("#topics").hasClass("show"))
			$("#topics").height($("#page").height() - 43);
		else {
			$("#topics").height(0);
			$(".show-select-topic").removeAttr("data-catch-topic"); // if nav was triggered elsewhere, remove this data so it will act as page nav again
		}
		e.preventDefault();
		return false;
	});
	
	
	// go to user profile
	$(".toolbar .profile-pic").bind(clickEventType, function(e) {
		jQT.goTo($(this).attr("href"), "slideleft");
		e.preventDefault();
		return false;
		//$("#tabbar div").addClass("current").not(this).removeClass("current");
	});

	$("#topics > ul > li > a").bind(clickEventType, function(e) {
		if($(this).parent().hasClass("selected")) {
			$("#topics > ul > li").removeClass("selected");
		} else {
			$("#topics > ul > li").not(this).removeClass("selected");
			$(this).parent().addClass("selected");
		}
		if($(this).parent().find("li").length == 0) {
			var _myhref = $(this).attr("href");
			var _topic = $(this).closest("li").attr("data-topic-id");
			var _type = ($("#tabbar li a.current").attr("data-content-type") ? $("#tabbar li a.current").attr("data-content-type") : "problems");
			$.cookie("vptype",_type);
			$.cookie("vptopic",_topic);
			var final_href = _type + "-" + _myhref;
			if($("*[data-catch-topic=true]").length > 0) { // this will tell the nav to update this field rather than navigate to a new page
				$("*[data-catch-topic=true]").html('<a href="#">'+$(this).text()+'</a> |  <a href="#">Choose a category &#9656;</a>');
				$("input[name=topic]").val(_topic);
				$("*[data-catch-topic=true]").removeAttr("data-catch-topic");
			} else {
				setTimeout(function() {
					jQT.goTo(final_href, "slideleft");
				}, 250);
			}
			$("#topics").removeClass("show").height(0);
			$("#tabbar li a").each(function() {
				$(this).attr("href",$(this).attr("data-content-type")+"-"+_myhref);
			});
		}
		e.preventDefault();
		return false;
	});
	
	$("#topics > ul > li > ul > li > a").bind(clickEventType, function(e) {
		$("#topics > ul > li > ul > li").not(this).removeClass("selected");
		$(this).parent().addClass("selected");
		var _myhref = $(this).attr("href");
		var _topic = $(this).closest("li").parent().parent().attr("data-topic-id")+"-"+$(this).closest("li").attr("data-topic-id");
		var _type = ($("#tabbar li a.current").attr("data-content-type") ? $("#tabbar li a.current").attr("data-content-type") : "problems");
		$.cookie("vptype",_type);
		$.cookie("vptopic",_topic);
		var final_href = _type + "-" + _myhref;
		if($("*[data-catch-topic=true]").length > 0) { // this will tell the nav to update this field rather than navigate to a new page
			$("*[data-catch-topic=true]").html('<a href="#">'+$(this).text()+'</a> |  <a href="#">Choose a category &#9656;</a>');
			$("input[name=topic]").val(_topic);
			$("*[data-catch-topic=true]").removeAttr("data-catch-topic");
		} else {		
			setTimeout(function() {
				console.log("final_href="+final_href);
				jQT.goTo(final_href, "slideleft");
			}, 250);
		}
		$("#topics").removeClass("show").height(0);
		$("#tabbar li a").each(function() {
			$(this).attr("href",$(this).attr("data-content-type")+"-"+_myhref);
		});
		e.preventDefault();
		return false;
	});

	$(window).bind('orientationchange resize', function(event){
		pageSizeChange();
	});

	console.log("location.hash="+location.hash+" emptyHash="+emptyHash);

	setTimeout(function() {
		if(emptyHash) {
			var _type = $.cookie("vptype");
			if(isEmpty(_type))
				_type = "problems";
			var _topic = $.cookie("vptopic");
			if(isEmpty(_topic))
				_topic = "family-kids";
			jQT.goTo(_type+"-"+_topic+".html");
		}
	}, 250);

	pageLoaded($("#jqt > div").attr("id"));

});


function pageSizeChange() {
	console.log("pageSizeChange")
	$('.royalSlider').width($(window).width());
	if(contentSlider)
		contentSlider.updateSliderSize(true);
	$(".crumb .search").css({
		"left":$("#page").width()-55
	});	
	//setTimeout(function () { if(myScroll) myScroll.refresh() }, 0);
}


function setUpCarousels(id) {

	if($('#'+id+' #slider-main').length == 0) {
		return;
	}

	$('.royalSlider').width($(window).width());

	var sliderHeight = 700;
	if($('.royalSlider').hasClass('problems'))
		sliderHeight = 540;

	contentSlider = $('#'+id+' #slider-main').royalSlider({
	    addActiveClass: true,
	    arrowsNav: false,
	    controlNavigation: 'none',
	    autoScaleSlider: true, 
	    autoScaleSliderWidth: 960,     
	    autoScaleSliderHeight: sliderHeight,
	    autoHeight: true,
	    loop: true,
	    loopRewind: true,
	    fadeinLoadedSlide: false,
	    globalCaption: true,
	    keyboardNavEnabled: true,
	    globalCaptionInside: false,
	    navigateByClick: false,

	    visibleNearby: {
	      enabled: true,
	      centerArea: 0.84,
	      center: true,
	      breakpoint: 750,
	      breakpointCenterArea: 0.84,
	      navigateByCenterClick: false
	    }
	}).data('royalSlider');

	if($('#jqt .royalSlider').length > 0) {
		// get max slide height
		var maxSlideHeight = 0;
		$('.royalSlider .rsSlide').each(function() {
			if($(this).height() > maxSlideHeight)
				maxSlideHeight = $(this).height();
		});

		$('#jqt .royalSlider').css('min-height', (maxSlideHeight+100)+'px');
	}

	contentSlider.ev.on('rsAfterSlideChange', function(event) {
	    //console.log("rsAfterSlideChange")
	});
	contentSlider.ev.on('rsBeforeAnimStart', function(event) {
	    //console.log("rsBeforeAnimStart")
	    // before animation between slides start
	});

	setTimeout(function () { if(myScroll) myScroll.refresh() }, 100);
}

function isEmpty(str) {
	if(!str)return true;
	if(str=="")return true;
	return (/^\s*$/).test(str);
}