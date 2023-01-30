/* main.js
 *
 * Copyright 2023 Ashley Rudelsheim
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import GObject from 'gi://GObject';
import Gio from 'gi://Gio';
import Gtk from 'gi://Gtk?version=4.0';
import Adw from 'gi://Adw?version=1';

import { TestingWindow } from './window.js';
import { Test } from './ui/Test.js';

pkg.initGettext();
pkg.initFormat();

export const TestingApplication = GObject.registerClass(
    class TestingApplication extends Adw.Application {
        constructor() {
            super({application_id: 'ca.ashleyr.testing', flags: Gio.ApplicationFlags.FLAGS_NONE});

            const quit_action = new Gio.SimpleAction({name: 'quit'});
                quit_action.connect('activate', action => {
                this.quit();
            });
            this.add_action(quit_action);
            this.set_accels_for_action('app.quit', ['<primary>q']);

            const show_about_action = new Gio.SimpleAction({name: 'about'});
            show_about_action.connect('activate', action => {
                let aboutParams = {
                    transient_for: this.active_window,
                    application_name: 'testing',
                    application_icon: 'ca.ashleyr.testing',
                    developer_name: 'Ashley Rudelsheim',
                    version: '0.1.0',
                    developers: [
                        'Ashley Rudelsheim'
                    ],
                    copyright: '© 2023 Ashley Rudelsheim'
                };
                const aboutWindow = new Adw.AboutWindow(aboutParams);
                aboutWindow.present();
            });
            this.add_action(show_about_action);
        }

        vfunc_activate() {
            let {active_window} = this;

            if (!active_window)
                active_window = new TestingWindow(this);

            active_window.present();
        }
    }
);

export function main(argv) {
    const application = new TestingApplication();
    return application.run(argv);
}
