/**
 * @module PureComponent
 */
import { store } from '@znix/store';
import { render, TemplateResult } from 'lit-html';

export type IRenderOptions = {
  state: object;
  dispatch: Function;
};
export type IRenderAdditionalOptions = {
  [index: string]: any;
};

/**
 * Base class for Znix Components
 * @noInheritDoc
 */
abstract class PureComponent extends HTMLElement {
  /**
   * The root node of Shadow DOM. Often referred as Shadow Root. Once the custom element is mounted, this can be
   * accessed using `container.shadowRoot.querySelector('#selector')`
   */
  root: ShadowRoot;
  /**
   * The render method must be defined in the Component extending this base class. Skipping `render` definition would
   * render a no op for a custom element.
   * @param options? additional options for render
   */
  abstract render(options?: IRenderOptions): TemplateResult;
  /**
   * Attaches a shadow root in 'open' mode.
   */
  constructor() {
    super();
    this.root = this.attachShadow({ mode: 'open' });
  }
  /**
   * Invoked each time the custom element is appended into a document-connected element. This will happen each time
   * the node is moved, and may happen before the element's contents have been fully parsed.
   */
  connectedCallback() {
    this.flush();
  }
  /**
   * Invoked each time one of the custom element's attributes is added, removed, or changed.
   * Which attributes to notice change for is specified in a static get observedAttributes method
   */
  attributeChangedCallback() {
    this.flush();
  }
  /**
   * flush the render cache to DOM. This method should not be overridden in extended class
   * @param options additional options to pass to instance's render function
   */
  flush(options?: IRenderAdditionalOptions) {
    if (this.render) {
      render(this.render({ state: store.state, dispatch: store.dispatch, ...options }), this.root, {
        eventContext: this
      });
    }
  }
}

export { PureComponent };
