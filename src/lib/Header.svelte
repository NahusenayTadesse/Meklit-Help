<script>
	// import { afterNavigate } from "$app/navigation";
	import { AlignJustify, X } from "lucide-svelte";
	import { slide } from "svelte/transition";

     let sections = [
         { id: '/help', name: 'Help' },
         { id: '/vendor-help', name: 'Help for Vendors' },

     ];

     let menu = $state(false);

      function onclick() {
         if(menu ===  true) return menu = false;
         else return menu = true;
      }

    let  Menuicon = $derived (menu ? X : AlignJustify);

    // let visible = $state(true);
    // let duration;

//   afterNavigate(({ from }) => {
//     duration = from === null ? 300 : 0;
//     visible = true;
//   });

  



  
 </script>
  <!-- {#if visible} -->
    <nav class="hidden lg:flex justify-between px-[10%] 
    items-center sticky top-0 py-4 z-50 
     backdrop-blur-lg bg-white/70
    transition-all duration-300 ease-in-out"
    >
        <a href="/" title="Home">
        <img src="/Logo.webp" alt="ByMeklit Logo" 
        class="w-[190px] h-[46px] hover:scale-115 transition-all duration-300 ease-in-out"
         loading="lazy" />

            </a>
        <ul class="flex flex-row gap-5 justify-center items-center">
        
        {#each sections as section}
           <li class="hover:scale-115 transition-transform duration-300 ease-in-out text-md">
            <a
                href={section.id}
                title={section.name}
                class="text-dark hover:text-pink"
            >
                {section.name}
            </a>
            </li>
        {/each} 
        </ul> 
    
    </nav>
    <!-- {/if} -->


 <!-- Nav Mobile --> 

  <nav class="flex lg:hidden flex-row justify-between items-center p-4 w-full sticky top-0 z-50
    backdrop-blur-lg bg-white/30 space-x-4">
     <a href="/">
      <img src="/Logo.webp" alt="ByMeklit Logo" class="w-[150px] h-[60px]" />
        </a>
     <div>
       
         <button {onclick} class="border-0">
        <Menuicon class="text-dark hover:text-pink" /> </button>
        {#if menu} 
         
         <ul class="flex flex-col w-[100%] absolute top-16 p-2 right-0 
         z-100 gap-2 justify-center items-start pl-4 bg-white">

        {#each sections as section}
        <li transition:slide|global>
            <a
                href="/{section.id}"
                title={section.name}
                class="text-dark hover:text-pink transition-transform duration-300 ease-in-out hover:scale-125 text-xl"
              {onclick}>
                {section.name} 
            </a>
            </li>
        {/each}  
        </ul>
       
         
        {/if}

        


     </div>
  </nav>