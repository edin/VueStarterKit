import Vue, { VNode } from 'vue'
import { RestClient } from './kit/Rest/RestClient';

declare global {
  namespace JSX {
    // tslint:disable no-empty-interface
    interface Element extends VNode {}
    // tslint:disable no-empty-interface
    interface ElementClass extends Vue {}
    interface IntrinsicElements {
      [elem: string]: any
    }
  }

  declare const process: any;
}

