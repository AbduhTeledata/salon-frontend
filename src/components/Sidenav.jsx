import React from 'react'

const Sidenav = () => {
  return (
    <div>
        <div>
            {/* <button
                className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-300 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
                type="button"
                data-te-offcanvas-toggle
                data-te-target="#sidenav"
                aria-controls="sidenav"
                data-te-ripple-init
                data-te-ripple-color="light"
                aria-haspopup="true">
                Sidebar
            </button>  */}
        
        {/* <!-- Sidenav --> */}
        <nav
        id="sidenav"
        className="absolute text-xl left-0 top-12 mt-6 z-[1035] h-full w-60 -translate-x-full overflow-hidden bg-blue-600 shadow-[0_4px_12px_0_rgba(0,0,0,0.07),_0_2px_4px_rgba(0,0,0,0.05)] data-[te-sidenav-hidden='false']:translate-x-0 dark:bg-neutral-800"
        data-te-sidenav-init
        data-te-sidenav-hidden="false"
        data-te-sidenav-position="absolute">
       
        <ul className="relative m-0 list-none px-[0.2rem]" data-te-sidenav-menu-ref>
            <li className="relative">
            <a href='/dashboard'
                className="flex h-12 text-xl cursor-pointer items-center truncate rounded-[5px] px-6 py-4 text-[0.875rem] text-white outline-none transition duration-300 ease-linear hover:bg-slate-50 hover:text-inherit hover:outline-none focus:bg-slate-50 focus:text-inherit focus:outline-none active:bg-slate-50 active:text-inherit active:outline-none data-[te-sidenav-state-active]:text-inherit data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-gray-300 dark:hover:bg-white/10 dark:focus:bg-white/10 dark:active:bg-white/10"
                data-te-sidenav-link-ref>
                <span
                className="mr-4 [&>svg]:h-4 [&>svg]:w-4 [&>svg]:text-gray-400 dark:[&>svg]:text-gray-300">
                <svg 
                    fill="#000000" 
                    width="256px" 
                    height="256px" 
                    viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg">
                        <g 
                            id="SVGRepo_bgCarrier" 
                            stroke-width="0">
                        </g>
                        <g 
                            id="SVGRepo_tracerCarrier" 
                            stroke-linecap="round" 
                            stroke-linejoin="round">
                        </g>
                        <g 
                            id="SVGRepo_iconCarrier">
                            <path d="M3.012,10.981,3,11H5v9a1,1,0,0,0,1,1H18a1,1,0,0,0,1-1V11h2a1,1,0,0,0,.555-1.832l-9-6a1,1,0,0,0-1.11,0l-9,6a1,1,0,0,0-.277,1.387A.98.98,0,0,0,3.012,10.981ZM10,14a1,1,0,0,1,1-1h2a1,1,0,0,1,1,1v5H10Z"></path></g></svg>
                </span>
                <span className='text-base'>Dashboard</span>
            </a>
            </li>
            <li className="relative text-lg">
            <a
                className="flex h-12 cursor-pointer items-center truncate rounded-[5px] px-6 py-4 text-[0.875rem] text-gray-600 outline-none transition duration-300 ease-linear hover:bg-slate-50 hover:text-inherit hover:outline-none focus:bg-slate-50 focus:text-inherit focus:outline-none active:bg-slate-50 active:text-inherit active:outline-none data-[te-sidenav-state-active]:text-inherit data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-gray-300 dark:hover:bg-white/10 dark:focus:bg-white/10 dark:active:bg-white/10"
                data-te-sidenav-link-ref>
                <span
                className="mr-4 [&>svg]:h-4 [&>svg]:w-4 [&>svg]:text-gray-400 dark:[&>svg]:text-gray-300">
                <svg fill="#000000" height="256px" width="256px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 199.865 199.865" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M67.668,7.731c-1.002-1.537-1.083-3.5-0.208-5.113C68.333,1.005,70.021,0,71.856,0h56.153c1.835,0,3.522,1.005,4.396,2.618 c0.874,1.614,0.794,3.576-0.208,5.113L125.3,18.308c-2.883,4.721-6.018,12.657-6.891,19.467h-7.943l2.071-4.472 c1.161-2.506,0.07-5.478-2.436-6.638c-2.506-1.161-5.479-0.069-6.638,2.436l-3.276,7.075l-4.864-12.961 c-0.97-2.585-3.852-3.895-6.438-2.924c-2.585,0.97-3.895,3.853-2.924,6.438l4.146,11.046h-9.448 c-1.353-10.379-8.054-22.33-8.732-23.516L67.668,7.731z M80.201,111.821c0,5.398,4.387,9.785,9.779,9.785h4.952v-19.564H89.98 C84.588,102.042,80.201,106.429,80.201,111.821z M104.932,151.171h4.949c5.394,0,9.782-4.389,9.782-9.783s-4.388-9.782-9.782-9.782 h-4.949V151.171z M170.49,140.626c0,35.986-27.695,59.238-70.558,59.238s-70.558-23.252-70.558-59.238 c0-27.145,16.112-68.644,42.142-88.358c0.062-0.047,0.125-0.092,0.189-0.136c1.31-0.908,3.188-2.491,4.903-4.357H89.51l-2.838,6.128 c-1.161,2.506-0.07,5.478,2.436,6.638c0.68,0.315,1.395,0.464,2.098,0.464c1.888,0,3.695-1.074,4.541-2.9l4.043-8.731l4.864,12.961 c0.753,2.007,2.658,3.245,4.682,3.245c0.583,0,1.177-0.103,1.756-0.32c2.585-0.97,3.895-3.853,2.924-6.438l-4.146-11.047h12.465 c0.641,0.63,1.316,1.205,1.999,1.694C151.949,67.175,170.49,110.868,170.49,140.626z M104.932,121.606v-19.564h19.731 c2.761,0,5-2.239,5-5s-2.239-5-5-5h-19.731v-3.601c0-2.761-2.239-5-5-5s-5,2.239-5,5v3.601H89.98 c-10.906,0-19.779,8.873-19.779,19.785c0,10.906,8.873,19.779,19.779,19.779h4.952v19.565H75.201c-2.761,0-5,2.239-5,5s2.239,5,5,5 h19.731v5.197c0,2.761,2.239,5,5,5s5-2.239,5-5v-5.197h4.949c10.908,0,19.782-8.875,19.782-19.783 c0-10.908-8.874-19.782-19.782-19.782H104.932z"></path> </g></svg>
                </span>
                <span className='text-base'>Transaksi Layanan</span>
                <span
                className="absolute right-0 ml-auto mr-[0.8rem] transition-transform duration-300 ease-linear motion-reduce:transition-none [&>svg]:text-gray-600 dark:[&>svg]:text-gray-300"
                data-te-sidenav-rotate-icon-ref>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-5 w-5">
                    <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                    clipRule="evenodd" />
                </svg>
                </span>
            </a>
            <ul
                className="visible relative m-0 hidden list-none p-0 data-[te-collapse-show]:block "
                data-te-sidenav-collapse-ref
                data-te-collapse-show>
                <li className="relative text-lg">
                <a href='/products'
                    className="flex h-6 text-base cursor-pointer items-center truncate rounded-[5px] py-4 pl-[3.4rem] pr-6 text-[0.78rem] text-white outline-none transition duration-300 ease-linear hover:bg-slate-50 hover:text-inherit hover:outline-none focus:bg-slate-50 focus:text-inherit focus:outline-none active:bg-slate-50 active:text-inherit active:outline-none data-[te-sidenav-state-active]:text-inherit data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-gray-300 dark:hover:bg-white/10 dark:focus:bg-white/10 dark:active:bg-white/10"
                    data-te-sidenav-link-ref
                    >Daftar Jasa</a>
                </li>
                {/* <li className="relative">
                <a href='/carts'
                    className="flex h-6 cursor-pointer items-center truncate rounded-[5px] py-4 pl-[3.4rem] pr-6 text-[0.78rem] text-white outline-none transition duration-300 ease-linear hover:bg-slate-50 hover:text-inherit hover:outline-none focus:bg-slate-50 focus:text-inherit focus:outline-none active:bg-slate-50 active:text-inherit active:outline-none data-[te-sidenav-state-active]:text-inherit data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-gray-300 dark:hover:bg-white/10 dark:focus:bg-white/10 dark:active:bg-white/10"
                    data-te-sidenav-link-ref
                    >Transaksi</a>
                </li> */}
                {/* <li className="relative">
                <a href='/transaksi'
                    className="flex h-6 text-base cursor-pointer items-center truncate rounded-[5px] py-4 pl-[3.4rem] pr-6 text-[0.78rem] text-white outline-none transition duration-300 ease-linear hover:bg-slate-50 hover:text-inherit hover:outline-none focus:bg-slate-50 focus:text-inherit focus:outline-none active:bg-slate-50 active:text-inherit active:outline-none data-[te-sidenav-state-active]:text-inherit data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-gray-300 dark:hover:bg-white/10 dark:focus:bg-white/10 dark:active:bg-white/10"
                    data-te-sidenav-link-ref
                    >Transaksi</a>
                </li> */}
                <li className="relative">
                <a href='/invoices'
                    className="flex h-6 text-base cursor-pointer items-center truncate rounded-[5px] py-4 pl-[3.4rem] pr-6 text-[0.78rem] text-white outline-none transition duration-300 ease-linear hover:bg-slate-50 hover:text-inherit hover:outline-none focus:bg-slate-50 focus:text-inherit focus:outline-none active:bg-slate-50 active:text-inherit active:outline-none data-[te-sidenav-state-active]:text-inherit data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-gray-300 dark:hover:bg-white/10 dark:focus:bg-white/10 dark:active:bg-white/10"
                    data-te-sidenav-link-ref
                    >Transaksi
                </a>
                </li>
                <li className="relative">
                <a href='/employees'
                    className="flex h-6 text-base cursor-pointer items-center truncate rounded-[5px] py-4 pl-[3.4rem] pr-6 text-[0.78rem] text-white outline-none transition duration-300 ease-linear hover:bg-slate-50 hover:text-inherit hover:outline-none focus:bg-slate-50 focus:text-inherit focus:outline-none active:bg-slate-50 active:text-inherit active:outline-none data-[te-sidenav-state-active]:text-inherit data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-gray-300 dark:hover:bg-white/10 dark:focus:bg-white/10 dark:active:bg-white/10"
                    data-te-sidenav-link-ref
                    >Karyawan</a>
                </li>
                <li className="relative">
                <a href='/reports'
                    className="flex h-6 text-base cursor-pointer items-center truncate rounded-[5px] py-4 pl-[3.4rem] pr-6 text-[0.78rem] text-white outline-none transition duration-300 ease-linear hover:bg-slate-50 hover:text-inherit hover:outline-none focus:bg-slate-50 focus:text-inherit focus:outline-none active:bg-slate-50 active:text-inherit active:outline-none data-[te-sidenav-state-active]:text-inherit data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-gray-300 dark:hover:bg-white/10 dark:focus:bg-white/10 dark:active:bg-white/10"
                    data-te-sidenav-link-ref
                    >Laporan</a>
                </li>
            </ul>
            </li>
        </ul>
        </nav>
        {/* <!-- Sidenav -->

        <!-- Toggler --> */}
        <button
        className="mt-10 inline-block rounded-lg bg-red-500 px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-primary-700 hover:shadow-lg focus:bg-primary-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg"
        data-te-sidenav-toggle-ref
        data-te-target="#sidenav"
        aria-controls="#sidenav"
        aria-haspopup="true">
        <span className="block [&>svg]:h-5 [&>svg]:w-5 [&>svg]:text-white">
            <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-5 w-5">
            <path
                fillRule="evenodd"
                d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                clipRule="evenodd" />
            </svg>
        </span>
        </button>
        {/* <button 
            aria-expanded="true" 
            aria-controls="sidenav" 
            class="lg:hidden text-gray-600 hover:text-gray-900 cursor-pointer rounded">
            <svg 
                class="w-6 h-6" 
                fill="currentColor" 
                viewBox="0 0 20 20" 
                xmlns="http://www.w3.org/2000/svg">
                <path 
                    fill-rule="evenodd" 
                 d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path>
            </svg>
            <svg 
                class="w-6 h-6 hidden" 
                fill="currentColor"
                viewBox="0 0 20 20" 
                xmlns="http://www.w3.org/2000/svg">
                <path 
                    fill-rule="evenodd" 
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
            </svg>
        </button> */}
        {/* <!-- Toggler --> */}
      </div>
    </div>
  )
}

export default Sidenav
