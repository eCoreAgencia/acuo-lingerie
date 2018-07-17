! function(a) {
    "use strict";
    a.fn.ADFiltroDepartamento = function(t) {
        var e = a.extend({
                boxMultipleNavigator: ".search-multiple-navigator",
                boxListMultipleNavigator: ".search-multiple-navigator > fieldset",
                boxTitleMultipleNavigator: ".search-multiple-navigator > h3",
                titleMultipleNavigator: '<i class="fa fa-filter"></i> Filtrar',
                boxSingleNavigator: ".search-single-navigator",
                boxListSingleNavigator: ".search-single-navigator > ul",
                boxTitleSingleNavigator: 'body[class*="busca"] .search-single-navigator > h3, .search-single-navigator > h4, .search-single-navigator > h5',
                boxOrdenacao: ".resultado-busca-filtro .orderBy"
            }, t),
            n = {
                $window: a(window),
                $boxMultipleNavigator: a(e.boxMultipleNavigator),
                $boxListMultipleNavigator: a(e.boxListMultipleNavigator),
                $boxTitleMultipleNavigator: a(e.boxTitleMultipleNavigator),
                $boxSingleNavigator: a(e.boxSingleNavigator),
                $boxListSingleNavigator: a(e.boxListSingleNavigator),
                $boxTitleSingleNavigator: a(e.boxTitleSingleNavigator),
                $boxOrdenacao: a(e.boxOrdenacao)
            },
            o = {
                init: function() {
                    n.$boxListMultipleNavigator.length && (n.$boxTitleMultipleNavigator.html(e.titleMultipleNavigator), o.addBotoesShowHide(n.$boxListMultipleNavigator, "label"), l.filtrarClick()), n.$boxListSingleNavigator.length && (a(".search-single-navigator h5").next().hide(), a(".search-single-navigator h5").hide()), l.showHideItensClick(), n.$boxMultipleNavigator.length && n.$boxSingleNavigator.length && n.$boxSingleNavigator.after(n.$boxMultipleNavigator), o.ajustaOrdenacao()
                },
                addBotoesShowHide: function(i, t) {
                    a.each(i, function() {
                        var i = a(this);
                        a(t, i).length > 5 && (i.addClass("parent-btn-show-hide"), i.addClass("itens-hide"), i.append('<button class="btn-show-hide-itens btn-show"><i class="fa fa-plus-square-o"></i> ver todas</button><button class="btn-show-hide-itens btn-hide"><i class="fa fa-minus-square-o"></i> recolher</button>'))
                    })
                },
                addBotoesShowHideSingle: function() {
                    a.each(n.$boxTitleSingleNavigator, function() {
                        var i = a(this);
                        i.append('<button class="btn-show-hide-itens-single"><i class="fa fa-angle-down"></i></button>')
                    })
                },
                ajustaOrdenacao: function() {
                    if (n.$boxOrdenacao.length) {
                        var i = n.$boxOrdenacao.first(),
                            t = i.find("select"),
                            e = o.getUrlParam("O");
                        if (t.length) {
                            a(".vitrine.resultItemsWrapper").before('<div id="ordenar-por"><ul class="list-inline"><li><b>Ordenar por:</b></li></ul></div>');
                            var r = a("#ordenar-por > ul");
                            a.each(a("option", t), function() {
                                var i = a(this),
                                    t = "";
                                "" !== i.attr("value") && (i.attr("value") === e && (t = "active"), r.append('<li><button class="btn btn-link btn-ordenar-por ' + t + '" data-value="' + i.attr("value") + '">' + i.html().toString() + "</button></li>"))
                            })
                        }
                        l.btnOrdenarPorClick(t)
                    }
                },
                getUrlParam: function(a) {
                    var i = new RegExp("[?&]" + a + "=([^&#]*)").exec(window.location.href);
                    return null == i ? null : i[1] || 0
                },
                refinarClickFunction: function(t) {
                    var e = removeQueryToFiltersToAdd(partialSearchUrl),
                        n = !1; - 1 == a.inArray("Mode=M", searchFiltersToAdd) && -1 == t.search.indexOf("Mode=M") ? a(t).hasClass("bt-refinar") && (searchFiltersToAdd.add("Mode=M"), n = !0) : n = !0;
                    var o = "&",
                        l = "",
                        r = "/busca/";
                    for (i = 0; i < searchFiltersToAdd.length; i++) l += o + searchFiltersToAdd[i], 0 == searchFiltersToAdd[i].indexOf("fq=specificationFilter_") && a("input[rel='" + searchFiltersToAdd[i] + "']").attr("checked", !1);
                    l.length > 0 && (l = l.substring(1), e += l, r += "?" + l), e.length > 0 && "?" == e[0] && (e = e.substring(1));
                    var s = "";
                    t.pathname.length > 0 && (s = 0 == t.pathname.indexOf("/") ? t.pathname : "/" + t.pathname, s += t.search), n ? a.ajax({
                        url: "/doresolvecriteriatofriendlyurl/",
                        dataType: "text",
                        type: "POST",
                        data: {
                            currentPathAndQuery: s,
                            newPathAndQuery: r
                        },
                        success: function(a) {
                            null != a && (document.location.href = "/" + a)
                        }
                    }) : document.location.href = e
                }
            },
            l = {
                filtrarClick: function() {
                    a(".bt-refinar.search-filter-button.even").click(function(a) {
                        a.preventDefault(), o.refinarClickFunction(this)
                    }), a(".multi-search-checkbox").change(function() {
                        console.log(), a(".bt-refinar.search-filter-button.even").click()
                    })
                },
                showHideItensClick: function() {
                    a(".btn-show-hide-itens").click(function(i) {
                        var t = a(this),
                            e = t.parents(".parent-btn-show-hide");
                        e.hasClass("itens-hide") ? e.removeClass("itens-hide") : e.addClass("itens-hide")
                    })
                },
                showHideTitleSingleNavigator: function() {
                    a(".btn-show-hide-itens-single").click(function() {
                        var i = a(this),
                            t = i.find(".fa"),
                            e = i.parents(".title-btn-filtro-single");
                        return t.hasClass("fa-angle-down") && e.hasClass("inativo") ? (t.removeClass("fa-angle-down").addClass("fa-angle-up"), a("+ul", e).slideDown(function() {
                            a(this).removeClass("inativo").addClass("ativo")
                        })) : (t.removeClass("fa-angle-up").addClass("fa-angle-down"), a("+ul", e).slideUp(function() {
                            a(this).removeClass("ativo").addClass("inativo")
                        })), !1
                    })
                },
                btnOrdenarPorClick: function(i) {
                    a(".btn-ordenar-por").click(function() {
                        i.val(a(this).attr("data-value")), i.change()
                    })
                }
            };
        o.init()
    }
}(jQuery);