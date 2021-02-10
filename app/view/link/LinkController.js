Ext.define('Aplikasiku.view.main.LinkController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.link',

    clickAdd: function () {
        var view = this.getView(),
            rec = new Aplikasiku.model.Link({
                nama: '',
                keterangan: '',
                tipe: 'tab',
                judul: '',
                url: '',
                new: 1,
            });

        view.store.insert(0, rec);
        view.findPlugin('cellediting').startEdit(rec, 0);
    },

    clickSave: function () {
        var me = this, data = me.getView().store.data;
        for (var i = 0; i < data.length; i++) {
            var record = data.items[i];
            if (record.dirty) {
              me.saveData(record.data);
            }
        }
    },

    clickDeleteRow: function (grid, rowIndex, colIndex, actionItem, event, record, row) {
        var me = this,
            data = record.data;

        Ext.MessageBox.confirm(
            'Konfirmasi', 
            'Kamu yakin akan menghapus data: ' + data.nama + '?', 
            function(choice) {
                if(choice == 'yes') {
                    if (data.new) {
                      record.drop();
                    } else {
                      me.deleteData(data);
                    }
                }
            }
        );
    },

    saveData: function (data) {
        var me = this;
        var url = 'http://localhost/ProjectWeb/localhost_service/service_crud.php';
        data.action = (data.new) ? 'create' : 'update';

        // tampilkan pesan loading
        Ext.MessageBox.show({
          msg: 'Harap tunggu.',
          progressText: 'Memuat...',
          width: 300,
          wait: {
            interval: 100
          },
          animateTarget: true
        });

        // Set timer lamanya menampilkan pesan loading
        me.timer = Ext.defer(function() {
          // kirim ke SERVICE PHP
          Ext.Ajax.request({
            url: url,
            method: 'post',
            params: data,
            useDefaultXhrHeader: false,
            success: function(response) {
              me.timer = null;
              Ext.MessageBox.hide();

              var resp = Ext.decode(response.responseText, true);
              if (resp !== null) {
                if (resp.success) {
                  // sembunyikan pesan loading
                  Ext.MessageBox.hide();

                  me.refreshGrid();

                  me.showToast('Sukses simpan data!', 'Info');

                } else {
                  Ext.Msg.alert('Gagal simpan', resp.msg);
                }
              } else {
                Ext.Msg.alert('Gagal simpan', response.responseText);
              }
            },
            failure: function(response, opts) {
              me.timer = null;
              Ext.MessageBox.hide();
              var resp = Ext.decode(response.responseText, true);
              if (resp !== null) {
                Ext.Msg.alert('Gagal simpan', resp.msg);
              } else {
                Ext.Msg.alert(response.responseText);
              }
            }
          });

        }, 300);
    },

    deleteData: function (data) {
        var me = this;
        var url = 'http://localhost/ProjectWeb/localhost_service/service_crud.php';
        data.action = 'delete';

        // tampilkan pesan loading
        Ext.MessageBox.show({
          msg: 'Harap tunggu.',
          progressText: 'Memuat...',
          width: 300,
          wait: {
            interval: 100
          },
          animateTarget: true
        });

        // Set timer lamanya menampilkan pesan loading
        me.timer = Ext.defer(function() {
          // kirim ke SERVICE PHP
          Ext.Ajax.request({
            url: url,
            method: 'post',
            params: data,
            useDefaultXhrHeader: false,
            success: function(response) {
              me.timer = null;
              Ext.MessageBox.hide();

              var resp = Ext.decode(response.responseText, true);
              if (resp !== null) {
                if (resp.success) {
                  // sembunyikan pesan loading
                  Ext.MessageBox.hide();

                  me.refreshGrid();

                  me.showToast('Sukses hapus data!', 'Info');

                } else {
                  Ext.Msg.alert('Gagal simpan', resp.msg);
                }
              } else {
                Ext.Msg.alert('Gagal simpan', response.responseText);
              }
            },
            failure: function(response, opts) {
              me.timer = null;
              Ext.MessageBox.hide();
              var resp = Ext.decode(response.responseText, true);
              if (resp !== null) {
                Ext.Msg.alert('Gagal simpan', resp.msg);
              } else {
                Ext.Msg.alert(response.responseText);
              }
            }
          });

        }, 300);
    },

    refreshGrid: function () {
        var grid = Ext.ComponentQuery.query('#gridLink')[0],
            maingrid = Ext.ComponentQuery.query('#mainGridLink')[0],
            vm = grid.getViewModel(),
            mainvm = maingrid.getViewModel(),
            store = vm.getStore('LinkStore'),
            storemain = mainvm.getStore('LinkStore');
        store.load();
        storemain.load();
    },

    showToast: function(s, title) {
        Ext.toast({
            html: s,
            closable: false,
            align: 't',
            slideInDuration: 400
        });
    },

});
