/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting automatically applies the "viewport"
 * plugin causing this view to become the body element (i.e., the viewport).
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('Aplikasiku.view.main.Main', {
    extend: 'Ext.container.Viewport',
    xtype: 'app-main',

    requires: [
        'Ext.plugin.Viewport',
        'Ext.window.MessageBox',

        'Aplikasiku.view.main.MainController',
        'Aplikasiku.view.link.Link',
        'Aplikasiku.view.link.LinkViewModel',
    ],

    controller: 'main',
    
    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    listeners: {
        beforerender: function(cmp) {
            var refs = cmp.getReferences(),
                vm = refs.gridLink.getViewModel(),
                store = vm.getStore('LinkStore');
            store.load();
        }
    },

    items: [
        {
            xtype: 'panel',
            height: 90,
            layout: 'center',
            bodyStyle: {
                'background-image': 'url(resources/images/toolbar_bg.gif)',
                'background-repeat': 'no-repeat',
                'background-size': 'cover',
                'color': '#FFF',
            },
            items: [
                {
                    xtype: 'label',
                    flex: 1,
                    html: '<center><h3>Halo, Ansori!</h3>'+
                    "<h3>Selamat datang di localhost! Semangat kerja kakak. 🤗</h3></center>"
                }
            ]
        },
        {
            xtype: 'gridpanel',
            reference: 'gridLink',
            itemId: 'mainGridLink',
            title: 'Localhost',
            flex: 1,
            viewModel: { type: 'linkviewmodel' },
            bind: {
                store: '{LinkStore}'
            },
            tools: [
                {
                    iconCls: 'x-fa fa-cog',
                    handler: 'openViewLink'
                },
            ],
            columns: [
                {
                    text: 'Nama',
                    dataIndex: 'nama',
                    flex: 1,
                }, 
                {
                    text: 'Keterangan',
                    dataIndex: 'keterangan',
                    flex: 2,
                    sortable: false
                }
            ],
            listeners: {
                select: 'onSelect'
            }
        }
    ]
});
