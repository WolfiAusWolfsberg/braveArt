/* the resize functions
 * started in starter.js (getViewport) */
var waitForFinalEvent = (function () {
  var timers = {};
  return function (callback, ms, uniqueId) {
    if (!uniqueId) {
      uniqueId = "Don't call this twice without a uniqueId";
    }
    if (timers[uniqueId]) {
      clearTimeout (timers[uniqueId]);
    }
    timers[uniqueId] = setTimeout(callback, ms);
  };
})();

var getViewport = function (_this) {
	// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
	let vh = window.innerHeight;
	let vw = window.innerWidth;
	// Then we set the value in the --vh custom property to the root of the document
	document.documentElement.style.setProperty('--vh', vh + 'px');
	document.documentElement.style.setProperty('--vw', vw + 'px');
	//alert(getComputedStyle(document.documentElement).getPropertyValue('--vh') + '#' + getComputedStyle(document.documentElement).getPropertyValue('--vw'));
}

$(window).resize(function () {
    waitForFinalEvent(function(){
      getViewport();
    }, 500, "some unique string");
});
/* the resize function */


var getRandom = function () { return Math.random(0,1000); },
	standardError = function (msg = 'An error occurred', title = '', pos = 'top-center', hideOn = 2500) {  $.WOLF.core.toast.show('danger', title, msg, pos, hideOn, true);},
	standardOK = standardOk = standardSuccess = function (msg = 'standardError', title = '', pos = 'top-center', hideOn = 2500) {  $.WOLF.core.toast.show('success', title, msg, pos, hideOn, true);},
	standardWarn = function (msg = 'standardError', title = '', pos = 'top-center', hideOn = 2500) {  $.WOLF.core.toast.show('warning', title, msg, pos, hideOn, true);},
	standardInfo = function (msg = 'standardError', title = '', pos = 'top-center', hideOn = 2500) {  $.WOLF.core.toast.show('info', title, msg, pos, hideOn, true);},
	standardPrompt = function (msg = 'standardPrompt', title = '', pos = 'top-right', hideOn = 5000) {  $.WOLF.core.toast.show('success', title, msg, pos, hideOn, true);},
	ajaxError = function (msg ) { standardError(msg.responseText); },
	debug = function (msg, msg2 = null, fix = false) { var reset = false;
		if (showDebug !== false)  { if(!msg2) console.log(msg); else console.log(msg, msg2); }
		},
	fdebug = function (msg, msg2) { var reset = false;
		if(showDebug == false) { reset = true; showDebug = true; }
		debug(msg, msg2);
		if (reset == true) showDebug = true; },
	sdebug = function (msg) { var reset = false;
		msg = '------------------ [ ' + msg + ' ] ------------------';
		if(showDebug == false) { reset = true; showDebug = true; }
		debug(msg);
		if (reset == true) showDebug = true; },
	timer = function (msg) { if (showTime !== false) return console.log(msg); };
	
var getTag = function(obj) {    return $(obj).prop("tagName").toLowerCase(); }; 
var removeAttributes = function (obj, whitelist = []) { $.each($(obj).getAttributes(), function (key) { if( $.inArray(key,whitelist) == -1 ) {  try { $(obj).removeAttr(key);  } catch (e) { } }  });  return; }
var changeTag = function (targetSelector, newTagString) { $(targetSelector).each(function(){ var newElem = $(newTagString, {html: $(this).html()}); $.each(this.attributes, function() { newElem.attr(this.name, this.value); }); $(this).replaceWith(newElem);}); }

//returns object key, value
jQuery.fn.getAttributes = function() { var attributes = {};  if( this.length ) { $.each( this[0].attributes, function( index, attr ) { attributes[ attr.name ] = attr.value; } );  } return attributes; };
jQuery.fn.getDataAttributes = function() { var attributes = {};  if( this.length ) { $.each( this[0].attributes, function( index, attr ) { var name = attr.name, plainname = name.replace(/data-/, ""); if(attr.name.indexOf('data-') == 0) attributes[ plainname ] = attr.value;  } );  } return attributes; };
//returns list of attr (keys only)
jQuery.fn.listAttributes = function() { var list = [];  if( this.length ) { $.each( this[0].attributes, function( index, attr ) { list.push(attr.name); } );  } return list; };
jQuery.fn.listDataAttributes = function() { var list = [];  if( this.length ) { $.each( this[0].attributes, function( index, attr ) { if(attr.name.indexOf('data-') == 0) list.push(attr.name.replace(/data-/, "")); } );  } return list; };

