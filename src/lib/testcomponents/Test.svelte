<script lang="ts">
  export function greet(name) {
    alert(`hello ${name}!`);
  }

  export let comment: {
    id: string;
    user: {
      name: string;
      img: {
        src: string;
        alt: string;
      };
      joined: string;
    };
    total: number;
    rating: number;
    heading: string;
    address: string;
    datetime: string;
  };

  export let review: {
    name: string;
    imgSrc: string;
    imgAlt: string;
    address: string | undefined;
    addressIcon: typeof SvelteComponent | undefined;
    reviewDate: string | undefined;
    title: string;
    rating: number;
    item: string | undefined;
    itemIcon: typeof SvelteComponent | undefined;
    option1: string | undefined;
    option1Icon: typeof SvelteComponent | undefined;
    option2: string | undefined;
    option2Icon: typeof SvelteComponent | undefined;
  };

  export const labelClass = (inline, extraClass) => {
    console.log('hi there');
    classNames(inline ? 'inline-flex' : 'flex', 'items-center', extraClass);
  };

  export const toggleBtn = () => (isOpen = !isOpen);

  export let isOpen = false;
  export let href = '';
  export let myClass = 'z-10 w-44 text-lg list-none';

  export let img = {};
  export let isWide = true;
  export let child: TopMenuType[] | undefined = undefined;
  export let child2: TopMenuType[] | undefined;
  export let color: 'blue' | 'red' | 'green' = 'blue';
  export let link: string = '';
  export let rel: string = 'z-10 w-44 text-lg list-none';
  export let one = 1;
  export let mysymbol = Symbol();
  export let date = new Date();
  export let activeChildLi = 'block py-2 px-4 text-base text-gray-700 hover:bg-gray-100';
  export let dropdownLi: string =
    'flex justify-between items-center py-2 pr-4 pl-3 w-full text-base font-medium text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto';
  // array is an object
  export let arr = [];
  export let obj = {};
  // array is an object
  export let arr2 = [1, 2, 3];

  export let btnColor: Colors = 'blue';
  export let icons: AccordionIconType = {
    up: ChevronUpSolid,
    down: ChevronDownSolid
  };

  export let icons: AccordionIconType = {
    up: ChevronUpSolid,
    down: ChevronDownSolid
  };

  export let activeDropdownDiv: string =
    'z-10 w-44 text-lg list-none bg-white rounded divide-y divide-gray-100 shadow';
  export let headerClass: string =
    'mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white';
  export let header: string = '';
  export let divClass: string =
    'max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700';
  let buttonClass: string =
    'inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white focus:ring-4 ';
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
