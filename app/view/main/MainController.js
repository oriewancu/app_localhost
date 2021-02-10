/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 */
Ext.define('Aplikasiku.view.main.MainController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.main',

    onSelect: function ( grid, record, index, eOpts ) {
        var data = record.data;
        if (data.tipe == 'window') {
            Ext.create('Ext.window.Window',{
                title: data.judul,
                modal: true,
                width: '90%',
                height: '94%',
                resizable: false,
                maximizable: true,
                items: [
                    {
                        xtype: 'component',
                        flex: 1,
                        autoEl: {
                            tag: 'iframe',
                            style: 'height: 100%; width: 100%; border: none;',
                            src: data.url
                        }
                    }
                ]
            }).show();
        } else {
            window.open(data.url, '_blank');
        }
    },

    openViewLink: function () {
        // Ext.require('Aplikasiku.view.link.Link');
        // Ext.create('Aplikasiku.view.link.Link').show();
        Ext.widget('linkwindow').show();
    },

    openWindow: function (event, target, options) {
        var url = options.url;
        if (typeof url !== 'undefined') {
            Ext.create('Ext.window.Window',{
                title: options.title,
                modal: true,
                width: '90%',
                height: '94%',
                resizable: false,
                maximizable: true,
                items: [
                    {
                        xtype: 'component',
                        flex: 1,
                        autoEl: {
                            tag: 'iframe',
                            style: 'height: 100%; width: 100%; border: none;',
                            src: url
                        }
                    }
                ]
            }).show()
        } else {
            Ext.Msg.alert('KESALAHAN', 'Url harus diisi.');
        }
        
    },

    openLink: function (event, target, options) {
        var url = options.url;
        window.open(url, '_blank');
    },

    onConfirm: function (choice) {
        if (choice === 'yes') {
            //
        }
    }
});