jQuery.fn.hasAttr = function(name) {   return this.attr(name) !== undefined; };
jQuery.fn.hasData = function(name) {   return (this.data(name) || this.attr('data-' + name)) !== undefined; };
jQuery.fn.isTag = function(name) {   if(this) return this.prop("tagName").toLowerCase() == name.toLowerCase() ? true : false; };
jQuery.fn.Tag = function() {    return this.prop("tagName").toLowerCase(); };
jQuery.fn.outerHTML = function(s) { var clone = this.eq(0).clone(); $(clone).find('div.grid-inner').empty().html('{{content}}'); return $(clone).html(); };
jQuery.fn.makeArray = function (input) { if ( typeof input === 'string' ) { return array ( input ) } else return input;  }
jQuery.fn.stringArray = function (input) { if ( $.isArray(input) ) { return input.join(','); } else return input;  }
jQuery.fn.refresh = function() { return $(this.selector); };

function redirectHome () { return window.location.href = REDIRECT; }
var resetStates = function() { return $('.state-missing, .state-wrong, .state-invalid, .state-focus').removeClass('state-missing state-wrong state-invalid state-focus');}
jQuery.fn.setState = function(stateKlass) { return $(this).closest('fieldset').addClass('state-' + stateKlass);}

var apo = function (value) { return value.replace(/'/g, '´'); }
var data2String = function (data = {}, str = '') {  
	$.each(data, function (key, value) { str += '&' + key + '=' + escape(value); });
	return str;
}

/*var myDropdown = function (listArray = [], data = {}) {
	var dropToggle = $('<div class="dropDown"></div>'),
		dropToggler = $('<a id="tableOptions" class="print-hidden dropdown-toggle cursor-pointer" data-toggle="dropdown" aria-expanded="false" aria-haspopup="true" draggable="false"><span class="group-icon"><i class="bi bi-gear"></i><i class="bi bi-gear-fill"></i></span></a>'),
		dropList = $('<ul aria-labelledby="tableOptions" style="margin-left:-200px;" class="print-hidden border bw-1 dropdown-menu dropdown-menu-clean dropdown-menu-navbar-autopos p-0 mt--8 fs--15 w--220" data-placement="top-end"></ul>');
				
	$(dropToggle).append(dropToggler).append(dropList);
	$.each(listArray, function (key) {
		$(dropList).append(listArray[key]);
	});
	return dropToggle;
}*/

var standardConfirm = function (obj, width = 500, data = {}) {
	
		var info = $.extend($(obj).data(), data), myWidth = ' style="width:' + width + 'px;max-width:95%;" ';
		
		if($('#myModal').length > 0) $('#myModal').remove();
		$('body').append('<div class="modal fade confirmation" id="myModal" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"><div role="document" class="modal-dialog modal-dialog-centered" ' + myWidth + '></div></div>');
	    
	    var successhandle = info.success ? info.success : alert('no successhandle available');
	    
	    var yestxt = info.yes ? info.yes : 'Yes',
	    	notxt = info.no ? info.no : 'Cancel',
	    	title = info.title ? info.title : 'Please confirm!',
	    	txt = info.txt ? info.txt : 'Are you sure?';
	    
	    
	    var buttons =   '<button data-dismiss="modal" class="btn btn-danger btn-sm"><span class="fi-close"></span>' + notxt + '</button>' +
	    				'<span class="flex-grow-1"></span>' +
	    				'<button onclick="' + successhandle + '" data-dismiss="modal" class="btn btn-primary btn-sm"><span class="fi-check"></span>' + yestxt + '</button>';
		
		
		
		var content = $('<div class="modal-content animate-pulse-gray"></div>');
		$(content).append('<div class="body d-flex flex-column"><h4 class="mt-3">' + title + '</h4><p>' + txt + '</p></div>')
				  .append('<div class="footer">' + buttons + '</div>');
		
		$('#myModal').find('.modal-dialog').empty().append(content);
	    
	    if($('#myModal').find('.header').find('button[data-dismiss]').length == 0) { $('#myModal').find('.header').append('<button data-dismiss="modal"></button>');}
		
		$('#myModal').on('shown.bs.modal', function (event) {  AX.start(); });
		$('#myModal').on('hide.bs.modal', function () { });
		$('#myModal').on('hidden.bs.modal', function () { 
			$('#myModal').remove();
			$('.modal-backdrop').remove();
			});
		$('#myModal').modal({backdrop: 'static', keyboard: false, focus: true, show: true});
}

var mySide = function (type, content, data = {}) {
	let options = $.extend({
			width: 400,
			arrow: true,
			display: 'app',
			avatar: false,
			content: null,
			personal: false,
			title: 'test',
			type: 'help',
			subtitle: null,
			obj: null,
			buttons: [[	'ok', function () { $('#myModal').modal('hide');} ] ]
		}, data);
		
		return Navigation.mobile_rightview(type, true, options);
}

var myHelp = function (obj, starter = null, data = {}) {
		myObj = obj, requestFile = BOXDIR + '?' + data2String(data, 'dir=help&file=' + starter);
		
		return $('#middle_help').fadeOut().empty().load( requestFile).promise().done(function() {
	            Navigation.mobile_rightview('help');
	            //calc height / width of player 
	            var w = $('#aside-help').width() * 0.95, h = w*9/16;
	            if($('#help_player').length > 0) $('#help_player').css({width: w + 'px', height: h + 'px'});
	            //populate the fields
	            setTimeout(function () {
	            	if($('#setVideoID').val().length > 0)
	            		$('#videoSettings').data('id', $('#setVideoID').val());
	            	if($('#setStart').val().length > 0)
	            		$('#videoSettings').data('start', $('#setStart').val());
	            	if($('#setEnd').val().length > 0)
	            		$('#videoSettings').data('end', $('#setEnd').val());
	            	if($('#setHeadline').length > 0) $('#help-subtitle').text($('#setHeadline').val());
	            	$('#setAdmin').remove();
	            	setTimeout(function () {
	            		$('#videoSettings').click();
	            	}, 500);
	            	AX.start('#middle_help');
	            	$('#middle_help').fadeIn();
	            }, 100);
	        });
}

var myItem = function (obj, starter = null, data = {}) {
		myObj = obj, requestFile = BOXDIR + '?' + data2String(data, 'dir=items&file=' + starter);
		//set the object in $Item !!!
		
		console.log(obj);
		
		$('#middle_items').empty().load( requestFile ).promise().done(function() {
			var w = $('#aside-items').width();
			if(w < 400) { $('#aside-items').addClass('mobileWidth'); } else { $('#aside-items').removeClass('mobileWidth');}
			
            Navigation.mobile_rightview('items');
            setTimeout(function () {
	            	if($('#setHeadline').length > 0) $('#item-subtitle').text($('#setHeadline').val());
	            	setTimeout(function () {
	            		$Item.startBox(obj);
	            	}, 300);
	            	$('#middle_items').fadeIn();
	            }, 300);
            
        });
}

var myItemmodal = function (obj, starter = null, data = {}) {
		myObj = obj, requestFile = BOXDIR + '?' + data2String(data, 'dir=items&file=' + starter);
		//set the object in $Item !!!
		
		var loadHandle = function () { 
			var w = $('.modal-content').width();
			if(w < 400) { $('.modal-content').addClass('mobileWidth'); } 
			else { $('.modal-content').removeClass('mobileWidth');}
			
			
			$Item.startBox(obj, true); }
			
			console.log(obj);
		
		$.get( requestFile, function( response ) {
	        myDialog(response, {
	        		width: 800, 
			  		display: 'self', 
			  		title: 'Generator', 
			  		subtitle: 'Workflow', 
			  		closer: 'button',
			  		onload: loadHandle
			  		});
			  		
		});
		return;
}



var myDialog = function (content, data = {}) {
		
		if (typeof content == "string") {
		    //alert("I'm a string!");
		} else {
			data = $.extend($(content).data(), data);
			content = $(content).data('content');
		}
		
		let options = $.extend({
			width: 400,
			arrow: true,
			type: 'alert',
			display: 'app',
			avatar: false,
			content: null,
			personal: false,
			title: null,
			subtitle: null,
			onload: null,
			closer: null,
			footer: true,
			buttons: [[	'ok', function () { $('#myModal').modal('hide');} ] ]
		}, data);
			
		if($('#myModal').length > 0) $('#myModal').remove();
		
		var modal = $('<div id="myModal" class="modal fade dialog"></div>'),
			modalDialog = $('<div class="modal-dialog modal-dialog-centered" style="width:' + options.width + 'px;max-width:95%;"></div>'),
			modalContent = $('<div class="modal-content"></div>'),
			modalHeader = $('<div class="header"></div>'),
			modalBody = $('<div class="body"></div>'),
			modalFooter = $('<div class="footer"></div>'),
			buttonRow = [],
			buttons;
			
			$(modal).append(modalDialog).addClass(options.type);
			$(modalDialog).append(modalContent);
			$(modalContent).append(modalHeader).append(modalBody).append(modalFooter);
			
			
			/* headerDiv */
			var header = $('<div class="w-row vert-center hor-left"></div>');
			if(options.display == 'app' || (options.display == 'title' && !options.title) ) { 
				$(modalHeader).addClass('app'); 
				titlebox = $('<div class="titlebox"></div>'); 
				$(header).append(titlebox);
				
				$(header).prepend("<div class='avatar_40' style='background-image:url(\"" + APP_ICON + "\");'></div>");
				$(titlebox).append('<span class="title">' + APP_NAME + '</span>');
				if(options.title) $(titlebox).append('<span class="subtitle">' + options.title + '</span>');
				else $(titlebox).find('.title').addClass('big');
				//$(modalHeader).append(header).append('<button data-dismiss="modal"></button>');
			} else if(options.display == 'self') { 
				$(modalHeader).addClass('app'); 
				titlebox = $('<div class="titlebox"></div>'); 
				$(header).append(titlebox);
				
				$(header).prepend("<div class='avatar_40' style='background-image:url(\"" + APP_ICON + "\");'></div>");
				if(options.title) $(titlebox).append('<span class="title">' + options.title + '</span>');
				else $(titlebox).append('<span class="title">' + APP_NAME + '</span>');
				if(options.subtitle) $(titlebox).append('<span class="subtitle">' + options.subtitle + '</span>');
				else $(titlebox).find('.title').addClass('big');
				//$(modalHeader).append(header).append('<button data-dismiss="modal"></button>');
			} else if(options.display == 'avatar') { 
				$(modalHeader).addClass('avatar'); 
				titlebox = $('<div class="titlebox"></div>'); 
				$(header).append(titlebox);
				
				$(header).prepend("<div class='avatar_40' style='background-image:url(\"" + $('#admin_userpic').val() + "\");'></div>");
				$(titlebox).append('<span class="title big">' + $('#admin_username').val() + '</span>');
				if(options.title) $(titlebox).append('<span class="subtitle">' + options.title + '</span>');
				else $(titlebox).find('.title').addClass('big');
				
			} else if(options.display == 'title') {
				$(modalHeader).addClass('title'); 
				$(modalHeader).append('<div>' + options.title + '</div>');//.append('<button data-dismiss="modal"></button>');
			}
			if(!options.closer) $(modalHeader).append(header).append('<button data-dismiss="modal"></button>');
			else $(modalHeader).append(header).append('<a data-dismiss="modal" class="regularBtn">O.K.</a>');
			$(modalBody).html(content);
		
		//buttonrow
		var i = 0;
		if(options.footer == true) {
			$.each(options.buttons, function () {
					var newBtn = $('<button>' + options.buttons[i][0] + '</button>');
					if(options.buttons[i].length > 2) $(newBtn).addClass(options.buttons[i][2]).css('order', 2);
					if(options.buttons[i].length > 1) $(newBtn).on('click', options.buttons[i][1]);
					$(newBtn).on('click', function () { $('#myModal').modal('hide'); });
					$(modalFooter).append(newBtn);
					i++;
			});
		} else $(modalFooter).remove();
		if(options.closer) { $(modalFooter).remove(); }
		
		
		/* run */
		$('body').append(modal);
		$('#myModal').on('shown.bs.modal', function (event) {  
			AX.start();
			if(options.onload) options.onload(); });
		$('#myModal').on('hide.bs.modal', function () { });
		$('#myModal').on('hidden.bs.modal', function () { 
			$('#myModal').remove();
			$('.modal-backdrop').remove();
			});
		$('#myModal').modal({keyboard: false, focus: true, show: true});
}


/*** ProjectSwitcher from Base or Projectlist ***/
var TEST = 0;
function switchProject (projectID = 0, projectName = null, projectCat = null, projectPlan = 0) {
			
			/* 
			 * to change into projects: comes from projectlist only !!!!!!
			 * to change out of project: $.Member.switchProject()
			 * stateInfo() writes the breadcump info in header
			 */
			
			function breadcumpInfo (projectID, projectName, projectCat, projectPlan) {
 				var projectID = $('#admin_project').val(),
					projectName = $('#admin_projectname').val(),
					projectCat = $('#admin_projectcat').val(),
					projectPlan = $('#admin_projectplan').val();
					
					if(projectPlan == 1) projectPlanTxt = '<span class="text-highlight">Premium</span>';
					else projectPlanTxt = '<span class="text-muted">Free</span>';
		
					if(projectID > 0) {
						switch(projectCat) {
							case 'A': document.documentElement.style.setProperty('--back', '#ebebe0');break;
							case 'G': document.documentElement.style.setProperty('--back', '#d1e0e0');break;
							case 'E': document.documentElement.style.setProperty('--back', '#fff0b3');break;
							case 'F': document.documentElement.style.setProperty('--back', '#ebebe0');break;
							case 'C': document.documentElement.style.setProperty('--back', '#ebebe0');break;
							default: document.documentElement.style.setProperty('--back', '#ebebe0');break;
						}
						
						$('#topMemberName').hide();
						$('#topProjectName').html('#' + projectID + ' | ' + projectName + ' | ' + projectCat + ' ' + projectPlanTxt).fadeIn();
						$('#cathead').text(projectName);
					} 
					else {
						$('#topProjectName').text('').hide();
						$('#topMemberName').fadeIn();
						$('#cathead').text('');
					}
					return;
			}
			
			function afterSwitch (projectID = 0, projectCat = 0) {
				$('#aside-left .active').removeClass('active');
				if(projectID > 0) {
				var chapter = $('#aside-left').find('li.nav-item[data-cat=' + projectCat + ']:first'),
					link = $(chapter).find('a');
 				$(chapter).addClass('active');
 				$(link).click();
 				return false;
 				}
			}
			
		if(projectID == 0) {
			$('body').removeAttr('data-mode'); 
			$('#admin_project').val(0);
			$('#admin_projectname').val('');
			$('#admin_projectcat').val('');
			$('#admin_projectplan').val(0);
			$('body').attr('data-plan', projectPlan);
			afterSwitch(projectID);
		} else {
			$('body').attr('data-mode', projectCat); 
			$('#admin_project').val(projectID);
			$('#admin_projectname').val(projectName);
			$('#admin_projectcat').val(projectCat);
			$('#admin_projectplan').val(projectPlan);
			$('body').attr('data-plan', projectPlan);
			afterSwitch(projectID, projectCat);
		}
		breadcumpInfo();
		return false;
		
}



//standard Keyup	
$(document).keyup(function(e) {
  if (e.keyCode === 27) {
  	try { if($('div#dropmaster').length > 0) { $.WOLF.wolfi.media.downlightDropmaster();  } } catch (e) {console.log('ESC tried to close the dropzone');}
  }
});


//extend
jQuery.extend(jQuery.expr[':'], {
    invalid : function(elem, index, match){
        var invalids = document.querySelectorAll(':invalid'),
            result = false,
            len = invalids.length;

        if (len) {
            for (var i=0; i<len; i++) {
                if (elem === invalids[i]) {
                    result = true;
                    break;
                }
            }
        }
        return result;
    }
});



var $Cookie = {
	standardName: 'allowCookie',
	get: function (name = $Cookie.standardName) {
		var keyValue = document.cookie.match("(^|;) ?" + name + "=([^;]*)(;|$)");
    	return keyValue ? keyValue[2] : keyValue;
	},
	set: function (name = $Cookie.standardName, value = true, expire = 31000000) {
		var expires = new Date();
    	expires.setTime(expires.getTime() + expire);
    	document.cookie = name + "=" + value + ";expires=" + expires.toUTCString();
    	return;
	},
	removeAll: function () {
		var cookies = document.cookie.split(";");

	    for (var i = 0; i < cookies.length; i++) {
	        var cookie = cookies[i];
	        var eqPos = cookie.indexOf("=");
	        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
	        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
	    }
	    return;
	},
	init: function () {
		var cookieNotice = $Cookie.get($Cookie.standardName);
		if(!cookieNotice || cookieNotice == null || cookieNotice == 'null' || cookieNotice == 'false' || cookieNotice == false) {
			$('#cookie-notice').addClass('show');
			$('#cookie-notice').find('button').each(function () {
					return $(this).on('click', function () {
						if($(this).hasAttr('data-set')) {
							$Cookie.set($Cookie.standardName, true);
							$Cookie.set($Cookie.standardName + '_date', new Date());
							$('#cookie-notice').removeClass('show');
						} else {
							$('#cookie-notice').removeClass('show');
						}
					});
			})
		} 
	}
}