﻿/*
Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license
*/
CKEDITOR.dialog.add("paste", function (c) {
    function g(a) {
        var b = new CKEDITOR.dom.document(a.document), d = b.getBody(), e = b.getById("cke_actscrpt"); e && e.remove(); d.setAttribute("contenteditable", !0); if (CKEDITOR.env.ie && 8 > CKEDITOR.env.version) b.getWindow().on("blur", function () { b.$.selection.empty() }); b.on("keydown", function (a) { var a = a.data, b; switch (a.getKeystroke()) { case 27: this.hide(); b = 1; break; case 9: case CKEDITOR.SHIFT + 9: this.changeFocus(1), b = 1 }b && a.preventDefault() }, this); c.fire("ariaWidget", new CKEDITOR.dom.element(a.frameElement));
        b.getWindow().getFrame().removeCustomData("pendingFocus") && d.focus()
    } var f = c.lang.clipboard, h = CKEDITOR.env.isCustomDomain(); c.on("pasteDialogCommit", function (a) { a.data && c.fire("paste", { type: "auto", dataValue: a.data }) }, null, null, 1E3); return {
        title: f.title, minWidth: CKEDITOR.env.ie && CKEDITOR.env.quirks ? 370 : 350, minHeight: CKEDITOR.env.quirks ? 250 : 245, onShow: function () { this.parts.dialog.$.offsetHeight; this.setupContent(); this.parts.title.setHtml(this.customTitle || f.title); this.customTitle = null }, onLoad: function () {
            (CKEDITOR.env.ie7Compat ||
                CKEDITOR.env.ie6Compat) && "rtl" == c.lang.dir && this.parts.contents.setStyle("overflow", "hidden")
        }, onOk: function () { this.commitContent() }, contents: [{
            id: "general", label: c.lang.common.generalTab, elements: [{ type: "html", id: "securityMsg", html: '<div style="white-space:normal;width:340px">' + f.securityMsg + "</div>" }, { type: "html", id: "pasteMsg", html: '<div style="white-space:normal;width:340px">' + f.pasteMsg + "</div>" }, {
                type: "html", id: "editing_area", style: "width:100%;height:100%", html: "", focus: function () {
                    var a = this.getInputElement(),
                    b = a.getFrameDocument().getBody(); !b || b.isReadOnly() ? a.setCustomData("pendingFocus", 1) : b.focus()
                }, setup: function () {
                    var a = this.getDialog(), b = '<html dir="' + c.config.contentsLangDirection + '" lang="' + (c.config.contentsLanguage || c.langCode) + '"><head><style>body{margin:3px;height:95%}</style></head><body><script id="cke_actscrpt" type="text/javascript">window.parent.CKEDITOR.tools.callFunction(' + CKEDITOR.tools.addFunction(g, a) + ",this);<\/script></body></html>", d = CKEDITOR.dom.element.createFromHtml('<iframe class="cke_pasteframe" frameborder="0"  allowTransparency="true" src="' +
                        (CKEDITOR.env.air ? "javascript:void(0)" : h ? "javascript:void((function(){document.open();document.domain='" + document.domain + "';document.close();})())\"" : "") + '" role="region" aria-label="' + f.pasteArea + '" aria-describedby="' + a.getContentElement("general", "pasteMsg").domId + '" aria-multiple="true"></iframe>'); d.on("load", function (a) { a.removeListener(); a = d.getFrameDocument(); a.write(b); c.focusManager.add(a.getBody()); CKEDITOR.env.air && g.call(this, a.getWindow().$) }, a); d.setCustomData("dialog", a); a = this.getElement();
                    a.setHtml(""); a.append(d); if (CKEDITOR.env.ie) { var e = CKEDITOR.dom.element.createFromHtml('<span tabindex="-1" style="position:absolute" role="presentation"></span>'); e.on("focus", function () { d.$.contentWindow.focus() }); a.append(e); this.focus = function () { e.focus(); this.fire("focus") } } this.getInputElement = function () { return d }; CKEDITOR.env.ie && (a.setStyle("display", "block"), a.setStyle("height", d.$.offsetHeight + 2 + "px"))
                }, commit: function () {
                    var a = this.getDialog().getParentEditor(), b = this.getInputElement().getFrameDocument().getBody(),
                    d = b.getBogus(), c; d && d.remove(); c = b.getHtml(); setTimeout(function () { a.fire("pasteDialogCommit", c) }, 0)
                }
            }]
        }]
    }
});