﻿/*
Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license
*/
(function () {
    function z(a) { for (var a = a.toUpperCase(), b = A.length, c = 0, d = 0; d < b; ++d)for (var e = A[d], f = e[1].length; a.substr(0, f) == e[1]; a = a.substr(f))c += e[0]; return c } function B(a) { for (var a = a.toUpperCase(), b = C.length, c = 1, d = 1; 0 < a.length; d *= b)c += C.indexOf(a.charAt(a.length - 1)) * d, a = a.substr(0, a.length - 1); return c } var D = CKEDITOR.htmlParser.fragment.prototype, v = CKEDITOR.htmlParser.element.prototype; D.onlyChild = v.onlyChild = function () { var a = this.children; return 1 == a.length && a[0] || null }; v.removeAnyChildWithName =
        function (a) { for (var b = this.children, c = [], d, e = 0; e < b.length; e++)d = b[e], d.name && (d.name == a && (c.push(d), b.splice(e--, 1)), c = c.concat(d.removeAnyChildWithName(a))); return c }; v.getAncestor = function (a) { for (var b = this.parent; b && (!b.name || !b.name.match(a));)b = b.parent; return b }; D.firstChild = v.firstChild = function (a) { for (var b, c = 0; c < this.children.length; c++)if (b = this.children[c], a(b) || b.name && (b = b.firstChild(a))) return b; return null }; v.addStyle = function (a, b, c) {
            var d = ""; if ("string" == typeof b) d += a + ":" + b + ";"; else {
                if ("object" ==
                    typeof a) for (var e in a) a.hasOwnProperty(e) && (d += e + ":" + a[e] + ";"); else d += a; c = b
            } this.attributes || (this.attributes = {}); a = this.attributes.style || ""; a = (c ? [d, a] : [a, d]).join(";"); this.attributes.style = a.replace(/^;|;(?=;)/, "")
        }; v.getStyle = function (a) { var b = this.attributes.style; if (b) return b = CKEDITOR.tools.parseCssText(b, 1), b[a] }; CKEDITOR.dtd.parentOf = function (a) { var b = {}, c; for (c in this) -1 == c.indexOf("$") && this[c][a] && (b[c] = 1); return b }; var H = /^([.\d]*)+(em|ex|px|gd|rem|vw|vh|vm|ch|mm|cm|in|pt|pc|deg|rad|ms|s|hz|khz){1}?/i,
            E = /^(?:\b0[^\s]*\s*){1,4}$/, y = { ol: { decimal: /\d+/, "lower-roman": /^m{0,4}(cm|cd|d?c{0,3})(xc|xl|l?x{0,3})(ix|iv|v?i{0,3})$/, "upper-roman": /^M{0,4}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/, "lower-alpha": /^[a-z]+$/, "upper-alpha": /^[A-Z]+$/ }, ul: { disc: /[l\u00B7\u2002]/, circle: /[\u006F\u00D8]/, square: /[\u006E\u25C6]/ } }, A = [[1E3, "M"], [900, "CM"], [500, "D"], [400, "CD"], [100, "C"], [90, "XC"], [50, "L"], [40, "XL"], [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"]], C = "ABCDEFGHIJKLMNOPQRSTUVWXYZ", w = 0, o = null, x, F = CKEDITOR.plugins.pastefromword =
            {
                utils: {
                    createListBulletMarker: function (a, b) { var c = new CKEDITOR.htmlParser.element("cke:listbullet"); c.attributes = { "cke:listsymbol": a[0] }; c.add(new CKEDITOR.htmlParser.text(b)); return c }, isListBulletIndicator: function (a) { if (/mso-list\s*:\s*Ignore/i.test(a.attributes && a.attributes.style)) return !0 }, isContainingOnlySpaces: function (a) { var b; return (b = a.onlyChild()) && /^(:?\s|&nbsp;)+$/.test(b.value) }, resolveList: function (a) {
                        var b = a.attributes, c; if ((c = a.removeAnyChildWithName("cke:listbullet")) && c.length &&
                            (c = c[0])) return a.name = "cke:li", b.style && (b.style = F.filters.stylesFilter([["text-indent"], ["line-height"], [/^margin(:?-left)?$/, null, function (a) { a = a.split(" "); a = CKEDITOR.tools.convertToPx(a[3] || a[1] || a[0]); !w && (null !== o && a > o) && (w = a - o); o = a; b["cke:indent"] = w && Math.ceil(a / w) + 1 || 1 }], [/^mso-list$/, null, function (a) { var a = a.split(" "), c = Number(a[0].match(/\d+/)), a = Number(a[1].match(/\d+/)); 1 == a && (c !== x && (b["cke:reset"] = 1), x = c); b["cke:indent"] = a }]])(b.style, a) || ""), b["cke:indent"] || (o = 0, b["cke:indent"] =
                                1), CKEDITOR.tools.extend(b, c.attributes), !0; x = o = w = null; return !1
                    }, getStyleComponents: function () { var a = CKEDITOR.dom.element.createFromHtml('<div style="position:absolute;left:-9999px;top:-9999px;"></div>', CKEDITOR.document); CKEDITOR.document.getBody().append(a); return function (b, c, d) { a.setStyle(b, c); for (var b = {}, c = d.length, e = 0; e < c; e++)b[d[e]] = a.getStyle(d[e]); return b } }(), listDtdParents: CKEDITOR.dtd.parentOf("ol")
                }, filters: {
                    flattenList: function (a, b) {
                        var b = "number" == typeof b ? b : 1, c = a.attributes, d; switch (c.type) {
                            case "a": d =
                                "lower-alpha"; break; case "1": d = "decimal"
                        }for (var e = a.children, f, h = 0; h < e.length; h++)if (f = e[h], f.name in CKEDITOR.dtd.$listItem) {
                            var g = f.attributes, i = f.children, m = i[i.length - 1]; m.name in CKEDITOR.dtd.$list && (a.add(m, h + 1), --i.length || e.splice(h--, 1)); f.name = "cke:li"; c.start && !h && (g.value = c.start); F.filters.stylesFilter([["tab-stops", null, function (a) { (a = a.split(" ")[1].match(H)) && (o = CKEDITOR.tools.convertToPx(a[0])) }], 1 == b ? ["mso-list", null, function (a) {
                                a = a.split(" "); a = Number(a[0].match(/\d+/)); a !== x &&
                                    (g["cke:reset"] = 1); x = a
                            }] : null])(g.style); g["cke:indent"] = b; g["cke:listtype"] = a.name; g["cke:list-style-type"] = d
                        } else if (f.name in CKEDITOR.dtd.$list) { arguments.callee.apply(this, [f, b + 1]); e = e.slice(0, h).concat(f.children).concat(e.slice(h + 1)); a.children = []; f = 0; for (i = e.length; f < i; f++)a.add(e[f]) } delete a.name; c["cke:list"] = 1
                    }, assembleList: function (a) {
                        for (var b = a.children, c, d, e, f, h, g, a = [], i, m, j, l, k, r, p = 0; p < b.length; p++)if (c = b[p], "cke:li" == c.name) if (c.name = "li", d = c.attributes, j = (j = d["cke:listsymbol"]) &&
                            j.match(/^(?:[(]?)([^\s]+?)([.)]?)$/), l = k = r = null, d["cke:ignored"]) b.splice(p--, 1); else {
                                d["cke:reset"] && (g = f = h = null); e = Number(d["cke:indent"]); e != f && (m = i = null); if (j) { if (m && y[m][i].test(j[1])) l = m, k = i; else for (var s in y) for (var t in y[s]) if (y[s][t].test(j[1])) if ("ol" == s && /alpha|roman/.test(t)) { if (i = /roman/.test(t) ? z(j[1]) : B(j[1]), !r || i < r) r = i, l = s, k = t } else { l = s; k = t; break } !l && (l = j[2] ? "ol" : "ul") } else l = d["cke:listtype"] || "ol", k = d["cke:list-style-type"]; m = l; i = k || ("ol" == l ? "decimal" : "disc"); k && k != ("ol" == l ?
                                    "decimal" : "disc") && c.addStyle("list-style-type", k); if ("ol" == l && j) { switch (k) { case "decimal": r = Number(j[1]); break; case "lower-roman": case "upper-roman": r = z(j[1]); break; case "lower-alpha": case "upper-alpha": r = B(j[1]) }c.attributes.value = r } if (g) { if (e > f) a.push(g = new CKEDITOR.htmlParser.element(l)), g.add(c), h.add(g); else { if (e < f) { f -= e; for (var n; f-- && (n = g.parent);)g = n.parent } g.add(c) } b.splice(p--, 1) } else a.push(g = new CKEDITOR.htmlParser.element(l)), g.add(c), b[p] = g; h = c; f = e
                        } else g && (g = f = h = null); for (p = 0; p < a.length; p++)if (g =
                            a[p], s = g.children, i = i = void 0, t = g.children.length, n = i = void 0, b = /list-style-type:(.*?)(?:;|$)/, f = CKEDITOR.plugins.pastefromword.filters.stylesFilter, i = g.attributes, !b.exec(i.style)) { for (h = 0; h < t; h++)if (i = s[h], i.attributes.value && Number(i.attributes.value) == h + 1 && delete i.attributes.value, i = b.exec(i.attributes.style)) if (i[1] == n || !n) n = i[1]; else { n = null; break } if (n) { for (h = 0; h < t; h++)i = s[h].attributes, i.style && (i.style = f([["list-style-type"]])(i.style) || ""); g.addStyle("list-style-type", n) } } x = o = w = null
                    }, falsyFilter: function () { return !1 },
                    stylesFilter: function (a, b) {
                        return function (c, d) {
                            var e = []; (c || "").replace(/&quot;/g, '"').replace(/\s*([^ :;]+)\s*:\s*([^;]+)\s*(?=;|$)/g, function (c, g, f) { g = g.toLowerCase(); "font-family" == g && (f = f.replace(/["']/g, "")); for (var m, j, l, k = 0; k < a.length; k++)if (a[k] && (c = a[k][0], m = a[k][1], j = a[k][2], l = a[k][3], g.match(c) && (!m || f.match(m)))) { g = l || g; b && (j = j || f); "function" == typeof j && (j = j(f, d, g)); j && j.push && (g = j[0], j = j[1]); "string" == typeof j && e.push([g, j]); return } !b && e.push([g, f]) }); for (var f = 0; f < e.length; f++)e[f] =
                                e[f].join(":"); return e.length ? e.join(";") + ";" : !1
                        }
                    }, elementMigrateFilter: function (a, b) { return a ? function (c) { var d = b ? (new CKEDITOR.style(a, b))._.definition : a; c.name = d.element; CKEDITOR.tools.extend(c.attributes, CKEDITOR.tools.clone(d.attributes)); c.addStyle(CKEDITOR.style.getStyleText(d)) } : function () { } }, styleMigrateFilter: function (a, b) { var c = this.elementMigrateFilter; return a ? function (d, e) { var f = new CKEDITOR.htmlParser.element(null), h = {}; h[b] = d; c(a, h)(f); f.children = e.children; e.children = [f] } : function () { } },
                    bogusAttrFilter: function (a, b) { if (-1 == b.name.indexOf("cke:")) return !1 }, applyStyleFilter: null
                }, getRules: function (a) {
                    var b = CKEDITOR.dtd, c = CKEDITOR.tools.extend({}, b.$block, b.$listItem, b.$tableContent), d = a.config, e = this.filters, a = e.falsyFilter, f = e.stylesFilter, h = e.elementMigrateFilter, g = CKEDITOR.tools.bind(this.filters.styleMigrateFilter, this.filters), i = this.utils.createListBulletMarker, m = e.flattenList, j = e.assembleList, l = this.utils.isListBulletIndicator, k = this.utils.isContainingOnlySpaces, r = this.utils.resolveList,
                    p = function (a) { a = CKEDITOR.tools.convertToPx(a); return isNaN(a) ? a : a + "px" }, s = this.utils.getStyleComponents, t = this.utils.listDtdParents, n = !1 !== d.pasteFromWordRemoveFontStyles, o = !1 !== d.pasteFromWordRemoveStyles; return {
                        elementNames: [[/meta|link|script/, ""]], root: function (a) { a.filterChildren(); j(a) }, elements: {
                            "^": function (a) { var b; CKEDITOR.env.gecko && (b = e.applyStyleFilter) && b(a) }, $: function (a) {
                                var u = a.name || "", e = a.attributes; u in c && e.style && (e.style = f([[/^(:?width|height)$/, null, p]])(e.style) || ""); if (u.match(/h\d/)) {
                                    a.filterChildren();
                                    if (r(a)) return; h(d["format_" + u])(a)
                                } else if (u in b.$inline) a.filterChildren(), k(a) && delete a.name; else if (-1 != u.indexOf(":") && -1 == u.indexOf("cke")) { a.filterChildren(); if ("v:imagedata" == u) { if (u = a.attributes["o:href"]) a.attributes.src = u; a.name = "img"; return } delete a.name } u in t && (a.filterChildren(), j(a))
                            }, style: function (a) {
                                if (CKEDITOR.env.gecko) {
                                    var a = (a = a.onlyChild().value.match(/\/\* Style Definitions \*\/([\s\S]*?)\/\*/)) && a[1], b = {}; a && (a.replace(/[\n\r]/g, "").replace(/(.+?)\{(.+?)\}/g, function (a,
                                        c, d) { for (var c = c.split(","), a = c.length, q = 0; q < a; q++)CKEDITOR.tools.trim(c[q]).replace(/^(\w+)(\.[\w-]+)?$/g, function (a, c, q) { c = c || "*"; q = q.substring(1, q.length); q.match(/MsoNormal/) || (b[c] || (b[c] = {}), q ? b[c][q] = d : b[c] = d) }) }), e.applyStyleFilter = function (a) { var c = b["*"] ? "*" : a.name, q = a.attributes && a.attributes["class"]; c in b && (c = b[c], "object" == typeof c && (c = c[q]), c && a.addStyle(c, !0)) })
                                } return !1
                            }, p: function (a) {
                                if (/MsoListParagraph/i.exec(a.attributes["class"]) || a.getStyle("mso-list")) {
                                    var b = a.firstChild(function (a) {
                                        return a.type ==
                                            CKEDITOR.NODE_TEXT && !k(a.parent)
                                    }); (b = b && b.parent) && b.addStyle("mso-list", "Ignore")
                                } a.filterChildren(); r(a) || (d.enterMode == CKEDITOR.ENTER_BR ? (delete a.name, a.add(new CKEDITOR.htmlParser.element("br"))) : h(d["format_" + (d.enterMode == CKEDITOR.ENTER_P ? "p" : "div")])(a))
                            }, div: function (a) { var b = a.onlyChild(); if (b && "table" == b.name) { var c = a.attributes; b.attributes = CKEDITOR.tools.extend(b.attributes, c); c.style && b.addStyle(c.style); b = new CKEDITOR.htmlParser.element("div"); b.addStyle("clear", "both"); a.add(b); delete a.name } },
                            td: function (a) { a.getAncestor("thead") && (a.name = "th") }, ol: m, ul: m, dl: m, font: function (a) {
                                if (l(a.parent)) delete a.name; else {
                                    a.filterChildren(); var b = a.attributes, c = b.style, d = a.parent; "font" == d.name ? (CKEDITOR.tools.extend(d.attributes, a.attributes), c && d.addStyle(c), delete a.name) : (c = c || "", b.color && ("#000000" != b.color && (c += "color:" + b.color + ";"), delete b.color), b.face && (c += "font-family:" + b.face + ";", delete b.face), b.size && (c += "font-size:" + (3 < b.size ? "large" : 3 > b.size ? "small" : "medium") + ";", delete b.size), a.name =
                                        "span", a.addStyle(c))
                                }
                            }, span: function (a) {
                                if (l(a.parent)) return !1; a.filterChildren(); if (k(a)) return delete a.name, null; if (l(a)) { var b = a.firstChild(function (a) { return a.value || "img" == a.name }), c = (b = b && (b.value || "l.")) && b.match(/^(?:[(]?)([^\s]+?)([.)]?)$/); if (c) return b = i(c, b), (a = a.getAncestor("span")) && / mso-hide:\s*all|display:\s*none /.test(a.attributes.style) && (b.attributes["cke:ignored"] = 1), b } if (c = (b = a.attributes) && b.style) b.style = f([["line-height"], [/^font-family$/, null, !n ? g(d.font_style, "family") :
                                    null], [/^font-size$/, null, !n ? g(d.fontSize_style, "size") : null], [/^color$/, null, !n ? g(d.colorButton_foreStyle, "color") : null], [/^background-color$/, null, !n ? g(d.colorButton_backStyle, "color") : null]])(c, a) || ""; b.style || delete b.style; CKEDITOR.tools.isEmpty(b) && delete a.name; return null
                            }, b: h(d.coreStyles_bold), i: h(d.coreStyles_italic), u: h(d.coreStyles_underline), s: h(d.coreStyles_strike), sup: h(d.coreStyles_superscript), sub: h(d.coreStyles_subscript), a: function (a) {
                                var b = a.attributes; b && !b.href && b.name ? delete a.name :
                                    CKEDITOR.env.webkit && (b.href && b.href.match(/file:\/\/\/[\S]+#/i)) && (b.href = b.href.replace(/file:\/\/\/[^#]+/i, ""))
                            }, "cke:listbullet": function (a) { a.getAncestor(/h\d/) && !d.pasteFromWordNumberedHeadingToList && delete a.name }
                        }, attributeNames: [[/^onmouse(:?out|over)/, ""], [/^onload$/, ""], [/(?:v|o):\w+/, ""], [/^lang/, ""]], attributes: {
                            style: f(o ? [[/^list-style-type$/, null], [/^margin$|^margin-(?!bottom|top)/, null, function (a, b, c) {
                                if (b.name in { p: 1, div: 1 }) {
                                    b = "ltr" == d.contentsLangDirection ? "margin-left" : "margin-right";
                                    if ("margin" == c) a = s(c, a, [b])[b]; else if (c != b) return null; if (a && !E.test(a)) return [b, a]
                                } return null
                            }], [/^clear$/], [/^border.*|margin.*|vertical-align|float$/, null, function (a, b) { if ("img" == b.name) return a }], [/^width|height$/, null, function (a, b) { if (b.name in { table: 1, td: 1, th: 1, img: 1 }) return a }]] : [[/^mso-/], [/-color$/, null, function (a) { if ("transparent" == a) return !1; if (CKEDITOR.env.gecko) return a.replace(/-moz-use-text-color/g, "transparent") }], [/^margin$/, E], ["text-indent", "0cm"], ["page-break-before"], ["tab-stops"],
                            ["display", "none"], n ? [/font-?/] : null], o), width: function (a, c) { if (c.name in b.$tableContent) return !1 }, border: function (a, c) { if (c.name in b.$tableContent) return !1 }, "class": a, bgcolor: a, valign: o ? a : function (a, b) { b.addStyle("vertical-align", a); return !1 }
                        }, comment: !CKEDITOR.env.ie ? function (a, b) {
                            var c = a.match(/<img.*?>/), d = a.match(/^\[if !supportLists\]([\s\S]*?)\[endif\]$/); return d ? (d = (c = d[1] || c && "l.") && c.match(/>(?:[(]?)([^\s]+?)([.)]?)</), i(d, c)) : CKEDITOR.env.gecko && c ? (c = CKEDITOR.htmlParser.fragment.fromHtml(c[0]).children[0],
                                (d = (d = (d = b.previous) && d.value.match(/<v:imagedata[^>]*o:href=['"](.*?)['"]/)) && d[1]) && (c.attributes.src = d), c) : !1
                        } : a
                    }
                }
            }, G = function () { this.dataFilter = new CKEDITOR.htmlParser.filter }; G.prototype = { toHtml: function (a) { var a = CKEDITOR.htmlParser.fragment.fromHtml(a), b = new CKEDITOR.htmlParser.basicWriter; a.writeHtml(b, this.dataFilter); return b.getHtml(!0) } }; CKEDITOR.cleanWord = function (a, b) {
                CKEDITOR.env.gecko && (a = a.replace(/(<\!--\[if[^<]*?\])--\>([\S\s]*?)<\!--(\[endif\]--\>)/gi, "$1$2$3")); CKEDITOR.env.webkit &&
                    (a = a.replace(/(class="MsoListParagraph[^>]+><\!--\[if !supportLists\]--\>)([^<]+<span[^<]+<\/span>)(<\!--\[endif\]--\>)/gi, "$1<span>$2</span>$3")); var c = new G, d = c.dataFilter; d.addRules(CKEDITOR.plugins.pastefromword.getRules(b)); b.fire("beforeCleanWord", { filter: d }); try { a = c.toHtml(a) } catch (e) { alert(b.lang.pastefromword.error) } a = a.replace(/cke:.*?".*?"/g, ""); a = a.replace(/style=""/g, ""); return a = a.replace(/<span>/g, "")
            }
})();