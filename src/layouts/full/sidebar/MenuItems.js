import {
  IconAperture, IconCopy, IconLayoutDashboard, IconLogin, IconMan, IconMap, IconMap2, IconMoodHappy, IconTypography, IconUserPlus
} from '@tabler/icons-react';

import { uniqueId } from 'lodash';

const Menuitems = [
  {
    navlabel: true,
    subheader: 'Home',
  },

  {
    id: uniqueId(),
    title: 'List View',
    icon: IconLayoutDashboard,
    href: '/dashboard',
  },
  {
    id: uniqueId(),
    title: 'Locations',
    icon: IconMap2,
    href: '/locations',
  },
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
  {
    navlabel: true,
    subheader: 'Actions',
  },
  // {
  //   id: uniqueId(),
  //   title: 'Icons',
  //   icon: IconMoodHappy,
  //   href: '/icons',
  // },
  {
    id: uniqueId(),
    title: 'Add Load',
    icon: IconAperture,
    href: '/createload',
  },
  {
    id: uniqueId(),
    title: 'Add Location',
    icon: IconMap,
    href: '/addlocation',
  },
  {
    id: uniqueId(),
    title: 'Add Partner',
    icon: IconMan,
    href: '/addpartner',
  }
];

export default Menuitems;
