﻿/*
Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license
*/
CKEDITOR.plugins.setLang("a11yhelp", "es", {
    title: "Instrucciones de acceso", contents: "Ayuda. Para cerrar presione ESC.", legend: [{
        name: "General", items: [{ name: "Barra de herramientas del editor", legend: 'Presiona ${toolbarFocus} para navegar por la barra de herramientas. Para moverse por los distintos grupos de herramientas usa las teclas TAB y MAY-TAB. Para moverse por las distintas herramientas usa FLECHA DERECHA o FECHA IZQUIERDA. Presiona "espacio" o "intro" para activar la herramienta.' }, {
            name: "Editor de diálogo",
            legend: "Dentro de un cuadro de diálogo, presione la tecla TAB para desplazarse al campo siguiente del cuadro de diálogo, pulse SHIFT + TAB para desplazarse al campo anterior, pulse ENTER para presentar cuadro de diálogo, pulse la tecla ESC para cancelar el diálogo. Para los diálogos que tienen varias páginas, presione ALT + F10 para navegar a la pestaña de la lista. Luego pasar a la siguiente pestaña con TAB o FLECHA DERECHA. Para ir a la ficha anterior con SHIFT + TAB o FLECHA IZQUIERDA. Presione ESPACIO o ENTRAR para seleccionar la página de ficha."
        },
        { name: "Editor Context Menu", legend: "Press ${contextMenu} or APPLICATION KEY to open context-menu. Then move to next menu option with TAB or DOWN ARROW. Move to previous option with SHIFT+TAB or UP ARROW. Press SPACE or ENTER to select the menu option. Open sub-menu of current option with SPACE or ENTER or RIGHT ARROW. Go back to parent menu item with ESC or LEFT ARROW. Close context menu with ESC." }, { name: "Editor List Box", legend: "Inside a list-box, move to next list item with TAB OR DOWN ARROW. Move to previous list item with SHIFT + TAB or UP ARROW. Press SPACE or ENTER to select the list option. Press ESC to close the list-box." },
        { name: "Editor Element Path Bar", legend: "Press ${elementsPathFocus} to navigate to the elements path bar. Move to next element button with TAB or RIGHT ARROW. Move to previous button with  SHIFT+TAB or LEFT ARROW. Press SPACE or ENTER to select the element in editor." }]
    }, {
        name: "Commands", items: [{ name: " Undo command", legend: "Press ${undo}" }, { name: " Redo command", legend: "Press ${redo}" }, { name: " Bold command", legend: "Press ${bold}" }, { name: " Italic command", legend: "Press ${italic}" }, {
            name: " Underline command",
            legend: "Press ${underline}"
        }, { name: " Link command", legend: "Press ${link}" }, { name: " Toolbar Collapse command", legend: "Press ${toolbarCollapse}" }, { name: " Access previous focus space command", legend: "Press ${accessPreviousSpace} to access the closest unreachable focus space before the caret, for example: two adjacent HR elements. Repeat the key combination to reach distant focus spaces." }, { name: " Access next focus space command", legend: "Press ${accessNextSpace} to access the closest unreachable focus space after the caret, for example: two adjacent HR elements. Repeat the key combination to reach distant focus spaces." },
        { name: " Accessibility Help", legend: "Press ${a11yHelp}" }]
    }]
});