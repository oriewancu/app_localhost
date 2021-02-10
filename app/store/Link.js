Ext.define('Aplikasiku.store.Link', {
    extend: 'Ext.data.Store',

    alias: 'store.link',

    model: 'Aplikasiku.model.Link',
    proxy: {
        type: 'ajax',
        url: 'http://localhost/ProjectWeb/localhost_service/service_crud.php',
        method: 'GET',
        extraParams: {
            action: 'read'
        },
        useDefaultXhrHeader: false,
        reader: {
            type: 'json',
            rootProperty: 'result', 
            successProperty: 'success', 
            totalProperty: 'total', 
            messageProperty: 'msg',
        }
    }
});