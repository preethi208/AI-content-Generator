"use client"
import React, { useEffect } from 'react';
import { FileClock, Home, Settings, WalletCards } from 'lucide-react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';


function SideNav() {
  const MenuList = [
    {
      name: 'Home',
      icon: Home,
      path: '/dashboard',
    },
    
    {
      name: 'Setting',
      icon: Settings,
      path: '/dashboard/setting'
    },
  ];

  const currentPath = usePathname();

  useEffect(() => {
    console.log(currentPath);
  }, []);

  return (
    <div className='h-screen relative p-5 shadow-sm border bg-white'>
      <div className='flex justify-center'>
        <Image src="/logo.svg" alt="logo" width={120} height={100} />
      </div>
      <hr className='my-6 border'/>
      <div className='mt-3'>
        {MenuList.map((menu, index) => (
          <div key={index} className={`flex gap-2 mb-2 p-3 hover:bg-primary hover:text-white rounded-lg cursor-pointer items-center ${currentPath === menu.path && 'bg-primary text-white'}`}>
            <menu.icon className='h-6 w-6'/>
            <h2 className='text-lg'>{menu.name}</h2>
          </div>
        ))}
      </div>
      <div className='absolute bottom-10 left-0 w-full'>
        
      </div>
    </div>
  );
}

export default SideNav;