jQuery.jkNav=function(options) {
	jQuery.jkNavData={};
	if($.isPlainObject(options)) {
		jQuery.jkNavData.settings=$.extend(options, {down:74, up:75, padding:0, duration:100, complete:function(){return null;}};
	} else {
		jQuery.jkNavData.settings={selector:options, down:74, up:75, padding:0, duration:100, complete:function(){return null;}};
	}
	/*
		options={
			selector: '#blogdesc, #blogtitle, .post.text',
			up: 75,
			down: 74,
			padding: 0,
			duration:100,
			complete:function(){};
		}
	*/
	jQuery(document).keydown(function(e) {
		if(jQuery(document.activeElement).not('body').length==0 && jQuery.jkNavData.run==true) {
			jQuery.jkNavData.run=true;
		} else if(jQuery(document.activeElement).not('body').length!=0 && jQuery.jkNavData.run==true){
			jQuery.jkNavData.run=false;
			jQuery.jkNavData.reason="input";
		} else if(jQuery.jkNavData.run==false && jQuery(document.activeElement).not('body').length==0) {
			if(jQuery.jkNavData.reason=="input") {
				jQuery.jkNavData.run=true;
				jQuery.jkNavData.reason="";
			}
		}
		if(jQuery.jkNavData.run==true) {
			if(e.which==jQuery.jkNavData.settings.up || e.which==jQuery.jkNavData.settings.down) {
				jQuery.jkNavData.inPort={aLength:jQuery(jQuery.jkNavData.settings.selector).length};
				jQuery(jQuery.jkNavData.settings.selector).each(function(i) {
					if((jQuery(document).scrollTop()-Math.round(jQuery(this).offset().top))<(0-jQuery.jkNavData.settings.padding)) {
						jQuery.jkNavData.inPort={exact:false, element:jQuery(this), index:i, aLength:jQuery.jkNavData.inPort.aLength};
						return false;
					} else if((jQuery(document).scrollTop()-Math.round(jQuery(this).offset().top))==(0-jQuery.jkNavData.settings.padding)) {
						jQuery.jkNavData.inPort={exact:true, element:jQuery(this), index:i, aLength:jQuery.jkNavData.inPort.aLength};
						return false;
					}
				});
				switch(e.which) {
					case jQuery.jkNavData.settings.up:
						if(jQuery.jkNavData.inPort.index!=0) {
							jQuery.jkNavData.run=false;
							jQuery('body, html').animate({
								scrollTop:(Math.round(jQuery(jQuery.jkNavData.settings.selector).eq(jQuery.jkNavData.inPort.index-1).offset().top)-jQuery.jkNavData.settings.padding)
							}, {
								'duration': jQuery.jkNavData.settings.duration, 
								'easing':'swing', 
								'complete':function(){
									jQuery.jkNavData.run=true;
									jQuery.jkNavData.settings.complete();
								}
							});
						}
					break;
					case jQuery.jkNavData.settings.down:
						if((jQuery.jkNavData.inPort.aLength-1)!=jQuery.jkNavData.inPort.index && jQuery.jkNavData.inPort.exact==true) {
							jQuery.jkNavData.jkNavtf=false;
							jQuery('body, html').animate({
								scrollTop:(Math.round(jQuery(jQuery.jkNavData.settings.selector).eq(jQuery.jkNavData.inPort.index+1).offset().top)-jQuery.jkNavData.settings.padding)
							}, {
								'duration': jQuery.jkNavData.settings.duration,
								'easing':'swing',
								'complete':function(){
									jQuery.jkNavData.run=true;
									jQuery.jkNavData.settings.complete();
								}
							});
						} else if((jQuery.jkNavData.inPort.aLength-1)!=jQuery.jkNavData.inPort.index && jQuery.jkNavData.inPort.exact==false) {
							jQuery.jkNavData.run=false;
							jQuery('body, html').animate({
								scrollTop:(Math.round(jQuery(jQuery.jkNavData.settings.selector).eq(jQuery.jkNavData.inPort.index).offset().top)-jQuery.jkNavData.settings.padding)
							}, {
								'duration': jQuery.jkNavData.settings.duration,
								'easing':'swing',
								'complete':function(){
									jQuery.jkNavData.run=true;
									jQuery.jkNavData.settings.complete();
								}
							});
						}
					break;
				}
			}
		}
	});
	jQuery.jkNavData.run=true;
}
