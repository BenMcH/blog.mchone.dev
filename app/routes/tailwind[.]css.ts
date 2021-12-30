import { LoaderFunction } from 'remix';
import {serveTailwindCss} from 'remix-tailwind'

export const loader: LoaderFunction = () => serveTailwindCss('app/app.css');
