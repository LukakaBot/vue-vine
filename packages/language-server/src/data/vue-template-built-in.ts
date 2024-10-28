import type { HTMLDataV1 } from 'vscode-html-languageservice'

export const vueTemplateBuiltinData: HTMLDataV1 = {
  version: 1.1,
  tags: [
    {
      name: 'Transition',
      description: {
        kind: 'markdown',
        value: '\nProvides animated transition effects to a **single** element or component.\n\n- **Props**\n\n  ```ts\n  interface TransitionProps {\n    /**\n     * Used to automatically generate transition CSS class names.\n     * e.g. `name: \'fade\'` will auto expand to `.fade-enter`,\n     * `.fade-enter-active`, etc.\n     */\n    name?: string\n    /**\n     * Whether to apply CSS transition classes.\n     * Default: true\n     */\n    css?: boolean\n    /**\n     * Specifies the type of transition events to wait for to\n     * determine transition end timing.\n     * Default behavior is auto detecting the type that has\n     * longer duration.\n     */\n    type?: \'transition\' | \'animation\'\n    /**\n     * Specifies explicit durations of the transition.\n     * Default behavior is wait for the first `transitionend`\n     * or `animationend` event on the root transition element.\n     */\n    duration?: number | { enter: number; leave: number }\n    /**\n     * Controls the timing sequence of leaving/entering transitions.\n     * Default behavior is simultaneous.\n     */\n    mode?: \'in-out\' | \'out-in\' | \'default\'\n    /**\n     * Whether to apply transition on initial render.\n     * Default: false\n     */\n    appear?: boolean\n\n    /**\n     * Props for customizing transition classes.\n     * Use kebab-case in templates, e.g. enter-from-class="xxx"\n     */\n    enterFromClass?: string\n    enterActiveClass?: string\n    enterToClass?: string\n    appearFromClass?: string\n    appearActiveClass?: string\n    appearToClass?: string\n    leaveFromClass?: string\n    leaveActiveClass?: string\n    leaveToClass?: string\n  }\n  ```\n\n- **Events**\n\n  - `@before-enter`\n  - `@before-leave`\n  - `@enter`\n  - `@leave`\n  - `@appear`\n  - `@after-enter`\n  - `@after-leave`\n  - `@after-appear`\n  - `@enter-cancelled`\n  - `@leave-cancelled` (`v-show` only)\n  - `@appear-cancelled`\n\n- **Example**\n\n  Simple element:\n\n  ```html\n  <Transition>\n    <div v-if="ok">toggled content</div>\n  </Transition>\n  ```\n\n  Forcing a transition by changing the `key` attribute:\n\n  ```html\n  <Transition>\n    <div :key="text">{{ text }}</div>\n  </Transition>\n  ```\n\n  Dynamic component, with transition mode + animate on appear:\n\n  ```html\n  <Transition name="fade" mode="out-in" appear>\n    <component :is="view"></component>\n  </Transition>\n  ```\n\n  Listening to transition events:\n\n  ```html\n  <Transition @after-enter="onTransitionComplete">\n    <div v-show="ok">toggled content</div>\n  </Transition>\n  ```\n\n- **See also** [Guide - Transition](https://vuejs.org/guide/built-ins/transition.html)\n',
      },
      attributes: [],
    },
    {
      name: 'TransitionGroup',
      description: {
        kind: 'markdown',
        value: '\nProvides transition effects for **multiple** elements or components in a list.\n\n- **Props**\n\n  `<TransitionGroup>` accepts the same props as `<Transition>` except `mode`, plus two additional props:\n\n  ```ts\n  interface TransitionGroupProps extends Omit<TransitionProps, \'mode\'> {\n    /**\n     * If not defined, renders as a fragment.\n     */\n    tag?: string\n    /**\n     * For customizing the CSS class applied during move transitions.\n     * Use kebab-case in templates, e.g. move-class="xxx"\n     */\n    moveClass?: string\n  }\n  ```\n\n- **Events**\n\n  `<TransitionGroup>` emits the same events as `<Transition>`.\n\n- **Details**\n\n  By default, `<TransitionGroup>` doesn\'t render a wrapper DOM element, but one can be defined via the `tag` prop.\n\n  Note that every child in a `<transition-group>` must be [**uniquely keyed**](https://vuejs.org/guide/essentials/list.html#maintaining-state-with-key) for the animations to work properly.\n\n  `<TransitionGroup>` supports moving transitions via CSS transform. When a child\'s position on screen has changed after an update, it will get applied a moving CSS class (auto generated from the `name` attribute or configured with the `move-class` prop). If the CSS `transform` property is "transition-able" when the moving class is applied, the element will be smoothly animated to its destination using the [FLIP technique](https://aerotwist.com/blog/flip-your-animations/).\n\n- **Example**\n\n  ```html\n  <TransitionGroup tag="ul" name="slide">\n    <li v-for="item in items" :key="item.id">\n      {{ item.text }}\n    </li>\n  </TransitionGroup>\n  ```\n\n- **See also** [Guide - TransitionGroup](https://vuejs.org/guide/built-ins/transition-group.html)\n',
      },
      attributes: [],
    },
    {
      name: 'KeepAlive',
      description: {
        kind: 'markdown',
        value: '\nCaches dynamically toggled components wrapped inside.\n\n- **Props**\n\n  ```ts\n  interface KeepAliveProps {\n    /**\n     * If specified, only components with names matched by\n     * `include` will be cached.\n     */\n    include?: MatchPattern\n    /**\n     * Any component with a name matched by `exclude` will\n     * not be cached.\n     */\n    exclude?: MatchPattern\n    /**\n     * The maximum number of component instances to cache.\n     */\n    max?: number | string\n  }\n\n  type MatchPattern = string | RegExp | (string | RegExp)[]\n  ```\n\n- **Details**\n\n  When wrapped around a dynamic component, `<KeepAlive>` caches the inactive component instances without destroying them.\n\n  There can only be one active component instance as the direct child of `<KeepAlive>` at any time.\n\n  When a component is toggled inside `<KeepAlive>`, its `activated` and `deactivated` lifecycle hooks will be invoked accordingly, providing an alternative to `mounted` and `unmounted`, which are not called. This applies to the direct child of `<KeepAlive>` as well as to all of its descendants.\n\n- **Example**\n\n  Basic usage:\n\n  ```html\n  <KeepAlive>\n    <component :is="view"></component>\n  </KeepAlive>\n  ```\n\n  When used with `v-if` / `v-else` branches, there must be only one component rendered at a time:\n\n  ```html\n  <KeepAlive>\n    <comp-a v-if="a > 1"></comp-a>\n    <comp-b v-else></comp-b>\n  </KeepAlive>\n  ```\n\n  Used together with `<Transition>`:\n\n  ```html\n  <Transition>\n    <KeepAlive>\n      <component :is="view"></component>\n    </KeepAlive>\n  </Transition>\n  ```\n\n  Using `include` / `exclude`:\n\n  ```html\n  <!-- comma-delimited string -->\n  <KeepAlive include="a,b">\n    <component :is="view"></component>\n  </KeepAlive>\n\n  <!-- regex (use `v-bind`) -->\n  <KeepAlive :include="/a|b/">\n    <component :is="view"></component>\n  </KeepAlive>\n\n  <!-- Array (use `v-bind`) -->\n  <KeepAlive :include="[\'a\', \'b\']">\n    <component :is="view"></component>\n  </KeepAlive>\n  ```\n\n  Usage with `max`:\n\n  ```html\n  <KeepAlive :max="10">\n    <component :is="view"></component>\n  </KeepAlive>\n  ```\n\n- **See also** [Guide - KeepAlive](https://vuejs.org/guide/built-ins/keep-alive.html)\n',
      },
      attributes: [],
    },
    {
      name: 'Teleport',
      description: {
        kind: 'markdown',
        value: '\nRenders its slot content to another part of the DOM.\n\n- **Props**\n\n  ```ts\n  interface TeleportProps {\n    /**\n     * Required. Specify target container.\n     * Can either be a selector or an actual element.\n     */\n    to: string | HTMLElement\n    /**\n     * When `true`, the content will remain in its original\n     * location instead of moved into the target container.\n     * Can be changed dynamically.\n     */\n    disabled?: boolean\n  }\n  ```\n\n- **Example**\n\n  Specifying target container:\n\n  ```html\n  <Teleport to="#some-id" />\n  <Teleport to=".some-class" />\n  <Teleport to="[data-teleport]" />\n  ```\n\n  Conditionally disabling:\n\n  ```html\n  <Teleport to="#popup" :disabled="displayVideoInline">\n    <video src="./my-movie.mp4">\n  </Teleport>\n  ```\n\n- **See also** [Guide - Teleport](https://vuejs.org/guide/built-ins/teleport.html)\n',
      },
      attributes: [],
    },
    {
      name: 'Suspense',
      description: {
        kind: 'markdown',
        value: '\nUsed for orchestrating nested async dependencies in a component tree.\n\n- **Props**\n\n  ```ts\n  interface SuspenseProps {\n    timeout?: string | number\n    suspensible?: boolean\n  }\n  ```\n\n- **Events**\n\n  - `@resolve`\n  - `@pending`\n  - `@fallback`\n\n- **Details**\n\n  `<Suspense>` accepts two slots: the `#default` slot and the `#fallback` slot. It will display the content of the fallback slot while rendering the default slot in memory.\n\n  If it encounters async dependencies ([Async Components](https://vuejs.org/guide/components/async.html) and components with [`async setup()`](https://vuejs.org/guide/built-ins/suspense.html#async-setup)) while rendering the default slot, it will wait until all of them are resolved before displaying the default slot.\n\n  By setting the Suspense as `suspensible`, all the async dependency handling will be handled by the parent Suspense. See [implementation details](https://github.com/vuejs/core/pull/6736)\n\n- **See also** [Guide - Suspense](https://vuejs.org/guide/built-ins/suspense.html)\n',
      },
      attributes: [],
    },
    {
      name: 'component',
      description: {
        kind: 'markdown',
        value: '\nA "meta component" for rendering dynamic components or elements.\n\n- **Props**\n\n  ```ts\n  interface DynamicComponentProps {\n    is: string | Component\n  }\n  ```\n\n- **Details**\n\n  The actual component to render is determined by the `is` prop.\n\n  - When `is` is a string, it could be either an HTML tag name or a component\'s registered name.\n\n  - Alternatively, `is` can also be directly bound to the definition of a component.\n\n- **Example**\n\n  Rendering components by registered name (Options API):\n\n  ```vue\n  <script>\n  import Foo from \'./Foo.vue\'\n  import Bar from \'./Bar.vue\'\n\n  export default {\n    components: { Foo, Bar },\n    data() {\n      return {\n        view: \'Foo\'\n      }\n    }\n  }\n  </script>\n\n  <template>\n    <component :is="view" />\n  </template>\n  ```\n\n  Rendering components by definition (Composition API with `<script setup>`):\n\n  ```vue\n  <script setup>\n  import Foo from \'./Foo.vue\'\n  import Bar from \'./Bar.vue\'\n  </script>\n\n  <template>\n    <component :is="Math.random() > 0.5 ? Foo : Bar" />\n  </template>\n  ```\n\n  Rendering HTML elements:\n\n  ```html\n  <component :is="href ? \'a\' : \'span\'"></component>\n  ```\n\n  The [built-in components](./built-in-components) can all be passed to `is`, but you must register them if you want to pass them by name. For example:\n\n  ```vue\n  <script>\n  import { Transition, TransitionGroup } from \'vue\'\n\n  export default {\n    components: {\n      Transition,\n      TransitionGroup\n    }\n  }\n  </script>\n\n  <template>\n    <component :is="isGroup ? \'TransitionGroup\' : \'Transition\'">\n      ...\n    </component>\n  </template>\n  ```\n\n  Registration is not required if you pass the component itself to `is` rather than its name, e.g. in `<script setup>`.\n\n  If `v-model` is used on a `<component>` tag, the template compiler will expand it to a `modelValue` prop and `update:modelValue` event listener, much like it would for any other component. However, this won\'t be compatible with native HTML elements, such as `<input>` or `<select>`. As a result, using `v-model` with a dynamically created native element won\'t work:\n\n  ```vue\n  <script setup>\n  import { ref } from \'vue\'\n\n  const tag = ref(\'input\')\n  const username = ref(\'\')\n  </script>\n\n  <template>\n    <!-- This won\'t work as \'input\' is a native HTML element -->\n    <component :is="tag" v-model="username" />\n  </template>\n  ```\n\n  In practice, this edge case isn\'t common as native form fields are typically wrapped in components in real applications. If you do need to use a native element directly then you can split the `v-model` into an attribute and event manually.\n\n- **See also** [Dynamic Components](https://vuejs.org/guide/essentials/component-basics.html#dynamic-components)\n',
      },
      attributes: [],
    },
    {
      name: 'slot',
      description: {
        kind: 'markdown',
        value: '\nDenotes slot content outlets in templates.\n\n- **Props**\n\n  ```ts\n  interface SlotProps {\n    /**\n     * Any props passed to <slot> to passed as arguments\n     * for scoped slots\n     */\n    [key: string]: any\n    /**\n     * Reserved for specifying slot name.\n     */\n    name?: string\n  }\n  ```\n\n- **Details**\n\n  The `<slot>` element can use the `name` attribute to specify a slot name. When no `name` is specified, it will render the default slot. Additional attributes passed to the slot element will be passed as slot props to the scoped slot defined in the parent.\n\n  The element itself will be replaced by its matched slot content.\n\n  `<slot>` elements in Vue templates are compiled into JavaScript, so they are not to be confused with [native `<slot>` elements](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/slot).\n\n- **See also** [Component - Slots](https://vuejs.org/guide/components/slots.html)\n',
      },
      attributes: [],
    },
    {
      name: 'template',
      description: {
        kind: 'markdown',
        value: '\nA container element for grouping Vue template content.\n\nThis tag is often used with `v-if`, `v-for` or inserted as slot. This tag has specific semantics in Vue template, please don\'t confuse it with the native HTML `<template>` tag, See MDN [HTML Template Element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template).\n',
      },
      attributes: [],
    },
  ],
}
