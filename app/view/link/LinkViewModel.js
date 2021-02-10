Ext.define('Aplikasiku.view.link.LinkViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.linkviewmodel',
    stores: {
        LinkStore: {
            type: 'link'
        },
    }
});