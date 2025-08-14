'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { User, ShoppingCart, Settings, LogOut } from 'lucide-react';

const ProfileSidebar = () => {
  const router = useRouter();

  const menuItems = [
    { icon: User, label: 'Profile', href: '/profile' },
    { icon: ShoppingCart, label: 'My Orders', href: '/orders' },
    { icon: Settings, label: 'Settings', href: '/settings' },
    { icon: LogOut, label: 'Logout', href: '/logout' }
  ];

  return (
    <Card className="w-full max-w-sm rounded-lg shadow-lg border border-gray-200">
      <CardHeader>
        {/* <CardTitle className="text-xl font-semibold text-gray-900">Account</CardTitle> */}
      </CardHeader>
      
      <CardContent>
        <div className="space-y-3">
          {menuItems.map((item, index) => (
            <Button
              key={index}
              variant="ghost"
              className="w-full justify-start text-gray-800 hover:bg-blue-100 hover:text-blue-700 transition-colors duration-200"
              onClick={() => router.push(item.href)}
            >
              <item.icon className="mr-3 h-5 w-5 text-blue-600" />
              {item.label}
            </Button>
          ))}
        </div>
        <Separator className="my-6" />
        <Button
          variant="outline"
          className="w-full text-blue-600 border-blue-600 hover:bg-blue-50"
          onClick={() => router.push('/help')}
        >
          Help & Support
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProfileSidebar;
