
import react from '@vitejs/plugin-react'
import { useRef } from 'react';

import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

const container = useRef();


// Icon for exercise
import { BiBody } from "react-icons/bi";

//Icon for diet
import { BiBowlHot } from "react-icons/bi";

//Icon for hydration
import { BiDroplet } from "react-icons/bi";

//Icon for hygiene
import { BiBath } from "react-icons/bi";

//Icon for social
import { BiCommentError } from "react-icons/bi";

//Icon for sleep
import { BiBed } from "react-icons/bi";

//Icon for productivity
import { BiAtom } from "react-icons/bi";

//Icon for misc
import { BiClipboard } from "react-icons/bi";
