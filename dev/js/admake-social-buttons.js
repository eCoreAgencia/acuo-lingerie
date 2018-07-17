/**
* Plugin Authoring
*
* @author Leonam Bernini / ADMAKE <leonambernini@admake.com.br>
**/
;(function( $ ){

    "use strict";

    $.fn.socialButtons = function( params ) {

        // Default options
        var options = $.extend( {
            popUp   : true, // SE TRUE INSERIR CLASSE "sb-link-popup" no ELEMENTO 'A'
            buttons : ['facebook','twitter','googleplus','pinterest','linkedin'], //(array)
            btnText : {'facebook' : '<i class="fa fa-facebook"></i>','twitter' : '<i class="fa fa-twitter"></i>','googleplus' : '<i class="fa fa-google-plus"></i>','pinterest' : '<i class="fa fa-pinterest"></i>','linkedin' : '<i class="fa fa-linkedin"></i>'},
            html    : '<li class="item-social-share"><a href="[URL_SHARE]" target="_Blank" class="sb-link-popup"><span class="icone [CLASS_ID]">[TEXTO_BTN]</span><span class="count [CLASS_SEM_VALOR]">[VALOR]</span></a></li>',
        }, params);

        // Plugin variables
        var $self   = this;
        var redesSociais = {
                            'facebook'    : { 'urlCount': 'http://graph.facebook.com/?id=%%URL%%'                       , 'urlShare': 'http://www.facebook.com/sharer.php?u=%%URL%%'},
                            'twitter'     : { 'urlCount': 'http://cdn.api.twitter.com/1/urls/count.json?url=%%URL%%'    , 'urlShare': 'https://twitter.com/share?url=%%URL%%'},
                            'googleplus'  : {                                                                             'urlShare': "https://plus.google.com/share?url=%%URL%%"},
                            'pinterest'   : { 'urlCount': 'http://api.pinterest.com/v1/urls/count.json?url=%%URL%%'     , 'urlShare': "javascript:void((function()%7Bvar%20e=document.createElement('script');e.setAttribute('type','text/javascript');e.setAttribute('charset','UTF-8');e.setAttribute('src','http://assets.pinterest.com/js/pinmarklet.js?r='+Math.random()*99999999);document.body.appendChild(e)%7D)());"},
                            'linkedin'    : { 'urlCount': 'http://www.linkedin.com/countserv/count/share?url=%%URL%%'   , 'urlShare': 'http://www.linkedin.com/shareArticle?mini=true&amp;url=%%URL%%'},
    				    };
        
        // Put your DOM elements here
        var elements = {
            $htmlBody   : $('html,body'),
        };
        
        var methods = {
            init : function(){
            	$.each( options.buttons, function(k,v){
                    if( $.inArray( v, redesSociais ) ){
                        methods.geraButton( v );
                    }
                });

                if( options.popUp ){
                    events.abrePopup();
                }
            },
            preparaUrl : function( url ){
                return url.replace( /%%URL%%/gi, window.location.href );
            },
            getHtml : function( social, urlShare, count, btnText ){
                return options.html
                                .replace( /\[URL_SHARE\]/g, urlShare )
                                .replace( /\[CLASS_ID\]/g, 'icone-' + social )
                                .replace( /\[TEXTO_BTN\]/g, btnText )
                                .replace( /\[CLASS_SEM_VALOR\]/g, ( count === null ) ? 'hidden' : '' )
                                .replace( /\[VALOR\]/g, ( count === null ) ? '' : count );
            },
            criaBotao : function( social, urlShare, count, btnText ){
                $self.append( methods.getHtml( social, urlShare, count, btnText ) );
            },
            geraButton : function( social ){
                
                if( social !== undefined && social !== '' && social !== null ){

                    var urlCount = ( redesSociais[ social ]['urlCount'] === undefined || redesSociais[ social ]['urlCount'] === '' ) ? "#" : redesSociais[ social ]['urlCount'];
                    
                    var urlShare = ( redesSociais[ social ]['urlShare'] === undefined || redesSociais[ social ]['urlShare'] === '' ) ? "#" : redesSociais[ social ]['urlShare'];
                    var btnText  = ( options.btnText[ social ] === undefined || options.btnText[ social ] === '' ) ? social : options.btnText[ social ];

                    if( urlShare !== '#' ){
                        urlShare = methods.preparaUrl( urlShare );
                    }
                    if( urlCount !== '#' ){
                        urlCount = methods.preparaUrl( urlCount );
                        $.ajax({
                            url             : urlCount,
                            type            : 'GET',
                            contentType     : "application/json",
                            dataType        : 'jsonp',
                            success: function( json ) {
                                var count = 0;
                                if( social === 'facebook' ){
                                    count = json.shares;
                                }else
                                if( social === 'twitter' || social === 'linkedin' || social === 'pinterest' ){
                                    count = json.count;
                                }
                                count = ( count !== null && count !== undefined ) ? count : 0;
                                methods.criaBotao( social, urlShare, count, btnText );
                            }
                        });
                    }else{
                        methods.criaBotao( social, urlShare, null, btnText );
                    }                    
                }
            },
        };
        
        // Plugin events
        var events = {
            abrePopup : function(){
                $(document).on( 'click', 'a.sb-link-popup', function(e){
                    var url = $(this).attr('href');

                    if( url.indexOf('javascript') > -1 ){
                        return true;
                    }else{
                        var newWindow = window.open( url, 'name', 'height=auto,width=auto,top='+e.pageY+',left='+e.pageX);
                        if (window.focus) {newWindow.focus()}
                        return false;
                    }
                });
            },
        };

        methods.init();

    };

})( jQuery );