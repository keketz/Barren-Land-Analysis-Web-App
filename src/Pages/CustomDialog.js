import $ from 'jquery';
import 'jquery-ui-bundle';
import 'jquery-ui-bundle/jquery-ui.css';
export const ShowDialogBox = (title, content) => {
    $("#lblMessage").html(content);

    $("#dialog").dialog({
        resizable: false,
        title: title,
        modal: true,
        width: '400px',
        height: 'auto',
        bgiframe: false,
        hide: { effect: 'scale', duration: 400 },
        buttons: [
            {
                text: "OK",
                click: function () {
                    $("#dialog").dialog('close');
                }
            }
        ]
    });
};
