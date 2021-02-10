/*
 * This file launches the application by asking Ext JS to create
 * and launch() the Application class.
 */
Ext.application({
    extend: 'Aplikasiku.Application',

    name: 'Aplikasiku',

    requires: [
        // This will automatically load all classes in the Aplikasiku namespace
        // so that application classes do not need to require each other.
        'Aplikasiku.*'
    ],

    // The name of the initial view to create.
    mainView: 'Aplikasiku.view.main.Main'
});
