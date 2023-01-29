import GObject from 'gi://GObject';
import Gtk from 'gi://Gtk';
import Adw from 'gi://Adw';

export const Test = GObject.registerClass({
	GTypeName: 'Test',
	Template: 'resource:///ca/ashleyr/testing/ui/Test.ui'
}, class Test extends Gtk.Widget {
	constructor(application) {
		super({ application });
	}
});
