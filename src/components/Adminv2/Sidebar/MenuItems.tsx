import {
  IconAperture,
  IconCopy,
  IconLayoutDashboard,
  IconLogin,
  IconMoodHappy,
  IconTypography,
  IconUserPlus,
} from '@tabler/icons-react'

const Menuitems = [
  {
    navlabel: true,
    subheader: 'Home',
  },

  {
    title: 'Dashboard',
    icon: IconLayoutDashboard,
    href: '/',
  },
  {
    navlabel: true,
    subheader: 'Utilities',
  },
  {
    title: 'Typography',
    icon: IconTypography,
    href: '/utilities/typography',
  },
  {
    title: 'Shadow',
    icon: IconCopy,
    href: '/utilities/shadow',
  },
  {
    navlabel: true,
    subheader: 'Auth',
  },
  {
    title: 'Login',
    icon: IconLogin,
    href: '/authentication/login',
  },
  {
    title: 'Register',
    icon: IconUserPlus,
    href: '/authentication/register',
  },
  {
    navlabel: true,
    subheader: 'Extra',
  },
  {
    title: 'Icons',
    icon: IconMoodHappy,
    href: '/icons',
  },
  {
    title: 'Sample Page',
    icon: IconAperture,
    href: '/sample-page',
  },
]

export default Menuitems
