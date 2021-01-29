import Vue, { VNode } from 'vue'
import { Application } from '@/Application';
import { RestClient } from '@/kit/Rest/RestClient';

declare module 'vue/types/vue' {
    interface Vue  {
        $app: Application
    }
}

declare global {
    namespace JSX {
        // tslint:disable no-empty-interface
        interface Element extends VNode { }
        // tslint:disable no-empty-interface
        interface ElementClass extends Vue { }
        interface IntrinsicElements {
            [elem: string]: any
        }
    }

    // interface Window {
    //     App: Application;
    // }

    // declare var App: Application;
    declare const process: any;
}
