Ext.define('Aplikasiku.view.link.Link', {
    extend: 'Ext.window.Window',

    requires: [
        'Aplikasiku.view.link.LinkViewModel',
        'Aplikasiku.view.main.LinkController',
    ],

    title: 'Manajemen Link Localhost',
    modal: true,
    width: '98%',
    height: '85%',
    maximizable: true,
    layout: {
    	type: 'vbox',
    	align: 'stretch'
    },

    listeners: {
        beforerender: function(cmp) {
            var grid = Ext.ComponentQuery.query('#gridLink')[0];
            var vm = grid.getViewModel(),
                store = vm.getStore('LinkStore');
            store.load();
        }
    },

    items: [
    	{
            xtype: 'gridpanel',
            itemId: 'gridLink',
            flex: 1,
            title: 'Link',

            controller: 'link',

            viewModel: { type: 'linkviewmodel' },
            bind: {
                store: '{LinkStore}'
            },
            columns: [
                {
                    text: 'Nama',
                    dataIndex: 'nama',
                    flex: 2,
                    editor: {
			            xtype: 'textfield',
			        }
                }, 
                {
                    text: 'Keterangan',
                    dataIndex: 'keterangan',
                    flex: 2,
                    sortable: false,
                    editor: {
			            xtype: 'textfield',
			        }
                },
                {
                    text: 'Tipe',
                    dataIndex: 'tipe',
                    flex: 1,
                    editor: {
			            xtype: 'textfield',
			        }
                }, 
                {
                    text: 'Judul',
                    dataIndex: 'judul',
                    flex: 1,
                    editor: {
			            xtype: 'textfield',
			        }
                }, 
                {
                    text: 'Url',
                    dataIndex: 'url',
                    flex: 3,
                    editor: {
			            xtype: 'textfield',
			        }
                }, 
                {
			        xtype: 'actioncolumn',
			        width: 30,
			        sortable: false,
			        menuDisabled: true,
			        items: [{
			            iconCls: 'x-fa fa-trash',
			            tooltip: 'Hapus data',
			            handler: 'clickDeleteRow'
			        }]
			    }
            ],
            plugins: {
		        cellediting: {
		            clicksToEdit: 1
		        }
		    },
            dockedItems: [{
                xtype: 'toolbar',
                dock: 'top',
                items: [
                	{
                		xtype: 'button',
                		iconCls: 'x-fa fa-plus',
                        handler: 'clickAdd',
                        tooltip: 'Tambah data'
                	},
                	{
                		xtype: 'button',
                		iconCls: 'x-fa fa-save',
                        handler: 'clickSave',
                        tooltip: 'Simpan data'
                	},
                	{
                		xtype: 'button',
                		iconCls: 'x-fa fa-undo',
                        handler: 'refreshGrid',
                        tooltip: 'Batal simpan'
                	},
                ]
            }],
            bbar: {
                xtype: 'pagingtoolbar',
                displayInfo: true,
                bind:{
                    store: '{LinkStore}'
                },
            },
        }
    ]
})