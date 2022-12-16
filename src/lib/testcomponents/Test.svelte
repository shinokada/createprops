<script lang="ts">
  export let isBoolean = false;
  export let emptyString = '';
  export let myClass = 'z-10 w-44 text-lg list-none';
  export let img = {};
  export let isWide = true;
  export let child: TopMenuType[] | undefined = undefined;
  export let child2: TopMenuType[] | undefined;
  export let color: 'blue' | 'red' | 'green' = 'blue';
  export let link: string = '';
  export let one = 1;
  export let mysymbol = Symbol();
  // export let date = new Date(2018, 11, 24);
  // array is an object
  export let arr = [];
  export let obj = {};
  // array is an object
  export let arr2 = [1, 2, 3];

  export let btnColor: Colors = 'blue';
  // this works
  export let icons: AccordionIconType = {
    up: ChevronUpSolid,
    down: ChevronDownSolid
  };

  export let divClass: string =
    'max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700';

  // export const toggleBtn = ():boolean => (isOpen = !isOpen);

  // export const greet = (name) => {
  //   alert(`hello ${name}!`);
  // };

  export let review: reviewType;

  export let comment: commentType = {
    id: 1,
    user: {
      name: 'John',
      joined: '2022-08-01'
    }
  };

  // export const labelClass = (inline, extraClass) => {
  //   console.log('hi there');
  //   classNames(inline ? 'inline-flex' : 'flex', 'items-center', extraClass);
  // };
</script>

<div class={divClass} class:has-paragraph={$$slots.paragraph}>
  {#if img}
    {#if link}
      <a href={link} {rel}>
        <img class="rounded-t-lg" />
      </a>
    {/if}
  {/if}
  <div>
    {#if header}
      {#if link}
        <a href={link} {rel}>
          <h3 class={headerClass}>
            {header}
          </h3>
        </a>
      {:else}
        <h3 class={headerClass}>
          {header}
        </h3>
      {/if}
    {/if}
    {#if $$slots.paragraph}
      <slot name="paragraph" />
    {/if}
    {#if link}
      <a href={link} {rel} class={buttonClass}>
        <svg
          class="ml-2 -mr-1 w-4 h-4"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
          ><path
            fill-rule="evenodd"
            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
            clip-rule="evenodd"
          /></svg
        >
      </a>
    {/if}
  </div>
</div>
