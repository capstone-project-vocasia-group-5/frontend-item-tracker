import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function CardDemo({ className, ...props }) {
  const cardItem = [
    {
      id: 1,
      image:
        "https://s3-alpha-sig.figma.com/img/a3c4/d7a8/8ae3782c58628580e16637eaf8be662f?Expires=1733702400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Op3W5GV6R~OZ9wecvWsf8QBZWrEWNVXVSHDpgO9THUqsXfIO8sIEQG0HNiJZ7Jja09vrkj-vnKXmruTy1Ba8KYbOIpkNyQHscGBq3O32Yik36oc5WvFMoIgwPm4mW8ONq~ME2I4V2v8FonO6rmnnTSZgfu7d5h0Z53NuQJ-5YPXYnhqdtKDxIbJd6e55bhK4lhGu8To67LQE1elkmGTLZX0ouelD11GbB-Hk1b0SpNcHLPHJdusZZjuoz0DCnSTQXZBxfKWyA2mIKVMVHJ~482I8kghLCeyQCQ4Z1yGV5V15K~3wS0A6of4r5RJSiWVR4-p8fs6Qr0qW4WLMmAlYQQ__",
      text: "Meong",
      city: "Surabaya",
    },
    {
      id: 2,
      image:
        "https://s3-alpha-sig.figma.com/img/fdd8/864c/d924860f9f40c58187c4b7bf94b7eeef?Expires=1733702400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=k2CzVpUZEdMK8XG84KLTh9~kRmcsEpGWdFlxPWumixQnvqS6ZrowrG~Kld-aHYlvYJD0efYX35UZv7qf-5LSAH0Kc2VdH5kdivi8rGA-6Us-t63oeNDNzCiFaVLhqtU21XSVGlcn5zBvDIJK3ee-fcGFMiagi6N0vBwDT1rIlzy~0YK7heGWB8qd7-GziHo8y4UoF0OfGK8mvbIUKYFE6WkOFavoTpclkThPbDBlWD6aOKAtaOJX9~Y~pRnBrV-veHMOiTIfr0TOBfnBwyrRlycEVOWV1ll0RemMLgxvAtv89dFt3Qz5zAFf83K2sF~fycUlxWGgfzmgyiSMhaH7pQ__",
      text: "Mobil",
      city: "Bojonegoro",
    },
    {
      id: 3,
      image:
        "https://s3-alpha-sig.figma.com/img/b242/2ee0/d7af2dd6402f9af662125fd8a2c4d464?Expires=1733702400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=FXvmO0CfkDYNIML2jF1QjMglyW-7shzluZ1yRzShfvc9Zji~OudepdqLuwizWiI8EvYRL4fPPc~I7QM2Fsx~4yvYcLDnbxP0w4PSQyA9EGuJeOEFomgS-DEPIJk0o8qcdQEDfgW1qOtXSBhj8ySMmnUZOi6NwwjWThPsL8h4lv6qYtWRr7Guv5EhnTW~UWuW3G3PYG1PQEA2Ffaf6Ac0W44zyc2EbgEw~5tqsMWIr44UoAm~qLvvBZmZFaZpJFhIxB8YL3~16zilPS5dHh776ETIKvlG96wAEBaODwTfLisOyNrPRthfPB3BBAslaAgr1iHq4pDTGOkhFe~Z0JfD8w__",
      text: "Sepeda",
      city: "Bekasi",
    },
    {
      id: 4,
      image:
        "https://s3-alpha-sig.figma.com/img/1bf8/af8b/241c04ef9d9c3759931704d0586b00a7?Expires=1733702400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=fc5Bg7Qcnl7Un0XumS2kzf2LyS5MxMzftGQyrsNutVj5ahz0zZMv0YQTwsHC7~aB8rHdR6c0~k7fT7vA-zoLF4tVA2B5fJ-NiOeNt2qtuHFSmOhIiuS0H0szwQtovsvmy1v-GqWHBhdYICRbbytqCMr3ZjiAQ-1QzI3ebRBPmZTEtr6KJJOmPnMz0jP-lrFiT3H2GX1o4wlznYwune0ktUayxAuPLWQsT6eyUI5Uz-bupaYzhMBbl1Ql6JQP5ONLdP849c2tCaJNhXXQnMnfq1iO6tGOvWpMepwH3Mkr4UX9hQyXaoGFVjTopfHYza4p9HzmVV2nBrdm02a5ChhWUg__",
      text: "Kamera",
      city: "Jogja",
    },
    {
      id: 5,
      image:
        "https://s3-alpha-sig.figma.com/img/a3c4/d7a8/8ae3782c58628580e16637eaf8be662f?Expires=1733702400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Op3W5GV6R~OZ9wecvWsf8QBZWrEWNVXVSHDpgO9THUqsXfIO8sIEQG0HNiJZ7Jja09vrkj-vnKXmruTy1Ba8KYbOIpkNyQHscGBq3O32Yik36oc5WvFMoIgwPm4mW8ONq~ME2I4V2v8FonO6rmnnTSZgfu7d5h0Z53NuQJ-5YPXYnhqdtKDxIbJd6e55bhK4lhGu8To67LQE1elkmGTLZX0ouelD11GbB-Hk1b0SpNcHLPHJdusZZjuoz0DCnSTQXZBxfKWyA2mIKVMVHJ~482I8kghLCeyQCQ4Z1yGV5V15K~3wS0A6of4r5RJSiWVR4-p8fs6Qr0qW4WLMmAlYQQ__",
      text: "Laptop",
      city: "Malang",
    },
    {
      id: 6,
      image:
        "https://s3-alpha-sig.figma.com/img/fdd8/864c/d924860f9f40c58187c4b7bf94b7eeef?Expires=1733702400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=k2CzVpUZEdMK8XG84KLTh9~kRmcsEpGWdFlxPWumixQnvqS6ZrowrG~Kld-aHYlvYJD0efYX35UZv7qf-5LSAH0Kc2VdH5kdivi8rGA-6Us-t63oeNDNzCiFaVLhqtU21XSVGlcn5zBvDIJK3ee-fcGFMiagi6N0vBwDT1rIlzy~0YK7heGWB8qd7-GziHo8y4UoF0OfGK8mvbIUKYFE6WkOFavoTpclkThPbDBlWD6aOKAtaOJX9~Y~pRnBrV-veHMOiTIfr0TOBfnBwyrRlycEVOWV1ll0RemMLgxvAtv89dFt3Qz5zAFf83K2sF~fycUlxWGgfzmgyiSMhaH7pQ__",
      text: "Motor",
      city: "Bali",
    },
    {
      id: 7,
      image:
        "https://s3-alpha-sig.figma.com/img/b242/2ee0/d7af2dd6402f9af662125fd8a2c4d464?Expires=1733702400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=FXvmO0CfkDYNIML2jF1QjMglyW-7shzluZ1yRzShfvc9Zji~OudepdqLuwizWiI8EvYRL4fPPc~I7QM2Fsx~4yvYcLDnbxP0w4PSQyA9EGuJeOEFomgS-DEPIJk0o8qcdQEDfgW1qOtXSBhj8ySMmnUZOi6NwwjWThPsL8h4lv6qYtWRr7Guv5EhnTW~UWuW3G3PYG1PQEA2Ffaf6Ac0W44zyc2EbgEw~5tqsMWIr44UoAm~qLvvBZmZFaZpJFhIxB8YL3~16zilPS5dHh776ETIKvlG96wAEBaODwTfLisOyNrPRthfPB3BBAslaAgr1iHq4pDTGOkhFe~Z0JfD8w__",
      text: "Kucing",
      city: "Medan",
    },
    {
      id: 8,
      image:
        "https://s3-alpha-sig.figma.com/img/1bf8/af8b/241c04ef9d9c3759931704d0586b00a7?Expires=1733702400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=fc5Bg7Qcnl7Un0XumS2kzf2LyS5MxMzftGQyrsNutVj5ahz0zZMv0YQTwsHC7~aB8rHdR6c0~k7fT7vA-zoLF4tVA2B5fJ-NiOeNt2qtuHFSmOhIiuS0H0szwQtovsvmy1v-GqWHBhdYICRbbytqCMr3ZjiAQ-1QzI3ebRBPmZTEtr6KJJOmPnMz0jP-lrFiT3H2GX1o4wlznYwune0ktUayxAuPLWQsT6eyUI5Uz-bupaYzhMBbl1Ql6JQP5ONLdP849c2tCaJNhXXQnMnfq1iO6tGOvWpMepwH3Mkr4UX9hQyXaoGFVjTopfHYza4p9HzmVV2nBrdm02a5ChhWUg__",
      text: "Tas",
      city: "Bandung",
    },
    {
      id: 9,
      image:
        "https://s3-alpha-sig.figma.com/img/fdd8/864c/d924860f9f40c58187c4b7bf94b7eeef?Expires=1733702400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=k2CzVpUZEdMK8XG84KLTh9~kRmcsEpGWdFlxPWumixQnvqS6ZrowrG~Kld-aHYlvYJD0efYX35UZv7qf-5LSAH0Kc2VdH5kdivi8rGA-6Us-t63oeNDNzCiFaVLhqtU21XSVGlcn5zBvDIJK3ee-fcGFMiagi6N0vBwDT1rIlzy~0YK7heGWB8qd7-GziHo8y4UoF0OfGK8mvbIUKYFE6WkOFavoTpclkThPbDBlWD6aOKAtaOJX9~Y~pRnBrV-veHMOiTIfr0TOBfnBwyrRlycEVOWV1ll0RemMLgxvAtv89dFt3Qz5zAFf83K2sF~fycUlxWGgfzmgyiSMhaH7pQ__",
      text: "Buku",
      city: "Solo",
    },
    {
      id: 10,
      image:
        "https://s3-alpha-sig.figma.com/img/a3c4/d7a8/8ae3782c58628580e16637eaf8be662f?Expires=1733702400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Op3W5GV6R~OZ9wecvWsf8QBZWrEWNVXVSHDpgO9THUqsXfIO8sIEQG0HNiJZ7Jja09vrkj-vnKXmruTy1Ba8KYbOIpkNyQHscGBq3O32Yik36oc5WvFMoIgwPm4mW8ONq~ME2I4V2v8FonO6rmnnTSZgfu7d5h0Z53NuQJ-5YPXYnhqdtKDxIbJd6e55bhK4lhGu8To67LQE1elkmGTLZX0ouelD11GbB-Hk1b0SpNcHLPHJdusZZjuoz0DCnSTQXZBxfKWyA2mIKVMVHJ~482I8kghLCeyQCQ4Z1yGV5V15K~3wS0A6of4r5RJSiWVR4-p8fs6Qr0qW4WLMmAlYQQ__",
      text: "Sepatu",
      city: "Palembang",
    },
    {
      id: 11,
      image:
        "https://s3-alpha-sig.figma.com/img/fdd8/864c/d924860f9f40c58187c4b7bf94b7eeef?Expires=1733702400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=k2CzVpUZEdMK8XG84KLTh9~kRmcsEpGWdFlxPWumixQnvqS6ZrowrG~Kld-aHYlvYJD0efYX35UZv7qf-5LSAH0Kc2VdH5kdivi8rGA-6Us-t63oeNDNzCiFaVLhqtU21XSVGlcn5zBvDIJK3ee-fcGFMiagi6N0vBwDT1rIlzy~0YK7heGWB8qd7-GziHo8y4UoF0OfGK8mvbIUKYFE6WkOFavoTpclkThPbDBlWD6aOKAtaOJX9~Y~pRnBrV-veHMOiTIfr0TOBfnBwyrRlycEVOWV1ll0RemMLgxvAtv89dFt3Qz5zAFf83K2sF~fycUlxWGgfzmgyiSMhaH7pQ__",
      text: "Jam Tangan",
      city: "Makassar",
    },
    {
      id: 12,
      image:
        "https://s3-alpha-sig.figma.com/img/b242/2ee0/d7af2dd6402f9af662125fd8a2c4d464?Expires=1733702400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=FXvmO0CfkDYNIML2jF1QjMglyW-7shzluZ1yRzShfvc9Zji~OudepdqLuwizWiI8EvYRL4fPPc~I7QM2Fsx~4yvYcLDnbxP0w4PSQyA9EGuJeOEFomgS-DEPIJk0o8qcdQEDfgW1qOtXSBhj8ySMmnUZOi6NwwjWThPsL8h4lv6qYtWRr7Guv5EhnTW~UWuW3G3PYG1PQEA2Ffaf6Ac0W44zyc2EbgEw~5tqsMWIr44UoAm~qLvvBZmZFaZpJFhIxB8YL3~16zilPS5dHh776ETIKvlG96wAEBaODwTfLisOyNrPRthfPB3BBAslaAgr1iHq4pDTGOkhFe~Z0JfD8w__",
      text: "Handphone",
      city: "Tangerang",
    },
    {
      id: 13,
      image:
        "https://s3-alpha-sig.figma.com/img/fdd8/864c/d924860f9f40c58187c4b7bf94b7eeef?Expires=1733702400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=k2CzVpUZEdMK8XG84KLTh9~kRmcsEpGWdFlxPWumixQnvqS6ZrowrG~Kld-aHYlvYJD0efYX35UZv7qf-5LSAH0Kc2VdH5kdivi8rGA-6Us-t63oeNDNzCiFaVLhqtU21XSVGlcn5zBvDIJK3ee-fcGFMiagi6N0vBwDT1rIlzy~0YK7heGWB8qd7-GziHo8y4UoF0OfGK8mvbIUKYFE6WkOFavoTpclkThPbDBlWD6aOKAtaOJX9~Y~pRnBrV-veHMOiTIfr0TOBfnBwyrRlycEVOWV1ll0RemMLgxvAtv89dFt3Qz5zAFf83K2sF~fycUlxWGgfzmgyiSMhaH7pQ__",
      text: "Baju",
      city: "Depok",
    },
    {
      id: 14,
      image:
        "https://s3-alpha-sig.figma.com/img/b242/2ee0/d7af2dd6402f9af662125fd8a2c4d464?Expires=1733702400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=FXvmO0CfkDYNIML2jF1QjMglyW-7shzluZ1yRzShfvc9Zji~OudepdqLuwizWiI8EvYRL4fPPc~I7QM2Fsx~4yvYcLDnbxP0w4PSQyA9EGuJeOEFomgS-DEPIJk0o8qcdQEDfgW1qOtXSBhj8ySMmnUZOi6NwwjWThPsL8h4lv6qYtWRr7Guv5EhnTW~UWuW3G3PYG1PQEA2Ffaf6Ac0W44zyc2EbgEw~5tqsMWIr44UoAm~qLvvBZmZFaZpJFhIxB8YL3~16zilPS5dHh776ETIKvlG96wAEBaODwTfLisOyNrPRthfPB3BBAslaAgr1iHq4pDTGOkhFe~Z0JfD8w__",
      text: "Topi",
      city: "Cirebon",
    },
    {
      id: 15,
      image:
        "https://s3-alpha-sig.figma.com/img/a3c4/d7a8/8ae3782c58628580e16637eaf8be662f?Expires=1733702400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Op3W5GV6R~OZ9wecvWsf8QBZWrEWNVXVSHDpgO9THUqsXfIO8sIEQG0HNiJZ7Jja09vrkj-vnKXmruTy1Ba8KYbOIpkNyQHscGBq3O32Yik36oc5WvFMoIgwPm4mW8ONq~ME2I4V2v8FonO6rmnnTSZgfu7d5h0Z53NuQJ-5YPXYnhqdtKDxIbJd6e55bhK4lhGu8To67LQE1elkmGTLZX0ouelD11GbB-Hk1b0SpNcHLPHJdusZZjuoz0DCnSTQXZBxfKWyA2mIKVMVHJ~482I8kghLCeyQCQ4Z1yGV5V15K~3wS0A6of4r5RJSiWVR4-p8fs6Qr0qW4WLMmAlYQQ__",
      text: "Koper",
      city: "Pontianak",
    },
    {
      id: 16,
      image:
        "https://s3-alpha-sig.figma.com/img/fb88/f3a3/3e65c17c1352a69be97ad80a93c8b892?Expires=1733702400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=iYchNLOuLEoWlXHNlSXUic15RN9hE8OEz~jPAJIHYWU2SvwH6JUZDmcFABjjrs2HWjpaBLao44wigDmYXupHzhrUOtDu3QfxfbSykKBrNp~Vt26WpWLO0eTv2kASAqLvo7e9lWYHgvBnpBdZlaZWuV5zpc5l6CC2PeTaoytqTVxjA1-qpg2Lpcf4JvDfcTzPC3El7RcE4AGxWR8YQLLhgtdTq-ngJDYTljSmoyquyJDEY5crAQXgekRh5uLqxjEQT2NkM7Cpt6PL6EyxX~-eqXlDosTc7hhwg24sr8uGMMCys~cZuFuOxroApsTKwxLS0ULfk2UzLYwmAnfWgyNxBA__",
      text: "Drone",
      city: "Batam",
    },
    {
      id: 17,
      image:
        "https://s3-alpha-sig.figma.com/img/fb88/f3a3/3e65c17c1352a69be97ad80a93c8b892?Expires=1733702400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=iYchNLOuLEoWlXHNlSXUic15RN9hE8OEz~jPAJIHYWU2SvwH6JUZDmcFABjjrs2HWjpaBLao44wigDmYXupHzhrUOtDu3QfxfbSykKBrNp~Vt26WpWLO0eTv2kASAqLvo7e9lWYHgvBnpBdZlaZWuV5zpc5l6CC2PeTaoytqTVxjA1-qpg2Lpcf4JvDfcTzPC3El7RcE4AGxWR8YQLLhgtdTq-ngJDYTljSmoyquyJDEY5crAQXgekRh5uLqxjEQT2NkM7Cpt6PL6EyxX~-eqXlDosTc7hhwg24sr8uGMMCys~cZuFuOxroApsTKwxLS0ULfk2UzLYwmAnfWgyNxBA__",
      text: "TV",
      city: "Balikpapan",
    },
    {
      id: 18,
      image:
        "https://s3-alpha-sig.figma.com/img/b242/2ee0/d7af2dd6402f9af662125fd8a2c4d464?Expires=1733702400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=FXvmO0CfkDYNIML2jF1QjMglyW-7shzluZ1yRzShfvc9Zji~OudepdqLuwizWiI8EvYRL4fPPc~I7QM2Fsx~4yvYcLDnbxP0w4PSQyA9EGuJeOEFomgS-DEPIJk0o8qcdQEDfgW1qOtXSBhj8ySMmnUZOi6NwwjWThPsL8h4lv6qYtWRr7Guv5EhnTW~UWuW3G3PYG1PQEA2Ffaf6Ac0W44zyc2EbgEw~5tqsMWIr44UoAm~qLvvBZmZFaZpJFhIxB8YL3~16zilPS5dHh776ETIKvlG96wAEBaODwTfLisOyNrPRthfPB3BBAslaAgr1iHq4pDTGOkhFe~Z0JfD8w__",
      text: "Meja",
      city: "Semarang",
    },
    {
      id: 19,
      image:
        "https://s3-alpha-sig.figma.com/img/a3c4/d7a8/8ae3782c58628580e16637eaf8be662f?Expires=1733702400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Op3W5GV6R~OZ9wecvWsf8QBZWrEWNVXVSHDpgO9THUqsXfIO8sIEQG0HNiJZ7Jja09vrkj-vnKXmruTy1Ba8KYbOIpkNyQHscGBq3O32Yik36oc5WvFMoIgwPm4mW8ONq~ME2I4V2v8FonO6rmnnTSZgfu7d5h0Z53NuQJ-5YPXYnhqdtKDxIbJd6e55bhK4lhGu8To67LQE1elkmGTLZX0ouelD11GbB-Hk1b0SpNcHLPHJdusZZjuoz0DCnSTQXZBxfKWyA2mIKVMVHJ~482I8kghLCeyQCQ4Z1yGV5V15K~3wS0A6of4r5RJSiWVR4-p8fs6Qr0qW4WLMmAlYQQ__",
      text: "Kursi",
      city: "Pekanbaru",
    },
    {
      id: 20,
      image:
        "https://s3-alpha-sig.figma.com/img/fdd8/864c/d924860f9f40c58187c4b7bf94b7eeef?Expires=1733702400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=k2CzVpUZEdMK8XG84KLTh9~kRmcsEpGWdFlxPWumixQnvqS6ZrowrG~Kld-aHYlvYJD0efYX35UZv7qf-5LSAH0Kc2VdH5kdivi8rGA-6Us-t63oeNDNzCiFaVLhqtU21XSVGlcn5zBvDIJK3ee-fcGFMiagi6N0vBwDT1rIlzy~0YK7heGWB8qd7-GziHo8y4UoF0OfGK8mvbIUKYFE6WkOFavoTpclkThPbDBlWD6aOKAtaOJX9~Y~pRnBrV-veHMOiTIfr0TOBfnBwyrRlycEVOWV1ll0RemMLgxvAtv89dFt3Qz5zAFf83K2sF~fycUlxWGgfzmgyiSMhaH7pQ__",
      text: "Lampu",
      city: "Maluku",
    },
  ];

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {cardItem.map((card) => (
        <Card
          className={cn(
            "w-[180px] hover:bg-gray-100 relative group overflow-hidden grid sm:w-[160px] md:w-[170px] lg:w-[180px] flex-grow flex-shrink-0 basis-[160px] border rounded-lg shadow-md",
            className
          )}
          {...props}
        >
          {/* Konten Hover */}
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-lg font-bold opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            Lihat Detail
          </div>

          {/* Konten Utama */}
          <CardContent className="grid ">
            <div className="flex justify-center mt-3">
              <img
                src={card.image}
                alt=""
                className="w-32 h-40 object-contain"
              />
            </div>
          </CardContent>

          <CardHeader>
            <CardTitle>{card.text}</CardTitle>
            <CardDescription>Kota : {card.city} </CardDescription>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}
