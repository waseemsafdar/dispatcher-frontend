import {
  IconAperture, IconCopy, IconLayoutDashboard, IconLogin, IconMan, IconMap, IconMap2, IconMoodHappy, IconTypography, IconUserPlus
} from '@tabler/icons-react';

import { uniqueId } from 'lodash';

const Menuitems = [
  // {
  //   navlabel: true,
  //   subheader: 'Loads',
  // },
  {
    id: uniqueId(),
    title: 'Load Listing',
    icon: IconLayoutDashboard,
    href: '/dashboard',
  },
  // {
  //   id: uniqueId(),
  //   title: 'Add Load',
  //   icon: IconAperture,
  //   href: '/createload',
  // },
  // {
  //   navlabel: true,
  //   subheader: 'Locations',
  // },
  {
    id: uniqueId(),
    title: 'All Locations',
    icon: IconMap2,
    href: '/locations',
  },
  // {
  //   id: uniqueId(),
  //   title: 'Add Location',
  //   icon: IconMap,
  //   href: '/addlocation',
  // },
  // {
  //   navlabel: true,
  //   subheader: 'Utilities',
  // },
  // {
  //   id: uniqueId(),
  //   title: 'Login',
  //   icon: IconLogin,
  //   href: '/auth/login',
  // },
  // {
  //   id: uniqueId(),
  //   title: 'Register',
  //   icon: IconUserPlus,
  //   href: '/auth/register',
  // },
  // {
  //   navlabel: true,
  //   subheader: 'Partners',
  // },
  // {
  //   id: uniqueId(),
  //   title: 'Icons',
  //   icon: IconMoodHappy,
  //   href: '/icons',
  // },
  {
    id: uniqueId(),
    title: 'Partners Listing',
    icon: IconMan,
    href: '/partners',
  },
  // {
  //   id: uniqueId(),
  //   title: 'Add Partner',
  //   icon: IconMan,
  //   href: '/addpartner',
  // }
];

export default Menuitems;
