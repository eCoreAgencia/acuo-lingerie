;(function( $ ) {

    "use strict";

	$(document).ready( function(){
	    
		var $body = $('body');

		$('.btn-nav-mobile').click( function(){
			if( $('#mobile-nav').length ){
				if( $('#mobile-nav').is(':visible') ){
					$('#mobile-nav').fadeOut();
				}else{
					$('#mobile-nav').fadeIn();
				}
			}
			return false;
		});	
		
		$(document).on('click', '#mobile-nav .mask, #mobile-nav .btn-close', function(){
			$('#mobile-nav, #mobile-nav h3 + ul').fadeOut();
			return false;
		});	
		$(document).on('click', '#mobile-nav .menu-departamento > h3 a', function(event) {
			var $this = $(this).parents('h3');
			var classes = $this.attr('class').split(' ');

			if( $('ul.'+ classes[0] ).length ){
				$('ul.'+ classes[0] ).fadeIn();
				if( !$('ul.'+ classes[0] ).find('.btn-close-children').length ){
					$('ul.'+ classes[0] ).prepend('<li class="children-title"><button class="btn-close-children">'+$this.find('a').text()+'</button></li>')
				}
			}
			return false;
		});
		$(document).on('click', '#mobile-nav .btn-close-children', function(event) {
			var $this = $(this);
			var $parent = $this.parents('ul');
			$parent.fadeOut();
			return false;
		});

		$('.nav-bar .menu-departamento>ul').each(function(index, el) {
			var $this = $(this),
				$li = $this.find('>li'),
				length = $li.length;

			if(length > 7){
				$this.addClass('maior');
			}
		});
		

		if( $('.nav-bar .menu-departamento').length ){

			$('body').append('<div id="mobile-nav" style="display:none;"><div class="mask visible-xs"></div><div class="receive-nav"></div></div>');
			$('#mobile-nav .receive-nav').append($('.nav-bar .menu-departamento').clone());

			$.each( $('.nav-bar .menu-departamento > ul'), function(){
				var $this = $(this);
				if( !$this.find('li').length ){
					$this.remove();
				}
			});

			$('.nav-bar .menu-departamento').not('ul').mouseleave(function(event) {
				$('.nav-bar .menu-departamento h3 + ul').hide();
				$('.nav-bar .menu-departamento h3.active').removeClass('active');
			});

			$('.nav-bar .menu-departamento h3').mouseenter(function(event) {
				var $this = $(this);
				var classes = $this.attr('class').split(' ');

				$('.nav-bar .menu-departamento h3.active').removeClass('active');
				$this.addClass('active');

				if( $('ul.'+ classes[0] ).length ){
					$('.nav-bar .menu-departamento h3 + ul').hide();
					$('ul.'+ classes[0] ).slideDown();
				}
				return false;
			});
		}

		/*img menu*/
		$('#footer .banner-menu').each(function(index, el) {
			var $this = $(this);
			var id = $this.attr('data-id');

			if( $this.find('img') ){
				var $ul = $('.nav-bar .menu-departamento ul').eq(id);

				if( $ul.length ){
					$ul.css('background-image', 'url("'+$this.find('img').attr('src')+'")');
				}
			}
		});

		if( $('.about-us').length ){
			var ajustAboutUs = function(){
				if( $(window).width() >= 768 ){
					var aux = 0;
					$.each( $('.about-us .col-sm-6'), function(){
						if ( $(this).outerHeight() > aux ){
							aux = $(this).outerHeight();
						}
					});
					$('.about-us .col-sm-6').css('min-height', aux);	
				}else{
					$('.about-us .col-sm-6').css('min-height', 1);
				}
			}
			ajustAboutUs();
			$(window).resize(function(event) {
				ajustAboutUs();
			});
		}

		if( $('.row-banners').length ){
			$.each( $('.row-banners'), function(){
				var colX = 12 / $('> .box-banner', $(this)).length;
				$(">.box-banner", $(this)).addClass('col-sm-'+colX);
			});
		}

		if( $('link[href*="/bootstrap/2"]').length && ( $('body').hasClass('ad-orders') ) ){
			$('link[href*="/bootstrap/2"]').remove();
		}

		// Topo scroll
	    if( $('.barra-header-flutuante').length ){
	    	var contactBar = $('.barra-header-flutuante .contact-bar').outerHeight();
	    	var paddingTop = function(){
    			$body.css('padding-top', $('.barra-header-flutuante').outerHeight() );
	    	};
	    	var scrollHeader = function(){
	    		if( $(window).scrollTop() > contactBar && !$body.hasClass('scroll-header-active') ){
	    			$body.addClass('scroll-header-active');
	    		}else if( $(window).scrollTop() <= contactBar && $body.hasClass('scroll-header-active') ){
    				$body.removeClass('scroll-header-active');
	    		}
	    		paddingTop();
	    	};
	    	scrollHeader();
	    	$(window).scroll( function(){
	    		scrollHeader();
	    	}).resize(function() {
	    		scrollHeader();
	    	});
	    }
	    // FIM topo scroll

	    // MODAL
		$('[data-toggle="modal"]').click( function(){
			var $this = $(this);
			var $box = $( $this.attr('href') );

			if( $box.length ){
				$body.addClass('modal-open');
				$box.removeClass('hide').addClass('in');
				$box.fadeIn();
				return false;
			}
		});
		$('[data-dismiss="modal"]').click(function(event) {
			var $this = $(this);
			var $modal = $this.parents('.modal');

			if( $modal.length ){
				$modal.fadeOut( function(){
					$modal.removeClass('in').addClass('hide');
					$body.removeClass('modal-open');
				});
				return false;
			}
		});
		// MODAL

		// LINK ANCHOR
		$(document).on('click', '.btn-anchor', function(){
			var $this = $(this);
			var id = $this.attr('href');
			var margemTop = $('#header').outerHeight();

			if( $('#menu-principal').is(':visible') ){
				margemTop += $('#menu-principal').outerHeight();
			}

			if( $(id).length ){
				$("html, body").animate({ 
					scrollTop: ($(id).offset().top - (margemTop))
				}, 600);
	    		return false;	
			}
		});
		// LINK ANCHOR

		// Showcase OWL
		if( $.fn.owlCarousel ){
			if( $('.showcase-owl, .showcase-owl-3').length ){
				$('.showcase-owl .helperComplement,.showcase-owl-3 .helperComplement').remove();
				$('.showcase-owl  .ad-showcase > ul').owlCarousel({
					items 			: 4,
					itemsDesktop 	: [1199,4],
					itemsTablet 	: [991,3],
					itemsMobile 	: [767,2],
					navigation 		: true,
					navigationText 	: ['<i class="fa fa-angle-left" aria-hidden="true"></i>','<i class="fa fa-angle-right" aria-hidden="true"></i>'],
					pagination 		: true,
					lazyLoad 		: true,
				});
				$('.showcase-owl-3 .ad-showcase >  ul').owlCarousel({
					items 			: 3,
					itemsDesktop 	: [1199,3],
					itemsTablet 	: [991,2],
					itemsMobile 	: [767,2],
					navigation 		: true,
					navigationText 	: ['<i class="fa fa-angle-left" aria-hidden="true"></i>','<i class="fa fa-angle-right" aria-hidden="true"></i>'],
					pagination 		: true,
					lazyLoad 		: true,
				});
			}
		}

		/*instagram*/
		if( $('#ad-instagram').length ){
		    var $recebePhotos = $('#ad-instagram > ul');
		    var token       = '178528238.cf9661c.1ffb175e85374b80b20f41121af8b789', // STRING
		        userid      = 178528238, // INT
		        num_photos  = 5; // QUANTIDADE DE FOTOS QUE VAI BUSCAR
		    $.ajax({
		        url     : 'https://api.instagram.com/v1/users/' + userid + '/media/recent',
		        dataType: 'jsonp',
		        type    : 'GET',
		        data    : {access_token: token, count: num_photos},
		        success: function(data){
		            for( var x = 0; x < data.data.length; x++ ){
		                $recebePhotos.append('<li><a href="'+data.data[x].link+'" target="_blank"><img src="'+data.data[x].images.low_resolution.url+'"></li>');
		            }
		            $('#ad-instagram').fadeIn();
		        },
		        error: function(data){
		            $('#ad-instagram').hide();
		        }
		    });

		}

		// Showcase OWL
		if( $body.hasClass('ad-home') ){

			if( $.fn.owlCarousel ){
				// Full banner
				$("#full-banner").owlCarousel({
					singleItem 			: true,
                    items               : 1,
                    autoPlay            : true,
                    stopOnHover         : true,     
                    navigation          : true,
                    navigationText 		: ['<i class="fa fa-angle-left" aria-hidden="true"></i>','<i class="fa fa-angle-right" aria-hidden="true"></i>'],
                    pagination   		: true,     
                    theme               : "",
                });
				// Full banner

				// Full banner
				$("#full-banner-mobile").owlCarousel({
					singleItem 			: true,
                    items               : 1,
                    autoPlay            : true,
                    stopOnHover         : true,     
                    navigation          : false,
                    pagination   		: true,     
                    theme               : "",
                });
				// Full banner

				// Menu de marcas
				$('#brands-home').owlCarousel({
					items 			: 7,
					itemsDesktop 	: [1199,7],
					itemsTablet 	: [991,5],
					itemsMobile 	: [767,1],
					autoPlay		: true,
					navigation      : true,
                    navigationText 	: ['<i class="fa fa-angle-left" aria-hidden="true"></i>','<i class="fa fa-angle-right" aria-hidden="true"></i>'],
					pagination 		: false,
					lazyLoad 		: true,
                });
				// Menu de marcas

				// mini-banner
				$('.mini-banner').owlCarousel({
					items 			: 3,
					itemsDesktop 	: [1199,3],
					itemsTablet 	: [991,2],
					itemsMobile 	: [767,1],
					autoPlay		: true,
					navigation      : false,
                    pagination 		: true,
					lazyLoad 		: false,
					stagePadding	: 50,
                });
				// mini-banner

				/*instagram*/
				$( window ).load(function() {
					/*instagram*/
					$('#ad-instagram ul').slick({
						autoplay: true,
						infinite: true,
						speed: 300,
						slidesToShow: 5,
						slidesToScroll: 5,
						centerPadding: '60px',
						responsive: [
							{
							  breakpoint: 1199,
							  settings: {
							  	centerMode: true,
							    slidesToShow: 4,
							    slidesToScroll: 4,
							  }
							},
							{
								breakpoint: 767,
								settings: {
									centerMode: true,
									slidesToShow: 3,
									slidesToScroll: 3,
								}
							}
						]
					});
				});
			}

		}else if( $body.attr('id') === 'product-page' ){

			if( $('.other-payment-method-content').length ){
				$('.other-payment-method-content').prepend('<button class="open-other-payment-method">ver parcelamento</button>');
				$('.open-other-payment-method').click(function(event) {
					var $e = $(this).parents('.other-payment-method-content').find('.other-payment-method');
					if( $e.length ){
						$e.addClass('other-payment-method-open');
					}
					return false;
				});
				$('.other-payment-method-content').mouseleave(function(event) {
					var $e = $(this).find('.other-payment-method');
					if( $e.length ){
						$e.removeClass('other-payment-method-open');
					}
					return false;
				});
			}

			if( $('a.buy-button').length ){
				$('a.buy-button').prepend('<i class="fa fa-lock" aria-hidden="true"></i>');
			}

			// THUMBS
			function thumbs (argument) {
				if(($('#show > .thumbs>li').length) > 1){
					$('#show > .thumbs').removeClass('slick-initialized slick-slider slick-dotted');
					$('#show > .thumbs').slick({
						dots: true,
						slidesToShow: 1,
						// centerPadding: '100px',
						// centerMode: true,
						responsive: [
							{
							  breakpoint: 1199,
							  settings: {
							  	// centerMode: true,
							  	// centerPadding: '60px',
							   slidesToShow: 1,
							  }
							},
							{
							  breakpoint: 991,
							  settings: {
							  	centerMode: true,
							  	centerPadding: '60px',
							   slidesToShow: 1,
							  }
							},
							{
								breakpoint: 767,
								settings: {
									centerPadding: '40px',
									centerMode: true,
									slidesToShow: 1,
								}
							}
						]
					});
				}				
			}

			// VARIATIONS
			function variations(element) {
				var $this = element;
				var $parentUl = $this.parents('ul');
				var width = $parentUl.find('.specification').outerWidth();
				var $parentLi = $parentUl.find('.select');

				$parentLi.css('padding-left',  (parseInt(width) + 20) + 'px');
			}

			//Cor (select produto)
			// function colorSelect(element) {
			// 	var $parent = element.parent('li'),
			// 		colorName = element.find('option:selected').val().toLowerCase(),
			// 		$exist = $parent.find('.color-select');
					
			// 	if(colorName){
			// 		if($exist.length){	
			// 			$exist.find('>img').attr('src', '//quintavalentina.vteximg.com.br/arquivos/'+colorName+'.png');
			// 		}else{
			// 			var $div = '<div class="color-select"><img alt="'+colorName+'" src="//quintavalentina.vteximg.com.br/arquivos/'+colorName+'.png" /></div>';
			// 			$parent.append($div);
			// 		}					
			// 	}else{
			// 		$exist.remove();
			// 	}
			// }

			//thumbs();
			if($('#product-page').length){
				var $var = $('.col-variations ul .select>select'),
					$c = $('.col-variations .Cor select');

				if($var.length){
					variations($var);
				}if($c.length){
					colorSelect($c);
				}
				
				//thumbs();
			}
		
			// VARIATIONS
			$('.col-variations ul .select>select').change(function(){
				variations($(this));
				//thumbs();
			});

			//Cor (select produto)
			$('.col-variations .Cor select').change(function(){
				colorSelect($(this));
			});

			// SOCIAL 
			$('.social-buttons > ul').socialButtons({
                buttons : ['facebook','twitter','googleplus'],
            });

            
		}else if( $body.attr('id') === 'department-page' ){
			
		}

		if( $.fn.mCustomScrollbar && $('.scroll-bar').length ){
			$('.scroll-bar').mCustomScrollbar();
		}

		var $inputSearch = $('#header .header-info .col-search .fulltext-search-box'); 

		$('#newsletterButtonOK').val('Cadastrar');

		if($inputSearch.length){
			if($('body').outerWidth() > 767){
				$inputSearch.focus(function() {
					$('#header .header-info').addClass('active');
				});
				$inputSearch.blur(function() {
					$('#header .header-info').removeClass('active');
				});
			}
		}

		/*busca cabecalho*/
		$(document).ajaxComplete(function() {
			if($(window).outerWidth() > 767){
				var $ul = '<ul class="produto"></ul>';
				$('ul.ui-autocomplete').append($ul);

				$('ul.ui-autocomplete > li').each(function(index, el) {
					var $this = $(this);
					var $img = $this.find('img');
					
					if($img.length){
						$('ul.ui-autocomplete > .produto').append($this);
					}
				});
			}
		});
		/*busca cabecalho*/

		//faixa de preco
		// var removeCaracteres = function( str ){
		// 	var specialChars = [
	    //         {val:"a",let:"áãà"},
	    //         {val:"e",let:"Ã©Ã¨ÃªÃ«"},
	    //         {val:"i",let:"Ã­Ã¬Ã®Ã¯"},
	    //         {val:"o",let:"Ã³Ã²ÃµÃ´Ã¶"},
	    //         {val:"u",let:"ÃºÃ¹Ã»Ã¼"},
	    //         {val:"c",let:"Ã§"},
	    //         {val:"A",let:"ÃÃ€ÃƒÃ‚Ã„"},
	    //         {val:"E",let:"Ã‰ÃˆÃŠÃ‹"},
	    //         {val:"I",let:"ÃÃŒÃŽÃ"},
	    //         {val:"O",let:"Ã“Ã’Ã•Ã”Ã–"},
	    //         {val:"U",let:"ÃšÃ™Ã›Ãœ"},
	    //         {val:"C",let:"Ã‡"},
	    //         {val:"",let:"?!()"}
	    //     ];
        //     var $spaceSymbol = '-';
        //     var regex;
        //     var returnString = str;
        //     for (var i = 0; i < specialChars.length; i++) {
        //         regex = new RegExp("["+specialChars[i].let+"]", "g");
        //         returnString = returnString.replace(regex, specialChars[i].val);
        //         regex = null;
        //     }
        //     return returnString.replace(/\s/g,$spaceSymbol).toLowerCase();
        // }

		// var preparaBoxRange = function(){
        //     if( !$.fn.ionRangeSlider ){
        //         console.log('Para habilitar a eh necessario inserir o plugin Range.Slider - http://www.jqueryrain.com/');
        //         return false;
        //     }
        //     var aux = 0;
        //     var id  = 0;
            
        //     var $lista  = $('ul.Faixa');
        //     var $itens  = $('li a', $lista);

        //     $lista.hide();

        //     $lista.after('<div id="price-range"></div>');

        //     var values = [];
        //     $.each( $itens, function(){
        //         var $t = $(this);
        //         var titulo = $t.attr('title');
        //         $t.attr('id', 'option-' + removeCaracteres(titulo) );
        //         values.push(titulo);
        //     });

        //     $("#price-range").ionRangeSlider({
        //         type    : "single",
        //         values  : values,
        //         min     : 0,
        //         max     : $itens.length,
        //         from    : 0,
        //         keyboard: true,
        //         onFinish: function (data) {
        //             var aux = $('#option-' + removeCaracteres( data.from_value ) );
        //             if( aux.length ){
        //                 window.location=aux.attr('href');
        //             }
        //         },
        //     });
        // }
        // $( window ).load(function() {
	    //     var valor_min = $('.irs-min').text();
		// 	var valor1 = valor_min.split(" ");
		// 	var texto1 = valor1[0];
		// 	$('.irs .irs-min').text(texto1);

		// 	var valor_max = $('.irs-max').text();
		// 	var valor2 = valor_max.split(" ");
		// 	var texto2 = valor2[2];
		// 	$('.irs .irs-min').text('R$ '+texto1);
		// 	$('.irs .irs-max').text('R$ '+texto2);
		// });
    	// //faixa de preco

		if($('body.ad-departament').length){	
			if($(window).outerWidth()  < 767){
				$('.header-categoria').append($('.resultado-busca-numero').eq(0));
				$('.header-categoria').append($('.row-department .showcase>.main>.sub').eq(0));
				$('.header-categoria>.sub').prepend($('.col-showcase #content-filter-mobile'));
				$('.header-categoria>.sub').prepend($('.col-showcase #filter-mobile'));
			}else{
				$('.header-categoria').append($('.col-showcase .sub').eq(0));
				// preparaBoxRange();
			}
		}

		if(('body#product-page').length){
	  		$('#product-specification table').addClass('table table-striped');
		}

		if($('body#account-page').length){
			$( window ).load(function() {
				if($('.profile-detail-display').length){
					var $name = $('.profile-detail-display>h5').text();
					$('.nome').html('Olá, ' + $name);

					$('.profile-detail-display>h4').after($('.edit-profile-link'));
				}
			});
		}

		/*cores departament*/
		// if( $('.Cor li a').length ){
        //     $('.Cor li a').each(function () {
        //         var $this = $(this);
        //         var title = $this.attr('title').toLowerCase();
        //         $(this).append('<img class="cor" alt="'+title+'" src="//quintavalentina.vtexcommercestable.com.br/arquivos/'+title+'.png" />');

        //     });
        // }
        // if( $('.search-single-navigator .Cor + ul.Filtros .filtro-ativo').length ){
        //     $('.search-single-navigator .Cor + ul.Filtros .filtro-ativo').each(function () {
        //         var $this = $(this);
        //         var title = $this.text().toLowerCase();
        //         $(this).html('<img class="cor" alt="'+title+'" src="//quintavalentina.vtexcommercestable.com.br/arquivos/'+title+'.png" />');

        //     });
        // }
        /*cores*/

        /*tabs*/
        $('.nav-tabs a').click(function (e) {
		  e.preventDefault();
		  $(this).tab('show');
		})
        /*tabs*/

        /*cores vitrine*/
        // if($('.variations-cor').length){
		// 	if($('.variations-cor ul>li').length){
		// 		$('.variations-cor ul>li').each(function(index, el) {
		// 			var $this = $(this);
		// 			var name = $this.text();
		// 			var $img = '<img alt="'+name+'" src="//quintavalentina.vteximg.com.br/arquivos/'+name+'.png" />'
		// 			$this.append($img);
		// 		});
		// 	}
		// }
		/*cores vitrine*/

		vtexjs.checkout.getOrderForm().done(function(orderForm) {
			var $login = $('#header .user > a.login');
			if (orderForm.loggedIn) {
				$login.attr('href', '/logout');
				$login.find('>span').text('Sair');
			}
			else {
				$login.attr('href', '/login');
				$login.find('>span').text('Entrar');
			}
    	});

	});

})(jQuery);